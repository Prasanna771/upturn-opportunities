// src/components/AudienceSection.tsx

"use client";
import { motion } from 'framer-motion';

export default function AudienceSection() {
    return (
        <motion.section
            className="py-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <div className="text-center mb-16">
                {/* CHANGED: Updated text colors for the white background */}
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Your Partner in <span className="text-brand-blue">Growth & Opportunity</span></h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* CHANGED: Updated card background and text colors */}
                <div className="bg-slate-50 border border-slate-200 p-10 rounded-lg text-center flex flex-col items-center">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">For Businesses</h3>
                    <p className="text-xl text-slate-700 max-w-md">Overcome your biggest challenges. We provide the strategic clarity and top-tier talent you need to outpace the competition and build a resilient, high-performing organization.</p>
                </div>
                {/* CHANGED: Updated card background and text colors */}
                <div className="bg-slate-50 border border-slate-200 p-10 rounded-lg text-center flex flex-col items-center">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">For Professionals</h3>
                    <p className="text-xl text-slate-700 max-w-md">Your ambition deserves the right opportunity. We connect you with forward-thinking companies where you can make a real impact and achieve your career aspirations.</p>
                </div>
            </div>
        </motion.section>
    );
}