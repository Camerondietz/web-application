// app/return/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams,useRouter } from 'next/navigation';

function ReturnPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const router = useRouter();
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
    <div className="w-full max-w-xl mx-auto py-8 px-4">
      {status && customerEmail ? (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800">Payment {status}</h1>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-600">Customer Email:</span>
              <span className="text-lg text-gray-900">{customerEmail}</span>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Home
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-medium text-gray-600">
          <p>Loading...</p>
        </div>
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
