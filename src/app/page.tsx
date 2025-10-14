// src/app/page.tsx

"use client";
import HeroSection from '../components/HeroSection';
import IntroSection from '../components/IntroSection';
import ServicesSection from '../components/ServicesSection';
import ApproachSection from '../components/ApproachSection';
import AudienceSection from '../components/AudienceSection';
import FinalCTASection from '../components/FinalCTASection';
import Footer from '../components/Footer';




export default function HomePage()
 {
  return (
    // CHANGED: Switched to a white background with dark text as the default
    <main className="bg-white text-gray-800">
      <HeroSection />

      {/* This container ensures consistent padding for the sections */}
      <div className="container mx-auto px-6 lg:px-8">
        <IntroSection />
        <ServicesSection />
        <ApproachSection />
        <AudienceSection />
        <FinalCTASection />
      </div>

      <Footer />
    </main>
  );
}