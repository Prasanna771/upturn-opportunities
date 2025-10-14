// src/components/FinalCTASection.tsx

"use client";
import { motion } from 'framer-motion';

export default function FinalCTASection() {
    return (
        <motion.section 
            className="py-24 my-16 text-center bg-gray-800 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6">
                    Ready to Realize Your Vision?
                </h2>
                <p className="text-lg md:text-xl text-slate-300 mb-10">
                    Let&#39;s start the conversation. Whether you&#39;re looking to transform your business or take the next step in your career, our team is ready to help you achieve the exceptional.
                </p>
                <a
                    href="/contact"
                    className="px-10 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
                >
                    Schedule a Consultation
                </a>
            </div>
        </motion.section>
    );
}
