import { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle, Users, Shield, Zap } from "lucide-react";

// SEO Metadata for Static Generation
export const metadata: Metadata = {
  title: 'About Aventrek - Innovative Industrial Distribution Solutions',
  description:
    'Discover Aventrek, based in Austin, Texas, providing high-quality industrial components, tools, and expert solutions for electronics, manufacturing, and semiconductor sectors.',
  keywords: ['Aventrek', 'industrial distribution', 'engineering solutions', 'Austin Texas', 'electronics manufacturing', 'semiconductor'],
  openGraph: {
    title: 'About Aventrek',
    description:
      'Learn how Aventrek empowers businesses with reliable products, compliance standards, and specialized services in industrial distribution.',
    images: ['/large_on_black.png'],
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
};

// Static Generation Configuration
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-7xl space-y-24">

      {/* Hero */}
      <section className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/austin-skyline.jpg"
          alt="Austin, Texas Skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            We Keep the World Moving
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8">
            Located in the innovative heart of Austin, Texas, Aventrek delivers the
            components and solutions that power tomorrow's industries.
          </p>
          <a
            href="/products"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition text-lg"
          >
            Explore Our Products
          </a>
        </div>
      </section>

      {/* Mission */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Our Mission
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Aventrek aims to revolutionize industrial procurement by combining
          intuitive tools, a vast product selection, and expert support. Our
          customers make confident, efficient decisions that drive operational
          excellence and innovation.
        </p>
      </section>

      {/* What We Do */}
      <section className="space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
          What We Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Compliance & Quality",
              desc: "We adhere to RoHS, REACH, DFARS, ITAR, ISO, and more, ensuring products meet the highest global standards.",
              icon: Shield,
            },
            {
              title: "Customer-Focused Service",
              desc: "Responsive support and seamless procurement workflows designed to solve your toughest challenges.",
              icon: Users,
            },
            {
              title: "Specialized Capabilities",
              desc: "From kitting and labeling to clean room standards, we support the semiconductor and high-tech industries.",
              icon: Zap,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition text-center"
            >
              <item.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
          Who We Are
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              title: "Precision & Accuracy",
              desc: "Delivering exact solutions with unwavering attention to detail.",
            },
            {
              title: "Innovation & Efficiency",
              desc: "Pioneering advanced tools that streamline your processes.",
            },
            {
              title: "Customer-Centric",
              desc: "Prioritizing your needs with tailored, effective support.",
            },
            {
              title: "Transparency & Integrity",
              desc: "Building trust through honest and clear practices.",
            },
          ].map((value, idx) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition text-center"
            >
              <CheckCircle className="mx-auto h-10 w-10 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partner CTA */}
      <section className="bg-blue-600 text-white rounded-2xl p-12 text-center shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Your Partner in Industrial Success
        </h2>
        <p className="text-lg md:text-xl max-w-4xl mx-auto mb-8 leading-relaxed">
          From networking components and automation systems to industrial tools
          and safety gear — Aventrek delivers expertise, compliance, and
          specialized services to help you optimize efficiency and scale
          effectively.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition text-lg"
        >
          Get in Touch
        </a>
      </section>
    </main>
  );
}