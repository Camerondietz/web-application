'use client';
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from 'next/image'
import { Suspense } from 'react';
import PriceLoader from '@/components/PriceLoader';

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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}

function ProductsPage() {
  const searchParams = useSearchParams();
  //const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

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
  }, [category, keyword, manufacturer]);

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
      <Suspense fallback={<div>Loading products...</div>}>
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <motion.div 
              className="bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-2xl transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Link key={product.id} href={`/products/${product.id}`} passHref>
                <img
                  src={product.image ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}` : "@/public/placeholder.jpg"} // Handle missing images
                  alt={product.name || "No Name"}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="mt-3 text-lg break-words font-semibold">{product.name || "Unnamed Product"}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{product.category?.name || "No Category"}</p>
              </Link>
                <PriceLoader productId={product.id}/>
            </motion.div>
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
      </Suspense>
    </div>
  );
}
