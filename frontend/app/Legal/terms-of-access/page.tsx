// app/legal/terms-of-access/page.tsx

import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Access | Aventrek",
  description: "Read the terms and conditions of using the Aventrek website and services.",
};

export default function TermsOfAccessPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Terms of Access</h1>

      <p className="mb-4 text-sm text-gray-500">
        Last updated: September 19, 2025
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Welcome to <strong>Aventrek</strong>. These Terms of Access (“Terms”) govern your access to and use of the Aventrek website located at{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            www.aventrek.com
          </Link>{" "}
          and any related services (collectively, the “Site”). By accessing, browsing, or using the Site, you agree to be bound by these Terms and all applicable laws.
        </p>

        <h2 className="text-xl font-semibold mt-8">1. Acceptance of Terms</h2>
        <p>
          By using this Site, you acknowledge that you have read, understood, and agree to these Terms. If you do not agree, do not use the Site. Aventrek reserves the right to update or modify these Terms at any time without prior notice.
        </p>

        <h2 className="text-xl font-semibold mt-8">2. Authorized Use</h2>
        <p>
          You may use the Site solely for lawful purposes related to researching, purchasing, or managing industrial products offered by Aventrek. Any unauthorized use—including but not limited to scraping, data mining, or reverse engineering—is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold mt-8">3. User Accounts and Security</h2>
        <p>
          If you create an account, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Aventrek reserves the right to suspend or terminate accounts suspected of unauthorized use or fraudulent behavior.
        </p>

        <h2 className="text-xl font-semibold mt-8">4. Intellectual Property</h2>
        <p>
          All content on the Site—including but not limited to text, product descriptions, graphics, logos, and software—is the property of Aventrek or its licensors and is protected by intellectual property laws. You may not copy, reproduce, or distribute any portion of the Site without express written consent.
        </p>

        <h2 className="text-xl font-semibold mt-8">5. Product Information & Availability</h2>
        <p>
          Product availability, specifications, pricing, and delivery times are subject to change without notice. Aventrek makes every effort to ensure accuracy but does not guarantee that product descriptions or other content is error-free.
        </p>

        <h2 className="text-xl font-semibold mt-8">6. Disclaimers</h2>
        <p>
          The Site and its content are provided on an “as-is” and “as-available” basis. Aventrek makes no warranties, express or implied, including warranties of merchantability or fitness for a particular purpose. Aventrek does not warrant that the Site will be uninterrupted or error-free.
        </p>

        <h2 className="text-xl font-semibold mt-8">7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Aventrek shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use the Site.
        </p>

        <h2 className="text-xl font-semibold mt-8">8. Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites. Aventrek is not responsible for the content, accuracy, or practices of those sites and does not endorse them.
        </p>

        <h2 className="text-xl font-semibold mt-8">9. Termination</h2>
        <p>
          Aventrek may terminate or restrict your access to the Site at any time, with or without notice, for any conduct that Aventrek believes violates these Terms or is harmful to other users or the business interests of Aventrek.
        </p>

        <h2 className="text-xl font-semibold mt-8">10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law principles. Any legal action shall be brought in the state or federal courts located in Travis County, Texas.
        </p>

        <h2 className="text-xl font-semibold mt-8">11. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding these Terms, please contact us at:
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
