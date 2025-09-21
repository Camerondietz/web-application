// app/legal/sitemap/page.tsx

import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Sitemap | Aventrek",
  description: "Quick access to all important pages on Aventrek's website.",
};

export default function SitemapPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Sitemap</h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">Main Pages</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-blue-600 hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-blue-600 hover:underline">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/account" className="text-blue-600 hover:underline">
                Account
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Legal</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <Link href="/legal/terms-of-access" className="text-blue-600 hover:underline">
                Terms of Access
              </Link>
            </li>
            <li>
              <Link href="/legal/terms-of-sale" className="text-blue-600 hover:underline">
                Terms of Sale
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/legal/shipping-and-returns" className="text-blue-600 hover:underline">
                Shipping and Returns
              </Link>
            </li>
            <li>
              <Link href="/legal/sitemap" className="text-blue-600 hover:underline">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Resources</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <Link href="/blog" className="text-blue-600 hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-blue-600 hover:underline">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
