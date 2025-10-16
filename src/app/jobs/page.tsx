"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { handleJobApplication, FormState } from '../actions';

// --- Mock Data ---
const mockJobs = [
    { id: 1, title: "Senior Full Stack Developer", company: "Tech Solutions Inc.", location: "Hyderabad, India", skills: ["React", "Node.js", "AWS"] },
    { id: 2, title: "Cloud Engineer (Azure)", company: "Innovate Cloud Co.", location: "Bengaluru, India", skills: ["Azure", "Terraform", "Kubernetes"] },
    { id: 3, title: "Data Analyst", company: "Data Insights LLC", location: "Pune, India", skills: ["SQL", "Python", "Power BI"] },
    { id: 4, title: "QA Automation Engineer", company: "QualityFirst Software", location: "Remote", skills: ["Selenium", "Java", "CI/CD"] },
];
const jobCategories = [
    { category: "Software Development", skills: ["Java", "React", "Spring Boot", "Node.js", "Python"] },
    { category: "Cloud Technologies", skills: ["Azure", "AWS", "GCP", "DevOps"] },
    { category: "Data & Analytics", skills: ["Data Engineer", "BI Analyst", "ML Engineer"] },
    { category: "Quality Assurance", skills: ["Manual & Automation Testing"] },
    { category: "Infrastructure & Support", skills: ["System Admin", "Network Engineer", "IT Support"] },
];

// --- Submit Button ---
function SubmitButton() { /* your existing submit button code */ }

// --- Job Application Modal ---
const JobApplicationModal = ({ jobs, onClose }: { jobs: typeof mockJobs; onClose: () => void }) => { /* your existing modal code */ };

// --- Main Jobs Page ---
export default function JobsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const fadeInUpItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <main className="bg-white dark:bg-black">
        {/* --- Hero Header --- */}
        <motion.header 
          className="relative h-96 md:h-[500px] flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Image */}
          <Image
            src="/images/jobs-header.jpg"
            alt="Find your next opportunity"
            fill
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          {/* Text Content */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex justify-start">
            <motion.div 
              className="max-w-xl text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight text-white">
                Find Your Next Opportunity
              </h1>
              <p className="mt-4 text-base md:text-lg text-white">
                At Upturn Opportunities, we believe every career deserves a great start — and every professional deserves the right opportunity. Explore openings that match your passion, skills, and goals.
              </p>
            </motion.div>
          </div>
        </motion.header>

        {/* --- Page Content --- */}
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
          {/* Why Apply Section */}
          <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-[#17134d] dark:text-white">Why Apply Through Upturn?</h2>
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { title: "Verified Openings", text: "Every job is verified and comes directly from trusted employers." },
                { title: "Diverse Domains", text: "Explore roles in IT, Cloud, Software Development, Data, and more." },
                { title: "Career Growth", text: "We match you with opportunities that align with your skills and goals." },
                { title: "End-to-End Support", text: "From application to onboarding, our team ensures a smooth process." }
              ].map((item) => (
                <motion.div key={item.title} variants={fadeInUpItem} className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-600 dark:border-blue-500 shadow-md">
                  <h3 className="text-xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">{item.title}</h3>
                  <p className="text-black dark:text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Current Openings Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-10 text-[#17134d] dark:text-white">Current Openings</h2>
            <motion.div 
              className="space-y-4 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {mockJobs.map(job => (
                <motion.div key={job.id} variants={fadeInUpItem} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 font-heading">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 my-1">{job.company} - {job.location}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.map(skill => <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-900/50 dark:text-blue-300">{skill}</span>)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-12">
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                </button>
            </div>
          </section>

          {/* Featured Job Categories */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-10 text-[#17134d] dark:text-white">Featured Job Categories</h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {jobCategories.map(cat => (
                <motion.div key={cat.category} variants={fadeInUpItem} className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-100 dark:hover:from-gray-800 dark:hover:to-blue-900/20">
                  <h3 className="text-lg font-bold text-blue-600 font-heading mb-3">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{skill}</span>)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      </main>

      {isModalOpen && <JobApplicationModal jobs={mockJobs} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
