"use client";

// CHANGED: Corrected the import statements
import React, { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { handleContactForm, FormState } from '@/app/actions';
import { Linkedin, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';

// --- Reusable Submit Button ---
function SubmitButton() {
  const { pending } = useFormStatus(); // This will now work correctly
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
    <main>
      {/* --- Hero Header --- */}
      <motion.header 
        className="relative h-96 md:h-[500px] flex items-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/contact-header.jpg"
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
            <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              We’d love to hear from you! Whether you have a question about our services or need support, our team is ready to answer all your questions.
            </p>
          </motion.div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* --- Contact Info Grid --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
                <Mail size={40} className="mx-auto mb-4 text-blue-600"/>
                <h3 className="text-xl font-bold font-heading mb-2" style={{color: '#17134d'}}>Email</h3>
                <p className="text-black">support@upturnopportunities.com</p>
            </div>
            <div className="p-6">
                <Phone size={40} className="mx-auto mb-4 text-blue-600"/>
                <h3 className="text-xl font-bold font-heading mb-2" style={{color: '#17134d'}}>Phone</h3>
                <p className="text-black">+91 95734 15317</p>
            </div>
            <div className="p-6">
                <MapPin size={40} className="mx-auto mb-4 text-blue-600"/>
                <h3 className="text-xl font-bold font-heading mb-2" style={{color: '#17134d'}}>Address</h3>
                <p className="text-black">15-5-25/1, Brundhavan colony, Siddipet, Telangana, India</p>
            </div>
            <div className="p-6">
                <Clock size={40} className="mx-auto mb-4 text-blue-600"/>
                <h3 className="text-xl font-bold font-heading mb-2" style={{color: '#17134d'}}>Office Hours</h3>
                <p className="text-black">Mon-Fri: 9am-6pm<br/>Sat: 10am-2pm</p>
            </div>
        </section>

        {/* --- Form Section --- */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4" style={{ color: '#17134d' }}>
            Send a Direct Message
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto mb-12">
            Have a question, partnership inquiry, or need recruitment support? Fill out the contact form and our team will get back to you within one business day.
          </p>
          
          <form ref={formRef} action={formAction} className="space-y-6 bg-slate-50 p-8 rounded-lg shadow-md max-w-xl mx-auto text-left">
            <div>
              <label htmlFor="name" className="block font-semibold text-gray-800 mb-2">Full Name</label>
              <input type="text" id="name" name="name" required className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold text-gray-800 mb-2">Email Address</label>
              <input type="email" id="email" name="email" required className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="phone" className="block font-semibold text-gray-800 mb-2">Phone Number</label>
              <input type="tel" id="phone" name="phone" required pattern="[0-9]{10}" title="Please enter a 10-digit phone number" className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="message" className="block font-semibold text-gray-800 mb-2">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full p-3 border border-gray-300 rounded-md"></textarea>
            </div>
            <SubmitButton />
            
            {state.message && (
              <div className={`mt-4 text-center font-semibold ${state.success ? 'text-green-600' : 'text-red-600'}`}>
                {state.message}
              </div>
            )}
          </form>
        </section>

        {/* --- Social Section --- */}
        <section className="text-center py-16 bg-blue-50 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4" style={{ color: '#17134d' }}>
              Let's Connect
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto mb-8">
              Stay connected with us on social platforms to get updates on job openings, career tips, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
                <a href="https://www.linkedin.com/in/vinayredde" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors">
                    LinkedIn
                </a>
                <a href="https://www.instagram.com/bommidi_prasanna" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-800 hover:text-pink-600 transition-colors">
                    Instagram
                </a>
                <a href="mailto:prasannareddy771@gmail.com" className="text-lg font-semibold text-gray-800 hover:text-red-600 transition-colors">
                    Email
                </a>
            </div>
        </section>

      </div>
    </main>
  );
}