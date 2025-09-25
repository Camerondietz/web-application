// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api`

export async function POST(req: Request) {
  try {
    // Forward the request to the Django backend
      console.log("Headers:", JSON.stringify(Object.fromEntries(req.headers.entries()), null, 2));

      // Get Authorization header from incoming request
      const incomingAuth = req.headers.get('authorization'); // e.g. "Bearer <token>"
      const body = await req.json(); //cart data
      console.log("Body:", JSON.stringify(body, null, 2));
      const response = await fetch(`${backendURL}/create-checkout-session`, {
      //const response = await fetch('http://localhost:8000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(incomingAuth && { Authorization: incomingAuth }), // Forward if exists
      },
      body: JSON.stringify(body), // forward the request body
    });

    const data = await response.json();

    if (response.ok) {
      // Return both clientSecret and cart datas
      console.log(data);
      return NextResponse.json({
        clientSecret: data.clientSecret,
        cart: data.cart,
        shipping_cost: data.shipping_cost,
      });
    } else {
      console.error('Django backend error:', data);
      return NextResponse.json(
        { error: data.error || 'Failed to create checkout session' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}