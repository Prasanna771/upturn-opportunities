"use client";
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ApproachSection from '../components/ApproachSection';
import AudienceSection from '../components/AudienceSection';
import ClientLogosSection from '../components/ClientLogosSection';
import FinalCTASection from '../components/FinalCTASection';

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />

      {/* CHANGED: Removed the wrapping container div. */}
      {/* Each section will now be full-width by default. */}
      
      
      <ServicesSection />
      <ApproachSection />
      <AudienceSection />
      <ClientLogosSection />
      <FinalCTASection />
      
    </main>
  );
}