"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection() {
  // --- Text content for the hero section ---
  const headingLine1 = "Your Ambition, Our Expertise.";
  const headingLine2 = "One Shared Vision.";
  const fullTagline = "Consulting with Clarity. Recruiting with Purpose.";

  // --- Animation trigger states ---
  const [animateHeading, setAnimateHeading] = useState(false);
  const [animateTagline, setAnimateTagline] = useState(false);

  useEffect(() => {
    const headingTimer = setTimeout(() => setAnimateHeading(true), 200);
    const taglineTimer = setTimeout(() => setAnimateTagline(true), 1800);

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(taglineTimer);
    };
  }, []);

  // --- Jumbly Heading Animation Logic (FIXED) ---
  const JumblyHeading = useMemo(() => {
    if (!animateHeading) return null;
    const renderLine = (lineText: string) => {
      return lineText.split("").map((char, index) => {
        
        // The fix is applied here:
        const style = {
          '--initial-rotate': `${Math.random() * 60 - 30}deg`,
          '--animation-duration': `${Math.random() * 0.5 + 1.2}s`,
        } as React.CSSProperties; // Cast the object to the expected type.

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
      </>
    );
  }, [animateHeading, headingLine1, headingLine2]);

  // --- Animated Tagline with Framer Motion ---
  const taglineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const AnimatedTagline = (
    <AnimatePresence>
      {animateTagline && (
        <motion.p
          className="text-2xl md:text-3xl text-gray-200 font-medium"
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {fullTagline.split(" ").map((word, index) => (
            <motion.span key={index} variants={wordVariants} className="inline-block mr-2">
              {word}
            </motion.span>
          ))}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Professionals in a modern office environment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-blue-400 mb-8 drop-shadow-lg leading-tight">
          {JumblyHeading}
        </h1>

        <div className="h-12"> {/* Container to prevent layout shift */}
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