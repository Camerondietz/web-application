"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity } from "@/store/features/cart/cartSlice";
import { X, Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const loggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty. <Link href="/products" className="text-blue-600 underline">Shop now</Link>.</p>
      ) : (
        <div className="shadow-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg p-4 sm:p-6">
          <div className="w-full overflow-x-auto">
            <table className="min-w-[600px] w-full border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="p-3">Product</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3 flex items-center">
                      <img src={item.image ? `${process.env.NEXT_PUBLIC_API_URL}${item.image}` : "/placeholder.png"} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                      <Link href={`/products/${item.id}`} className="dark:text-blue-200 text-blue-600 hover:underline">{item.name}</Link>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          disabled={item.quantity <= 1}
                          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                        >
                          <Plus size={16}/>
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-right">${item.price.toFixed(2)}</td>
                    <td className="p-3 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="p-3 text-right">
                      <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 hover:text-red-700">
                        <X size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
          <p className="text-xl font-bold">
            Total: ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {loggedIn ? (
            <Link href={`/checkout`} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Checkout
            </Link>
          ) : (
            <Link href={`/login`} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Checkout
            </Link>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
