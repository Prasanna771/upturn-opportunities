"use client";
import { motion, Variants } from 'framer-motion';

// ServiceCard component with dark mode styles
const ServiceCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <motion.div
      // CHANGED: Added dark mode classes for background, border, and shadow
      className="bg-slate-50 dark:bg-gray-800 p-8 rounded-lg h-full border border-[#17134d] dark:border-blue-800 shadow-[0_0_20px_rgba(23,19,77,0.40)] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
      whileHover={{ y: -5, boxShadow: "0px 10px 35px rgba(23,19,77,0.35)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 
        // CHANGED: Replaced inline style with classes for dark mode support
        className="text-3xl font-semibold mb-4 font-heading text-[#17134d] dark:text-white"
      >
        {title}
      </h3>
      <div className="text-black dark:text-gray-300 space-y-3 font-sans">{children}</div>
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
    // CHANGED: Added dark mode background
    <motion.section
      className="py-24 bg-white dark:bg-black"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* CHANGED: Added a container div to constrain the content width */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            // CHANGED: Replaced inline style with classes for dark mode support
            className="text-4xl md:text-5xl font-bold font-heading text-[#17134d] dark:text-white"
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
      </div>
    </motion.section>
  );
}