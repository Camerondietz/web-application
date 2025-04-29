// app/cancel/page.tsx
"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <XCircle className="text-red-500" size={64} />
      <h1 className="text-3xl font-bold mt-4">Payment Canceled</h1>
      <p className="text-lg mt-2">Your payment was not completed.</p>
      <Link
        href="/cart"
        className="mt-6 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
      >
        Return to Cart
      </Link>
    </div>
  );
}
