// components/stripe/CheckoutForm.tsx
'use client';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback, useState } from 'react';
//Cart integration
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
  const cartItems = useSelector((state: RootState) => state.cart.items); //for cart
  // Extract only id and quantity
  const simplifiedCart = cartItems.map(item => ({
    id: item.id,
    quantity: item.quantity,
  }));

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({ // sending cart data
          cartItems: simplifiedCart,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setClientSecret(data.clientSecret);
        return data.clientSecret;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  }, []);

  return (
    <div id="checkout">
      {clientSecret ? (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
