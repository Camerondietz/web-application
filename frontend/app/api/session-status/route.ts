// app/api/session-status/route.ts
import { NextResponse } from 'next/server';
const backendURL = `${process.env.NEXT_PUBLIC_API_URL}/api`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
  }

  try {
    // Forward the request to the Django backend
    const response = await fetch(`${backendURL}/session-status?session_id=${sessionId}`, {
      method: 'GET',
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ status: data.status, customer_email: data.customer_email });
    } else {
      return NextResponse.json({ error: data.error || 'Failed to retrieve session status' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error retrieving session status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}