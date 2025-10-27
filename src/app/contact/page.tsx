"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
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
      {/* --- Header --- */}
      <header className="relative py-28 md:py-36 overflow-hidden">
        {/* Layer 1: Background Image (z-0) */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/contact-header.jpg')" }}
        ></div>
        
        {/* Layer 3: Content with Text Shadow for readability (z-20) */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-left">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-white animate-slide-in-left drop-shadow-lg">
              Get in Touch with Us
            </h1>
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
            <h2 className="text-3xl font-bold font-heading text-slate-800">Contact Information</h2>
            
            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Email</h3>
                <a href="mailto:support@upturnopportunities.com" className="text-gray-700 hover:text-blue-600 break-all">support@upturnops.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Phone</h3>
                <a href="tel:+919573415317" className="text-gray-700 hover:text-blue-600">+91 95734 15317</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Address</h3>
                <p className="text-gray-700">15-5-25/1, Brundhavan colony, Siddipet, Telangana, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg text-slate-800">Office Hours</h3>
                <p className="text-gray-700">Mon-Fri: 9am - 6pm</p>
              </div>
            </div>
          </div>

          {/* --- Right Column: Contact Form --- */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {state.success ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent Successfully</h3>
                <p className="text-gray-800">{state.message}</p>
                <p className="text-gray-600 mt-2 text-sm">We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold font-heading mb-6 text-slate-800">Send Us a Message</h2>
                <form ref={formRef} action={formAction} className="space-y-4">
                  <input type="hidden" name="phone" value={`${countryCode}${phoneNumber}`} />

                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Full Name</label>
                    <input id="name" type="text" name="name" required className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input id="email" type="email" name="email" required className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="phone-number" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <div className="flex">
                      <select name="countryCode" onChange={(e) => setCountryCode(e.target.value)} value={countryCode} className="p-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-900">
                        <option value="+91">IN (+91)</option>
                        <option value="+1">US (+1)</option>
                      </select>
                      <input id="phone-number" type="tel" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required pattern="[0-9]{10}" title="Please enter a 10-digit phone number" placeholder="10-digit number" className="w-full p-2 border border-gray-300 rounded-r-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea id="message" name="message" rows={4} required className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  
                  <SubmitButton />
                  
                  {state.message && !state.success && (
                    <p className="text-red-600 text-center font-semibold mt-4"> {state.message}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* --- Socials Section (REMOVED) --- */}
      
    </main>
  );
}