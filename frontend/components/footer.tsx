"use client";
import Link from "next/link";
import {
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

import { SiFacebook, SiX, SiInstagram, SiYoutube } from 'react-icons/si';


const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About / Logo */}
        <div className="justify-items-center">
          <img
            src="/large_on_black.png"
            alt="AVENTREK"
            className="h-40 w-auto cursor-pointer object-contain"
          />
          <p className="text-sm">
            
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

        {/* Get in Touch */}
        <div>
          <h3 className="text-md font-semibold mb-2">Get in Touch</h3>
          <div className="flex items-center text-sm mb-1">
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            <span>support@aventrek.com</span>
          </div>
          <div className="flex items-center text-sm mb-3">
            <PhoneIcon className="h-4 w-4 mr-2" />
            <span>+1 (512) 298-1892</span>
          </div>

          {/* Social Icons 
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <SiFacebook className="h-5 w-5 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <SiX className="h-5 w-5 hover:text-blue-400 transition-colors" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <SiYoutube className="h-5 w-5 hover:text-red-600 transition-colors" />
            </a>*/}
          <div className="flex space-x-4 mt-4">

            <a href="https://instagram.com/aventrek_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <SiInstagram className="h-5 w-5 hover:text-pink-500 transition-colors" />
            </a>

          </div>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-md font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/Legal/terms-of-access">Terms of Access</Link></li>
            <li><Link href="/Legal/terms-of-sale">Terms of Sale</Link></li>
            <li><Link href="/Legal/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/sitemap">Sitemap</Link></li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
            <img src="/us-flag.png" alt="US" className="h-4 w-auto rounded-sm shadow-sm"></img>
            <img src="/texas-flag.png" alt="Texas" className="h-4 w-auto rounded-sm shadow-sm"></img>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-gray-300 dark:border-gray-700">
        &copy; {new Date().getFullYear()} AVENTREK. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
