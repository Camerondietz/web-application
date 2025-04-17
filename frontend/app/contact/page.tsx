"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", formData);
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* Contact Information Section */}
      <div className="mt-8 text-center text-gray-700 dark:text-gray-300">
        <p className="font-semibold">Email: support@yourbusiness.com</p>
        <p className="font-semibold">Phone: (123) 456-7890</p>
        <p className="font-semibold">Address: 123 Business St, Austin, TX</p>
      </div>
    </div>
  );
}
