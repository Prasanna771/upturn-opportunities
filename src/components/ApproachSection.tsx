"use client";
import { motion, Variants, easeOut } from 'framer-motion';
import { Users, Crosshair, TrendingUp } from 'lucide-react';

const approachItems = [
  {
    // CHANGED: Icon color is now the dark logo color
    icon: <Users size={40} style={{ color: '#17134d' }} />,
    title: "Partnership",
    description: "We embed ourselves in your team to understand your culture and challenges. This collaborative approach ensures our solutions are not just effective, but truly integrated."
  },
  {
    // CHANGED: Icon color is now the dark logo color
    icon: <Crosshair size={40} style={{ color: '#17134d' }} />,
    title: "Precision",
    description: "Our process is meticulous, data-driven, and detail-oriented, from market research to candidate vetting. We leave nothing to chance to ensure the perfect fit and optimal outcome."
  },
  {
    // CHANGED: Icon color is now the dark logo color
    icon: <TrendingUp size={40} style={{ color: '#17134d' }} />,
    title: "Performance",
    description: "We are relentlessly results-focused. Our ultimate goal is to deliver a tangible impact, whether it's increased market share, improved efficiency, or a game-changing hire."
  }
];

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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: easeOut }
  },
};

export default function ApproachSection() {
  return (
    <section className="py-24">
      <div className="text-center mb-16">
        <h2 
          className="text-4xl md:text-5xl font-bold"
          style={{ color: '#17134d' }}
        >
          The <span className="text-blue-600">Upturn Advantage</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-800 mt-4 max-w-3xl mx-auto">Our Commitment to You</p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {approachItems.map((item, index) => (
          <motion.div 
            key={index} 
            className="text-center p-8 bg-slate-50 rounded-lg border border-[#17134d] shadow-[0_0_20px_rgba(23,19,77,0.40)]" 
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0px 10px 35px rgba(23,19,77,0.35)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            {/* CHANGED: Card title color is now the lighter accent blue */}
            <h3 className="text-2xl font-semibold mb-2 text-blue-600">{item.title}</h3>
            <p className="text-black">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}