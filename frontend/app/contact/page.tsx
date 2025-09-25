"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact-us/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          description: formData.message, // match Django field name
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // reset form
    } catch (err) {
      setError((err as Error).message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Contact Us</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
          Have a question? Fill out the form below, and we'll get back to you as soon as possible.
        </p>

        {submitted ? (
          <p className="text-center text-green-600 dark:text-green-400 font-semibold">
            Thank you! Your message has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>

      {/* Contact Information Section */}
      <div className="mt-8 text-center text-gray-700 dark:text-gray-300">
        <p className="font-semibold">support@aventrek.com</p>
        <p className="font-semibold">(512) 298-1892</p>
        <p className="font-semibold">Austin, TX</p>
      </div>
    </div>
  );
}
