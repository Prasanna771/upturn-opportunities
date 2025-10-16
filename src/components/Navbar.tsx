"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // This effect handles closing the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo2.jpg"
            alt="Upturn Opportunities Logo"
            width={180}
            height={4}
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-800 dark:text-gray-200">
          <li><Link href="/" className="font-medium hover:text-blue-500 transition-colors">Home</Link></li>
          <li><Link href="/about" className="font-medium hover:text-blue-500 transition-colors">About</Link></li>
          <li><Link href="/services" className="font-medium hover:text-blue-500 transition-colors">Services</Link></li>
          <li><Link href="/jobs" className="font-medium hover:text-blue-500 transition-colors">Jobs</Link></li>
          <li><Link href="/contact" className="font-medium hover:text-blue-500 transition-colors">Contact</Link></li>
        </ul>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 dark:text-gray-200">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-4 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 md:hidden"
            >
              <ul className="flex flex-col p-2">
                <li><Link href="/" className="block w-full text-left p-3 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li><Link href="/about" className="block w-full text-left p-3 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                <li><Link href="/services" className="block w-full text-left p-3 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
                <li><Link href="/jobs" className="block w-full text-left p-3 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>Jobs</Link></li>
                <li><Link href="/contact" className="block w-full text-left p-3 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}