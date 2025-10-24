"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function IntroSection() {
  const cinematicText = "In today's dynamic market, growth isn't just about having the right strategy—it's about having the right people to execute it. At Upturn Opportunities, we bridge that critical gap. We are more than consultants and recruiters; we are dedicated partners invested in your success. Your vision becomes our shared mission.";

  // Animation variants for the cinematic text
  const sentenceVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
  };
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
  };

  return (
    // CHANGED: Removed dark:bg-gray-900
    <section className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <motion.p
          // CHANGED: Removed dark:text-gray-300
          className="font-sans text-center font-medium leading-relaxed text-[#17134d] text-lg md:text-xl"
          variants={sentenceVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cinematicText.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              <motion.span variants={wordVariants} className="inline-block">{word}</motion.span>{' '}
            </React.Fragment>
          ))}
        </motion.p>
      </div>
    </section>
  );
}