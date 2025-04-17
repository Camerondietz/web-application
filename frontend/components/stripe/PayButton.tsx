// components/CheckoutButton.tsx
"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    console.log(cartItems);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-checkout-session/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });
    console.log(JSON.stringify({
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    }),);

    const data = await response.json();
    console.log("Stripe response data:", data); //log the parsed data

  };

  return (
    <div className = "justify-center px-3">
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
    >Checkout
    </button>
    </div>
  );
}


/*import React from 'react';
import {useCheckout} from '@stripe/react-stripe-js';

const PayButton = () => {
  const {confirm} = useCheckout();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleClick = () => {
    setLoading(true);
    confirm().then((result) => {
      if (result.type === 'error') {
        setError(result.error)
      }
      setLoading(false);
    })
  };

  return (
    <div>
      <button disabled={loading} onClick={handleClick}>
        Pay
      </button>
      {error && <div>{error.message}</div>}
    </div>
  )
};

export default PayButton;*/