"use client";

import React, { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { handleContactForm, FormState } from '@/app/actions';
import { Linkedin, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';

// --- Reusable Submit Button ---
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
    >
      {pending ? 'Sending...' : 'Submit Now'}
    </button>
  );
}

export default function ContactPage() {
  const initialState: FormState = { success: false, message: '' };
  const [state, formAction] = useActionState(handleContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <main className="bg-white dark:bg-black">
      
      {/* --- Hero Header --- */}
      <motion.header 
        className="relative h-96 md:h-[500px] flex items-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/contact-header.jpg"
          alt="Get in touch with us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight">
              Get in Touch
            </h1>
            <p className="mt-4 text-md md:text-lg lg:text-xl">
              We’d love to hear from you! Whether you have a question about our services or need support, our team is ready to answer all your questions.
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* --- Centered Content Container --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* --- Two-Column Layout for Info and Form --- */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="md:col-span-2 space-y-8 md:mt-10">
            <div className="flex items-start gap-4">
              <Mail size={32} className="text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold font-heading text-[#17134d] dark:text-white">Email</h3>
                <p className="text-black dark:text-gray-300">support@upturnopportunities.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={32} className="text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold font-heading text-[#17134d] dark:text-white">Phone</h3>
                <p className="text-black dark:text-gray-300">+91 95734 15317</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={32} className="text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold font-heading text-[#17134d] dark:text-white">Address</h3>
                <p className="text-black dark:text-gray-300">
                  15-5-25/1, Brundhavan Colony, Siddipet, Telangana, India
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={32} className="text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold font-heading text-[#17134d] dark:text-white">Office Hours</h3>
                <p className="text-black dark:text-gray-300">
                  Mon-Fri: 9am-6pm<br/>Sat: 10am-2pm
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-2 text-[#17134d] dark:text-white">
              Send Us a Message
            </h2>
            <p className="text-lg text-black dark:text-gray-300 mb-6">
              Have a question or inquiry? Fill out the form and our team will get back to you.
            </p>
            <form 
              ref={formRef} 
              action={formAction} 
              className="space-y-6 bg-slate-50 dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md text-left"
            >
              <div>
                <label htmlFor="name" className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">Full Name</label>
                <input type="text" id="name" name="name" required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white" />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">Email Address</label>
                <input type="email" id="email" name="email" required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white" />
              </div>
              <div>
                <label htmlFor="phone" className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">Phone Number</label>
                <div className="flex">
                  <select name="countryCode" className="p-3 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-100 dark:bg-gray-600 text-black dark:text-white">
                    <option>IN +91</option>
                    <option>US +1</option>
                  </select>
                  <input type="tel" id="phone" name="phone" required pattern="[0-9]{10}" title="Please enter a 10-digit phone number" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-r-md bg-white dark:bg-gray-700 text-black dark:text-white" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">Message</label>
                <textarea id="message" name="message" rows={4} required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"></textarea>
              </div>
              <SubmitButton />
              
              {state.message && (
                <div className={`mt-4 text-center font-semibold ${state.success ? 'text-green-600' : 'text-red-500'}`}>
                  {state.message}
                </div>
              )}
            </form>
          </div>
        </section>
      </div>

      {/* --- Social Section (Full-Width) --- */}
      <section className="text-center py-16 bg-blue-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-[#17134d] dark:text-white">
              Stay Connected
            </h2>
            <p className="text-lg text-black dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Stay connected with us on social platforms to get updates on job openings, career tips, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
                <a href="https://www.linkedin.com/in/vinayredde" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-500 transition-colors">
                    LinkedIn
                </a>
                <a href="https://www.instagram.com/bommidi_prasanna" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-pink-600 transition-colors">
                    Instagram
                </a>
                <a href="mailto:prasannareddy771@gmail.com" className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-red-600 transition-colors">
                    Email
                </a>
            </div>
        </div>
      </section>
    </main>
  );
}
