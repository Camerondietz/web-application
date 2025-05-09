"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About / Logo */}
        <div>
          <h2 className="text-lg font-bold mb-2">Your Shop</h2>
          <p className="text-sm">
            Quality products, fast delivery, and amazing service. Shop with us today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/account">Account</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Socials or Contact */}
        <div>
          <h3 className="text-md font-semibold mb-2">Get in Touch</h3>
          <p className="text-sm mb-1">Email: inquiries@cameron-dietz.com</p>
          <p className="text-sm mb-1">Phone: +1 (512) 750-7411</p>
          <div className="flex space-x-4 mt-2">
            {/* Replace with actual icons if needed */}
            <a href="https://www.linkedin.com/in/dietzcameron" title="Linkedin" target="_blank" aria-label="LinkedIn" className="hover:underline">LinkedIn</a>
            <a href="https://cameron-dietz.com" title="Portfolio" target="_blank" aria-label="Portfolio" className="hover:underline">Portfolio</a>
          </div>
        </div>

        <div className="flex items-center space-x-2">
            <img src="/us-flag.png" alt="US" className="h-4 w-auto rounded-sm shadow-sm"></img>
            <img src="/texas-flag.png" alt="Texas" className="h-4 w-auto rounded-sm shadow-sm"></img>
        </div>

      </div>

      <div className="text-center text-xs py-4 border-t border-gray-300 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Cameron Dietz's Ecommerce Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
