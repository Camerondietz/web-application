import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TCP/IP Basics",
  description: "Understanding IP addressing, subnetting, and protocols.",
  keywords: [
    "TCP/IP",
    "IP Addressing",
    "Subnetting",
    "Network Protocols",
    "TCP/IP Basics",
  ],
  openGraph: {
    title: "TCP/IP Basics",
    description: "Learn about IP addressing, subnetting, and protocols in networking.",
    type: "article",
    url: "https://yourwebsite.com/resources/learn/networking/tcp-ip",
    images: [
      {
        url: "https://yourwebsite.com/images/tcp-ip-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TCP/IP Basics Reference Guide",
      },
    ],
  },
  alternates: {
    canonical: "https://yourwebsite.com/resources/learn/networking/tcp-ip",
  },
};

export default function TCPIPPage() {
  return (
    <main className="prose lg:prose-lg dark:prose-invert mx-auto max-w-4xl p-6 md:p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          TCP/IP Basics
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          A comprehensive guide to understanding IP addressing, subnetting, and key protocols in the TCP/IP model.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">1. Introduction</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          The TCP/IP (Transmission Control Protocol/Internet Protocol) model is the foundational framework for internet communication. It consists of four layers that manage data transmission across networks, including IP addressing, subnetting, and essential protocols.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">2. TCP/IP Layers</h2>
        <ul className="mt-2 list-decimal pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Network Interface Layer</strong> - Handles the physical and data link functions, including Ethernet and Wi-Fi.
          </li>
          <li>
            <strong>Internet Layer</strong> - Manages IP addressing and routing, using protocols like IP and ICMP.
          </li>
          <li>
            <strong>Transport Layer</strong> - Provides reliable data transfer with TCP or connectionless communication with UDP.
          </li>
          <li>
            <strong>Application Layer</strong> - Supports end-user services like HTTP, FTP, and SMTP.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">3. IP Addressing</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          IP addresses are unique identifiers for devices on a network. They come in two versions:
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>IPv4</strong> - 32-bit addresses (e.g., 192.168.0.1), limited to approximately 4.3 billion unique addresses.
          </li>
          <li>
            <strong>IPv6</strong> - 128-bit addresses (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334), designed to replace IPv4 due to address exhaustion.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">4. Subnetting</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Subnetting divides a network into smaller sub-networks to improve performance and security. Key concepts include:
        </p>
        <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Subnet Mask</strong> - Defines the network and host portions of an IP address (e.g., 255.255.255.0).
          </li>
          <li>
            <strong>CIDR Notation</strong> - Represents the subnet mask with a slash and bit count (e.g., /24 for 255.255.255.0).
          </li>
        </ul>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Example: A /24 subnet with IP 192.168.1.0 can support 256 addresses, with 254 usable host addresses.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">5. Key Protocols</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Protocol</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Layer</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">TCP</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Transport</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Reliable, connection-oriented data transfer</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">UDP</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Transport</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fast, connectionless data transfer</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">IP</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Internet</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Addressing and routing</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">ICMP</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Internet</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Error reporting and diagnostics</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">6. Practical Applications</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          TCP/IP is the backbone of the internet, enabling web browsing, email, and file transfers. Understanding IP addressing and subnetting is crucial for network configuration and troubleshooting.
        </p>
      </section>

      <footer className="mt-8 border-t pt-4 text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          Last updated: September 25, 2025 | For more resources, visit our{" "}
          <a href="/resources/learn" className="text-blue-600 hover:underline dark:text-blue-400">
            Learning Center
          </a>.
        </p>
      </footer>
    </main>
  );
}