"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
// FIX 1: Import useActionState from 'react' and useFormStatus from 'react-dom'
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
    { category: "Software Development", skills: ["Java", "Python", "Full Stack", "React", "Spring Boot", "Node.js"] },
    { category: "Cloud Technologies", skills: ["Azure", "AWS", "GCP"] },
    { category: "Data & Analytics", skills: ["Data Engineer", "Data Analyst", "BI Developer"] },
    { category: "Quality Assurance", skills: ["Manual & Automation Testing"] },
];

// --- Submit Button using useFormStatus ---
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
  // FIX 1: Renamed useFormState to useActionState
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
      <div className="bg-white rounded-lg p-8 w-full max-w-lg relative">
        {state.success ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-4">✅ {state.message}</h3>
            <p className="text-gray-800 mb-2">Thank you! We've received your application.</p>
            <p className="text-gray-600 mb-6 text-sm">Note: Our recruitment team will review your application and get in touch if your profile matches our requirements.</p>
            <button onClick={onClose} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">Close</button>
          </div>
        ) : (
          <>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><X size={24} /></button>
            <h2 className="text-3xl font-bold font-heading mb-6 text-center" style={{ color: '#17134d' }}>Apply Now</h2>
            <form ref={formRef} action={formAction} className="space-y-4">
              <input type="hidden" name="phone" value={`${countryCode} ${phone}`} />
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input type="text" name="name" required className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Job Role</label>
                {/* FIX 2: Added defaultValue to <select> and removed 'selected' from <option> */}
                <select name="jobTitle" required defaultValue="" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                  <option value="" disabled>Select a Job</option>
                  {jobs.map(job => <option key={job.id} value={job.title}>{job.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <div className="flex">
                  <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="p-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-100">
                    <option value="+91">IN (+91)</option>
                    <option value="+1">US (+1)</option>
                  </select>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="[0-9]{10}" title="Please enter a 10-digit phone number" placeholder="10-digit phone number" className="w-full p-2 border border-gray-300 rounded-r-md" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" name="email" required className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="resume-upload" className="flex items-center gap-3 w-full p-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 hover:text-blue-500">
                  <UploadCloud size={18} />
                  <span>{resumeName || 'Upload Resume (Max 5MB)'}</span>
                </label>
                <input id="resume-upload" type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleResumeChange} required className="hidden" />
              </div>
              <SubmitButton />
              {state.message && !state.success && <p className="text-red-600 text-center font-semibold">❌ {state.message}</p>}
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

  return (
    <>
      <main>
        {/* Page Header */}
        <header className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading" style={{ color: '#17134d' }}>Find Your Next Opportunity</h1>
            <p className="mt-4 text-lg text-black">At Upturn Opportunities, we connect passionate professionals with top organizations. Whether you’re a fresher or an experienced professional, we’re here to guide you.</p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
          {/* Why Apply Section */}
          <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10" style={{ color: '#17134d' }}>Why Apply Through Upturn?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow-md">
                    <h3 className="text-xl font-bold font-heading mb-2" style={{ color: '#17134d' }}>Verified Openings</h3>
                    <p className="text-black">Every job is verified and comes directly from trusted employers.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow-md">
                    <h3 className="text-xl font-bold font-heading mb-2" style={{ color: '#17134d' }}>Diverse Domains</h3>
                    <p className="text-black">Explore roles in IT, Cloud, Software Development, Data, and more.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow-md">
                    <h3 className="text-xl font-bold font-heading mb-2" style={{ color: '#17134d' }}>Career Growth</h3>
                    <p className="text-black">We match you with opportunities that align with your skills and goals.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow-md">
                    <h3 className="text-xl font-bold font-heading mb-2" style={{ color: '#17134d' }}>End-to-End Support</h3>
                    <p className="text-black">From application to onboarding, our team ensures a smooth process.</p>
                </div>
            </div>
          </section>

          {/* Job Listings Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-10" style={{ color: '#17134d' }}>Current Openings</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {mockJobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-blue-600 font-heading">{job.title}</h3>
                  <p className="text-gray-600 my-1">{job.company} - {job.location}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.map(skill => <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{skill}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                </button>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12" style={{ color: '#17134d' }}>How It Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full font-bold text-2xl mb-4">1</span>
                      <h3 className="text-xl font-bold font-heading mb-2" style={{ color: '#17134d' }}>Browse Openings</h3>
                      <p className="text-black">Explore current listings that match your interests.</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full font-bold text-2xl mb-4">2</span>
                      <h3 className="text-xl font-bold font-heading mb-2" style={{ color: '#17134d' }}>Apply Easily</h3>
                      <p className="text-black">Submit your resume directly through our platform.</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full font-bold text-2xl mb-4">3</span>
                      <h3 className="text-xl font-bold font-heading mb-2" style={{ color: '#17134d' }}>Get Matched</h3>
                      <p className="text-black">Our team connects your profile with suitable employers.</p>
                  </div>
                  <div className="flex flex-col items-center">
                      <span className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full font-bold text-2xl mb-4">4</span>
                      <h3 className="text-xl font-bold font-heading mb-2" style={{ color: '#17134d' }}>Start Your Journey</h3>
                      <p className="text-black">Begin your professional growth with a trusted company.</p>
                  </div>
              </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16 text-center bg-blue-50 rounded-lg">
            <h2 className="text-3xl font-bold font-heading mb-4" style={{ color: '#17134d' }}>Start Your Career With Us</h2>
            <p className="text-black max-w-2xl mx-auto mb-8">Your dream job could be just one click away — explore the latest openings and take the next step with Upturn Opportunities.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors">
                Apply Now
            </button>
          </section>
        </div>
      </main>

      {isModalOpen && <JobApplicationModal jobs={mockJobs} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}