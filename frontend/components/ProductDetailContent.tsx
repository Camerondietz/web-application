// components/ProductDetailContent.tsx
'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/features/cart/cartSlice';
import { motion } from 'framer-motion'; 

interface ProductDetailContentProps {
  product: any;
  attributes: Record<string, string> | null;
  price: number | null;
}

export default function ProductDetailContent({ product, attributes, price }: ProductDetailContentProps) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const handleIncrement = () => {
    setQty((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQty((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (price === null) return; // Prevent adding to cart if no price
    dispatch(addToCart({ id: product.id, name: product.name, price, image: product.image, quantity: qty }));
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 shadow-lg rounded-lg p-6">
      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={product.image ? `${process.env.NEXT_PUBLIC_API_URL}${product.image}` : '/placeholder.png'}
          alt={product.name}
          width="500"
          height="500"
          className="rounded-lg object-cover w-full"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.jpg';
          }}
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
        <p className="text-sm">Category: {product.category?.name || 'Uncategorized'}</p>
        <p className="">{product.description || 'No description available.'}</p>
        <div className="text-xl font-semibold text-blue-600">
          {price !== null ? `$${price.toFixed(2)}` : (
            <a
              href={`/quote-request?product_id=${product.id}`}
              className="text-blue-500 hover:underline"
            >
              Request Quote
            </a>
          )}
        </div>
        <p className="text-sm">Stock: {product.stock} available</p>

        <div className="items-center grid-cols-1 md:grid-cols-2 gap-4 grid space-x-4">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 px-2 py-1 border rounded-md text-center text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
              aria-label="Quantity"
            />
            <button
              onClick={handleIncrement}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          {/* Add to Cart or Request Quote */}
          {price !== null ? (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg sm:text-sm font-semibold transition focus:outline-2 focus:outline-offset-2 focus:outline-blue-700 active:bg-blue-700"
              aria-label="Add to cart"
            >
              Add to Cart
            </button>
          ) : (
          <>
          </>
          )}
        </div>
        {attributes && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between bg-white/10 px-3 py-2 rounded-md">
                  <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}