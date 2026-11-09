// Marketing section layout: header, footer, nav
// (marketing) is a route group - doesn't affect URL structure
// Routes: /, /about, /pricing (NOT /marketing/about)
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Marketing header - persists across all marketing pages */}
      <header className="mb-8 border-b py-4">
        <nav className="flex gap-4">
          <Link href="/" className="font-semibold">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          {/* Link to dashboard (different layout) */}
          <Link
            href="/dashboard"
            className="ml-auto text-blue-600 hover:text-blue-800"
          >
            Dashboard →
          </Link>
        </nav>
      </header>

      {/* Page content renders here */}
      <main>{children}</main>

      {/* Marketing footer - persists across all marketing pages */}
      <footer className="mt-8 border-t py-4 text-gray-500 text-sm">
        © 2026 Next.js Foundations
      </footer>
    </div>
  );
}
