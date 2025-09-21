import { Suspense } from "react";
import QuoteRequestForm from "./QuoteRequestForm";

export default function QuoteRequestPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <QuoteRequestForm />
    </Suspense>
  );
}