import type { Metadata } from 'next';

import './globals.css';

// Base URL for absolute metadata (images, canonical). Vercel sets VERCEL_URL without a protocol.
const siteBase = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3001';

export const metadata: Metadata = {
  metadataBase: new URL(siteBase),
  title: {
    template: '%s | VAF Blog',
    default: 'Vercel Academy Foundation - Blog',
  },
  description: 'Articles and tutorials from the VAF team',
  openGraph: {
    siteName: 'VAF Blog',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto px-4 py-8">{children}</body>
    </html>
  );
}
