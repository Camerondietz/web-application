"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { addToCart } from "@/store/features/cart/cartSlice";
import { motion } from "framer-motion";
import Image from "next/image";
//import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("Product ID:", productId);

  useEffect(() => {

    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/`;
    console.log("Fetching product from:", url); // Debugging line
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/`);
        if (!res.ok) throw new Error("Failed to fetch product.");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-lg p-6">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={product.image ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${product.image}` : "/placeholder.jpg"}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 text-sm">Category: {product.category?.name || "Uncategorized"}</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600">
            ${product.price ? Number(product.price).toFixed(2) : "N/A"}
          </p>
          <p className="text-sm text-gray-600">Stock: {product.stock} available</p>
          <p className="text-sm text-gray-400">Added on: {new Date(product.created_at).toLocaleDateString()}</p>

          {/* Add to Cart Button */}
          <button
            onClick={() => dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  );
}
