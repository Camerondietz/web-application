"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  has_subcategories: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const [categoryHistory, setCategoryHistory] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch categories based on currentParentId
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories${currentParentId ? `?parent=${currentParentId}` : ""}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data: Category[]) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setCategories([]);
        setLoading(false);
      });
  }, [currentParentId]);

  // Handle back navigation
  const handleBack = () => {
    const prev = categoryHistory[categoryHistory.length - 1] ?? null;
    setCategoryHistory((prevHistory) => prevHistory.slice(0, -1));
    setCurrentParentId(prev);
  };

  return (
    <div className="flex flex-col items-center px-4 py-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <section className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Browse Categories</h1>

        {loading ? (
          <div className="text-center">Loading categories...</div>
        ) : (
          <>
            {currentParentId && (
              <div className="flex justify-between mb-6">
                <button
                  onClick={handleBack}
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
                >
                  ← Back to Parent Category
                </button>
                <Link
                  href={`/products?category=${currentParentId}`}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  See All Products in this Category
                </Link>
              </div>
            )}

            {categories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition text-center cursor-pointer"
                    onClick={() => {
                      if (category.has_subcategories) {
                        if (currentParentId !== null) {
                          setCategoryHistory((prev) => [...prev, currentParentId]);
                        }
                        setCurrentParentId(category.id);
                      } else {
                        window.location.href = `/products?category=${category.id}`;
                      }
                    }}
                  >
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No categories available.
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}