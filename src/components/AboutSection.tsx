"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Building2, BriefcaseBusiness } from 'lucide-react'; 

// Data for the "Why Choose Us" section
const features = [
  {
    title: "Trusted Network",
    text: "Our vast and diverse talent network ensures access to pre-vetted candidates who meet both technical and cultural requirements.",
  },
  {
    title: "Personalized Support",
    text: "We take the time to understand your organization's goals, culture, and challenges to ensure our services align perfectly with your needs.",
  },
  {
    title: "Quality-First Approach",
    text: "Each candidate undergoes a multi-step screening process to validate skills, experience, and attitude, ensuring every hire is a long-term asset.",
  },
  {
    title: "End-to-End Partnership",
    text: "From the initial consultation to post-placement follow-up, we provide complete lifecycle support, building relationships that drive success.",
  },
];

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutSection = () => {
  return (
    <div className="overflow-x-hidden bg-white dark:bg-black">
      {/* --- Hero Section --- */}
      <motion.section
        className="relative h-96 md:h-[500px] flex items-center justify-start p-6 md:p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/growth_chart.png"
          alt="Diverse team meeting"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-left max-w-4xl text-white">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold font-heading mb-4 leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            About Upturn Opportunities
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-light font-sans"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Connecting Talent with Opportunity
          </motion.p>
        </div>
      </motion.section>

      {/* --- Main Content Sections --- */}
      <div className="max-w-7xl mx-auto px-6 space-y-24 my-24">
        
        {/* --- Who We Are Section (FIXED: Changed to 'animate' to load first) --- */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={sectionVariants}
          initial="hidden"
          animate="visible" // <-- THIS WAS CHANGED
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={slideInLeft} className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-[#17134d] dark:text-white">
              Who We Are
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              At Upturn Opportunities, we believe every individual deserves the right platform to grow — and every organization deserves the right talent to thrive. We're your growth partner, connecting skilled professionals with forward-thinking companies.
            </p>
          </motion.div>
          <motion.div variants={slideInRight} className="text-left md:text-right">
            <p className="text-2xl md:text-3xl font-semibold text-blue-600 border-l-4 md:border-l-0 md:border-r-4 border-blue-600 pl-6 md:pl-0 md:pr-6">
              Together, we build bridges between potential and success.
            </p>
          </motion.div>
        </motion.section>

        {/* --- What We Do Section (This will animate on scroll) --- */}
        <motion.section
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-[#17134d] dark:text-white">
            What We Do
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-300 max-w-4xl mx-auto mb-12">
            Our expertise spans recruitment, staffing, and career development — ensuring that both employers and candidates achieve their goals effortlessly.
          </p>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={sectionVariants}
          >
            {/* Card for Companies */}
            <motion.div 
              className="p-8 bg-slate-50 dark:bg-gray-800 rounded-lg border-2 border-[#17134d] dark:border-blue-800 shadow-[0_0_20px_rgba(23,19,77,0.40)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)] text-left"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0px 10px 35px rgba(23,19,77,0.35)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-[#17134d] dark:text-blue-500"><Building2 size={40} /></div>
                <h3 className="text-2xl font-semibold font-heading text-blue-600">For Companies</h3>
              </div>
              <p className="text-black dark:text-gray-300">We deliver pre-screened, skilled, and dependable talent that drives business outcomes.</p>
            </motion.div>
            {/* Card for Job Seekers */}
            <motion.div 
              className="p-8 bg-slate-50 dark:bg-gray-800 rounded-lg border-2 border-[#17134d] dark:border-blue-800 shadow-[0_0_20px_rgba(23,19,77,0.40)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)] text-left"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0px 10px 35px rgba(23,19,77,0.35)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-[#17134d] dark:text-blue-500"><BriefcaseBusiness size={40} /></div>
                <h3 className="text-2xl font-semibold font-heading text-blue-600">For Job Seekers</h3>
              </div>
              <p className="text-black dark:text-gray-300">We guide you toward roles that fit your skills, passions, and career growth aspirations.</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* --- Why Choose Us Section (This will animate on scroll) --- */}
        <motion.section
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-12 text-[#17134d] dark:text-white">
            Why Choose Us
          </h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={sectionVariants}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="p-8 bg-slate-50 dark:bg-gray-800 rounded-lg border-2 border-[#17134d] dark:border-blue-800 shadow-[0_0_20px_rgba(23,19,77,0.40)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)] text-left"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0px 10px 35px rgba(23,19,77,0.35)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-semibold font-heading mb-3 text-blue-600">{feature.title}</h3>
                <p className="text-black dark:text-gray-300">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
};

export default AboutSection;