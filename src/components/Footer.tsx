// src/components/Footer.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    // CHANGED: Main text color updated to 'text-gray-900' for high contrast
    <footer className="w-full bg-white text-gray-900 py-8 px-4 sm:px-6 lg:px-8 z-10 relative border-t border-gray-200">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-6 text-center md:text-left">
        
        {/* Left Corner: Company Logo */}
        <div className="w-full md:w-auto md:flex-1 flex justify-center md:justify-start">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo2.jpg" // Ensure this logo has a transparent background
              alt="Upturn Opportunities Logo"
              width={150}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* Middle: Quick Links */}
        <nav className="w-full md:w-auto">
          {/* The links will inherit the new text-gray-900 color */}
          <ul className="flex justify-center items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/about" className="hover:text-blue-600 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-600 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="hover:text-blue-600 transition-colors">
                Jobs
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Corner: Social & Contact Icons */}
        <div className="w-full md:w-auto md:flex-1 flex justify-center md:justify-end">
          {/* The icons will also inherit the new text color */}
          <div className="flex items-center gap-5">
            <a 
              href="https://www.linkedin.com/in/prasanna771" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="hover:text-blue-600 transition-colors"
            >
              <Linkedin size={22} />
            </a>
            <a 
              href="mailto:prasannareddy771@gmail.com" 
              aria-label="Email" 
              className="hover:text-blue-600 transition-colors"
            >
              <Mail size={22} />
            </a>
            <a 
              href="https://www.instagram.com/bommidi_prasanna" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="hover:text-blue-600 transition-colors"
            >
              <Instagram size={22} />
            </a>
          </div>
        </div>

      </div>

      {/* CHANGED: Copyright text also updated to 'text-gray-900' */}
      <div className="text-center text-gray-900 mt-8 text-xs border-t border-gray-200 pt-6">
        © 2019 Upturn Opportunities Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}