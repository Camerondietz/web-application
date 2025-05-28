// app/return/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ReturnPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
        })
        .catch((err) => console.error('Error fetching session status:', err));
    }
  }, [sessionId]);

  if (!sessionId) {
    return <div>No session ID provided</div>;
  }

  return (
    <div>
      {status && customerEmail ? (
        <div>
          <h1>Payment {status}</h1>
          <p>Customer Email: {customerEmail}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default function ReturnPage() {
  return (
    <Suspense fallback={<div>Loading payment status...</div>}>
      <ReturnPageContent />
    </Suspense>
  );
}