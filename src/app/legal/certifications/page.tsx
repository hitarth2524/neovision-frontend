'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Shield, Globe, CheckCircle, Verified, Activity, Microchip } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import Link from 'next/link';
import { useRef } from 'react';

const certifications = [
  {
    icon: Shield,
    title: 'ISO 9001:2015',
    authority: 'International Organization for Standardization',
    desc: 'Certified for our comprehensive Quality Management Systems, demonstrating our ability to consistently provide services that meet customer and regulatory requirements.',
    color: 'from-blue-600 to-indigo-600',
    valid: '2027',
    badge: 'QMS ISO'
  },
  {
    icon: Award,
    title: 'GDP Certified',
    authority: 'World Health Organization (WHO)',
    desc: 'Fully compliant with Good Distribution Practice guidelines. Our network ensures the quality and integrity of medicines is maintained throughout the supply chain.',
    color: 'from-emerald-500 to-teal-600',
    valid: '2026',
    badge: 'WHO GDP'
  },
  {
    icon: Globe,
    title: 'FDA Compliant',
    authority: 'U.S. Food and Drug Administration',
    desc: 'Our facilities and transport protocols meet or exceed the stringent CFR Title 21 requirements for the storage and handling of pharmaceutical products.',
    color: 'from-cyan-500 to-blue-600',
    valid: 'Active',
    badge: 'CFR TITLE 21'
  },
  {
    icon: Activity,
    title: 'IATA CEIV Pharma',
    authority: 'Intl. Air Transport Association',
    desc: 'Exceeding global standards for the air transport of temperature-sensitive healthcare products, ensuring complete prevention of temperature excursions.',
    color: 'from-purple-500 to-pink-600',
    valid: '2025',
    badge: 'CEIV PHARMA'
  },
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateBg = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <main className="min-h-screen pt-24 pb-0 bg-[#f8fafc] overflow-hidden text-[#121c2c]">
      
      {/* 3D Sterile Lab Background */}
      <motion.div 
        style={{ y: yBg, rotateZ: rotateBg }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 origin-center"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,62,122,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,62,122,0.04)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(1500px)_rotateX(60deg)] origin-center"></div>
      </motion.div>

      {/* Hero Banner */}
      <PageBanner
        icon={Award}
        badgeText="ACCREDITATIONS"
        title="Global"
        highlightedTitle="Certifications"
        description="Trust is earned through transparency and rigorous independent verification. NeoVision operates under the highest global pharmaceutical accreditations."
        bottomColor="bg-[#f8fafc]"
      />

      {/* The Certification Pedestal Gallery */}
      <section ref={containerRef} className="py-24 relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-[2500px]">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, rotateX: 45, y: 150, z: -200, scale: 0.8 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.15, type: 'spring', stiffness: 50, damping: 15 }}
              whileHover={{ rotateX: 5, rotateY: idx % 2 === 0 ? 5 : -5, scale: 1.02, z: 40, transition: { duration: 0.4, ease: "easeOut" } }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative p-1 rounded-[3rem] bg-gradient-to-br from-white to-blue-50/50 border border-blue-100 shadow-[0_30px_60px_rgba(0,62,122,0.08)] group cursor-pointer"
            >
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-20"></div>
              
              <div className="bg-white/80 backdrop-blur-xl h-full rounded-[2.8rem] p-6 md:p-8 relative overflow-hidden flex flex-col items-center text-center">
                
                {/* 3D Holographic Glare */}
                <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-white/80 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none z-30 skew-y-12 opacity-50"></div>

                {/* Massive Watermark */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[80px] md:text-[100px] font-black text-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none select-none -z-10 whitespace-nowrap">
                  {cert.badge}
                </div>

                {/* Floating Icon Box */}
                <div 
                  style={{ transform: 'translateZ(60px)' }}
                  className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${cert.color} flex items-center justify-center text-white mb-6 shadow-[0_20px_40px_rgba(0,62,122,0.2)] relative z-20 group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-500`}
                >
                  <div className="absolute inset-0 border-2 border-white/20 rounded-[1.5rem] rounded-bl-none group-hover:rotate-180 transition-transform duration-700"></div>
                  <cert.icon size={36} className="drop-shadow-lg" />
                </div>
                
                <div style={{ transform: 'translateZ(40px)' }} className="relative z-20 w-full">
                  <h4 className={`text-xs md:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r ${cert.color} mb-3 uppercase tracking-widest`}>
                    {cert.authority}
                  </h4>
                  <h3 className="text-xl md:text-2xl font-bold text-[#121c2c] mb-3">{cert.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium max-w-sm mx-auto">
                    {cert.desc}
                  </p>
                </div>
                
                <div style={{ transform: 'translateZ(20px)' }} className="mt-auto w-full flex items-center justify-center pt-5 border-t border-blue-50 relative z-20">
                  <div className="flex items-center gap-3 text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-full text-sm md:text-base shadow-sm group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-colors duration-300">
                    <Verified size={18} className="group-hover:animate-pulse" />
                    Valid till {cert.valid}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer actions */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 perspective-[2000px] mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.02, rotateX: 5, z: 30, transition: { duration: 0.4, ease: "easeOut" } }}
            style={{ transformStyle: 'preserve-3d' }}
            className="p-12 md:p-16 bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-[3rem] text-center shadow-[0_20px_50px_rgba(0,62,122,0.06)] relative overflow-hidden group cursor-pointer max-w-4xl mx-auto"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div 
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-md border border-blue-50 relative group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] transition-shadow duration-500"
                style={{ transform: 'translateZ(50px)' }}
              >
                <Microchip size={40} className="text-[#003e7a] group-hover:rotate-12 transition-transform duration-500" />
              </div>
              
              <div style={{ transform: 'translateZ(30px)' }}>
                <h4 className="text-3xl md:text-4xl font-black text-[#121c2c] mb-4 tracking-tight group-hover:text-[#003e7a] transition-colors duration-500">Internal QA Standards</h4>
                <p className="text-gray-600 mb-10 text-lg max-w-xl mx-auto font-medium">Beyond our global accreditations, review the internal quality assurance and validation matrix that drives our platform.</p>
              </div>

              <div style={{ transform: 'translateZ(60px)' }}>
                <Link href="/legal/qa-standards">
                  <button className="inline-flex items-center gap-3 bg-[#003e7a] text-white px-10 py-4 rounded-full font-black text-lg hover:bg-[#0055a4] hover:shadow-[0_10px_20px_rgba(0,62,122,0.2)] hover:scale-105 transition-all duration-300">
                    <Shield size={20} /> Review QA Protocol
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </section>
    </main>
  );
}
