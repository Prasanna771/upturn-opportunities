// app/contact/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Send } from 'lucide-react';
import { handleContactForm, FormState } from '../actions'; // Adjust path if needed

// --- Submit Button Component ---
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2 transition-colors"
    >
      {pending ? 'Sending...' : 'Send Message'}
      {!pending && <Send size={18} />}
    </button>
  );
}

// --- Main Contact Page ---
export default function ContactPage() {
  const initialState: FormState = { success: false, message: "" };
  const [state, formAction] = useActionState(handleContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setPhoneNumber('');
      setCountryCode('+91');
    }
  }, [state.success]);

  return (
    <main>
      {/* ✨ UPDATED: Header to show a clear background image */}
      <header className="relative py-28 md:py-36 overflow-hidden">
        {/* Layer 1: Background Image (z-0) */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/contact-header.jpg')" }}
        ></div>
        {/* Layer 2: Dark Overlay REMOVED */}
        {/* <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10"></div> */}
        
        {/* Layer 3: Content with Text Shadow for readability (z-20) */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-left">
          <div className="max-w-3xl">
            {/* ✨ Added drop-shadow-lg for text readability */}
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-white animate-slide-in-left drop-shadow-lg">
              Get in Touch with Us
            </h1>
            {/* ✨ Added drop-shadow-md for text readability */}
            <p 
              className="mt-4 text-lg text-gray-200 animate-slide-in-left drop-shadow-md" 
              style={{ animationDelay: '200ms' }}
            >
              We’d love to hear from you! Whether you’re a job seeker or an employer, Upturn Opportunities is here to help you connect, grow, and succeed — because every great partnership starts with a simple conversation.
            </p>
          </div>
        </div>
      </header>

      {/* --- Main Content Section (Info + Form) --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* --- Left Column: Contact Info --- */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h2 className="text-3xl font-bold font-heading text-slate-800 dark:text-slate-200">Contact Information</h2>
            
            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Email</h3>
                <a href="mailto:support@upturnopportunities.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 break-all">support@upturnopportunities.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Phone</h3>
                <a href="tel:+919573415317" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">+91 95734 15317</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Address</h3>
                <p className="text-gray-700 dark:text-gray-300">15-5-25/1, Brundhavan colony, Siddipet, Telangana, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Office Hours</h3>
                <p className="text-gray-700 dark:text-gray-300">Mon-Fri: 9am - 6pm</p>
                <p className="text-gray-700 dark:text-gray-300">Sat: 10am - 2pm</p>
              </div>
            </div>
          </div>

          {/* --- Right Column: Contact Form --- */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {state.success ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-green-600 mb-4">✅ Success!</h3>
                <p className="text-gray-800 dark:text-gray-200">{state.message}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold font-heading mb-6 text-slate-800 dark:text-slate-200">Send Us a Message</h2>
                <form ref={formRef} action={formAction} className="space-y-4">
                  <input type="hidden" name="phone" value={`${countryCode}${phoneNumber}`} />

                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Full Name</label>
                    <input id="name" type="text" name="name" required className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email</label>
                    <input id="email" type="email" name="email" required className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="phone-number" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Phone Number</label>
                    <div className="flex">
                      <select name="countryCode" onChange={(e) => setCountryCode(e.target.value)} value={countryCode} className="p-2 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-200">
                        <option value="+91">IN (+91)</option>
                        <option value="+1">US (+1)</option>
                      </select>
                      <input id="phone-number" type="tel" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required pattern="[0-9]{10}" title="Please enter a 10-digit phone number" placeholder="10-digit number" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-r-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Message</label>
                    <textarea id="message" name="message" rows={4} required className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  
                  <SubmitButton />
                  
                  {state.message && !state.success && (
                    <p className="text-red-600 text-center font-semibold mt-4">❌ {state.message}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* --- Socials Section --- */}
      <section className="text-center py-16 bg-slate-50 dark:bg-gray-900/50">
        <h2 className="text-3xl font-bold font-heading mb-4 text-slate-800 dark:text-slate-200">Let's Connect</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Stay connected with us on social platforms to get updates on job openings, career tips, and industry insights.
        </p>
        <div className="flex justify-center items-center gap-6">
          <a href="mailto:prasannareddy771@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
            <Mail size={32} />
          </a>
          <a href="https://instagram.com/bommidi_prasanna" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 transition-colors">
            <Instagram size={32} />
          </a>
          <a href="https://www.linkedin.com/in/vinayredde" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-700 transition-colors">
            <Linkedin size={32} />
          </a>
        </div>
      </section>
    </main>
  );
}