"use client";
import { motion, Variants } from 'framer-motion';

// Animation variants for staggering the cards
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};


export default function AudienceSection() {
    return (
        <motion.section
            className="py-24 bg-white dark:bg-black"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            {/* CHANGED: Added a container div to constrain the content width */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 
                        className="text-4xl md:text-5xl font-bold font-heading text-[#17134d] dark:text-white"
                    >
                        Your Partner in <span className="text-blue-600">Growth & Opportunity</span>
                    </h2>
                </div>
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* For Businesses Card */}
                    <motion.div 
                        className="p-10 rounded-lg text-center flex flex-col items-center bg-slate-50 dark:bg-gray-800 border border-[#17134d] dark:border-blue-800 shadow-[0_0_20px_rgba(23,19,77,0.40)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: "0px 10px 35px rgba(23,19,77,0.35)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 
                            className="text-3xl font-bold mb-4 font-heading text-[#17134d] dark:text-white"
                        >
                            For Businesses
                        </h3>
                        <p className="text-xl text-gray-900 dark:text-gray-300 max-w-md">Overcome your biggest challenges. We provide the strategic clarity and top-tier talent you need to outpace the competition and build a resilient, high-performing organization.</p>
                    </motion.div>
                    
                    {/* For Professionals Card */}
                    <motion.div 
                        className="p-10 rounded-lg text-center flex flex-col items-center bg-slate-50 dark:bg-gray-800 border border-[#17134d] dark:border-blue-800 shadow-[0_0_20px_rgba(23,19,77,0.40)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: "0px 10px 35px rgba(23,19,77,0.35)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 
                            className="text-3xl font-bold mb-4 font-heading text-[#17134d] dark:text-white"
                        >
                            For Professionals
                        </h3>
                        <p className="text-xl text-gray-900 dark:text-gray-300 max-w-md">Your ambition deserves the right opportunity. We connect you with forward-thinking companies where you can make a real impact and achieve your career aspirations.</p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}