import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Green Token — Cheapest AI API, Powered by Green Energy",
    template: "%s | Green Token",
  },
  description:
    "One API key for DeepSeek, Qwen, Kimi, GLM and 16+ AI models. 10x cheaper than OpenAI, 100% green energy powered. OpenAI-compatible API. Start in 30 seconds.",
  keywords: [
    "AI API",
    "cheap AI API",
    "DeepSeek API",
    "Qwen API",
    "Kimi API",
    "GLM API",
    "green AI",
    "OpenAI alternative",
    "AI gateway",
    "renewable energy AI",
    "cheap LLM API",
    "AI model aggregation",
  ],
  authors: [{ name: "Green Token" }],
  creator: "Green Token",
  publisher: "Green Token",
  metadataBase: new URL("https://cngreentk.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    siteName: "Green Token",
    title: "Green Token — Cheapest AI API, Powered by Green Energy",
    description:
      "One API key for 16+ AI models. 10x cheaper than OpenAI, 100% renewable energy. Drop-in OpenAI replacement.",
    url: "https://cngreentk.com",
    locale: "en_US",
    images: [
      {
        url: "https://cngreentk.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Green Token — Cheap AI, Green Energy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Token — Cheapest AI API",
    description:
      "One API key for 16+ AI models. 10x cheaper than OpenAI, 100% renewable energy.",
    images: ["https://cngreentk.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
