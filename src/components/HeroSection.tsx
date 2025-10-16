"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from 'framer-motion';
import React from 'react';

export default function HeroSection() {
  const headingLine1 = "Your Ambition";
  const headingLine2 = "Our Expertise";
  const headingLine3 = "One Shared Vision.";
  const fullTagline = "Consulting with Clarity. Recruiting with Purpose.";

  const [animateHeading, setAnimateHeading] = useState(false);
  const [animateTagline, setAnimateTagline] = useState(false);

  useEffect(() => {
    const headingTimer = setTimeout(() => setAnimateHeading(true), 200);
    const taglineTimer = setTimeout(() => setAnimateTagline(true), 2200);

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(taglineTimer);
    };
  }, []);

  const JumblyHeading = useMemo(() => {
    if (!animateHeading) return null;
    const renderLine = (lineText: string) => {
      return lineText.split("").map((char, index) => {
        const style = {
          '--initial-rotate': `${Math.random() * 60 - 30}deg`,
          '--animation-duration': `${Math.random() * 0.5 + 1.2}s`,
        } as React.CSSProperties;

        return (
          <span key={index} className="jumbly-char" style={style}>
            {char === " " ? "\u00A0" : char}
          </span>
        );
      });
    };
    return (
      <>
        <span className="block">{renderLine(headingLine1)}</span>
        <span className="block">{renderLine(headingLine2)}</span>
        <span className="block">{renderLine(headingLine3)}</span>
      </>
    );
  }, [animateHeading]);

  // --- The AnimatedTagline is defined here, with the smaller font sizes ---
  const taglineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const AnimatedTagline = (
    <AnimatePresence>
      {animateTagline && (
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium"
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {fullTagline.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
              {' '}
            </React.Fragment>
          ))}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background2.jpg"
          alt="Professionals in a modern office environment"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-left">
        <h1 
          className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white mb-8 drop-shadow-lg leading-none font-heading"
        >
          {JumblyHeading}
        </h1>

        {/* --- And the AnimatedTagline is rendered here --- */}
        <div className="h-12">
          {AnimatedTagline}
        </div>
      </div>

      {/* CSS for Jumbly Heading */}
      <style jsx global>{`
        .jumbly-char {
          display: inline-block;
          opacity: 0;
          animation-name: jumbleFall;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation-duration: var(--animation-duration);
        }
        @keyframes jumbleFall {
          0% {
            opacity: 0;
            transform: translateY(-150vh) rotate(var(--initial-rotate)) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}