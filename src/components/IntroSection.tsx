"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function IntroSection() {
  const cinematicText = "In today's dynamic market, growth isn't just about having the right strategy—it's about having the right people to execute it. At Upturn Opportunities, we bridge that critical gap. We are more than consultants and recruiters; we are dedicated partners invested in your success. Your vision becomes our shared mission.";

  const sentenceVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
  };
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
  };

  return (
    // This section is now full-width, with a dark gray background in dark mode
    <section className="py-24 bg-white dark:bg-gray-900 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="font-sans text-center font-medium leading-relaxed text-[#17134d] dark:text-gray-300 text-lg md:text-xl"
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