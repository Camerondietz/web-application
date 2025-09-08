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
          Our goal is to streamline the engineering selection process with intuitive 
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

      {/* Pitch) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded bg-gray-100 dark:bg-gray-800 py-8 sm:py-12">
          <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-1">
            <div className="max-w-md space-y-4 items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl items-center">
                Everything you need
              </h2>
              <p className="text-gray-700 dark:text-gray-300 items-center">
                Explore our extensive range of high-quality products designed to power your business forward. From cutting-edge networking components and industrial automation systems to essential industrial tools and safety equipment, we provide the solutions you need to keep your operations running smoothly. Whether you're looking to optimize efficiency, enhance safety, or scale your infrastructure, our products and expertise are here to help you achieve your goals with confidence. Shop now for reliable, high-performance solutions that drive success.
                <br></br>
                Your industrial success starts here.
              </p>
              <br />
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-10">
  {/* Main Heading */}
  <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
    About Us
  </h1>

  {/* Introduction Section */}
  <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
    Headquartered in Austin, Texas, we specialize in providing innovative engineering solutions. Our mission is to empower professionals by offering expert insights, precision parts selection, and reliable, high-quality products that drive success in the electronics and manufacturing sectors.
  </p>

  {/* Company Mission Section */}
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
    <h2 className="text-xl font-bold mb-2 dark:text-white">Our Mission</h2>
    <p className="text-gray-700 dark:text-gray-300">
      We strive to streamline the engineering selection process through intuitive tools, comprehensive calculators, and expert guidance. Our goal is to enable engineers and manufacturers to make well-informed decisions efficiently and with confidence.
    </p>
  </div>

  {/* Core Values Section */}
  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
    <h2 className="text-xl font-bold mb-6 dark:text-white text-center">Our Core Values</h2>
    <div className="flex flex-col sm:flex-row sm:justify-center gap-8">
      <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 sm:text-center">
        <li>Precision and Accuracy</li>
        <li>Innovation and Efficiency</li>
        <li>Customer-Centric Approach</li>
        <li>Transparency and Integrity</li>
      </ul>
    </div>
  </div>

  {/* Pitch Section */}
  <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="rounded bg-gray-100 dark:bg-gray-800 py-8 sm:py-12">
      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-1">
        <div className="max-w-md space-y-4 items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl items-center">
            Comprehensive Solutions for Every Need
          </h2>
          <p className="text-gray-700 dark:text-gray-300 items-center">
            Discover our wide range of high-performance products designed to power your business. From advanced networking components and automation systems to essential industrial tools and safety equipment, we offer the solutions you need to optimize efficiency, enhance safety, and scale your operations with confidence.
            <br />
            Your industrial success begins here.
          </p>
          <br />
        </div>
      </div>
    </div>
  </section>
</div>
    </div>
    
  );
}
