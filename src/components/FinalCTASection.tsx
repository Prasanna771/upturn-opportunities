"use client";
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function FinalCTASection() {
    return (
        <motion.section 
            // CHANGED: Background is now a light blue to make it stand out
            className="py-24 my-16 text-center bg-blue-50 rounded-lg"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            <div className="max-w-3xl mx-auto px-6">
                <motion.h2 
                    className="text-4xl md:text-5xl font-bold mb-6 font-heading"
                    style={{ color: '#17134d' }}
                    variants={itemVariants}
                >
                    Ready to Realize Your Vision?
                </motion.h2>
                <motion.p 
                    className="text-lg md:text-xl text-gray-800 mb-10"
                    variants={itemVariants}
                >
                    Let's start the conversation. Whether you're looking to transform your business or take the next step in your career, our team is ready to help you achieve the exceptional.
                </motion.p>
                <motion.a
                    href="/contact"
                    className="inline-block px-10 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 font-heading"
                    variants={itemVariants}
                >
                    Schedule a Consultation
                </motion.a>
            </div>
        </motion.section>
    );
}