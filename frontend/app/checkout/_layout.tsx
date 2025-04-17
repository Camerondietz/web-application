// app/checkout/layout.tsx (or your provider wrapper)
'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
