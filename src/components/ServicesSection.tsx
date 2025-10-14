// src/components/ServicesSection.tsx

"use client";
import { motion } from 'framer-motion';

const ServiceCard = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => {
  return (
    // CHANGED: Card background is now a light off-white with a subtle hover effect.
    <motion.div
      className="bg-slate-50 p-8 rounded-lg border border-slate-200 h-full"
      whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* CHANGED: Text colors updated for readability on the light background. */}
      <h3 className="text-2xl font-bold text-brand-blue mb-2">{subtitle}</h3>
      <h4 className="text-3xl font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="text-slate-700 space-y-3">{children}</div>
    </motion.div>
  );
};

export default function ServicesSection() {
  return (
    <motion.section
      className="py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="text-center mb-16">
        {/* CHANGED: Main heading text and accent colors updated. */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Consulting with <span className="text-brand-blue">Clarity</span>, Recruiting with <span className="text-brand-blue">Purpose</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ServiceCard title="Strategic Consulting" subtitle="Consulting with Clarity">
          <p>
            We cut through the noise to provide actionable, data-driven strategies that deliver measurable results. Our expertise lies in transforming business challenges into growth opportunities.
          </p>
          <ul className="list-disc list-inside pt-2">
            <li>Business & Growth Strategy</li>
            <li>Market Analysis & Entry</li>
            <li>Operational Excellence</li>
            <li>Digital Transformation</li>
          </ul>
        </ServiceCard>
        <ServiceCard title="Purposeful Recruiting" subtitle="Recruiting with Purpose">
          <p>
            We believe a successful hire goes beyond the resume. It&#39;s about aligning skill, ambition, and culture. We connect exceptional professionals with organizations where they can thrive.
          </p>
          <ul className="list-disc list-inside pt-2">
            <li>Executive Search & C-Suite Placement</li>
            <li>Specialized Talent Acquisition</li>
            <li>Team Building & Departmental Staffing</li>
            <li>Confidential & Strategic Hires</li>
          </ul>
        </ServiceCard>
      </div>
    </motion.section>
  );
}
