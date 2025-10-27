"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from 'framer-motion';
import React from 'react';

export default function HeroSection() {
  const headingLines = [
    "Your Ambition,",
    "Our Expertise,",
    "One Shared Vision."
  ];

  const fullTagline = "Turning Talent into Opportunity.";

  const [animateContent, setAnimateContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const headingContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      },
    },
  };

  const headingLineVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    },
  };

  const taglineVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: headingLines.length * 0.2 + 0.5
      }
    },
  };

  return (
    // CHANGED: Height is now 50vh on mobile and 80vh on desktop
    <div className="relative flex items-center justify-center h-[50vh] md:h-[90vh] overflow-hidden bg-white">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-10"> 
        <Image
          src="/background.jpg" // Make sure this image exists in your /public folder
          alt="Abstract 4K ultra-HD plexus network on a dark navy blue background"
          fill
          className="object-cover object-center"
          priority
          unoptimized={true} 
          // REMOVED: Blur filter style is gone
        />
        {/* Semi-transparent dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-12 text-left pt-20">
        <div className="max-w-4xl mx-auto md:mx-0">
          <AnimatePresence>
            {animateContent && (
              <motion.div
                variants={headingContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {headingLines.map((line, index) => (
                  <motion.h1
                    key={index}
                    variants={headingLineVariants}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight font-heading text-white"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
                  >
                    {line}
                  </motion.h1>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {animateContent && (
              <motion.p
                className="text-base sm:text-lg md:text-xl font-medium text-white mt-4"
                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
                variants={taglineVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {fullTagline}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}