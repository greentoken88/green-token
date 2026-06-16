<p align="center">
  <img src="public/icon.svg" width="80" alt="Green Token Logo" />
</p>

<h1 align="center">Green Token</h1>
<p align="center"><strong>5x Cheaper, 100% Greener</strong> — One API Key for 16+ AI Models</p>

<p align="center">
  <a href="https://cngreentk.com"><strong>cngreentk.com</strong></a> ·
  <a href="https://cngreentk.com/docs"><strong>API Docs</strong></a> ·
  <a href="https://discord.gg/Sb3AfF8M"><strong>Discord</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/models-45%2B-emerald" alt="45+ Models" />
  <img src="https://img.shields.io/badge/price-10x%20cheaper%20than%20OpenAI-emerald" alt="10x Cheaper" />
  <img src="https://img.shields.io/badge/energy-100%25%20renewable-emerald" alt="100% Green" />
  <img src="https://img.shields.io/badge/status-public%20beta-emerald" alt="Public Beta" />
</p>

---

## What is Green Token?

Green Token is an **AI API gateway** that aggregates 45+ large language models from 7 providers behind a single, OpenAI-compatible endpoint. One API key gives you access to DeepSeek, Qwen, Kimi, GLM, Doubao, MiniMax, and more — at 1/10th the cost of OpenAI. Every API call runs on verified renewable energy from wind and solar farms in Northwest China.

```bash
# Your existing OpenAI code. One URL change.
curl https://api.cngreentk.com/v1/chat/completions \
  -H "Authorization: Bearer sk-your-key" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello!"}]}'
```

## Why Green Token?

| | OpenAI | Green Token |
|---|---|---|
| **Cost per 2M tokens** | ~$150 | **$15** |
| **Models** | GPT only | 45+ from 7 providers |
| **Energy** | Mixed grid | **100% verified renewable** |
| **Failover** | None | Automatic across 3 providers |
| **Caching** | None | 5-min LRU cache |
| **SDK change** | — | Zero. Same OpenAI SDK. |

## Available Models

| Model | Provider | Context | Best For |
|-------|----------|---------|----------|
| `deepseek-chat` | DeepSeek | 128K | General purpose, coding |
| `deepseek-v4-flash` | DeepSeek | 128K | Fast responses |
| `qwen3-235b-a22b` | Qwen (SiliconFlow) | 128K | Complex reasoning |
| `Qwen/Qwen3-235B-A22B` | Qwen (Bailian) | 128K | Enterprise workloads |
| `kimi-k2` | Kimi (SiliconFlow) | 128K | Long-form content |
| `glm-4.6` | GLM (SiliconFlow) | 128K | Chinese/English bilingual |
| `doubao-1.5-pro` | Doubao | 128K | Creative writing |
| `minimax-m1` | MiniMax | 128K | Multimodal understanding |

Full model list: [cngreentk.com/docs](https://cngreentk.com/docs)

## Quick Start

### 1. Get an API Key

Visit [cngreentk.com#pricing](https://cngreentk.com#pricing) and choose a plan:
- **Starter** — $5/mo, 500K tokens
- **Standard** — $15/mo, 2M tokens (Most Popular)
- **Pro** — $30/mo, 5M tokens

Pay with card (Stripe) and your key appears instantly.

### 2. Use the OpenAI SDK

**Python**
```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key-here",
    base_url="https://api.cngreentk.com/v1",
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "Explain quantum computing in 3 sentences."}],
)
print(response.choices[0].message.content)
```

**JavaScript / TypeScript**
```ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-your-key-here",
  baseURL: "https://api.cngreentk.com/v1",
});

const resp = await client.chat.completions.create({
  model: "deepseek-chat",
  messages: [{ role: "user", content: "Explain quantum computing in 3 sentences." }],
});
console.log(resp.choices[0].message.content);
```

**Claude Code** (via `apiKeyHelper`)
```json
{
  "apiKeyHelper": "echo sk-your-key-here",
  "baseURL": "https://api.cngreentk.com"
}
```

## Architecture

```
You (OpenAI SDK / Claude Code / Cursor)
   │
   ▼
api.cngreentk.com/v1  (Nginx → Node.js Gateway v3.2)
   │
   ├─ Smart Route ──── DeepSeek · SiliconFlow · Bailian · Doubao
   ├─ Load Balance ─── MiniMax · Zhipu · OpenAI-compatible
   └─ Fallback ────── Auto circuit-breaker across 7 providers
   │
   ├─ LRU Cache (1000 entries, 5min TTL)
   ├─ Circuit Breaker (3 fails → 5min cooldown)
   ├─ Health Check (every 30s)
   ├─ Content Safety (9 regex rules, input/output)
   └─ Green Energy (X-Green-Energy header, verified renewable)
```

### Gateway Features

- **Smart Routing**: Real-time latency + success rate scoring per provider
- **Circuit Breaker**: 3 consecutive failures → 5-minute cooldown per provider
- **Response Cache**: LRU cache with `X-Cache: HIT/MISS` response headers
- **True Streaming**: SSE passthrough with accurate token counting (`usage` extraction)
- **Content Safety**: Input/output filtering (9 regex rules covering NSFW/violence/separatism)
- **Rate Limiting**: `/admin` endpoint protected (5 req/min per IP)
- **Dual Payment**: Stripe Checkout + PayPal with webhook key auto-generation and delivery
- **Self-Serve Registration**: Email-based instant free trial key (10K tokens, no card)
- **Affiliate System**: 20% recurring + 10% second-tier, custom creator codes, commission dashboard
- **Green Energy**: Every response includes `X-Green-Energy` header; verified wind/solar power
- **Transparency Suite**: Public status page, trust center, competitive comparison, green energy proof

## This Repository

This repo contains the **Green Token landing page and documentation site**, built with:

- **Next.js 15** (App Router, static export)
- **Tailwind CSS** (emerald color scheme)
- **Stripe.js** (client-side payment integration)

The API gateway backend is documented at [cngreentk.com/docs](https://cngreentk.com/docs).

### Run Locally

```bash
git clone https://github.com/greentoken88/green-token.git
cd green-token

npm install
npm run dev
# → http://localhost:3000
```

For static export:
```bash
npm run build
# → /out directory ready for any static hosting
```

## Pricing Transparency

We believe in transparent pricing. Our cost advantage comes from:

1. **Energy costs 5x lower** in Northwest China's renewable energy zones
2. **Multi-provider routing** picks the cheapest available model for each request
3. **5-minute cache** eliminates duplicate API call costs
4. **Lean operations** — small team with near-zero overhead

No VC markup. No hidden fees. Cancel anytime.

## Roadmap

Progress: **49/54** steps complete (91%).

- [x] Smart routing with circuit breaker
- [x] LRU response cache
- [x] Stripe payment integration
- [x] PayPal integration (sandbox tested, live)
- [x] Self-serve registration (instant free trial keys)
- [x] Brand & landing page (emerald design system)
- [x] API documentation (10 chapters, multi-language examples)
- [x] Discord community
- [x] Affiliate/referral system (20%+10% two-tier, creator codes)
- [x] Additional providers — Zhipu GLM, MiniMax, Doubao (45 models, 7 providers)
- [x] Content safety filtering (9 regex rules, input/output)
- [x] Reddit/HN community launch (r/SideProject, r/SaaS, r/webdev)
- [x] Product Hunt launch (June 16, 2026)
- [x] Green energy proof page & carbon visualization
- [x] Trust center & compliance hub
- [x] API status page (live channel health)
- [x] Competitive intelligence (/compare)
- [x] Douyin creator affiliate program
- [x] SEO optimization (sitemap, structured data, TDK)
- [x] LinkedIn developer outreach (3 posts)
- [x] Privacy Policy & Terms of Service
- [x] GDPR compliance (cookie consent, DELETE /v1/my-data)
- [x] Server security hardening (UFW, SSH key-only, rate limiting)
- [x] HTTPS (Let's Encrypt + auto-renewal)
- [ ] Usage dashboard for users
- [ ] Company registration & compliance
- [ ] Official reseller authorization from AI providers
- [ ] Server upgrade (2C2G → 4C8G)

## Community

- **Discord**: [discord.gg/Sb3AfF8M](https://discord.gg/Sb3AfF8M)
- **Email**: admin@cngreentk.com
- **Website**: [cngreentk.com](https://cngreentk.com)

## Contributing

Green Token is in early public beta. We welcome:

- Bug reports and feature requests via GitHub Issues
- Documentation improvements via PRs
- Model performance feedback in Discord
- Ideas for new model integrations

## License

MIT © 2026 Green Token

---

<p align="center">
  <sub>⚡ Powered by wind, sun, and open source.</sub>
</p>
