import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-px mx-auto py-10">
      <section className="card p-8 text-center" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold text-gray-900">404 – Page Not Found</h1>
        <p className="text-gray-600 mt-2">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="inline-block mt-5 px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Go Home
        </Link>
      </section>
    </main>
  );
}
