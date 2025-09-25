import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OSI Model",
  description: "Explanation of the OSI layers and their functions.",
  keywords: [
    "OSI Model",
    "Networking Layers",
    "OSI Layers",
    "Network Architecture",
    "OSI Functions",
  ],
  openGraph: {
    title: "OSI Model",
    description: "Explore the OSI model layers and their functions in networking.",
    type: "article",
    url: "https://yourwebsite.com/resources/learn/networking/osi-model",
    images: [
      {
        url: "https://yourwebsite.com/images/osi-model-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OSI Model Reference Guide",
      },
    ],
  },
  alternates: {
    canonical: "https://yourwebsite.com/resources/learn/networking/osi-model",
  },
};

export default function OSIModelPage() {
  return (
    <>
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          OSI Model
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          A detailed reference guide explaining the OSI layers and their functions in networking.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">1. Introduction</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          The OSI (Open Systems Interconnection) Model is a conceptual framework used to understand and implement network protocols. It consists of seven layers, each with specific functions to facilitate communication between devices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">2. OSI Layers</h2>
        <ul className="mt-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Layer 1: Physical Layer</strong> - Defines the physical connection between devices and transmission media.
          </li>
          <li>
            <strong>Layer 2: Data Link Layer</strong> - Handles error detection and frame synchronization.
          </li>
          <li>
            <strong>Layer 3: Network Layer</strong> - Manages device addressing and routing.
          </li>
          <li>
            <strong>Layer 4: Transport Layer</strong> - Provides reliable data transfer and flow control.
          </li>
          <li>
            <strong>Layer 5: Session Layer</strong> - Manages sessions between applications.
          </li>
          <li>
            <strong>Layer 6: Presentation Layer</strong> - Handles data translation, encryption, and compression.
          </li>
          <li>
            <strong>Layer 7: Application Layer</strong> - Provides network services directly to end-user applications.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">3. Practical Applications</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          The OSI Model is used in network design, troubleshooting, and education to ensure interoperability and standardize communication protocols across different systems.
        </p>
      </section>

      <footer className="mt-8 border-t pt-4 text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          Last updated: September 24, 2025 | For more resources, visit our{" "}
          <a href="/resources/learn" className="text-blue-600 hover:underline dark:text-blue-400">
            Learning Center
          </a>.
        </p>
      </footer>
    </>
  );
}