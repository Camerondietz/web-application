import Link from "next/link";
import { Metadata } from "next";
import { learnCategories } from "./LearnResources";

export const metadata: Metadata = {
  title: "Learning Resources – Engineering, Networking & Automation",
  description:
    "Browse technical learning resources and reference sheets for power transmission, networking, and industrial automation.",
  keywords: [
    "engineering",
    "formulas",
    "networking",
    "automation",
    "mechanical design",
    "reference sheets",
  ],
};

export default function LearnIndexPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-4xl font-bold mb-8">Learning Resources</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
        Explore curated guides and formulas for engineering, networking, and
        automation. Select a category to get started.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {learnCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/resources/learn/${cat.slug}`}
            className="block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{cat.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
