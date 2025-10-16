"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

// --- Service Data with Image Paths ---
const services = [
  { imageSrc: "/images/services/it-staffing.jpg", title: "IT Staffing Solutions", description: "At Upturn Opportunities, we specialize in connecting organizations with top-tier IT professionals who are not only technically proficient but also a perfect cultural fit. Our team carefully vets every candidate through technical assessments and behavioral interviews to ensure your business gains reliable, skilled, and ready-to-contribute talent. Whether you’re building a development team, scaling IT operations, or hiring for niche technologies, we help you find the right match — faster and smarter." },
  { imageSrc: "/images/services/rpo.jpg", title: "Recruitment Process Outsourcing (RPO)", description: "Our Recruitment Process Outsourcing (RPO) model lets you focus on your core business while we manage the entire hiring lifecycle — from talent sourcing and screening to onboarding and post-hire follow-up. Acting as an extension of your HR team, we integrate proven recruitment strategies, tools, and networks to deliver cost-effective, scalable, and quality-driven hiring solutions. With our RPO services, you can significantly reduce time-to-hire, improve candidate quality, and strengthen your employer brand." },
  { imageSrc: "/images/services/cloud-hiring.jpg", title: "Cloud & Technology Hiring", description: "In today’s digital-first world, success depends on having the right technology talent. Our Cloud and Technology Hiring services specialize in sourcing experts across platforms like Microsoft Azure, Amazon Web Services (AWS), and Google Cloud Platform (GCP). From DevOps engineers to AI/ML specialists, data scientists, and cybersecurity professionals, we connect you with skilled individuals who drive digital transformation and innovation. Our deep technical expertise ensures every candidate we recommend can add value from day one." },
  { imageSrc: "/images/services/contract-staffing.jpg", title: "Contract & Permanent Staffing", description: "Every organization has unique workforce needs — and we’re here to meet them all through our Contract and Permanent Staffing solutions. Whether you need contract-based professionals for short-term projects or permanent hires for long-term success, we offer flexible staffing options aligned with your business objectives. We handle sourcing, background verification, payroll support, and compliance, ensuring a smooth and transparent hiring process that delivers dependable talent quickly and efficiently." },
  { imageSrc: "/images/services/executive-search.jpg", title: "Executive Search & Leadership Hiring", description: "Leadership defines culture, direction, and organizational success — and finding the right leaders requires precision. Through our Executive Search and Leadership Hiring services, we identify, attract, and engage senior professionals who align with your company’s mission, values, and vision. By combining market intelligence, discreet networking, and comprehensive evaluation, we connect you with visionary leaders who can drive innovation, growth, and long-term success." },
  { imageSrc: "/images/services/talent-consultation.jpg", title: "Talent Consultation & Advisory", description: "At Upturn Opportunities, we go beyond recruitment with our Talent Consultation and Advisory services. We help organizations develop sustainable talent strategies that align with their long-term goals. From workforce planning and skills gap analysis to succession planning and retention strategies, we provide actionable insights to strengthen your human capital. As your trusted advisors, we ensure your workforce remains competitive, agile, and future-ready in an ever-evolving market." },
];

// --- Animation Variants ---
const containerSlideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 } 
  },
};

const containerSlideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 } 
  },
};

const itemFadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServicesPage() {
  return (
    <main className="bg-white dark:bg-black overflow-x-hidden">
      {/* --- Page Header --- */}
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

      {/* --- Services Alternating Grid --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-24">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={index % 2 === 0 ? containerSlideInLeft : containerSlideInRight}
          >
            {/* Image Column */}
            <motion.div 
              className={`relative w-full h-80 rounded-2xl overflow-hidden shadow-xl ${index % 2 !== 0 ? 'md:order-last' : ''}`}
              variants={itemFadeIn}
            >
              <Image
                src={service.imageSrc}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </motion.div>
            
            {/* Text Content Column */}
            <motion.div 
              className="p-8 bg-slate-50 dark:bg-gray-800 rounded-lg border border-[#17134d] dark:border-blue-800 shadow-[0_0_20px_rgba(23,19,77,0.40)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
              variants={itemFadeIn}
            >
              <h3 
                className="text-3xl font-bold font-heading mb-4 text-[#17134d] dark:text-white"
              >
                {service.title}
              </h3>
              <p className="text-black dark:text-gray-300 text-lg leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}