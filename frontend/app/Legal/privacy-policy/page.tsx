// app/legal/privacy-policy/page.tsx

import React from "react";

export const metadata = {
  title: "Privacy Policy | Aventrek",
  description: "Learn how Aventrek collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-sm text-gray-500">Last updated: September 20, 2025</p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          At <strong>Aventrek</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website{" "}
          <a href="https://www.aventrek.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            www.aventrek.com
          </a>{" "}
          and use our services.
        </p>

        <h2 className="text-xl font-semibold mt-8">1. Information We Collect</h2>
        <p>
          We may collect the following types of personal information:
        </p>
        <ul className="list-disc pl-6">
          <li>Contact information such as your name, email address, mailing address, and phone number.</li>
          <li>Account details when you register or place an order.</li>
          <li>Payment information (processed securely by third-party payment processors).</li>
          <li>Browsing and usage data collected via cookies and similar technologies.</li>
          <li>Communications you send to us, including customer support inquiries.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">2. How We Use Your Information</h2>
        <p>
          We use your information to:
        </p>
        <ul className="list-disc pl-6">
          <li>Process and fulfill orders, including shipping and billing.</li>
          <li>Communicate with you regarding your account, orders, and support.</li>
          <li>Improve our website, products, and services.</li>
          <li>Send you promotional materials and offers, with your consent.</li>
          <li>Comply with legal obligations and prevent fraudulent activities.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">3. Cookies and Tracking Technologies</h2>
        <p>
          Aventrek uses cookies and similar tracking technologies to enhance your experience, analyze site traffic, and provide personalized content. You can control cookie preferences through your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-8">4. Sharing Your Information</h2>
        <p>
          We do not sell your personal information. We may share your information with trusted third parties who assist us in operating the Site, fulfilling orders, and providing services, subject to confidentiality agreements. Examples include:
        </p>
        <ul className="list-disc pl-6">
          <li>Payment processors</li>
          <li>Shipping carriers</li>
          <li>Customer support platforms</li>
        </ul>
        <p>
          We may also disclose your information when required by law or to protect our rights.
        </p>

        <h2 className="text-xl font-semibold mt-8">5. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction. However, no online transmission is 100% secure.
        </p>

        <h2 className="text-xl font-semibold mt-8">6. Your Rights and Choices</h2>
        <p>
          Depending on your jurisdiction, you may have rights including:
        </p>
        <ul className="list-disc pl-6">
          <li>Accessing and correcting your personal data.</li>
          <li>Opting out of marketing communications.</li>
          <li>Requesting deletion of your personal data, subject to legal obligations.</li>
        </ul>
        <p>
          To exercise your rights, please contact us using the information below.
        </p>

        <h2 className="text-xl font-semibold mt-8">7. Children’s Privacy</h2>
        <p>
          The Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
        </p>

        <h2 className="text-xl font-semibold mt-8">8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Changes will be posted here with an updated “Last updated” date. We encourage you to review this policy regularly.
        </p>

        <h2 className="text-xl font-semibold mt-8">9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or your data, please contact us:
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
