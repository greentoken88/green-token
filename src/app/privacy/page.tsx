export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-emerald-400 hover:underline text-sm mb-6 inline-block">← Back to Home</a>
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-zinc-400 mb-10">Last updated: June 8, 2026</p>

        <section className="space-y-8 text-zinc-300 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>When you use Green Token, we collect minimal information to provide our service:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>API Key & usage data:</strong> token consumption, request timestamps, model names — used for billing and quota enforcement.</li>
              <li><strong>API request content:</strong> messages you send to the AI models are processed in real-time and <strong>not stored</strong> after the response is returned. We do not log or retain your chat messages.</li>
              <li><strong>Payment information:</strong> processed by PayPal. We do not receive or store your credit card or bank details.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">2. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>To authenticate API requests and enforce rate limits & quotas.</li>
              <li>To display usage statistics on your dashboard.</li>
              <li>To improve our routing and caching algorithms (aggregate metrics only, never message content).</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">3. Data Storage & Retention</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>API keys and usage counters are stored on our servers for the lifetime of your account.</li>
              <li>Chat message content is processed ephemerally — it passes through our gateway to the upstream AI provider and is <strong>not persisted</strong>.</li>
              <li>Logs contain only metadata (timestamp, model, token count, user ID) — no message content.</li>
              <li>You may request account deletion at any time by emailing admin@cngreentk.com.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">4. Content Safety Filtering</h2>
            <p className="text-sm">We run automated content safety checks on API requests to block illegal and harmful content (violence, CSAM, terrorism, self-harm). Blocked requests return an error and are not forwarded to AI providers.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">5. Third-Party Services</h2>
            <p className="text-sm">Your API requests are forwarded to third-party AI model providers (SiliconFlow, DeepSeek, Alibaba Cloud Bailian) for inference. Their privacy policies apply to the processing of your request content. We only share the minimum data needed to fulfill your API call.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">6. Cookies</h2>
            <p className="text-sm">Our website uses minimal cookies for PayPal integration. We do not use tracking cookies or analytics scripts. No cookie consent banner is needed under GDPR for these essential cookies.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">7. Your Rights (GDPR)</h2>
            <p className="text-sm">If you are in the EU/EEA, you have the right to access, rectify, or delete your personal data, and to restrict or object to processing. Contact admin@cngreentk.com to exercise these rights. We respond within 30 days.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">8. Data Security</h2>
            <p className="text-sm">All API traffic is encrypted via HTTPS (TLS 1.3). Our servers use firewall restrictions and SSH key-only access. We regularly apply security updates.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">9. Changes to This Policy</h2>
            <p className="text-sm">We may update this policy. Material changes will be announced on our website. Continued use after changes constitutes acceptance.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">10. Contact</h2>
            <p className="text-sm">
              Email: <a href="mailto:admin@cngreentk.com" className="text-emerald-400 hover:underline">admin@cngreentk.com</a><br />
              Website: cngreentk.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
