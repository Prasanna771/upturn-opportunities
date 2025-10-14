"use client";

import React, { useState, useEffect, useRef, PropsWithChildren } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import styles from './JobsPage.module.css';
import { UploadCloud, X } from 'lucide-react'; // Import icons

// --- Job Application Form Modal ---
const JobApplicationModal = ({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // File size validation (3MB limit)
      if (file.size > 3 * 1024 * 1024) {
        setErrorMsg('File is too large. Maximum size is 3MB.');
        setResume(null);
        setResumeName('');
        e.target.value = ''; // Clear the input
        return;
      }
      setResume(file);
      setResumeName(file.name);
      setErrorMsg(''); // Clear previous errors
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
        setErrorMsg('Please upload a resume.');
        return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', `${countryCode} ${phone}`);
      formData.append('email', email);
      formData.append('jobTitle', jobTitle);
      formData.append('resume', resume);

      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to send. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred.');
      setStatus('error');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {status === 'success' ? (
          <div className={styles.successMessage}>
            <h3>✅ Application Sent!</h3>
            <p>Thank you! We&apos;ve received your application and will be in touch soon.</p>
            <button onClick={onClose} className={styles.ctaButton}>Close</button>
          </div>
        ) : (
          <>
            <button onClick={onClose} className={styles.closeBtn}> <X size={24} /> </button>
            <h2>Apply for {jobTitle}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

              <label>Phone Number</label>
              <div className={styles.phoneInputGroup}>
                <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                  <option value="+91">IN (+91)</option>
                  <option value="+1">US (+1)</option>
                </select>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Your phone number" />
              </div>

              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

              <label htmlFor="resume-upload" className={styles.fileLabel}>
                <UploadCloud size={18} />
                <span>{resumeName || 'Upload Resume (Max 3MB)'}</span>
              </label>
              <input id="resume-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} required />

              <button type="submit" className={styles.submitButton} disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : 'Submit Application'}
              </button>

              {errorMsg && <p className={styles.errorMsg}>❌ {errorMsg}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// --- Reusable Animated Section Component ---
const AnimatedSection = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      }, { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} className={`${styles.section} ${isVisible ? styles.visible : ''}`}>{children}</section>;
};

// --- Mock Data ---
const mockJobs = [
  { title: "Senior Full Stack Developer", company: "Tech Solutions Inc.", location: "Hyderabad, India", skills: ["React", "Node.js", "AWS"] },
  { title: "Cloud Engineer (Azure)", company: "Innovate Cloud Co.", location: "Bengaluru, India", skills: ["Azure", "Terraform", "Kubernetes"] },
  { title: "Data Analyst", company: "Data Insights LLC", location: "Pune, India", skills: ["SQL", "Python", "Power BI"] },
  { title: "QA Automation Engineer", company: "QualityFirst Software", location: "Remote", skills: ["Selenium", "Java", "CI/CD"] },
];
const jobCategories = [
    { category: "Software Development", skills: ["Java", "Python", "Full Stack", "React", "Spring Boot", "Node.js"] },
    { category: "Cloud Technologies", skills: ["Azure", "AWS", "GCP"] },
    { category: "Data & Analytics", skills: ["Data Engineer", "Data Analyst", "BI Developer"] },
    { category: "Quality Assurance", skills: ["Manual & Automation Testing"] },
    { category: "IT Support & Infrastructure", skills: ["System Admin", "Network Engineer", "Technical Support"] },
];

// --- Main Jobs Page ---
export default function JobsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');

  const openModal = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob('');
  };

  return (
    <>
      <main>
        {/* --- Page Header --- */}
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Find Your Next Opportunity</h1>
            <p className={styles.pageSubtitle}>
              At Upturn Opportunities, we connect passionate professionals with top organizations across India and beyond. Whether you’re a fresher taking your first step or an experienced professional looking to advance, we’re here to guide you.
            </p>
          </div>
        </header>

        {/* --- Why Apply Section --- */}
        <AnimatedSection>
          <h2 className={styles.sectionTitle}>Why Apply Through Upturn?</h2>
          <div className={styles.whyApplyGrid}>
            <div className={styles.featureCard}><h3>Verified Openings</h3><p>Every job is verified and comes directly from trusted employers.</p></div>
            <div className={styles.featureCard}><h3>Diverse Domains</h3><p>Explore roles in IT, Cloud, Software Development, Data, and more.</p></div>
            <div className={styles.featureCard}><h3>Career Growth</h3><p>We match you with opportunities that align with your skills and goals.</p></div>
            <div className={styles.featureCard}><h3>End-to-End Support</h3><p>From application to onboarding, our team ensures a smooth process.</p></div>
          </div>
        </AnimatedSection>
        
        {/* --- Job Listings Section --- */}
        <AnimatedSection>
          <h2 className={styles.sectionTitle}>Current Openings</h2>
          <div className={styles.jobListings}>
            {mockJobs.map((job, index) => (
              <div key={index} className={styles.jobCard}>
                <div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <p className={styles.jobCompany}>{job.company} - {job.location}</p>
                  <div className={styles.skillTags}>
                    {job.skills.map(skill => <span key={skill} className={styles.skillTag}>{skill}</span>)}
                  </div>
                </div>
                {/* MODIFIED: Changed Link to a button that opens the modal */}
                <button onClick={() => openModal(job.title)} className={styles.applyButton}>Apply Now</button>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* --- Featured Categories Section --- */}
        <AnimatedSection>
            <h2 className={styles.sectionTitle}>Featured Job Categories</h2>
            <div className={styles.categoriesContainer}>
                {jobCategories.map(cat => (
                    <div key={cat.category} className={styles.categoryBlock}>
                        <h3 className={styles.categoryTitle}>{cat.category}</h3>
                        <div className={styles.skillTags}>
                            {cat.skills.map(skill => <span key={skill} className={styles.skillTag}>{skill}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>

        {/* --- How It Works Section --- */}
        <AnimatedSection>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <div className={styles.howItWorks}>
                <div className={styles.step}><span>1</span><h3>Browse Openings</h3><p>Explore current listings that match your interests.</p></div>
                <div className={styles.step}><span>2</span><h3>Apply Easily</h3><p>Submit your resume directly through our platform.</p></div>
                <div className={styles.step}><span>3</span><h3>Get Matched</h3><p>Our team connects your profile with suitable employers.</p></div>
                <div className={styles.step}><span>4</span><h3>Start Your Journey</h3><p>Begin your professional growth with a trusted company.</p></div>
            </div>
        </AnimatedSection>

        {/* --- Final CTA Section --- */}
        <section className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Start Your Career With Us</h2>
            <p className={styles.ctaText}>Your dream job could be just one click away — explore the latest openings and take the next step with Upturn Opportunities.</p>
            <Link href="#openings" className={styles.ctaButton}>Explore Latest Openings</Link>
        </section>
      </main>
      <Footer />

      {/* Conditionally render the modal */}
      {isModalOpen && <JobApplicationModal jobTitle={selectedJob} onClose={closeModal} />}
    </>
  );
}
