"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from 'next/image'

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: {
    id: number;
    name: string;
  } | null; // Category could be null, so handle that cas
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Get filters from URL
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");
  const manufacturer = searchParams.get("manufacturer");

  // Fetch products from backend
  const fetchProducts = async (reset = false) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page: page.toString() });
      if (category) query.append("category", category);
      if (manufacturer) query.append("manufacturer", manufacturer);
      if (keyword) query.append("keyword", keyword);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${query.toString()}`);
      const data = await response.json();

      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }

      setHasMore(data.has_next_page);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when filters change
  useEffect(() => {
    setPage(1);
    fetchProducts(true); // Reset list when filters change
  }, [category, keyword]);

  // Load more products when scrolling
  const loadMore = () => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) fetchProducts();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      {/* Filters 
      <div className="flex gap-4 mb-6">
        <select
          value={category || ""}
          onChange={(e) =>
            router.push(`/products?category=${e.target.value}`)
          }
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          defaultValue={keyword || ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/products?keyword=${e.currentTarget.value}`);
            }
          }}
          className="p-2 border rounded"
        />
      </div> */}
      
      {/* Products Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} passHref>
              <motion.div 
                className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={product.image ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}` : "@/public/placeholder.jpg"} // Handle missing images
                  alt={product.name || "No Name"}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="mt-3 text-lg font-semibold">{product.name || "Unnamed Product"}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{product.category?.name || "No Category"}</p>
                <p className="mt-2 text-xl font-bold text-blue-600">
                  ${product.price ? product.price.toFixed(2) : "N/A"}
                </p>
              </motion.div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">No products found.</p>
        )}
      </motion.div>

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load More
        </button>
      )}

      {loading && <p className="text-center text-gray-700 dark:text-gray-300 mt-4">Loading...</p>}
    </div>
  );
}

/*"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
//import { Input } from "@/components/ui/input"; // Assuming you have a UI input component
import { motion } from "framer-motion";
import Image from 'next/image'

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: {
    id: number;
    name: string;
  } | null; // Category could be null, so handle that cas
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data); // Initial state
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search
    const filtered = products.filter((product) =>
      product && product.name ? product.name.toLowerCase().includes(search.toLowerCase()) : false
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Products Grid *}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} passHref>
              <motion.div 
                className="bg-white shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={product.image || "/placeholder.png"} // Handle missing images
                  alt={product.name || "No Name"}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="mt-3 text-lg font-semibold">{product.name || "Unnamed Product"}</h2>
                <p className="text-gray-500 text-sm">{product.category?.name || "No Category"}</p>
                <p className="mt-2 text-xl font-bold text-blue-600">
                  ${product.price ? product.price.toFixed(2) : "N/A"}
                </p>
              </motion.div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </motion.div>
    </div>
  );
}
*/