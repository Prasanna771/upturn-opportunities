"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import styles from './ServicesPage.module.css';

// --- SVG Icons for each service ---
const IconITStaffing = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0v-1.5m0 1.5v3.75m0-3.75h6m-6 0v-1.5m0 1.5v3.75m0-3.75h6M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
const IconRPO = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>;
const IconCloud = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-9.75 2.152 4.5 4.5 0 00-4.5 4.5z" /></svg>;
const IconContract = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
const IconExecutive = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.004-.002.001-.002.001-.001.001-.001.001-.001.001a6.97 6.97 0 01.003-.001zM12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>;
const IconConsultation = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 5.25a7.5 7.5 0 001.359-4.426-7.5 7.5 0 00-3.003-6.251m3.003 10.677a7.5 7.5 0 00-5.462-9.521m5.462 9.521a7.5 7.5 0 01-5.462-9.521m2.132 12.233A5.25 5.25 0 0012 18.75m0-12.233a5.25 5.25 0 00-3.367 1.03m3.367-1.03a5.25 5.25 0 003.367 1.03m0 0a5.25 5.25 0 013.367-1.03m-6.734 2.06a5.25 5.25 0 016.734 0M12 18.75a5.25 5.25 0 01-3.367-1.03m3.367 1.03v-3.75m-3.367 1.03a5.25 5.25 0 01-3.367-1.03m0 0A5.25 5.25 0 013 10.5m0 0a5.25 5.25 0 013.367-1.03" /></svg>;

// --- Service Data ---
const services = [
  { icon: <IconITStaffing />, title: "IT Staffing Solutions", description: "We specialize in connecting companies with top-tier IT talent. Whether you need software developers, cloud engineers, data analysts, or cybersecurity experts, we ensure you have access to pre-vetted candidates who match your technical requirements and company culture." },
  { icon: <IconRPO />, title: "Recruitment Process Outsourcing (RPO)", description: "Our RPO services allow your organization to outsource part or all of the recruitment process. From sourcing and screening to onboarding, we manage the hiring lifecycle efficiently, reducing your time-to-hire while ensuring quality and compliance." },
  { icon: <IconCloud />, title: "Cloud & Technology Hiring", description: "With the demand for cloud computing and modern technologies soaring, we focus on sourcing candidates skilled in cloud platforms, DevOps, AI/ML, and other emerging tech domains. Our talent pool includes professionals with hands-on experience in AWS, Azure, Google Cloud, and more." },
  { icon: <IconContract />, title: "Contract & Permanent Staffing", description: "We offer flexible staffing solutions to suit your project or long-term needs. Whether you require temporary staff for short-term projects or permanent hires for strategic roles, we provide reliable staffing support to keep your business running smoothly." },
  { icon: <IconExecutive />, title: "Executive Search & Leadership Hiring", description: "Finding the right leaders is critical for any business. Our executive search service identifies and engages senior-level professionals who align with your organization’s vision and leadership needs." },
  { icon: <IconConsultation />, title: "Talent Consultation & Advisory", description: "Beyond recruitment, we provide talent strategy consultation to help organizations optimize workforce planning, skills development, and retention strategies. Our insights empower you to make data-driven hiring decisions." },
];

export default function ServicesPage() {
  const gridRef = useRef<HTMLDivElement>(null);
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
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main>
        {/* --- Page Header --- */}
        <header className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Our Services</h1>
            <p className={styles.pageSubtitle}>
              At Upturn Opportunities, we provide end-to-end staffing solutions designed to help businesses find the right talent while enabling professionals to grow their careers. Our services are tailored for IT companies, enterprises, and startups seeking quality hiring solutions in the rapidly evolving technology landscape.
            </p>
          </div>
        </header>

        {/* --- Services Grid --- */}
        <section className={styles.servicesSection}>
          <div ref={gridRef} className={`${styles.servicesGrid} ${isVisible ? styles.visible : ''}`}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.iconWrapper}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Call to Action Section --- */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Build Your Dream Team?</h2>
          <p className={styles.ctaText}>Let us help you find the right talent to drive your business forward. Get in touch with our experts today.</p>
          <Link href="/contact" className={styles.ctaButton}>
            Contact Us
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}