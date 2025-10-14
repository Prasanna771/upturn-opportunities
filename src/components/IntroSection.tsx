"use client";
import { motion, Variants } from 'framer-motion'; // 1. Import the Variants type

export default function IntroSection() {
  // The paragraph text to be animated
  const text = "In today's dynamic market, growth isn't just about having the right strategy—it's about having the right people to execute it. At Upturn Opportunities, we bridge that critical gap. We are more than consultants and recruiters; we are dedicated partners invested in your success. Your vision becomes our shared mission.";

  // 2. Apply the Variants type to your animation objects
  const sentenceVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.03, // Controls the delay between each word
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring', // This is now correctly typed
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      className="py-24 text-center max-w-4xl mx-auto bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        One <span className="text-blue-600">Shared Vision</span> {/* Used standard Tailwind color */}
      </h2>

      <motion.p
        className="text-lg md:text-xl text-gray-700 leading-relaxed"
        variants={sentenceVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariants}
            className="inline-block" // Ensures proper wrapping
          >
            {/* 3. Add a space after the word for better text flow */}
            {word + " "}
          </motion.span>
        ))}
      </motion.p>
    </motion.section>
  );
}