'use client';

import { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: string;
  tokens: string;
  quota: number;
  popular: boolean;
}

interface StripeButtonProps {
  plan: Plan;
}

const API_BASE = 'https://api.cngreentk.com';

export default function StripeButton({ plan }: StripeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleClick() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout');
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full py-3 rounded-full font-semibold transition cursor-pointer bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
      >
        {loading ? 'Redirecting...' : 'Buy with Card'}
      </button>
      {error && <div className="text-red-400 text-xs text-center mt-2">{error}</div>}
    </div>
  );
}
