export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-emerald-400 hover:underline text-sm mb-6 inline-block">← Back to Home</a>
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-zinc-400 mb-10">Last updated: June 8, 2026</p>

        <section className="space-y-8 text-zinc-300 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p className="text-sm">By accessing or using Green Token (&ldquo;the Service&rdquo;) at cngreentk.com, you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">2. Description of Service</h2>
            <p className="text-sm">Green Token is an AI API aggregation gateway. We provide API access to third-party large language models (DeepSeek, Qwen, Kimi, GLM, and others) through a unified OpenAI-compatible interface. Users purchase API access plans and receive an API key to make requests.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">3. User Accounts & API Keys</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>You are responsible for keeping your API key confidential. Any activity under your key is your responsibility.</li>
              <li>You may not share, resell, or redistribute your API key without explicit written permission.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">4. Acceptable Use</h2>
            <p className="text-sm">You agree NOT to use the Service for:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
              <li>Generating illegal, harmful, or abusive content (violence, CSAM, terrorism, hate speech).</li>
              <li>Building products that violate applicable laws or regulations.</li>
              <li>Attempting to reverse-engineer, bypass rate limits, or disrupt the Service.</li>
              <li>Spam, phishing, fraud, or deceptive activities.</li>
              <li>Any activity that violates the acceptable use policies of our upstream AI providers.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">5. Content Safety</h2>
            <p className="text-sm">We operate automated content safety filters. Requests that trigger these filters will be blocked. We do not monitor or read your messages; filtering is automated and applies to prohibited content categories only. Attempting to circumvent content filters is a violation of these terms.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">6. Payment & Refunds</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Plans are billed monthly via PayPal. Prices are listed in USD on our pricing page.</li>
              <li>Token quotas reset at the start of each billing cycle. Unused tokens do not roll over.</li>
              <li>Refund requests are handled on a case-by-case basis. Contact admin@cngreentk.com within 7 days of purchase.</li>
              <li>If your API key is terminated for violating these terms, you are not entitled to a refund.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">7. Service Availability</h2>
            <p className="text-sm">We strive for high availability but do not guarantee uninterrupted service. The Service may be temporarily unavailable due to maintenance, upstream provider outages, or circumstances beyond our control. We are not liable for damages resulting from service interruptions.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">8. Limitation of Liability</h2>
            <p className="text-sm">THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, GREEN TOKEN SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY IS LIMITED TO THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">9. Intellectual Property</h2>
            <p className="text-sm">You retain ownership of the content you submit to the API. We claim no ownership over your inputs or the AI-generated outputs. Our gateway software, website, and branding are our intellectual property.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">10. Termination</h2>
            <p className="text-sm">You may stop using the Service at any time. We may suspend or terminate your access for violation of these terms, with or without notice. Upon termination, your API key will be deactivated and any remaining quota is forfeited.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">11. Changes to Terms</h2>
            <p className="text-sm">We may modify these terms. Material changes will be announced on our website at least 14 days before taking effect. Continued use after changes constitutes acceptance.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">12. Governing Law</h2>
            <p className="text-sm">These terms are governed by the laws of the People&rsquo;s Republic of China. Any disputes shall be resolved through friendly negotiation first, and failing that, through the courts of the defendant&rsquo;s domicile.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">13. Contact</h2>
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
