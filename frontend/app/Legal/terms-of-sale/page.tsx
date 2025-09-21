// app/legal/terms-of-sale/page.tsx

import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Sale | Aventrek",
  description: "Read the terms and conditions governing the sale of products on Aventrek.",
};

export default function TermsOfSalePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Terms of Sale</h1>

      <p className="mb-4 text-sm text-gray-500">
        Last updated: September 20, 2025
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          These Terms of Sale (“Terms”) govern your purchase of products from Aventrek through the website{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            www.aventrek.com
          </Link>
          . By placing an order, you agree to be bound by these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8">1. Orders and Acceptance</h2>
        <p>
          All orders placed through the Site are subject to acceptance by Aventrek. We reserve the right to refuse or cancel any order for reasons including product unavailability, errors in pricing or product information, or suspicion of fraudulent activity.
        </p>

        <h2 className="text-xl font-semibold mt-8">2. Pricing and Payment</h2>
        <p>
          Prices displayed on the Site are subject to change without notice. All payments must be made in full at the time of purchase via the payment methods offered. You agree to provide accurate payment information.
        </p>

        <h2 className="text-xl font-semibold mt-8">3. Shipping and Delivery</h2>
        <p>
          Shipping costs and estimated delivery times are provided at checkout. Aventrek is not responsible for delays caused by carriers or circumstances beyond our control. Risk of loss and title pass to you upon delivery to the carrier.
        </p>

        <h2 className="text-xl font-semibold mt-8">4. Returns and Refunds</h2>
        <p>
          Returns are accepted in accordance with Aventrek’s <Link href="/return-policy" className="text-blue-600 hover:underline">Return Policy</Link>. Please review the policy carefully before making a purchase.
        </p>

        <h2 className="text-xl font-semibold mt-8">5. Product Warranty</h2>
        <p>
          Products are covered by the manufacturer’s warranty unless otherwise specified. Aventrek disclaims all other warranties, express or implied, including merchantability and fitness for a particular purpose.
        </p>

        <h2 className="text-xl font-semibold mt-8">6. Limitation of Liability</h2>
        <p>
          Aventrek shall not be liable for any incidental, consequential, or special damages arising from the sale or use of the products, to the fullest extent permitted by law.
        </p>

        <h2 className="text-xl font-semibold mt-8">7. Title and Risk of Loss</h2>
        <p>
          Title and risk of loss pass to you upon delivery of the products to the carrier.
        </p>

        <h2 className="text-xl font-semibold mt-8">8. Taxes</h2>
        <p>
          You are responsible for all applicable taxes, duties, and customs fees associated with your purchase.
        </p>

        <h2 className="text-xl font-semibold mt-8">9. Governing Law</h2>
        <p>
          These Terms shall be governed by the laws of the State of Texas without regard to conflict of law provisions. Disputes shall be resolved exclusively in the state or federal courts located in Travis County, Texas.
        </p>

        <h2 className="text-xl font-semibold mt-8">10. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Sale, please contact us at:
        </p>
        <ul className="list-disc pl-6">
          <li>Email: <a href="mailto:support@aventrek.com" className="text-blue-600 hover:underline">support@aventrek.com</a></li>
          <li>Phone: +1 (512) 298-1892</li>
          <li>Mailing Address: </li>
        </ul>
      </section>
    </main>
  );
}
