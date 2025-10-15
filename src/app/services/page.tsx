"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

// --- Service Data with Image Paths ---
const services = [
  { imageSrc: "/images/services/it-staffing.jpg", title: "IT Staffing Solutions", description: "We specialize in connecting companies with top-tier IT talent, ensuring you have access to pre-vetted candidates who match your technical needs and company culture." },
  { imageSrc: "/images/services/rpo.jpg", title: "Recruitment Process Outsourcing (RPO)", description: "Our RPO services allow you to outsource the entire recruitment process. We manage the hiring lifecycle efficiently, reducing your time-to-hire while ensuring quality." },
  { imageSrc: "/images/services/cloud-hiring.jpg", title: "Cloud & Technology Hiring", description: "We focus on sourcing candidates skilled in cloud platforms like AWS, Azure, and Google Cloud, as well as DevOps, AI/ML, and other emerging tech domains." },
  { imageSrc: "/images/services/contract-staffing.jpg", title: "Contract & Permanent Staffing", description: "Whether you require temporary staff for short-term projects or permanent hires for strategic roles, we provide flexible and reliable staffing support to keep your business moving." },
  { imageSrc: "/images/services/executive-search.jpg", title: "Executive Search & Leadership Hiring", description: "Finding the right leaders is critical. Our executive search service identifies and engages senior-level professionals who align with your organization’s vision and leadership needs." },
  { imageSrc: "/images/services/talent-consultation.jpg", title: "Talent Consultation & Advisory", description: "Beyond recruitment, we provide talent strategy consultation to help you optimize workforce planning, skills development, and retention strategies for the long term." },
];

// --- NEW Animation Variants for side-sliding effect ---
const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};

export default function ServicesPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* --- Page Header (Unchanged) --- */}
      <motion.header 
        className="relative h-96 md:h-[500px] flex items-center justify-start text-white p-6 md:p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/services.jpg"
          alt="Our Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
            <motion.h1 
                className="text-4xl md:text-6xl font-bold font-heading"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                Our Services
            </motion.h1>
            <motion.p 
                className="mt-4 text-lg md:text-xl max-w-3xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
                At Upturn Opportunities, we provide end-to-end staffing solutions designed to help businesses find the right talent while enabling professionals to grow their careers.
            </motion.p>
        </div>
      </motion.header>

      {/* --- Services Alternating Layout (REDESIGNED) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-16 md:space-y-24">
        {services.map((service, index) => (
          // This wrapper handles the left/right alignment
          <div key={service.title} className={`flex w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <motion.div
              className="w-full md:w-3/4 lg:w-2/3 bg-slate-50 rounded-lg overflow-hidden flex flex-col border border-[#17134d] shadow-[0_0_20px_rgba(23,19,77,0.40)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              whileHover={{ y: -5, boxShadow: "0px 10px 35px rgba(23,19,77,0.35)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Image at the top of the card */}
              <div className="relative w-full h-56">
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Text content in the card body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 
                  className="text-2xl font-bold font-heading mb-3" 
                  style={{ color: '#17134d' }}
                >
                  {service.title}
                </h3>
                <p className="text-black text-base leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </section>
    </main>
  );
}