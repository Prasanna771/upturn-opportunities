// src/app/contact/page.tsx (or your file path)

"use client";

import React, { useState, useEffect, useRef, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import Footer from '@/components/Footer';
import styles from './ContactPage.module.css';
import { handleContactForm } from '@/app/actions';
import { Linkedin, Instagram, Mail } from 'lucide-react';

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

// --- Icons ---
const IconEnvelope = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const IconPhone = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.998-.552-1.348l-1.295-1.295a.75.75 0 00-1.06 0l-2.24 2.24a.75.75 0 01-1.06 0l-1.295-1.295a.75.75 0 00-1.06 0l-2.24 2.24a.75.75 0 01-1.06 0l-1.295-1.295a.75.75 0 00-1.06 0l-2.24 2.24a.75.75 0 01-1.06 0z" /></svg>;
const IconMapPin = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const IconClock = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// --- Reusable Submit Button ---
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className={styles.submitButton}>{pending ? 'Sending...' : 'Submit Now'}</button>;
}

export default function ContactPage() {
  // NEW: State to hold form submission results (success or error messages)
  const [formState, setFormState] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  
  // NEW: Ref to access the form element for resetting it
  const formRef = useRef<HTMLFormElement>(null);

  // NEW: A client-side wrapper for the server action
  async function clientAction(formData: FormData) {
    // Call the server action and wait for its result
    const result = await handleContactForm(formData);

    // Update the state based on the result
    if (result?.success) {
      setFormState({ message: result.success, type: 'success' });
      formRef.current?.reset(); // Reset the form on success
    } else if (result?.error) {
      setFormState({ message: result.error, type: 'error' });
    }
  }

  return (
    <>
      <main className="pt-20">
        <header className={styles.pageHeader}>
          <h1>Get in Touch with Us</h1>
          <p>We’d love to hear from you! Whether you’re a company looking for the right talent or a candidate searching for your next opportunity, Upturn Opportunities is here to help you connect, grow, and succeed.</p>
        </header>

        <AnimatedSection>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <IconEnvelope />
              <h3>Email</h3>
              <p>support@upturnopportunities.com</p>
            </div>
            <div className={styles.infoCard}>
              <IconPhone />
              <h3>Phone</h3>
              <p>+91 95734 15317</p>
            </div>
            <div className={styles.infoCard}>
              <IconMapPin />
              <h3>Address</h3>
              <p>15-5-25/1, Brundhavan colony, Siddipet, Telangana, India</p>
            </div>
            <div className={styles.infoCard}>
              <IconClock />
              <h3>Office Hours</h3>
              <p>Mon-Fri: 9am-6pm<br/>Sat: 10am-2pm</p>
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className={styles.formSection}>
            <div className={styles.formIntro}>
              <h2>📬 Send Us a Message</h2>
              <p>Have a question, partnership inquiry, or need recruitment support? Fill out the contact form below — our team will get back to you within one business day.</p>
            </div>
            
            {/* UPDATED: The form now uses the clientAction wrapper and the ref */}
            <form ref={formRef} action={clientAction} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <input type="text" id="name" name="name" placeholder="Full Name" required />
              </div>
              <div className={styles.formGroup}>
                <input type="email" id="email" name="email" placeholder="Email Address" required />
              </div>
              <div className={styles.formGroup}>
                <input type="tel" id="phone" name="phone" placeholder="Phone Number" required />
              </div>
              <div className={styles.formGroup}>
                <textarea id="message" name="message" rows={5} placeholder="Message" required></textarea>
              </div>
              <SubmitButton />
              
              {/* NEW: Display success or error message here */}
              {formState.message && (
                <div className={`${styles.formMessage} ${formState.type === 'success' ? styles.success : styles.error}`}>
                  {formState.message}
                </div>
              )}
            </form>
          </div>
        </AnimatedSection>

        <AnimatedSection>
            <div className={styles.socialSection}>
                <h2>🤝 Let’s Connect</h2>
                <p>Stay connected with us on social platforms to get updates on job openings, career tips, and industry insights.</p>
                <div className={styles.socialLinks}>
                    <a href="https://www.linkedin.com/in/vinayredde" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin size={24} />
                    </a>
                    <a href="https://www.instagram.com/bommidi_prasanna" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram size={24} />
                    </a>
                    <a href="mailto:prasannareddy771@gmail.com" aria-label="Email">
                      <Mail size={24} />
                    </a>
                </div>
            </div>
        </AnimatedSection>
        
      </main>
      <Footer />
    </>
  );
}