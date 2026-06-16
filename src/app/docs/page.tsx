'use client';

import { useState } from 'react';

type Tab = 'curl' | 'python' | 'js' | 'node';

function CodeBlock({ tabs }: { tabs: Partial<Record<Tab, string>> }) {
  const keys = Object.keys(tabs) as Tab[];
  const [active, setActive] = useState<Tab>(keys[0]);

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900/70 overflow-hidden my-4">
      <div className="flex gap-1 px-3 py-2 bg-zinc-800/80 border-b border-zinc-700/50">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition ${
              active === k ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {k === 'curl' ? 'cURL' : k === 'python' ? 'Python' : k === 'js' ? 'JavaScript' : 'Node.js'}
          </button>
        ))}
      </div>
      <pre className="p-4 text-sm text-zinc-200 overflow-x-auto font-mono leading-relaxed whitespace-pre">
        {tabs[active]}
      </pre>
    </div>
  );
}

function EndpointBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    POST: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    PUT: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-mono font-semibold border ${colors[method] || ''}`}>
      {method}
    </span>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ── Sidebar + Content Layout ── */}
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 border-r border-zinc-800 min-h-screen px-6 py-10 sticky top-0 self-start">
          <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <img src="/icon.svg" alt="Green Token" className="w-6 h-6" />
            <span className="text-emerald-400">Green</span> Token
          </a>
          <nav className="mt-8 space-y-1 text-sm">
            {[
              ['#introduction', 'Introduction'],
              ['#authentication', 'Authentication'],
              ['#base-url', 'Base URL'],
              ['#models', 'List Models'],
              ['#chat', 'Chat Completions'],
              ['#streaming', 'Streaming'],
              ['#anthropic', 'Anthropic API'],
              ['#usage', 'Usage & Quota'],
              ['#health', 'Health Check'],
              ['#errors', 'Error Codes'],
              ['#limits', 'Rate Limits'],
              ['#powered-by', 'Badge'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="block py-1.5 text-zinc-400 hover:text-white transition">
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-10 max-w-3xl">

          <h1 className="text-3xl font-bold mb-2">API Reference</h1>
          <p className="text-zinc-400 mb-10">
            Green Token is a drop-in replacement for the OpenAI API. Change the base URL and your existing code works.
          </p>

          {/* Introduction */}
          <section id="introduction" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">Introduction</h2>
            <p className="text-zinc-300 leading-relaxed">
              Green Token provides an OpenAI-compatible API that gives you access to 16+ AI models
              (DeepSeek, Qwen, Kimi, GLM, and more) at a fraction of the cost. The API supports
              chat completions, streaming, and the Anthropic Messages protocol for Claude Code users.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                ['16+', 'Models'],
                ['10x', 'Cheaper'],
                ['100%', 'Green Energy'],
                ['<5ms', 'P99 Latency'],
              ].map(([n, l]) => (
                <div key={l} className="text-center p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                  <div className="text-lg font-bold text-emerald-400">{n}</div>
                  <div className="text-xs text-zinc-500">{l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">Authentication</h2>
            <p className="text-zinc-300 leading-relaxed mb-3">
              All API requests require an API key. Include it in the <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-zinc-200">Authorization</code> header
              as a Bearer token.
            </p>
            <CodeBlock tabs={{
              curl: `# Replace sk-xxx with your API key
curl https://api.cngreentk.com/v1/models \\
  -H "Authorization: Bearer sk-your-api-key-here"`,
              python: `from openai import OpenAI

client = OpenAI(
    api_key="sk-your-api-key-here",
    base_url="https://api.cngreentk.com/v1",
)`,
              js: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-your-api-key-here",
  baseURL: "https://api.cngreentk.com/v1",
});`,
            }} />
            <p className="text-sm text-zinc-500 mt-2">
              Get your API key at{' '}
              <a href="/#pricing" className="text-emerald-400 hover:underline">cngreentk.com/#pricing</a>.
              Keys start with <code className="bg-zinc-800 px-1 py-0.5 rounded text-xs">sk-</code>.
            </p>
          </section>

          {/* Base URL */}
          <section id="base-url" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">Base URL</h2>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 font-mono text-emerald-400">
              https://api.cngreentk.com/v1
            </div>
            <p className="text-sm text-zinc-500 mt-2">
              All OpenAI-compatible endpoints are under <code className="bg-zinc-800 px-1 py-0.5 rounded text-xs">/v1</code>.
              Anthropic endpoints use the root path directly.
            </p>
          </section>

          {/* List Models */}
          <section id="models" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">
              <EndpointBadge method="GET" /> List Models
            </h2>
            <div className="font-mono text-sm text-zinc-400 mb-2">/v1/models</div>
            <p className="text-zinc-300 leading-relaxed mb-3">
              Returns all available models across all upstream providers.
            </p>
            <CodeBlock tabs={{
              curl: `curl https://api.cngreentk.com/v1/models \\
  -H "Authorization: Bearer sk-xxx"`,
              python: `models = client.models.list()
for m in models.data:
    print(m.id)`,
              js: `const models = await client.models.list();
models.data.forEach(m => console.log(m.id));`,
            }} />

            <h4 className="font-semibold text-sm mt-6 mb-2">Available Models</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-zinc-400">
                    <th className="py-2 pr-4 font-medium">Model ID</th>
                    <th className="py-2 pr-4 font-medium">Provider</th>
                    <th className="py-2 font-medium">Protocol</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  {[
                    ['deepseek-chat', 'DeepSeek', 'OpenAI'],
                    ['deepseek-reasoner', 'DeepSeek', 'OpenAI'],
                    ['deepseek-ai/DeepSeek-V3', 'SiliconFlow', 'Both'],
                    ['deepseek-ai/DeepSeek-R1', 'SiliconFlow', 'Both'],
                    ['deepseek-ai/DeepSeek-V4-Flash', 'SiliconFlow', 'Anthropic'],
                    ['Qwen/Qwen2.5-72B-Instruct', 'SiliconFlow', 'Both'],
                    ['Qwen/Qwen3-235B-A22B', 'SiliconFlow', 'Anthropic'],
                    ['moonshotai/Kimi-K2-Instruct-0905', 'SiliconFlow', 'Anthropic'],
                    ['Pro/moonshotai/Kimi-K2.5', 'SiliconFlow', 'Anthropic'],
                    ['Pro/zai-org/GLM-5.1', 'SiliconFlow', 'Anthropic'],
                    ['qwen3.6-flash', 'Aliyun Bailian', 'OpenAI'],
                    ['qwen-plus', 'Aliyun Bailian', 'OpenAI'],
                    ['qwen3.7-max', 'Aliyun Bailian', 'OpenAI'],
                    ['qwen2.5-coder-32b-instruct', 'Aliyun Bailian', 'OpenAI'],
                    ['mistralai/Mixtral-8x22B-Instruct-v0.1', 'SiliconFlow', 'OpenAI'],
                    ['THUDM/glm-4-9b-chat', 'SiliconFlow', 'OpenAI'],
                  ].map(([id, provider, proto]) => (
                    <tr key={id} className="border-b border-zinc-800/50">
                      <td className="py-2 pr-4 font-mono text-xs">{id}</td>
                      <td className="py-2 pr-4 text-zinc-400">{provider}</td>
                      <td className="py-2"><span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs">{proto}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Chat Completions */}
          <section id="chat" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">
              <EndpointBadge method="POST" /> Chat Completions
            </h2>
            <div className="font-mono text-sm text-zinc-400 mb-2">/v1/chat/completions</div>
            <p className="text-zinc-300 leading-relaxed mb-3">
              Creates a chat completion. Compatible with the OpenAI Chat Completions API.
            </p>

            <h4 className="font-semibold text-sm mt-4 mb-2">Request Body</h4>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-zinc-800 text-left text-zinc-400">
                  <th className="py-2 pr-4 font-medium">Parameter</th>
                  <th className="py-2 pr-4 font-medium">Type</th>
                  <th className="py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {[
                  ['model', 'string', 'Model ID (required)'],
                  ['messages', 'array', 'Array of message objects with role and content (required)'],
                  ['stream', 'boolean', 'Enable streaming (default: false)'],
                  ['temperature', 'number', 'Sampling temperature (0-2)'],
                  ['max_tokens', 'integer', 'Maximum tokens to generate'],
                  ['top_p', 'number', 'Nucleus sampling parameter'],
                ].map(([p, t, d]) => (
                  <tr key={p} className="border-b border-zinc-800/50">
                    <td className="py-2 pr-4 font-mono text-xs">{p}</td>
                    <td className="py-2 pr-4 text-xs text-zinc-400">{t}</td>
                    <td className="py-2 text-xs">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <CodeBlock tabs={{
              curl: `curl https://api.cngreentk.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Explain quantum computing in one sentence."}
    ],
    "temperature": 0.7,
    "max_tokens": 200
  }'`,
              python: `response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in one sentence."},
    ],
    temperature=0.7,
    max_tokens=200,
)
print(response.choices[0].message.content)`,
              js: `const response = await client.chat.completions.create({
  model: "deepseek-chat",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain quantum computing in one sentence." },
  ],
  temperature: 0.7,
  max_tokens: 200,
});
console.log(response.choices[0].message.content);`,
            }} />

            <h4 className="font-semibold text-sm mt-4 mb-2">Response</h4>
            <CodeBlock tabs={{
              curl: `{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1749345600,
  "model": "deepseek-chat",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Quantum computing uses qubits..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 45,
    "total_tokens": 70
  }
}`,
            }} />
          </section>

          {/* Streaming */}
          <section id="streaming" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">Streaming</h2>
            <p className="text-zinc-300 leading-relaxed mb-3">
              Set <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm">stream: true</code> to receive
              Server-Sent Events (SSE) as the model generates tokens. Response headers include
              <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm">Content-Type: text/event-stream</code>.
            </p>
            <CodeBlock tabs={{
              python: `stream = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "Write a haiku about AI."}],
    stream=True,
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`,
              js: `const stream = await client.chat.completions.create({
  model: "deepseek-chat",
  messages: [{ role: "user", content: "Write a haiku about AI." }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`,
            }} />
          </section>

          {/* Anthropic API */}
          <section id="anthropic" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">
              <EndpointBadge method="POST" /> Anthropic Messages API
            </h2>
            <div className="font-mono text-sm text-zinc-400 mb-2">/v1/messages</div>
            <p className="text-zinc-300 leading-relaxed mb-3">
              For Claude Code and other Anthropic-compatible clients. Uses <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm">x-api-key</code> header instead of Bearer token.
            </p>
            <CodeBlock tabs={{
              curl: `curl https://api.cngreentk.com/v1/messages \\
  -H "x-api-key: sk-xxx" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-ai/DeepSeek-V3",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello, Claude!"}
    ]
  }'`,
              node: `// For Claude Code, set environment variable:
// ANTHROPIC_BASE_URL=https://api.cngreentk.com
// ANTHROPIC_API_KEY=sk-xxx`,
            }} />
          </section>

          {/* Usage */}
          <section id="usage" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">
              <EndpointBadge method="GET" /> Usage &amp; Quota
            </h2>
            <div className="font-mono text-sm text-zinc-400 mb-2">/my/usage</div>
            <p className="text-zinc-300 leading-relaxed mb-3">
              Check your current token usage and remaining quota.
            </p>
            <CodeBlock tabs={{
              curl: `curl https://api.cngreentk.com/my/usage \\
  -H "Authorization: Bearer sk-xxx"`,
            }} />
            <h4 className="font-semibold text-sm mt-4 mb-2">Response</h4>
            <CodeBlock tabs={{
              curl: `{
  "name": "Standard User",
  "used": 450000,
  "quota": 2000000,
  "enabled": true
}`,
            }} />
          </section>

          {/* Health Check */}
          <section id="health" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">
              <EndpointBadge method="GET" /> Health Check
            </h2>
            <div className="font-mono text-sm text-zinc-400 mb-2">/health</div>
            <CodeBlock tabs={{
              curl: `curl https://api.cngreentk.com/health`,
            }} />
          </section>

          {/* Error Codes */}
          <section id="errors" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">Error Codes</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left text-zinc-400">
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium">Meaning</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {[
                  ['200', 'Success'],
                  ['400', 'Bad request — check model name and parameters'],
                  ['401', 'Invalid or missing API key'],
                  ['403', 'API key disabled'],
                  ['429', 'Quota exceeded or rate limited'],
                  ['502', 'All upstream channels failed (circuit breaker may be open)'],
                ].map(([code, meaning]) => (
                  <tr key={code} className="border-b border-zinc-800/50">
                    <td className="py-2 pr-4 font-mono font-semibold">{code}</td>
                    <td className="py-2">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Rate Limits */}
          <section id="limits" className="mb-14">
            <h2 className="text-xl font-semibold mb-3">Rate Limits &amp; Caching</h2>
            <ul className="space-y-2 text-zinc-300 text-sm leading-relaxed">
              <li className="flex gap-2">
                <span className="text-emerald-400 mt-0.5">&#10003;</span>
                Admin endpoint (<code className="bg-zinc-800 px-1 py-0.5 rounded text-xs">/admin</code>): 5 requests per minute per IP.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400 mt-0.5">&#10003;</span>
                API endpoints: no hard rate limit, but quota applies per API key.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400 mt-0.5">&#10003;</span>
                Cache: identical requests served from memory cache for 5 minutes. Check
                <code className="bg-zinc-800 px-1 py-0.5 rounded text-xs">X-Cache: HIT</code> or
                <code className="bg-zinc-800 px-1 py-0.5 rounded text-xs">X-Cache: MISS</code> in response headers.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400 mt-0.5">&#10003;</span>
                Circuit breaker: if an upstream provider fails 3 consecutive times, it is automatically excluded for 5 minutes.
              </li>
            </ul>
          </section>

          {/* Powered by Badge */}
          <section id="badge" className="border-t border-zinc-800 pt-10">
            <h2 className="text-xl font-bold mb-4" id="powered-by">Powered by Green Token</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Add this badge to your site to show you&apos;re running on green energy. Copy the HTML snippet below.
            </p>

            {/* Badge Preview */}
            <div className="bg-zinc-800/50 rounded-xl p-6 mb-6 flex items-center justify-center">
              <a href="https://cngreentk.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/30 bg-zinc-900 hover:border-emerald-400/50 transition">
                <svg width="20" height="20" viewBox="0 0 32 32" className="shrink-0">
                  <circle cx="16" cy="16" r="14" fill="none" stroke="#34d399" strokeWidth="2"/>
                  <circle cx="16" cy="16" r="11" fill="#0f172a"/>
                  <path d="M16 24c-1-3-3-6-4-9 0-3 2-5 5-6 3-1 5 0 6 2-2 0-4 1-5 3s-1 5-2 10z" fill="#34d399"/>
                </svg>
                <span className="text-xs text-zinc-400">Powered by <span className="text-emerald-400 font-semibold">Green Token</span></span>
              </a>
            </div>

            {/* Code Snippet */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="px-4 py-2.5 bg-zinc-800/80 text-sm text-zinc-400 font-mono border-b border-zinc-700/50 flex items-center justify-between">
                HTML Embed
                <button
                  onClick={() => navigator.clipboard.writeText(document.getElementById('badge-code')?.textContent || '')}
                  className="text-xs px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition cursor-pointer"
                >
                  Copy
                </button>
              </div>
              <pre id="badge-code" className="p-4 text-xs text-zinc-300 overflow-x-auto font-mono leading-relaxed">
{`<a href="https://cngreentk.com" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:8px;border:1px solid rgba(52,211,153,0.3);background:#18181b;text-decoration:none;transition:border-color 0.2s">
  <svg width="20" height="20" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="none" stroke="#34d399" stroke-width="2"/>
    <circle cx="16" cy="16" r="11" fill="#0f172a"/>
    <path d="M16 24c-1-3-3-6-4-9 0-3 2-5 5-6 3-1 5 0 6 2-2 0-4 1-5 3s-1 5-2 10z" fill="#34d399"/>
  </svg>
  <span style="font-size:12px;color:#a1a1aa;font-family:system-ui,sans-serif">Powered by <span style="color:#34d399;font-weight:600">Green Token</span></span>
</a>`}
              </pre>
            </div>

            {/* Markdown version */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden mt-4">
              <div className="px-4 py-2.5 bg-zinc-800/80 text-sm text-zinc-400 font-mono border-b border-zinc-700/50">
                Markdown (for README)
              </div>
              <pre className="p-4 text-xs text-zinc-300 overflow-x-auto font-mono leading-relaxed">
{`[![Powered by Green Token](https://cngreentk.com/powered-by.svg)](https://cngreentk.com)`}
              </pre>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-zinc-800 pt-8 pb-4 text-sm text-zinc-500">
            <p>
              <a href="/" className="hover:text-zinc-300 transition">Home</a>
              <span className="mx-3">|</span>
              <a href="/en" className="hover:text-zinc-300 transition">Landing</a>
              <span className="mx-3">|</span>
              <a href="/dashboard" className="hover:text-zinc-300 transition">Dashboard</a>
              <span className="mx-3">|</span>
              <a href="mailto:admin@cngreentk.com" className="hover:text-zinc-300 transition">Contact</a>
              <span className="mx-3">|</span>
              <a href="https://discord.gg/tCsTAZhwaU" className="hover:text-zinc-300 transition text-green-400" target="_blank" rel="noopener noreferrer">Discord</a>
            </p>
            <p className="mt-1">&copy; {new Date().getFullYear()} Green Token. cngreentk.com</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
