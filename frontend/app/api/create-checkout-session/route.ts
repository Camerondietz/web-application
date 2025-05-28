// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api`

export async function POST(req: Request) {
  try {
    // Forward the request to the Django backend
      const body = await req.json(); //cart data
      const response = await fetch(`${backendURL}/create-checkout-session`, {
      //const response = await fetch('http://localhost:8000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // forward the request body
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ clientSecret: data.clientSecret });
    } else {
      console.error('Django backend error:', data);
      return NextResponse.json({ error: data.error || 'Failed to create checkout session' }, { status: response.status });    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}