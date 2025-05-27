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
  const [attributes, setAttributes] = useState<Record<string, string> | null>(null);
  // Inside your component:
  const [qty, setQty] = useState(1);

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

    const fetchAttributes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_node_URL}/attributes/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setAttributes(data.attributes);
        }
      } catch (err) {
        console.error("Error fetching attributes:", err);
      }
    };

  if (productId) {
    fetchProduct();
    fetchAttributes();
  }
  }, [productId]);

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg rounded-lg p-6">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}` : "@/public/placeholder.jpg"}
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
          <p className="text-sm">Category: {product.category?.name || "Uncategorized"}</p>
          <p className="">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600">
            ${product.price ? Number(product.price).toFixed(2) : "N/A"}
          </p>
          <p className="text-sm ">Stock: {product.stock} available</p>
          <p className="text-sm ">Added on: {new Date(product.created_at).toLocaleDateString()}</p>

          
          <div className="flex items-center space-x-4">
            {/* Quantity Input */}
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 px-2 py-1 border rounded-md text-center"
            />
            {/* Add to Cart Button */}
            <button
              onClick={() => dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty }))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition focus:outline-2 focus:outline-offset-2 focus:outline-blue-700 active:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
          {attributes && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between bg-white/10 px-3 py-2 rounded-md">
                  <span className="font-medium capitalize">{key.replace(/_/g, " ")}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        </motion.div>
      </div>
    </div>
  );
}
