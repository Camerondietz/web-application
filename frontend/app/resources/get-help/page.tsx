"use client";

import { useState, useEffect } from "react";
//import { Button } from "@/components/ui/button"; // Replace with your UI library
//import { Input } from "@/components/ui/input";
//import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react"; // Optional loading icon
import AIChatDisclaimer from "@/components/AIChatDisclaimer"; // Import the disclaimer


type Product = {
  id: number;
  name: string;
  description: string;
};

export default function GetHelpPage() {
  const [query, setQuery] = useState("");
  const [solution, setSolution] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disclaimerVisible, setDisclaimerVisible] = useState<boolean>(true); // State to control popup visibility


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setSolution("");
    setProducts([]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_node_URL}/api/ai-solution`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Try again.");
      }

      const data = await res.json();
      setSolution(data.solution || "No solution provided.");
      setProducts(data.products || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch solution.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDisclaimer = () => {
    setDisclaimerVisible(false);
  };

  useEffect(() => {
    // Auto-hide the disclaimer after 10 seconds (optional)
    const timer = setTimeout(() => {
      setDisclaimerVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6 mt-10 pb-10">
      {/* Show Disclaimer Modal if visible */}
      {disclaimerVisible && <AIChatDisclaimer onClose={handleCloseDisclaimer} />}

      <h1 className="text-3xl font-bold mb-4 text-center">Get Help</h1>
      <p className="text-center text-gray-500 mb-6">
        Describe your problem or what you're looking for, and our AI will assist you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. I'm looking for a durable soldering iron for fine electronics work..."
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        ></textarea>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Submit"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {solution && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">AI Suggested Solution</h2>
          <p className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border">{solution}</p>
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recommended Products</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800"
              >
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
