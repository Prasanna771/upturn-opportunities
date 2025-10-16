"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Application'}
    </button>
  );
}

// --- Job Application Form Modal ---
const JobApplicationModal = ({ jobs, onClose }: { jobs: typeof mockJobs; onClose: () => void }) => {
  const initialState: FormState = { success: false, message: "" };
  const [state, formAction] = useActionState(handleJobApplication, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [resumeName, setResumeName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [state, onClose]);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File is too large. Maximum size is 5MB.');
        e.target.value = '';
        return;
      }
      setResumeName(file.name);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-lg relative text-black dark:text-white">
        {state.success ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-4">✅ {state.message}</h3>
            <p className="text-gray-800 dark:text-gray-200 mb-2">Thank you! We've received your application.</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">Note: Our recruitment team will review your application and get in touch if your profile matches our requirements.</p>
            <button onClick={onClose} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">Close</button>
          </div>
        ) : (
          <>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"><X size={24} /></button>
            <h2 className="text-3xl font-bold font-heading mb-6 text-center text-[#17134d] dark:text-white">Apply Now</h2>
            <form ref={formRef} action={formAction} className="space-y-4">
               <input type="hidden" name="phone" value={`${countryCode} ${phone}`} />
               <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Full Name</label>
                <input type="text" name="name" required className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Job Role</label>
                <select name="jobTitle" required defaultValue="" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
                  <option value="" disabled>Select a Job</option>
                  {jobs.map(job => <option key={job.id} value={job.title}>{job.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Phone Number</label>
                <div className="flex">
                  <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="p-2 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-100 dark:bg-gray-600">
                    <option value="+91">IN (+91)</option>
                    <option value="+1">US (+1)</option>
                  </select>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="[0-9]{10}" title="Please enter a 10-digit phone number" placeholder="10-digit phone number" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-r-md bg-white dark:bg-gray-700" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email</label>
                <input type="email" name="email" required className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" />
              </div>
              <div>
                <label htmlFor="resume-upload" className="flex items-center gap-3 w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-blue-500 hover:text-blue-500">
                  <UploadCloud size={18} />
                  <span>{resumeName || 'Upload Resume (Max 5MB)'}</span>
                </label>
                <input id="resume-upload" type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleResumeChange} required className="hidden" />
              </div>
              <SubmitButton />
              {state.message && !state.success && <p className="text-red-500 text-center font-semibold">❌ {state.message}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};


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
  const howItWorksContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const howItWorksItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <main className="bg-white dark:bg-black">
        <motion.header 
          className="relative h-96 md:h-[500px] flex items-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/jobs-header.jpg"
            alt="Find your next opportunity"
            fill
            className="object-cover z-[-1]"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex justify-start">
            <motion.div 
              className="max-w-xl text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
                Find Your Next Opportunity
              </h1>
              <p className="mt-4 text-lg md:text-xl">
                At Upturn Opportunities, we believe every career deserves a great start — and every professional deserves the right opportunity.
              </p>
            </motion.div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
          
          <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-[#17134d] dark:text-white">Why Apply Through Upturn?</h2>
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div variants={fadeInUpItem} className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-600 dark:border-blue-500 shadow-md">
                    <h3 className="text-xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">Verified Openings</h3>
                    <p className="text-black dark:text-gray-300">Every job is verified and comes directly from trusted employers.</p>
                </motion.div>
                <motion.div variants={fadeInUpItem} className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-600 dark:border-blue-500 shadow-md">
                    <h3 className="text-xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">Diverse Domains</h3>
                    <p className="text-black dark:text-gray-300">Explore roles in IT, Cloud, Software Development, Data, and more.</p>
                </motion.div>
                <motion.div variants={fadeInUpItem} className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-600 dark:border-blue-500 shadow-md">
                    <h3 className="text-xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">Career Growth</h3>
                    <p className="text-black dark:text-gray-300">We match you with opportunities that align with your skills and goals.</p>
                </motion.div>
                <motion.div variants={fadeInUpItem} className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-600 dark:border-blue-500 shadow-md">
                    <h3 className="text-xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">End-to-End Support</h3>
                    <p className="text-black dark:text-gray-300">From application to onboarding, our team ensures a smooth process.</p>
                </motion.div>
            </motion.div>
          </section>

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

          {/* How It Works Section (RESTORED) */}
          <motion.section 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={howItWorksContainer}
          >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-[#17134d] dark:text-white">How It Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <motion.div variants={howItWorksItem} className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full font-bold text-2xl mb-4">1</span>
                      <h3 className="text-xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">Browse Openings</h3>
                      <p className="text-black dark:text-gray-300">Explore current listings that match your interests.</p>
                  </motion.div>
                  <motion.div variants={howItWorksItem} className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full font-bold text-2xl mb-4">2</span>
                      <h3 className="text-xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">Apply Easily</h3>
                      <p className="text-black dark:text-gray-300">Submit your resume directly through our platform.</p>
                  </motion.div>
                  <motion.div variants={howItWorksItem} className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full font-bold text-2xl mb-4">3</span>
                      <h3 className="text-xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">Get Matched</h3>
                      <p className="text-black dark:text-gray-300">Our team connects your profile with suitable employers.</p>
                  </motion.div>
                  <motion.div variants={howItWorksItem} className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full font-bold text-2xl mb-4">4</span>
                      <h3 className="text-xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">Start Your Journey</h3>
                      <p className="text-black dark:text-gray-300">Begin your professional growth with a trusted company.</p>
                  </motion.div>
              </div>
          </motion.section>
        </div>
      </main>

      {isModalOpen && <JobApplicationModal jobs={mockJobs} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}