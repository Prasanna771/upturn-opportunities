"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// --- Client Logo Data ---
const clientLogos = [
  { name: "Workday", src: "/logos/workday.png" },
  { name: "T-Mobile", src: "/logos/t-mobile.png" },
  { name: "Walmart", src: "/logos/walmart.png" },
  { name: "HCLTech", src: "/logos/hcl.png" },
  { name: "Jefferies", src: "/logos/jefferies.png" },
  { name: "Apollo ISG", src: "/logos/apollo-isg.png" },
  { name: "Revron", src: "/logos/revon.png" },
  { name: "Gusto", src: "/logos/gusto.png" },
  { name: "Fbfcu", src: "/logos/rbrcu.png" },
];

const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos]; 

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function ClientLogosSection() {
  return (
    <motion.section
      // CHANGED: Added dark mode background
      className="py-16 md:py-24 bg-white dark:bg-black overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 
          // CHANGED: Replaced inline style with classes for dark mode support
          className="text-4xl md:text-5xl font-bold font-heading text-[#17134d] dark:text-white"
        >
          Our Esteemed Clients & Partners
        </h2>
        <p className="text-lg md:text-xl text-black dark:text-gray-300 mt-4">
          Trusted by leading companies across various industries.
        </p>
      </div>

      <div className="relative w-full overflow-hidden whitespace-nowrap py-4">
        <div className="logo-carousel inline-block animate-scroll-logos">
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={index} 
              // CHANGED: Added dark mode classes for background, border, and shadow
              className="inline-flex flex-col items-center justify-center mx-8 p-4 bg-slate-50 dark:bg-gray-800 border-2 border-[#17134d] dark:border-blue-800 shadow-[0_0_15px_rgba(23,19,77,0.20)] dark:shadow-[0_0_15px_rgba(59,130,246,0.25)] rounded-lg w-36 h-36 flex-shrink-0"
              style={{ verticalAlign: 'middle' }}
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-200 font-sans">{logo.name}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollLogos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%); /* Scrolls one set of original logos */
          }
        }
        .animate-scroll-logos {
          animation: scrollLogos 60s linear infinite;
        }
      `}</style>
    </motion.section>
  );
}