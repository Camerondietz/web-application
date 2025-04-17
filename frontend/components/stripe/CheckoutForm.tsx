// components/stripe/CheckoutForm.tsx
'use client';

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/checkout/success`,
      },
    });

    if (error) {
      setMessage(error.message || "Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
      {message && <div className="text-red-500">{message}</div>}
    </form>
  );
}
