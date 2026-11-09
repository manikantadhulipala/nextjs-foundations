import type { Metadata } from "next";

import "./globals.css";

import { ThemeScript } from "@/components/theme-script";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Foundations",
    default:
      process.env.NEXT_PUBLIC_APP_NAME || "Vercel Academy Foundation - Web",
  },
  description: "VAF Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="container mx-auto bg-white px-4 py-8 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>
        {children}
        {/* TODO: Replace this hand-rolled integration in Section 4 Lesson 3. */}
        {gaId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
