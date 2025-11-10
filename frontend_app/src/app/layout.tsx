import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recipe Explorer",
  description:
    "Browse, search, and view beautiful recipes with an Ocean Professional theme.",
  applicationName: "Recipe Explorer",
  creator: "Recipe Explorer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell" suppressHydrationWarning>
        <header
          className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-black/5"
          role="banner"
        >
          <div className="container-px mx-auto">
            <nav
              className="flex items-center gap-4 py-3"
              aria-label="Global Navigation"
            >
              <Link
                href="/"
                className="flex items-center gap-2 focus-ring rounded-md"
                aria-label="Go to home"
              >
                <span
                  className="inline-block h-8 w-8 rounded-md"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(37,99,235,1) 0%, rgba(59,130,246,1) 70%)",
                  }}
                  aria-hidden="true"
                />
                <span className="text-lg font-semibold text-[var(--color-text)]">
                  Recipe Explorer
                </span>
              </Link>
              <div className="ml-auto flex items-center gap-3">
                <a
                  href="#content"
                  className="sr-only focus:not-sr-only focus-ring rounded-md px-2 py-1 bg-white"
                >
                  Skip to content
                </a>
                <span className="hidden sm:inline text-sm text-gray-600">
                  Ocean Professional
                </span>
              </div>
            </nav>
          </div>
        </header>
        <div className="container-px mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 py-6" id="content">
          <aside className="hidden lg:block">
            <div className="card p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Filters
              </h2>
              <p className="text-sm text-gray-500">
                Use the sidebar on large screens to refine results.
              </p>
            </div>
          </aside>
          <main className="min-h-[70vh]" role="main">{children}</main>
        </div>
        <footer className="mt-auto border-t border-black/5 bg-white/60">
          <div className="container-px mx-auto py-6 text-sm text-gray-600">
            <p>
              Built with{" "}
              <span className="font-medium" style={{ color: "var(--color-primary)" }}>
                Ocean Professional
              </span>{" "}
              theme. Accessible, responsive, and fast.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
