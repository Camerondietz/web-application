// app/checkout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import dynamic from 'next/dynamic';

// Dynamically import your CheckoutForm (must be a client component)
const CheckoutForm = dynamic(() => import('@/components/stripe/CheckoutForm'), { ssr: false });

export default function CheckoutPage() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    // Fetch Stripe publishable key
    fetch('/api/config')
      .then((res) => res.json())
      .then(({ publishableKey }) => {
        setStripePromise(loadStripe(publishableKey));
      });

    // Fetch PaymentIntent clientSecret
    fetch('/api/create-payment-intent')
      .then((res) => res.json())
      .then(({ clientSecret }) => {
        setClientSecret(clientSecret);
      });
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}
