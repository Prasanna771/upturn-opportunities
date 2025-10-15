"use client";
import { motion, Variants } from 'framer-motion';

// ServiceCard component with the syntax error fixed
// CORRECTED: Removed the extra closing parenthesis before the "=>"
const ServiceCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <motion.div
      className="bg-slate-50 p-8 rounded-lg h-full border border-[#17134d] shadow-[0_0_20px_rgba(23,19,77,0.40)]"
      whileHover={{ y: -5, boxShadow: "0px 10px 35px rgba(23,19,77,0.35)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-3xl font-semibold mb-4" style={{ color: '#17134d' }}>
        {title}
      </h3>
      <div className="text-black space-y-3">{children}</div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="text-center mb-16">
        <h2 
          className="text-4xl md:text-5xl font-bold" 
          style={{ color: '#17134d' }}
        >
          Consulting with <span className="text-blue-600">Clarity</span>, Recruiting with <span className="text-blue-600">Purpose</span>
        </h2>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants}>
          <ServiceCard title="Strategic Consulting">
            <p>
              We cut through the noise to provide actionable, data-driven strategies that deliver measurable results. Our expertise lies in transforming business challenges into growth opportunities.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Business & Growth Strategy</li>
              <li>Market Analysis & Entry</li>
              <li>Operational Excellence</li>
              <li>Digital Transformation</li>
            </ul>
          </ServiceCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ServiceCard title="Purposeful Recruiting">
            <p>
              We believe a successful hire goes beyond the resume. It's about aligning skill, ambition, and culture. We connect exceptional professionals with organizations where they can thrive.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Executive Search & C-Suite Placement</li>
              <li>Specialized Talent Acquisition</li>
              <li>Team Building & Departmental Staffing</li>
              <li>Confidential & Strategic Hires</li>
            </ul>
          </ServiceCard>
        </motion.div>
        
      </motion.div>
    </motion.section>
  );
}