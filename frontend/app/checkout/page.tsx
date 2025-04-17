// app/checkout/page.tsx
'use client';

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/stripe/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const stripeURL = `${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`
  console.log("stripe url target", stripeURL)
  useEffect(() => {
    // Fetch the client secret from your Django backend
    fetch(stripeURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [/* your cart items here */]
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'Default',
    variables: { colorPrimaryText: '#155dfc' }
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
