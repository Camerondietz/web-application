"use client";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
        About Us
      </h1>

      {/* Introduction Section */}
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
        We are committed to providing innovative engineering solutions, helping 
        professionals select the right parts, and delivering quality insights 
        into the world of electronics and manufacturing.
      </p>

      {/* Company Mission Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-2 dark:text-white">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Our goal is to simplify the engineering selection process with intuitive 
          tools, calculators, and expert knowledge—ensuring that engineers and 
          manufacturers can make informed decisions quickly and efficiently.
        </p>
      </div>

      {/* Core Values Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-2 dark:text-white">Our Values</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Precision and Accuracy</li>
          <li>Innovation and Efficiency</li>
          <li>Customer-Centric Approach</li>
          <li>Transparency and Integrity</li>
        </ul>
      </div>

      {/* Team Members Section (Modify as needed) */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 dark:text-white text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example Team Member */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <h3 className="text-lg font-semibold dark:text-white">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-300">Lead Engineer</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <h3 className="text-lg font-semibold dark:text-white">Jane Smith</h3>
            <p className="text-gray-600 dark:text-gray-300">Product Manager</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <h3 className="text-lg font-semibold dark:text-white">Michael Lee</h3>
            <p className="text-gray-600 dark:text-gray-300">Software Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
