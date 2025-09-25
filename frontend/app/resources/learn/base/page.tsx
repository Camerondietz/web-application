import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reference Page Title",
  description:
    "Comprehensive reference guide for [Topic], covering key concepts, definitions, and practical applications for [specific use cases].",
  keywords: [
    "[Topic]",
    "[Related Term 1]",
    "[Related Term 2]",
    "[Related Term 3]",
    "[Related Term 4]",
  ],
  openGraph: {
    title: "Reference Page Title",
    description:
      "Explore detailed information on [Topic] with definitions, tables, and practical insights.",
    type: "article",
    url: "https://yourwebsite.com/resources/learn/[category]/[topic]",
    images: [
      {
        url: "https://yourwebsite.com/images/[topic]-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "[Topic] Reference Guide",
      },
    ],
  },
  alternates: {
    canonical: "https://yourwebsite.com/resources/learn/[category]/[topic]",
  },
};

export default function ReferencePage() {
  return (
    <main className="prose lg:prose-lg dark:prose-invert mx-auto max-w-4xl p-6 md:p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          [Topic Title]
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          A detailed reference guide for [Topic], including key definitions, tables, and practical applications.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">1. Introduction</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          This page provides a comprehensive overview of [Topic], including its scope, key terms, and applications in [specific field, e.g., power transmission, industrial automation, or IT].
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">2. Key Terms and Definitions</h2>
        <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Term 1:</strong> Definition of term 1, explaining its relevance and usage.
          </li>
          <li>
            <strong>Term 2:</strong> Definition of term 2, including context or examples.
          </li>
          <li>
            <strong>Term 3:</strong> Definition of term 3, with additional details.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">3. Reference Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Column 1</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Column 2</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Column 3</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Column 4</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data 1</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data 2</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data 3</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data 4</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data 5</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data 6</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data 7</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Data 8</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
          Note: Additional information or clarifications about the table data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">4. Practical Applications</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Explanation of how [Topic] is applied in [specific field]. Includes examples, use cases, or best practices.
        </p>
      </section>

      <footer className="mt-8 border-t pt-4 text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          Last updated: September 2025 | For more resources, visit our{" "}
          <a href="/resources/learn" className="text-blue-600 hover:underline dark:text-blue-400">
            Learning Center
          </a>.
        </p>
      </footer>
    </main>
  );
}