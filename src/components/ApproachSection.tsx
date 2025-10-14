// src/components/ApproachSection.tsx

"use client";
import { motion } from 'framer-motion';
import { Users, Crosshair, TrendingUp } from 'lucide-react';

const approachItems = [
  {
    // CHANGED: Icon color updated to the consistent brand blue
    icon: <Users size={40} className="text-brand-blue" />,
    title: "Partnership",
    description: "We embed ourselves in your team to understand your culture and challenges. This collaborative approach ensures our solutions are not just effective, but truly integrated."
  },
  {
    // CHANGED: Icon color updated to the consistent brand blue
    icon: <Crosshair size={40} className="text-brand-blue" />,
    title: "Precision",
    description: "Our process is meticulous, data-driven, and detail-oriented, from market research to candidate vetting. We leave nothing to chance to ensure the perfect fit and optimal outcome."
  },
  {
    // CHANGED: Icon color updated to the consistent brand blue
    icon: <TrendingUp size={40} className="text-brand-blue" />,
    title: "Performance",
    description: "We are relentlessly results-focused. Our ultimate goal is to deliver a tangible impact, whether it's increased market share, improved efficiency, or a game-changing hire."
  }
];

export default function ApproachSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24">
      <div className="text-center mb-16">
        {/* CHANGED: Text colors updated for the white background */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">The <span className="text-brand-blue">Upturn Advantage</span></h2>
        <p className="text-lg md:text-xl text-slate-600 mt-4 max-w-3xl mx-auto">Our Commitment to You</p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {approachItems.map((item, index) => (
          // CHANGED: Card background and text colors updated
          <motion.div 
            key={index} 
            className="text-center p-8 bg-slate-50 rounded-lg border border-slate-200" 
            variants={itemVariants}
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">{item.title}</h3>
            <p className="text-slate-700">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}