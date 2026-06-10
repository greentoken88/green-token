'use client';

import { useEffect, useRef, useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: string;
  tokens: string;
  quota: number;
  popular: boolean;
}

interface PayPalButtonProps {
  plan: Plan;
  onSuccess: (result: { apiKey: string; plan: string; quota: number }) => void;
}

const API_BASE = 'https://api.cngreentk.com';
// 从 PayPal Developer Dashboard 获取: https://developer.paypal.com/
// 创建 Sandbox App 后拿到 Client ID 替换下面的占位符
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID';

let sdkLoaded = false;
let sdkPromise: Promise<void> | null = null;

function loadPayPalSDK(): Promise<void> {
  if (sdkLoaded) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.onload = () => { sdkLoaded = true; resolve(); };
    script.onerror = () => reject(new Error('PayPal SDK load failed'));
    document.head.appendChild(script);
  });

  return sdkPromise;
}

export default function PayPalButton({ plan, onSuccess }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    loadPayPalSDK()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        setLoading(false);

        const win = window as any;
        if (!win.paypal) return;

        win.paypal
          .Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'pill', label: 'paypal' },
            createOrder: async () => {
              const res = await fetch(`${API_BASE}/paypal/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: plan.id }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || 'Order creation failed');
              return data.id;
            },
            onApprove: async (data: any) => {
              const res = await fetch(`${API_BASE}/paypal/capture-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderID: data.orderID, plan: plan.id }),
              });
              const result = await res.json();
              if (!res.ok) throw new Error(result.error || 'Capture failed');
              onSuccess(result);
            },
            onError: (err: any) => {
              console.error('PayPal error:', err);
              setError('Payment failed. Please try again.');
            },
          })
          .render(containerRef.current);
      })
      .catch((e) => {
        if (!cancelled) {
          setLoading(false);
          setError(e.message);
        }
      });

    return () => { cancelled = true; };
  }, [plan.id, onSuccess]);

  return (
    <div>
      {loading && (
        <div className="w-full py-3 rounded-full bg-zinc-700/50 animate-pulse text-center text-sm text-zinc-400">
          Loading PayPal...
        </div>
      )}
      {error && (
        <div className="text-red-400 text-xs text-center mt-2">{error}</div>
      )}
      <div ref={containerRef} />
    </div>
  );
}
