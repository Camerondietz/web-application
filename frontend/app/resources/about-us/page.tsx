"use client";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
        We keep the world moving.
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

      {/* Team Members Section (Modify as needed) */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 dark:text-white text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
          {/* Example Team Member */}
          <div className="text-center">
            <img src="/profile.png" className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></img>
            <h3 className="text-lg font-semibold dark:text-white">Cameron Dietz</h3>
            <p className="text-gray-600 dark:text-gray-300">Sole Architect and Developer</p>
          </div>

          <div className="text-center">
            <img src="/pi.jpg" className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></img>
            <h3 className="text-lg font-semibold dark:text-white">Raspberry PI</h3>
            <p className="text-gray-600 dark:text-gray-300">The Server (Hosted locally)</p>
          </div>

        </div>
      </div>
      <section id="project-showcase" className="bg-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Project Showcase: Industrial E-commerce Platform</h2>
      <p className="text-lg text-gray-700 mb-6">
            A full-stack, production-ready e-commerce platform tailored for industrial part distribution — built with scalability, security, and real-world performance in mind.
          </p>

      <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Overview</h3>
              <p className="text-gray-700">
                This application streamlines the sale and support of complex industrial components. It combines a modern frontend, robust backend, intelligent part search, and AI-assisted customer support.
              </p>
            </div>
      <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tech Stack</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong>Frontend:</strong> Next.js 15, TypeScript, Tailwind CSS, Redux</li>
                <li><strong>Backend:</strong> Django REST Framework, PostgreSQL</li>
                <li><strong>Microservice:</strong> Node.js + MongoDB for part search/filtering</li>
                <li><strong>Payments:</strong> Stripe integration via Django</li>
                <li><strong>AI:</strong> OpenAI API for smart customer support</li>
                <li><strong>DevOps:</strong> Docker, Github, Cloudflare Tunnel</li>
              </ul>
            </div>
      <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Intelligent search with MongoDB-backed part metadata</li>
                <li>Secure checkout with Stripe and order tracking via Django</li>
                <li>AI-powered support chat with OpenAI integration</li>
                <li>Lightweight and cloud agnostic Dockerized deployment on Raspberry Pi</li>
                <li>Cloudflare Tunnel for secure external access</li>
                <li>Kubernetes cluster to efficiently handle scaling</li>
                {/*<li>Health checks and logging for production monitoring</li>*/}
              </ul>
            </div>
      <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Skills Demonstrated</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Full-stack app development with microservices</li>
                <li>REST API design and secure user authentication</li>
                <li>AI/LLM integration for domain-specific support</li>
                <li>PostgreSQL + MongoDB polyglot persistence</li>
                <li>End-to-end deployment & infrastructure on limited hardware</li>
              </ul>
            </div>
      <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Industrial clients often need secure, local-first solutions with powerful functionality. This project delivers intelligent support, a performant UI, and enterprise-level reliability — all hosted on a low-cost device.
              </p>
            </div>
      <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Future Updates</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Optimize rendering strategies for SEO</li>
                <li>Penetration testing </li>
                <li>Product recommendations using AI</li>
                <li>Database refinement and indexing</li>
                <li>Implement Google analytics</li>
              </ul>
            </div>
      <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Let’s Work Together</h3>
              <p className="text-gray-700 mb-2">
                I'm open to opportunities where I can contribute as a full-stack engineer, bring real-world solutions to life, and continue to build systems that are as smart as they are scalable.
              </p>
              <p className="text-blue-600 underline">
                <a href="mailto:dietz.cameron@gmail.com">Get in touch</a>
                <br></br>
                <br></br>
                <a href="https://github.com/Camerondietz/web-application" target="_blank">📂 View the code on GitHub</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
