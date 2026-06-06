'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Lock, Database, Globe2, Fingerprint, EyeOff, Activity } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import { useRef } from 'react';

export default function PrivacyPolicy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // A subtle parallax for the background grid
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const sections = [
    {
      title: 'Information We Collect',
      subtitle: 'Zero PHI Exposure',
      icon: EyeOff,
      color: 'from-blue-500 to-blue-700',
      content: 'NeoVision Health Care collects professional contact information, logistics tracking data, and regulatory compliance documentation strictly for the purpose of executing pharmaceutical distribution. We employ a strict Zero-Trust architecture. We do not collect protected health information (PHI) of end patients.'
    },
    {
      title: 'Cold Chain Telemetry',
      subtitle: 'IoT Sensor Matrix',
      icon: Activity,
      color: 'from-cyan-500 to-blue-600',
      content: 'Our active cooling containers transmit thousands of data points per second (temperature, humidity, shock, GPS). This telemetry is utilized exclusively for AI-driven route optimization and maintaining the chain of custody for temperature-sensitive biologics. It is air-gapped from external networks.'
    },
    {
      title: 'Data Security & Encryption',
      subtitle: 'Military-Grade Cryptography',
      icon: Lock,
      color: 'from-indigo-500 to-purple-600',
      content: 'All digital logistics data, including real-time temperature telemetry from our IoT sensor matrix, is secured using AES-256 encryption both in transit and at rest within our subterranean Swiss data centers.'
    },
    {
      title: 'GDPR & FADP Compliance',
      subtitle: 'International Sovereignty',
      icon: Globe2,
      color: 'from-emerald-500 to-teal-600',
      content: 'As a Swiss-based entity, we adhere strictly to the Federal Act on Data Protection (FADP) and the EU General Data Protection Regulation (GDPR). Your data is governed by the strictest privacy laws on the planet.'
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-0 bg-[#f8fafc] overflow-hidden text-[#121c2c]">
      
      {/* 3D Cleanroom Background */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,62,122,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,62,122,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)] origin-top"></div>
      </motion.div>

      <PageBanner
        icon={Shield}
        badgeText="LEGAL & COMPLIANCE"
        title="Data"
        highlightedTitle="Sanctuary"
        description="Privacy Policy & Security Architecture. We treat your digital data with the exact same uncompromising rigor as your physical pharmaceutical payloads."
        bottomColor="bg-[#f8fafc]"
      />

      {/* Content Area - The Server Blades */}
      <section ref={containerRef} className="py-24 relative z-10 max-w-6xl mx-auto px-6">
        
        <div className="space-y-6 perspective-[2000px]">
          {sections.map((sec, idx) => (
            <motion.div 
              key={sec.title}
              initial={{ opacity: 0, rotateX: -30, y: 100, z: -100 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", stiffness: 50 }}
              whileHover={{ scale: 1.02, rotateX: 2, z: 20, transition: { duration: 0.3, ease: "easeOut" } }}
              style={{ transformStyle: 'preserve-3d' }}
              className="bg-white/80 backdrop-blur-xl border border-blue-100 p-5 md:p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,62,122,0.08)] flex flex-col md:flex-row gap-6 items-center group cursor-default hover:border-blue-300 hover:shadow-[0_30px_60px_rgba(37,99,235,0.15)] transition-all duration-500"
            >
              {/* 3D Icon Block */}
              <div 
                className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center relative overflow-hidden shadow-inner border border-blue-100 group-hover:border-blue-200 transition-colors duration-500"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sec.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <sec.icon size={28} className="text-blue-600 relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-500" />
                
                {/* Tech scanning line inside icon block */}
                <motion.div animate={{ top: ['-20%', '120%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: idx * 0.5 }} className="absolute left-0 right-0 h-[2px] bg-blue-400/50 blur-[1px] z-20"></motion.div>
              </div>

              {/* Text Content */}
              <div style={{ transform: 'translateZ(15px)' }}>
                <span className={`text-xs font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${sec.color} mb-1.5 block`}>
                  Protocol 0{idx + 1} // {sec.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#121c2c] mb-2">{sec.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-500 font-medium">
                  {sec.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-32 perspective-[2000px] mb-12">
          <motion.div 
            initial={{ opacity: 0, rotateX: -20, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.02, rotateX: 5, z: 30, transition: { duration: 0.4, ease: "easeOut" } }}
            style={{ transformStyle: 'preserve-3d' }}
            className="p-12 md:p-16 bg-gradient-to-br from-[#f8fafc] to-blue-50/50 border border-blue-100 rounded-[3rem] text-center shadow-[0_30px_60px_rgba(0,62,122,0.1)] relative overflow-hidden group cursor-pointer"
          >
            {/* Animated Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Floating 3D Icon Box */}
              <div 
                className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-blue-50 relative group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-shadow duration-500"
                style={{ transform: 'translateZ(50px)' }}
              >
                <div className="absolute inset-0 border-2 border-dashed border-blue-200 rounded-3xl group-hover:rotate-180 transition-transform duration-1000"></div>
                <Fingerprint size={56} className="text-[#003e7a] drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div style={{ transform: 'translateZ(30px)' }}>
                <h4 className="text-3xl md:text-4xl font-black text-[#121c2c] mb-4 tracking-tight group-hover:text-[#003e7a] transition-colors duration-500">Data Protection Officer</h4>
                <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto font-medium">For GDPR inquiries, cryptographic key deletion requests, or compliance audits, please connect with our centralized data sovereignty office.</p>
              </div>

              <div style={{ transform: 'translateZ(60px)' }}>
                <a href="mailto:privacy@neovision.ch" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#003e7a] to-blue-600 text-white px-12 py-5 rounded-full font-black text-lg hover:shadow-[0_20px_40px_rgba(0,62,122,0.3)] hover:scale-105 transition-all duration-300">
                  <Shield size={24} /> Initiate Contact
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
