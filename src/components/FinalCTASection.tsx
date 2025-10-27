"use client";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FinalCTASection() {
  return (
    <motion.section
      className="py-24 mt-20 text-center bg-white rounded-2xl shadow-md"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 font-heading text-[#17134d]"
          variants={itemVariants}
        >
          Let’s Build the <span className="text-blue-600">Future of Work</span> Together
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-gray-700 mb-10 leading-relaxed"
          variants={itemVariants}
        >
          Whether you're scaling your business with exceptional talent or
          advancing your career to new heights, Upturn Opportunities is your
          trusted partner in achieving sustainable success.
        </motion.p>

        <motion.a
          href="/contact"
          className="inline-block px-10 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300 font-heading"
          variants={itemVariants}
        >
          Get in Touch
        </motion.a>
      </div>
    </motion.section>
  );
}
