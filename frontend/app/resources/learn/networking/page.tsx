import Link from "next/link";
import { learnCategories } from "../LearnResources";

export default function NetworkingPage() {
  const category = learnCategories.find((c) => c.slug === "networking");

  if (!category) return null;

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <p className="mb-8 text-gray-700 dark:text-gray-300">
        {category.description}
      </p>

      <ul className="space-y-4">
        {category.resources.map((res) => (
          <li key={res.href}>
            <Link
              href={res.href}
              className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <h2 className="text-xl font-semibold">{res.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {res.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
