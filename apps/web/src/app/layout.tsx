import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

// Variable font: all weights in one self-hosted file, subset to Latin
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Foundations",
    default:
      process.env.NEXT_PUBLIC_APP_NAME || "Vercel Academy Foundation - Web",
  },
  description: "VAF Web",
};

// Third-party scripts on every page. Each one is a cost, so each needs an owner and a loading strategy.
// - Analytics (@vercel/analytics): page views. Owner: Vercel. Loads after hydration.
// - SpeedInsights (@vercel/speed-insights): Core Web Vitals field data. Owner: Vercel. Loads after hydration.
// - GoogleAnalytics (@next/third-parties/google): GA4, only when NEXT_PUBLIC_GA_ID is set. Owner: Google, via Next.js. Loads after hydration.
// Production INP is monitored in the Vercel project's Speed Insights page (field data from real visitors).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={inter.variable}>
      <body className="container mx-auto bg-white px-4 py-8 text-gray-900 font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
