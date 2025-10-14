"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';

// SVG Icons for visual appeal (Heroicons)
const IconBuilding = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375a.75.75 0 01.75.75v3.75a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75V7.5a.75.75 0 01.75-.75z" />
  </svg>
);

const IconBriefcase = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 01-2.25 2.25H5.998a2.25 2.25 0 01-2.25-2.25v-4.07a2.25 2.25 0 01.99-1.898l7.5-4.5a2.25 2.25 0 012.52 0l7.5 4.5a2.25 2.25 0 01.99 1.898z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 14.25v.003" />
  </svg>
);

// Data for the "Why Choose Us" section
const features = [
  {
    title: "Trusted Network",
    text: "Over the years, we’ve built a reliable ecosystem of professionals, enterprises, and partners. Our vast and diverse talent network ensures access to pre-vetted candidates who meet both technical and cultural requirements. Whether you need niche expertise or volume hiring, our network gives you an edge in a competitive market.",
  },
  {
    title: "Personalized Support",
    text: "We take the time to understand your organization’s goals, culture, and challenges before recommending solutions. Every partnership begins with a detailed consultation to ensure our services align perfectly with your needs. Our dedicated team provides one-on-one support throughout the process — ensuring clarity, transparency, and measurable results.",
  },
  {
    title: "Quality-First Approach",
    text: "Excellence is at the heart of everything we do. Each candidate undergoes a multi-step screening process to validate skills, experience, and attitude. We go beyond resumes — evaluating problem-solving abilities, adaptability, and growth potential to ensure every hire is a long-term asset to your organization.",
  },
  {
    title: "End-to-End Partnership",
    text: "From the initial consultation to post-placement follow-up, we provide complete lifecycle support. We don’t just fill positions — we build relationships that drive success. Whether it’s onboarding assistance, performance tracking, or long-term collaboration, our team stands by you at every stage of your growth journey.",
  },
];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.aboutSection} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        {/* Section 1: Who We Are */}
        <div className={styles.intro}>
          <h2 className={styles.sectionTitle}>Who We Are</h2>
          <p className={styles.introText}>
            At Upturn Opportunities Pvt. Ltd., we believe every individual deserves the right platform to grow — and every organization deserves the right talent to thrive.
            We’re not just a consultancy — we’re your growth partner, connecting skilled professionals with forward-thinking companies across India and beyond.
          </p>
          <p className={styles.tagline}>Together, we build bridges between potential and success.</p>
        </div>

        {/* Section 2: What We Do */}
        <div className={styles.whatWeDo}>
          <h2 className={styles.sectionTitle}>What We Do</h2>
          <p className={styles.subText}>Our expertise spans across recruitment, staffing, and career development — ensuring that both employers and candidates achieve their goals effortlessly.</p>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}><IconBuilding /></div>
              <h3>For Companies</h3>
              <p>We deliver pre-screened, skilled, and dependable talent that drives business outcomes.</p>

                

            </div>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}><IconBriefcase /></div>
              <h3>For Job Seekers</h3>
              <p>We guide you toward roles that fit your skills, passions, and career growth aspirations.</p>
            
               

            </div>
          </div>
        </div>

        {/* Section 3: Why Choose Us */}
        <div className={styles.whyChooseUs}>
          <h2 className={styles.sectionTitle}>Why Choose Us</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;