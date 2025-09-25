"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
}

export default function QuoteRequestForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product_id");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(!!productId);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    customPn: "",
    quantity: 1,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch product details if product_id provided
  useEffect(() => {
    if (productId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch product");
          return res.json();
        })
        .then((data: Product) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load product details.");
          setLoading(false);
        });
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      product_id: productId || null,
      custom_pn: productId ? null : formData.customPn,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quote-requests/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <section className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Request a Quote</h1>
        {success ? (
          <div className="text-center text-green-600">
            <p>Your quote request has been submitted successfully!</p>
            <Link href="/" className="text-blue-600 hover:underline mt-4 block">
              Return to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            {product && (
              <div className="mb-4">
                <label className="block font-semibold">Product</label>
                <p>{product.name}</p>
              </div>
            )}
            {!productId && (
              <div className="mb-4">
                <label htmlFor="customPn" className="block font-semibold">
                  Custom Part Number
                </label>
                <input
                  type="text"
                  id="customPn"
                  name="customPn"
                  value={formData.customPn}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block font-semibold">Phone (optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block font-semibold">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="notes" className="block font-semibold">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                rows={4}
              />
            </div>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}