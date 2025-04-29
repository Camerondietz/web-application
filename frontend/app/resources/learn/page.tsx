"use client";
import { useState } from "react";

const imageList = Array.from({ length: 7 }, (_, i) => `${i + 1}`); // Example: ['1', '2', ..., '10']

export default function LearnPage() {
  const [selectedImage, setSelectedImage] = useState("1");

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="md:w-64 w-full md:h-full h-48 md:border-r border-b bg-gray-100 dark:bg-gray-900 overflow-y-auto">
        <h2 className="text-lg font-bold p-4">Pages</h2>
        <ul className="overflow-y-auto h-full">
          {imageList.map((id) => (
            <li
              key={id}
              onClick={() => setSelectedImage(id)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                selectedImage === id ? "bg-blue-500 text-white" : ""
              }`}
            >
              Page {id}
            </li>
          ))}
        </ul>
      </div>

      {/* Display Area */}
      <div className="flex-1 overflow-auto flex justify-center p-4 bg-white dark:bg-black">
        <div className="relative w-full max-w-6xl aspect-video">
          <img
            src={`/learn/${selectedImage}.jpg`}
            alt={`Page ${selectedImage}`}
            className="absolute top-0 left-0 w-full object-contain"
          />
          <object
            data={`/learn/${selectedImage}.svg`}
            type="image/svg+xml"
            className="absolute top-0 left-0 w-full pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
