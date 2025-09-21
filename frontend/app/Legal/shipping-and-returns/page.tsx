// app/legal/shipping-and-returns/page.tsx

import React from "react";

export const metadata = {
  title: "Shipping and Returns | Aventrek",
  description: "Learn about our shipping policies and return procedures at Aventrek.",
};

export default function ShippingAndReturnsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Shipping and Returns</h1>

      <p className="mb-4 text-sm text-gray-500">Last updated: September 20, 2025</p>

      <section className="space-y-6 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold">Shipping Policy</h2>
        <p>
          At <strong>Aventrek</strong>, we are committed to delivering your orders promptly and efficiently. Below are the details of our shipping policies:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Processing Time:</strong> Orders are typically processed within 1-2 business days after payment confirmation.
          </li>
          <li>
            <strong>Shipping Methods:</strong> We partner with reliable carriers such as UPS, FedEx, and USPS to ensure timely delivery.
          </li>
          <li>
            <strong>Shipping Costs:</strong> Shipping fees are calculated at checkout based on order weight, dimensions, and destination.
          </li>
          <li>
            <strong>Delivery Time:</strong> Estimated delivery times vary by carrier and destination. Domestic orders typically arrive within 3-7 business days.
          </li>
          <li>
            <strong>International Shipping:</strong> We offer international shipping to select countries. Customs duties, taxes, and fees are the responsibility of the customer.
          </li>
          <li>
            <strong>Order Tracking:</strong> Once shipped, you will receive a tracking number to monitor your shipment.
          </li>
          <li>
            <strong>Lost or Damaged Shipments:</strong> Please contact us immediately if your order is lost or arrives damaged.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Return Policy</h2>
        <p>
          We want you to be fully satisfied with your purchase from Aventrek. If you need to return an item, please review our return guidelines below:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Eligibility:</strong> Returns are accepted within 30 days of delivery for unused, unopened, and undamaged products.
          </li>
          <li>
            <strong>Non-Returnable Items:</strong> Certain items such as custom orders, special tools, and hazardous materials may not be eligible for return.
          </li>
          <li>
            <strong>Return Process:</strong> Contact our customer support at <a href="mailto:support@aventrek.com" className="text-blue-600 hover:underline">support@aventrek.com</a> to initiate a return. Provide your order number and reason for return.
          </li>
          <li>
            <strong>Return Shipping:</strong> Customers are responsible for return shipping costs unless the return is due to a defect or shipping error.
          </li>
          <li>
            <strong>Refunds:</strong> Refunds will be issued to the original payment method after we receive and inspect the returned item. Processing may take 7-10 business days.
          </li>
          <li>
            <strong>Exchanges:</strong> Exchanges are handled as returns followed by a new purchase.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
        <p>
          For questions regarding shipping or returns, please contact our support team:
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
