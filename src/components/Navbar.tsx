// src/components/Navbar.tsx

"use client";

import Link from 'next/link';
import Image from 'next/image'; // Import the Image component

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4 text-gray-800">
        
        {/* Logo and Company Name (Now using Image) */}
        <Link href="/" className="flex items-center space-x-3">
          {/* Add your logo here */}
          <Image
            src="/logo2.jpg" // Path to your logo in the public directory
            alt="Upturn Opportunities Logo"
            width={180} // Adjust width as needed
            height={1} // Adjust height as needed, will maintain aspect ratio
            priority // Load this image with high priority as it's part of the LCP
          />
          {/* Removed the text "Upturn Opportunities" as per request */}
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li><Link href="/" className="font-medium hover:text-blue-500 transition-colors">Home</Link></li>
          <li><Link href="/about" className="font-medium hover:text-blue-500 transition-colors">About</Link></li>
          <li><Link href="/services" className="font-medium hover:text-blue-500 transition-colors">Services</Link></li>
          <li><Link href="/jobs" className="font-medium hover:text-blue-500 transition-colors">Jobs</Link></li>
          <li><Link href="/contact" className="font-medium hover:text-blue-500 transition-colors">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}