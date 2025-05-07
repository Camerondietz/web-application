"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  parent_category: number | null;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories.");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError("Error fetching categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center py-10">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  // Filter categories based on selection
  const displayedCategories = selectedCategory
    ? categories.filter((cat) => cat.parent_category === selectedCategory)
    : categories.filter((cat) => cat.parent_category === null);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Categories</h1>

      {selectedCategory && (
        <button
          onClick={() => setSelectedCategory(null)}
          className="mb-4 px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ← Back to Main Categories
        </button>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.length > 0 ? (
          displayedCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="cursor-pointer p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{category.name}</h2>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No subcategories found.
            <br />
            <Link href={`/products?category=${selectedCategory}`}>
              <span className="text-blue-500 hover:underline">View Products →</span>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
