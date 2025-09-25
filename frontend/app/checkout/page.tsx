'use client';
import CheckoutForm from '@/components/stripe/checkout';
import {
  CheckoutProvider
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback, useEffect, useState } from 'react';
import type { Appearance } from '@stripe/stripe-js';
//Cart integration
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { updateCartFromAPI } from '@/store/features/cart/cartSlice';

//WHEN READY
/*
import { getValidAccessToken } from '@/store/features/auth/authSlice'; // or wherever you put it
const token = await getValidAccessToken(); // ensures it's valid or refreshed
if (!token) throw new Error("Unable to authenticate. Please log in again.");
*/
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: string; // API returns price as string
}

export default function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items); //for cart
  // Extract only id and quantity
  const simplifiedCart = cartItems.map(item => ({
    id: item.id,
    quantity: item.quantity,
  }));
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [apiCart, setApiCart] = useState<CartItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
 
  const fetchClientSecret = useCallback(async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // REQUIRED for JWT
        },
        body: JSON.stringify({ // sending cart data
          cartItems: simplifiedCart,
        }),
        
      });
      const data = await response.json();
      if (response.ok) {
        setClientSecret(data.clientSecret);
        setShippingCost(data.shipping_cost ? parseFloat(data.shipping_cost) : null);
        setApiCart(data.cart || []);
        // Update Redux cart with API data
        dispatch(updateCartFromAPI(data.cart || []));
        setError(null);
        return data.clientSecret;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error: any) {
        if (error.response?.status === 401) {
          // If token is expired, redirect to login page
          router.push('/login');
          console.error('Failed to fetch orders', error);
        } else {
          console.error('Error fetching client secret:', error);
        }
      throw error;
    }
  }, [router, simplifiedCart, dispatch]);

  //const appearance: Appearance = {theme: 'stripe',labels: 'floating',variables: {  colorPrimary: '#0570de',  colorBackground: '#f6f9fc',}};
  
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
  }, []);
  
return (
    <div id="checkout" className="px-4 py-8 mx-auto text-gray-600 dark:text-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Cart Summary */}
        <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
              {error}
            </div>
          )}
          {!apiCart || apiCart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {apiCart.map((item) => (
                <li key={item.id} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              <li className="pt-4 flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>${apiCart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)}</span>
              </li>
              <li className="pt-2 flex justify-between font-semibold" aria-label="Shipping cost">
                <span>Shipping</span>
                <span>
                  {shippingCost !== null ? `$${shippingCost.toFixed(2)}` : 'Calculating...'}
                </span>
              </li>
              <li className="pt-2 flex justify-between font-semibold" aria-label="Total cost">
                <span>Total before tax</span>
                <span>
                  {shippingCost !== null
                    ? `$${(apiCart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0) + shippingCost).toFixed(2)}`
                    : 'Calculating...'}
                </span>
              </li>
            </ul>
          )}
        </div>

        {/* Checkout Form */}
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md rounded-lg p-6">
          {clientSecret ? (
            <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret, elementsOptions: {appearance:{theme: isDark ? 'night' : 'stripe'}}, }}>
              <CheckoutForm />
            </CheckoutProvider>
          ) : (
            <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret, elementsOptions: {appearance:{theme: isDark ? 'night' : 'stripe'}}, }}>
              <div className="text-center mt-10">Loading checkout...</div>
            </CheckoutProvider>
          )}
        </div>
      </div>
    </div>
  );
}