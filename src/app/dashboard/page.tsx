'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ name: string; used: number; quota: number; enabled: boolean } | null>(null);
  const [error, setError] = useState('');

  async function checkUsage() {
    if (!apiKey.trim()) return;
    setLoading(true); setError('');
    try {
      const res = await fetch('https://api.cngreentk.com/my/usage', {
        headers: { Authorization: `Bearer ${apiKey.trim()}` },
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Invalid API Key');
      setData(await res.json());
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-zinc-950 text-white">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-2">API Dashboard</h1>
        <p className="text-zinc-400 mb-8">Check your usage and quota.</p>

        {/* API Key Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkUsage()}
            placeholder="Enter your API Key (sk-...)"
            className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-emerald-500 outline-none text-white placeholder-zinc-500"
          />
          <button
            onClick={checkUsage}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition disabled:opacity-50"
          >
            {loading ? '...' : 'Check'}
          </button>
        </div>
        {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6">{error}</div>}

        {/* Stats */}
        {data && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700">
                <div className="text-zinc-400 text-sm mb-1">Total Used</div>
                <div className="text-3xl font-bold text-emerald-400">{(data.used / 10000).toFixed(1)}<span className="text-lg text-zinc-500">万</span></div>
                <div className="text-xs text-zinc-500 mt-1">tokens</div>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700">
                <div className="text-zinc-400 text-sm mb-1">Quota</div>
                <div className="text-3xl font-bold">{data.quota > 0 ? (data.quota / 10000).toFixed(0) + '万' : 'Unlimited'}</div>
                <div className="text-xs text-zinc-500 mt-1">tokens</div>
              </div>
            </div>

            {/* Progress Bar */}
            {data.quota > 0 && (
              <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">Usage</span>
                  <span className="text-zinc-300">{Math.min(100, Math.round(100 * data.used / data.quota))}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-zinc-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${data.used / data.quota > 0.9 ? 'bg-red-500' : data.used / data.quota > 0.5 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, 100 * data.used / data.quota)}%` }}
                  />
                </div>
                <div className="text-xs text-zinc-500 mt-2">
                  {Math.max(0, data.quota - data.used) > 0
                    ? `${(Math.max(0, data.quota - data.used) / 10000).toFixed(1)}万 tokens remaining`
                    : 'Quota exhausted — top up to continue'}
                </div>
              </div>
            )}

            {/* Status */}
            <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700 flex justify-between items-center">
              <div>
                <div className="text-sm text-zinc-400">Account</div>
                <div className="font-semibold">{data.name}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${data.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {data.enabled ? 'Active' : 'Disabled'}
              </div>
            </div>

            {/* Top-up CTA */}
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center">
              <p className="text-zinc-300 mb-3">Need more tokens?</p>
              <a href="mailto:admin@cngreentk.com" className="inline-block px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition">
                Contact for Top-up
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
