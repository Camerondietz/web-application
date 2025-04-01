"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [parentId, setParentId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${parentId ? `?parent=${parentId}` : ""}`
        );
        if (!res.ok) throw new Error("Failed to fetch categories.");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [parentId]);

  const handleCategoryClick = (category: any) => {
    if (category.has_subcategories) {
      setParentId(category.id); // Load subcategories
    } else {
      router.push(`/products?category=${category.id}`); // Redirect to product list
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">{parentId ? "Subcategories" : "Categories"}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
