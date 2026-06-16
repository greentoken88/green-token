# Green Token 中文推广文案

---

## 小红书

**标题**: 做了个AI API网关，比OpenAI便宜10倍，用的还是绿电🌱

一个人花了两个月建了这个项目，昨天终于上线了👇

**Green Token — AI聚合API**

简单说就是：
- 一串Key → 16+个AI模型随便调（DeepSeek、通义千问、智谱GLM、豆包、Kimi 全有）
- 价格是OpenAI的1/10（$15=200万token，OpenAI要$150+）
- 服务器在西北风电/光伏机房，100%绿电认证 ⚡
- OpenAI格式直接兼容，改一行代码就行

**适合谁用？**
- 做AI产品的独立开发者
- 需要接多个模型对比效果的研究者
- Claude Code / Cursor / Copilot的省钱替代

**价格**：
- $5/月 → 50万token
- $15/月 → 200万token
- $30/月 → 500万token
- 🆓 免费试用 1万token，不用绑卡

**我的感受**：建这个项目最大的收获是——国内AI API其实已经很成熟了(DeepSeek/GLM/豆包)，但开发者要用就得一家一家注册。做个聚合网关把门槛降到0，反而成了刚需。

6月16号上Product Hunt，现在注册用 **PHLAUNCH** 多送5万token。

🔗 cngreentk.com
📖 文档: cngreentk.com/docs
💬 Discord: discord.gg/tCsTAZhwaU

#AI #独立开发 #出海 #AI工具 #绿色能源 #producthunt #buildinpublic

---

## LinkedIn — 第1篇：产品上线公告 (Day 1)

🚀 I launched an AI API gateway that costs 1/10th of OpenAI — and runs on wind energy.

After 2 months of solo building, **Green Token** is live: https://cngreentk.com

**The gist:**
One API key → 16+ AI models. Drop-in OpenAI replacement. Same SDK, same format, 10x cheaper.

**Why it's cheaper:**
Electricity. Our servers run on wind/solar farms in Northwest China, where power costs 5x less than US datacenters. We pass the savings through. Every API call is verified carbon-neutral.

**Pricing:**
- $5/mo → 500K tokens
- $15/mo → 2M tokens (OpenAI charges $150+ for that)
- $30/mo → 5M tokens
- Free 10K trial, no credit card

Launching on Product Hunt June 16. If you try it before then, use code **PHLAUNCH** for +50K bonus tokens.

Check it out: cngreentk.com

#AI #SaaS #BuildInPublic #IndieHacker #ProductHunt #GreenEnergy

*🔗 Links in comments*

---

## LinkedIn — 第2篇：技术架构 (Day 3-4) ✅ 已发 6/16

🧠 How I built a 45-model AI gateway on a $30/month box — and it launches on Product Hunt today.

**The core challenge:** 7 upstream AI providers, each with different reliability profiles. DeepSeek might hiccup, GLM could be slow, SiliconFlow might return errors. Users expect 99%+ uptime.

**What we built:**

1️⃣ **Smart Router** — scores each channel by recent latency + success count. The fastest, most reliable provider gets traffic. Every 30 seconds, we probe /models on each channel.

2️⃣ **Circuit Breaker** — 3 consecutive fails on a channel → auto trip for 5 minutes. Traffic silently flows to healthy providers. Users never notice.

3️⃣ **Response Cache** — LRU map, 1000 entries, 5-min TTL. Repeated identical requests get `X-Cache: HIT` with <10ms response. Saves tokens AND latency.

4️⃣ **Dual Protocol** — OpenAI Chat Completions + Anthropic Messages API on the same gateway. Claude Code just works by pointing it to cngreentk.com.

5️⃣ **Content Safety** — 9 regex rules for input/output filtering before any token hits an upstream model.

**Stack:** Express.js, in-memory Maps (no Redis needed at this scale), JSON file persistence, file-based usage logging.

The whole thing runs on a 2-core Alibaba Cloud box. No serverless, no orchestration — just Node.js and a dream.

🚀 Today is Product Hunt launch day. Check it out + the API docs — links in comments 👇

#AI #Engineering #Backend #SystemDesign #IndieDev #APIGateway #ProductHunt #BuildInPublic

*🔗 Links in comments*

---

## LinkedIn — 第3篇：信任透明体系上线 (PH Launch Day) ✅ 已发 6/17 (实际)

🔒 We just shipped 5 new pages in a single day. Not blog posts — fully functional tools. Here's the trust & transparency stack that went live on Product Hunt launch day:

**1. /status — Real-Time Channel Health**
7 upstream providers, 45 models, live. Every channel shows latency, success rate, circuit breaker status. Auto-refreshes every 30s. No auth required — anyone can verify our uptime.

**2. /green — Green Energy Proof**
Where our power comes from, how much CO₂ we've saved, the math behind it. 0.48g CO₂ saved per 1K tokens vs grid power. Trees-equivalent counter. Badge embed code for your README.

**3. /trust — Compliance Center**
Content safety rules table, data residency commitment (100% China, zero cross-border), registered model registry with MIIT algorithm filing numbers, security architecture overview, compliance timeline.

**4. /compare — Competitive Intelligence**
Side-by-side: Green Token vs OpenAI vs OpenRouter vs DeepSeek vs hohoapi. Pricing, models, features, green energy — all in one table. We built this because we want users to make informed decisions, even if they don't choose us.

**5. /creators — Douyin Affiliate Program**
20% recurring commission, content templates for token科普 videos, earnings calculator. The first AI API affiliate program purpose-built for Chinese tech content creators.

**Why this matters:**
Most API startups hide behind "trust us." We built pages that say "verify us." Every X-Green-Energy response header. Every public status endpoint. Every documented content safety rule.

Progress: 48/54 → 89% of our launch plan. And Product Hunt is live today.

→ cngreentk.com
→ /status /green /trust /compare /creators

#BuildInPublic #Transparency #DevTools #AI #GreenTech #APIGateway #ProductHunt #SaaS

*🔗 Links in first comment*
