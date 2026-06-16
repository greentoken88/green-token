'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PayPalButton from './components/PayPalButton';
import StripeButton from './components/StripeButton';
import SignupForm from './components/SignupForm';

const plans = [
  { id: 'starter', name: 'Starter', price: '$5', tokens: '500K', quota: 500000, desc: 'Perfect for side projects and experiments', popular: false },
  { id: 'standard', name: 'Standard', price: '$15', tokens: '2M', quota: 2000000, desc: 'Best for indie hackers and startups', popular: true },
  { id: 'pro', name: 'Pro', price: '$30', tokens: '5M', quota: 5000000, desc: 'For power users and production apps', popular: false },
];

const features = [
  { icon: 'Z', title: '16+ Models, One Key', desc: 'DeepSeek, Qwen, Kimi, GLM and more. Switch models by changing one parameter — no extra accounts needed.' },
  { icon: 'B', title: '10x Cheaper Than OpenAI', desc: 'Same API format, fraction of the cost. Our $15 plan gives you 2M tokens — that would cost $150+ on OpenAI.' },
  { icon: 'G', title: '100% Green Energy', desc: 'Our servers run on wind and solar farms in Northwest China. Every API call is verified carbon-neutral.' },
  { icon: 'S', title: 'OpenAI Compatible', desc: 'Drop-in replacement. Change the base URL and your existing code works instantly.' },
  { icon: 'R', title: 'Smart Routing', desc: 'Automatic failover across 3 providers. If one goes down, traffic routes to the next — zero downtime.' },
  { icon: 'C', title: '5-Minute Cache', desc: 'Identical requests are served from cache. Faster responses, lower token usage. See X-Cache: HIT in headers.' },
];

const faqs = [
  { q: 'What models are available?', a: 'DeepSeek-V3, DeepSeek-R1, Qwen2.5 (72B/32B/14B/7B), Qwen3-235B, Kimi-K2, GLM-5.1, Mixtral-8x22B, and more. See /v1/models for the full list.' },
  { q: 'Is it really OpenAI compatible?', a: 'Yes. Change base_url to https://api.cngreentk.com/v1 and your existing OpenAI SDK code works without modification. We support chat completions, streaming, and function calling.' },
  { q: 'How does billing work?', a: 'Buy a monthly plan with card or PayPal. You get an API key instantly. The plan resets monthly. Pay-as-you-go top-ups coming soon.' },
  { q: 'Where are the servers located?', a: 'Our compute runs in Northwest China, powered by wind and solar energy. The API gateway is optimized for global access with edge caching planned.' },
  { q: 'Can I use this with Claude Code?', a: 'Yes! We support the Anthropic Messages API. Set your base URL to https://api.cngreentk.com and use your API key as x-api-key.' },
  { q: 'What happens when I hit my quota?', a: 'Your API key returns 429 errors until the next billing cycle or until you upgrade. We will add overage billing and usage alerts soon.' },
];

const codeExamples = [
  {
    lang: 'cURL',
    code: `curl https://api.cngreentk.com/v1/chat/completions \\
  -H "Authorization: Bearer $GREEN_TOKEN_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
  },
  {
    lang: 'Python',
    code: `from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key-here",
    base_url="https://api.cngreentk.com/v1",
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)`,
  },
  {
    lang: 'JavaScript',
    code: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-your-key-here",
  baseURL: "https://api.cngreentk.com/v1",
});

const resp = await client.chat.completions.create({
  model: "deepseek-chat",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(resp.choices[0].message.content);`,
  },
];

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [successData, setSuccessData] = useState<{ apiKey: string; plan: string; quota: number } | null>(null);
  const [stripeLoading, setStripeLoading] = useState(false);

  // Stripe 支付成功后跳回：?stripe_session=cs_xxx
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('stripe_session');
    if (!sessionId) return;
    setStripeLoading(true);
    fetch(`https://cngreentk.com/stripe/check-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.apiKey) {
          setSuccessData(data);
          window.history.replaceState({}, '', '/');
        }
      })
      .catch(console.error)
      .finally(() => setStripeLoading(false));
  }, []);

  // 推荐码捕获：?ref=CODE
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (!refCode) return;
    // 验证推荐码
    fetch(`https://cngreentk.com/affiliate/${encodeURIComponent(refCode)}`)
      .then(res => res.json())
      .then(data => {
        if (data.exists) {
          sessionStorage.setItem('green_ref', refCode);
          // 清理URL
          const url = new URL(window.location.href);
          url.searchParams.delete('ref');
          window.history.replaceState({}, '', url.toString());
        }
      })
      .catch(() => {/* invalid code, silently ignore */});
  }, []);

  function handleSuccess(result: { apiKey: string; plan: string; quota: number }) {
    setSuccessData(result);
    setSelectedPlan(null);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Green Token",
            url: "https://cngreentk.com",
            description:
              "One API key for 16+ AI models. 10x cheaper than OpenAI, 100% green energy powered.",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "USD",
              lowPrice: "5",
              highPrice: "30",
              offerCount: "3",
            },
            provider: {
              "@type": "Organization",
              name: "Green Token",
              url: "https://cngreentk.com",
              email: "admin@cngreentk.com",
            },
          }),
        }}
      />

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <img src="/icon.svg" alt="Green Token" className="w-7 h-7" />
          <span className="text-emerald-400">Green</span> Token
        </a>
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#docs" className="hover:text-white transition">Docs</a>
          <Link href="/green" className="hover:text-white transition text-emerald-400">Green</Link>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
          <a href="https://discord.gg/tCsTAZhwaU" className="hover:text-white transition text-green-400" target="_blank" rel="noopener noreferrer">Discord</a>
          <Link href="/dashboard" className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition text-sm">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-6 pt-20 pb-24 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium text-emerald-300 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          5x Cheaper, 100% Greener
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
          The Cheapest AI API,<br />
          <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            Powered by Green Energy
          </span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          One API key. 16+ models. 10x cheaper than OpenAI. Zero configuration.
          Same SDK you already use. Every token runs on verified renewable energy.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#pricing" className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition text-lg shadow-lg shadow-emerald-500/25">
            Get API Key — from $5
          </a>
          <a href="#docs" className="px-8 py-3.5 rounded-full border border-zinc-600 hover:border-white text-zinc-300 hover:text-white transition text-lg">
            View Docs
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto">
          {[
            ['16+', 'Models'],
            ['10x', 'Cheaper'],
            ['100%', 'Green Energy'],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{num}</div>
              <div className="text-sm text-zinc-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-6 py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Everything You Need
        </h2>
        <p className="text-zinc-400 text-center mb-14 max-w-xl mx-auto">
          We handle model routing, failover, caching, and billing — you focus on building.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl p-6 border border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 font-bold text-sm">
                {f.icon}
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
          Start in 30 Seconds
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Get an API Key', desc: 'Choose a plan and pay with card or PayPal. Your key is generated instantly.' },
            { step: '2', title: 'Change the Base URL', desc: 'Point your OpenAI SDK to api.cngreentk.com/v1. No other changes needed.' },
            { step: '3', title: 'Start Building', desc: 'Call any of 16+ models. We route, cache, and failover automatically.' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-emerald-400">
                {s.step}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="px-6 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-zinc-400 text-center mb-14">
          All plans include every model. No hidden fees. Cancel anytime.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 border flex flex-col ${
                plan.popular
                  ? 'border-emerald-400 bg-emerald-500/5 ring-1 ring-emerald-400/30'
                  : 'border-zinc-700 bg-zinc-800/30'
              }`}
            >
              {plan.popular && (
                <div className="text-xs font-semibold text-emerald-400 mb-2 tracking-wide uppercase">
                  Most Popular
                </div>
              )}
              <div className="text-3xl font-bold mb-1">
                {plan.price}
                <span className="text-base text-zinc-400 font-normal">/mo</span>
              </div>
              <div className="text-zinc-400 mb-4">{plan.tokens} tokens</div>
              <ul className="text-sm text-zinc-400 mb-6 space-y-2 flex-1">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">&#10003;</span> All 16+ models
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">&#10003;</span> OpenAI compatible
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">&#10003;</span> Streaming support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">&#10003;</span> Email support
                </li>
              </ul>

              {selectedPlan === plan.id ? (
                <div className="space-y-2">
                  <StripeButton plan={plan} />
                  <PayPalButton plan={plan} onSuccess={handleSuccess} />
                </div>
              ) : (
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-full font-semibold transition cursor-pointer ${
                    plan.popular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                      : 'bg-zinc-700 hover:bg-zinc-600'
                  }`}
                >
                  Buy API Key
                </button>
              )}

              {selectedPlan === plan.id && (
                <button onClick={() => setSelectedPlan(null)} className="mt-2 text-xs text-zinc-500 hover:text-zinc-300 transition cursor-pointer">
                  Cancel
                </button>
              )}
              <p className="text-xs text-zinc-500 mt-2 text-center">{plan.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-zinc-500 mt-6">
          Need more?{' '}
          <a href="mailto:admin@cngreentk.com" className="text-emerald-400 hover:underline">
            Contact us
          </a>{' '}
          for custom plans.
        </p>

        {/* Free Trial Signup */}
        <div className="mt-10 flex justify-center">
          <SignupForm />
        </div>
      </section>

      {/* ── Code Examples ── */}
      <section id="docs" className="px-6 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Drop-in OpenAI Replacement
        </h2>
        <p className="text-zinc-400 text-center mb-14">
          Same SDK. Same format. Just change one URL.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {codeExamples.map((item) => (
            <div key={item.lang} className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="px-4 py-2.5 bg-zinc-800/80 text-sm text-zinc-400 font-mono border-b border-zinc-700/50">
                {item.lang}
              </div>
              <pre className="p-4 text-xs text-zinc-300 overflow-x-auto font-mono leading-relaxed">
                {item.code}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Green ── */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-900/50 border border-emerald-500/20 p-10 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Cheap AI Doesn&apos;t Have to Cost the Planet
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto leading-relaxed text-lg">
            Our servers run in Northwest China, powered by some of the world&apos;s largest wind and
            solar farms. Electricity costs are 5x lower than US and European data centers — savings
            we pass directly to you. Every API call carries a verified green energy certificate, so
            you can build with a clear conscience.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 max-w-lg mx-auto text-center">
            {[
              ['5x', 'Lower Energy Cost'],
              ['0', 'Carbon Footprint'],
              ['24/7', 'Renewable Power'],
              ['100%', 'Verified Green'],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-emerald-400">{num}</div>
                <div className="text-xs text-zinc-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="px-6 py-24 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-medium hover:bg-zinc-800/30 transition"
              >
                {faq.q}
                <span className={`text-zinc-500 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-zinc-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl bg-emerald-500/5 border border-emerald-500/20 p-12 sm:p-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Build?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Get your API key in 30 seconds. Start building with 16+ models at 10x lower cost.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#pricing" className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition text-lg shadow-lg shadow-emerald-500/25">
              Get Started — from $5
            </a>
            <a href="mailto:admin@cngreentk.com" className="px-8 py-3.5 rounded-full border border-zinc-600 hover:border-white text-zinc-300 hover:text-white transition text-lg">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-12 border-t border-zinc-800 text-center text-sm text-zinc-500">
        <div className="flex flex-wrap gap-6 justify-center mb-6">
          <a href="/" className="hover:text-zinc-300 transition">Home</a>
          <a href="#features" className="hover:text-zinc-300 transition">Features</a>
          <a href="#pricing" className="hover:text-zinc-300 transition">Pricing</a>
          <a href="#faq" className="hover:text-zinc-300 transition">FAQ</a>
          <a href="/dashboard" className="hover:text-zinc-300 transition">Dashboard</a>
          <a href="/en" className="hover:text-zinc-300 transition">English</a>
          <a href="mailto:admin@cngreentk.com" className="hover:text-zinc-300 transition">Contact</a>
          <a href="https://discord.gg/tCsTAZhwaU" className="hover:text-zinc-300 transition text-green-400" target="_blank" rel="noopener noreferrer">Discord</a>
          <Link href="/affiliate" className="hover:text-zinc-300 transition text-emerald-400">Earn 20%</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Green Token. All rights reserved.</p>
        <p className="mt-1 space-x-3">
          <a href="/privacy" className="hover:text-zinc-300 transition">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="hover:text-zinc-300 transition">Terms of Service</a>
          <span>|</span>
          <span>admin@cngreentk.com</span>
        </p>
      </footer>

      {/* Stripe return loading overlay */}
      {stripeLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-10 text-center">
            <div className="w-10 h-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-zinc-300 font-medium">Processing your payment...</p>
            <p className="text-zinc-500 text-sm mt-1">Generating your API key</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSuccessData(null)}>
          <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
              <p className="text-zinc-400">
                Your <span className="text-emerald-400 font-semibold">{successData.plan}</span> plan is active.
                {(successData.quota / 10000).toFixed(0)}万 tokens ready to use.
              </p>
            </div>

            <div className="bg-zinc-800 rounded-xl p-4 mb-6">
              <div className="text-xs text-zinc-500 mb-1">Your API Key</div>
              <div className="font-mono text-sm text-emerald-400 break-all select-all">{successData.apiKey}</div>
            </div>

            <div className="text-xs text-zinc-500 mb-4 px-2">
              <p>Save this key now — it won&apos;t be shown again.</p>
              <p className="mt-1">Use it with any OpenAI-compatible client at <code className="text-zinc-400">https://api.cngreentk.com/v1</code></p>
            </div>

            <button
              onClick={() => setSuccessData(null)}
              className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
