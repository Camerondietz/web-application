// app/success/page.tsx
"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <CheckCircle className="text-green-500" size={64} />
      <h1 className="text-3xl font-bold mt-4">Payment Successful!</h1>
      <p className="text-lg mt-2">Thank you for your purchase.</p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
