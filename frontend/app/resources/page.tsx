"use client";
import Link from "next/link";

export default function ResourcesPage() {
  const resources = [
    /*{ title: "Documentation", path: "/docs" },
    { title: "API Reference", path: "/api-reference" },
    { title: "Tutorials", path: "/tutorials" },
    { title: "Community Forum", path: "/community" },
    { title: "Blog", path: "/blog" },
    { title: "Support", path: "/support" },
    { title: "Contact Us", path: "/contact" },
    { title: "FAQs", path: "/faq" },
    { title: "Changelog", path: "/changelog" },*/
    { title: "Calculate", path: "/resources/calculate" },
    { title: "Solve", path: "/resources/solve" },
    { title: "Learn", path: "/resources/learn" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Resources</h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Explore our resources to get the most out of our platform.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Link
            key={resource.path}
            href={resource.path}
            className="block p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 text-center"
          >
            <span className="text-xl font-semibold text-blue-600">{resource.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
