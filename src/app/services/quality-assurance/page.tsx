'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, FileCheck, CheckCircle2, Lock, Activity, ThermometerSnowflake, Fingerprint, Microscope, Award, Globe, ShieldAlert, FileText, Server } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';

// Mock data for the validation process
const validationSteps = [
  { id: 1, name: 'Thermal Integrity Scan', icon: ThermometerSnowflake, status: 'Verifying...', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { id: 2, name: 'Anti-Counterfeit Serialization', icon: Fingerprint, status: 'Authenticating...', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { id: 3, name: 'GDP Compliance Audit', icon: ShieldCheck, status: 'Cross-checking...', color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
];

export default function QualityAssurance() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-playing the scanner animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4); // Cycles 0, 1, 2, and 3 (all complete state)
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-0 bg-[#f8fafc] overflow-hidden">
      
      <PageBanner
        icon={Microscope}
        badgeText="UNCOMPROMISING STANDARDS"
        title="Quality Assurance &"
        highlightedTitle="Compliance"
        description="In pharmaceutical logistics, perfection is not an option; it is the only standard. Our rigorous QA protocols ensure zero defects and complete traceability from origin to patient."
        bottomColor="bg-[#f8fafc]"
      />

      {/* Core Protocol: 3D Glassmorphic Features */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3 block">Zero Tolerance Policy</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#121c2c] mb-6">The Architecture of Trust</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Our QMS dictates stringent audits of our carrier network, facilities, and digital infrastructure.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '2000px' }}>
          {[
            { icon: FileCheck, title: '500+ Active SOPs', desc: 'Governing every micro-interaction in the supply chain to ensure flawless execution.', delay: 0 },
            { icon: Lock, title: 'Blockchain Security', desc: 'Immutable serialization tracking to ensure complete product authenticity and prevent counterfeits.', delay: 0.2 },
            { icon: Activity, title: 'Continuous Risk AI', desc: 'Predictive algorithms identifying and mitigating potential transit risks before they occur.', delay: 0.4 },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, rotateY: 30, y: 50 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: item.delay, type: "spring", stiffness: 80 }}
              whileHover={{ y: -10, rotateX: 5, rotateY: -5, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
              className="bg-white rounded-[2rem] p-10 shadow-[0_20px_50px_rgba(0,62,122,0.06)] border border-gray-100 relative group overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-inner group-hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#121c2c] mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">{item.desc}</p>
              
              {/* Subtle tech scanner line */}
              <div className="absolute top-0 left-0 h-1.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
              {/* Huge Watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-5 text-blue-900 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
                 <item.icon size={180} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Thermal Integrity 3D Matrix */}
      <section className="py-32 relative bg-white border-t border-gray-100 overflow-hidden">
        {/* Abstract 3D BG Elements */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/3d-lettres.png')] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-cyan-600 font-bold tracking-widest text-sm uppercase mb-3 block">Thermal Defense Systems</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#121c2c] mb-6">Temperature Validation Matrix</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Precision engineered packaging and facility controls mapped to specific therapeutic profiles.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6" style={{ perspective: '1500px' }}>
            {[
              { title: 'Ultra-Low Temp', range: '-80°C to -20°C', desc: 'Liquid Nitrogen (LN2) and dry ice systems for cell & gene therapies.', color: 'from-blue-600 to-cyan-500', shadow: 'shadow-blue-500/20' },
              { title: 'Refrigerated', range: '2°C to 8°C', desc: 'Active cooling containers and phase change materials for biologics.', color: 'from-teal-500 to-emerald-400', shadow: 'shadow-teal-500/20' },
              { title: 'Controlled Room', range: '15°C to 25°C', desc: 'Thermal blankets and ambient monitoring for stability testing.', color: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/20' }
            ].map((zone, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, rotateX: 20, y: 50, z: -100 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2, type: "spring", stiffness: 60 }}
                whileHover={{ y: -10, scale: 1.02, rotateX: 5, transition: { duration: 0.3, ease: "easeOut" } }}
                className={`relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl hover:${zone.shadow} transition-shadow duration-500 group overflow-hidden`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Glowing Top Bar */}
                <div className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${zone.color} shadow-[0_5px_15px_rgba(0,0,0,0.1)]`}></div>
                
                <div className="relative z-10 pt-4">
                  <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${zone.color} text-white font-mono font-bold text-lg mb-6 shadow-md`}>
                    {zone.range}
                  </div>
                  <h3 className="text-2xl font-bold text-[#121c2c] mb-3">{zone.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{zone.desc}</p>
                  
                  {/* Faux 3D Chart/Graph Element */}
                  <div className="h-24 w-full rounded-xl bg-gray-50 border border-gray-100 flex items-end p-2 gap-1 group-hover:bg-blue-50/30 transition-colors">
                    {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        className={`flex-1 rounded-sm bg-gradient-to-t ${zone.color} opacity-40 group-hover:opacity-80 transition-opacity`}
                      ></motion.div>
                    ))}
                  </div>
                </div>

                {/* Internal 3D shadow effect */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity z-0"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW 3D ISOMETRIC VALIDATION CORE */}
      <section className="py-32 relative bg-white overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,62,122,0.05),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-5/12">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3 flex items-center gap-2">
                <ShieldAlert size={16} /> Autonomous Verification
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#121c2c] mb-6 leading-tight">Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Security Matrix</span></h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Witness our 3D isometric validation engine. Every therapeutic payload physically and digitally passes through uncompromising security gates before transport authorization.
              </p>

              <div className="space-y-4 relative">
                {/* Vertical connecting line */}
                <div className="absolute left-7 top-10 bottom-10 w-1 bg-blue-50 rounded-full z-0"></div>

                {validationSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isCompleted = activeStep > idx || activeStep === 3;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`relative pl-20 py-4 transition-all duration-500 cursor-pointer group z-10`}
                      onClick={() => setActiveStep(idx)}
                    >
                      {/* Floating Node */}
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${isActive ? 'bg-blue-600 text-white scale-110 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : isCompleted ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(52,211,153,0.4)]' : 'bg-white text-gray-400 border border-gray-100 group-hover:border-blue-200 group-hover:text-blue-400'}`}>
                        {isCompleted ? <CheckCircle2 size={24} /> : <step.icon size={24} />}
                        {isActive && (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute -inset-2 border-2 border-dashed border-blue-400 rounded-full"></motion.div>
                        )}
                      </div>

                      <h4 className={`font-bold text-xl mb-1 transition-colors ${isActive ? 'text-blue-700' : isCompleted ? 'text-[#121c2c]' : 'text-gray-500'}`}>{step.name}</h4>
                      <p className={`text-sm font-medium ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                        {isCompleted ? 'Verification Complete — Integrity Maintained' : isActive ? step.status : 'Awaiting Matrix Sequence...'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: 3D CARD SHUFFLE ENGINE */}
            <div className="w-full lg:w-7/12 flex justify-center h-[500px] lg:h-[600px] relative mt-16 lg:mt-0 perspective-[2000px] pointer-events-none">
              <div className="relative w-full max-w-md h-full flex items-center justify-center transform-style-3d">
                
                {/* 3D Stack Engine */}
                {validationSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isPast = activeStep > idx || activeStep === 3;
                  
                  // Calculate 3D position based on active state
                  let zIndex = 10;
                  let scale = 1;
                  let y = 0;
                  let x = 0;
                  let rotateX = 20;
                  let rotateY = -20;
                  let rotateZ = 5;
                  let translateZ = 0;
                  let opacity = 1;
                  
                  if (activeStep === 3) {
                     // Success Stack
                     zIndex = 30 - idx;
                     scale = 0.9;
                     y = idx * 20;
                     x = idx * 20;
                     rotateX = 30;
                     rotateY = -15;
                     rotateZ = 0;
                     translateZ = -(idx * 50);
                     opacity = 0.6;
                  } else if (isActive) {
                    // Currently Active Card pops out to the front
                    zIndex = 40;
                    scale = 1.1;
                    y = -20;
                    x = -20;
                    rotateX = 0; // Faces the user directly
                    rotateY = 0;
                    rotateZ = 0;
                    translateZ = 100;
                    opacity = 1;
                  } else if (isPast) {
                    // Past cards fall to the bottom back
                    zIndex = 10;
                    scale = 0.8;
                    y = 100 + (idx * 20);
                    x = 50;
                    rotateX = 40;
                    rotateY = -10;
                    rotateZ = 10;
                    translateZ = -100;
                    opacity = 0.3;
                  } else {
                    // Future cards wait at the top back
                    zIndex = 10;
                    scale = 0.8;
                    y = -100 - ((2-idx) * 20);
                    x = 50;
                    rotateX = 40;
                    rotateY = -10;
                    rotateZ = 10;
                    translateZ = -100;
                    opacity = 0.3;
                  }

                  return (
                    <motion.div
                      key={idx}
                      animate={{ scale, y, x, rotateX, rotateY, rotateZ, z: translateZ, opacity }}
                      transition={{ type: "spring", stiffness: 50, damping: 14 }}
                      style={{ zIndex, transformStyle: 'preserve-3d' }}
                      className={`absolute w-[320px] h-[380px] p-8 rounded-3xl border-2 backdrop-blur-2xl shadow-2xl flex flex-col justify-between overflow-hidden ${isActive ? 'bg-gradient-to-br from-white to-blue-50/80 border-blue-300 shadow-[0_30px_60px_rgba(0,62,122,0.2)]' : isPast ? 'bg-emerald-50/80 border-emerald-200 shadow-emerald-500/10' : 'bg-white/60 border-white/80'}`}
                    >
                      {/* Top Bar of Card */}
                      <div className="flex justify-between items-center relative z-10" style={{ transform: 'translateZ(20px)' }}>
                         <span className={`text-5xl font-black ${isActive ? 'text-blue-100' : 'text-gray-200'}`}>0{idx + 1}</span>
                         <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-inner ${isActive ? 'bg-blue-600 text-white shadow-[0_0_20px_blue]' : isPast ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {isPast ? <CheckCircle2 size={24} /> : <step.icon size={28} />}
                         </div>
                      </div>

                      {/* Content of Card */}
                      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                         <h3 className={`text-2xl font-bold mb-3 ${isActive ? 'text-[#121c2c]' : 'text-gray-500'}`}>{step.name}</h3>
                         <p className={`font-medium ${isActive ? 'text-blue-600' : isPast ? 'text-emerald-600' : 'text-gray-400'}`}>
                            {isActive ? 'Scanning payload integrity...' : isPast ? 'Validation Passed' : 'Awaiting Sequence'}
                         </p>
                      </div>

                      {/* Active Scanning Laser inside the card */}
                      {isActive && (
                        <motion.div 
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_blue] z-50 pointer-events-none"
                        ></motion.div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Final Success Overlay */}
                <AnimatePresence>
                  {activeStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute z-50 w-full h-full flex flex-col items-center justify-center pointer-events-none"
                      style={{ transform: 'translateZ(200px)' }}
                    >
                      <div className="w-40 h-40 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_30px_60px_rgba(52,211,153,0.6)] border-[6px] border-white mb-6">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                          <ShieldCheck size={80} className="text-white drop-shadow-md" />
                        </motion.div>
                      </div>
                      <span className="text-2xl font-bold text-emerald-700 bg-white px-8 py-3 rounded-full shadow-2xl border border-emerald-100">Protocol Secured</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Audit & Inspection Ecosystem (3D Floating Panels) */}
      <section className="py-32 relative bg-[#f8fafc] border-t border-gray-100 overflow-hidden">
         {/* Background geometric shapes */}
         <div className="absolute top-10 right-20 w-64 h-64 border-2 border-blue-100 rounded-full opacity-50"></div>
         <div className="absolute bottom-10 left-20 w-96 h-96 border-2 border-emerald-100 rounded-full opacity-50"></div>

         <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-indigo-600 font-bold tracking-widest text-sm uppercase mb-3 block">Continuous Verification</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#121c2c] mb-16">Audit Readiness Ecosystem</h2>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16" style={{ perspective: '2500px' }}>
              
              <motion.div 
                initial={{ opacity: 0, rotateY: 45, x: -100 }} whileInView={{ opacity: 1, rotateY: 15, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, type: "spring" }}
                whileHover={{ rotateY: 0, scale: 1.05, z: 50, transition: { duration: 0.4, ease: "easeOut" } }}
                className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-inner mx-auto">
                   <FileText size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#121c2c] mb-3">Regulatory Filings</h3>
                <p className="text-gray-600">Automated documentation generation for real-time compliance with global health ministries.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, type: "spring", delay: 0.2 }}
                whileHover={{ scale: 1.05, z: 80, transition: { duration: 0.4, ease: "easeOut" } }}
                className="w-full max-w-sm bg-gradient-to-br from-[#003e7a] to-blue-600 rounded-3xl p-10 shadow-[0_40px_80px_rgba(0,62,122,0.3)] border border-blue-400 z-20 cursor-pointer hover:shadow-[0_50px_100px_rgba(0,62,122,0.5)] transition-shadow duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white mb-6 shadow-inner mx-auto border border-white/20">
                   <Server size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Immutable Audit Trail</h3>
                <p className="text-blue-100">Every temperature ping, location update, and custody transfer is cryptographically sealed.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, rotateY: -45, x: 100 }} whileInView={{ opacity: 1, rotateY: -15, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, type: "spring", delay: 0.4 }}
                whileHover={{ rotateY: 0, scale: 1.05, z: 50, transition: { duration: 0.4, ease: "easeOut" } }}
                className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-inner mx-auto">
                   <ShieldAlert size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#121c2c] mb-3">Mock Recalls</h3>
                <p className="text-gray-600">Bi-annual stress testing achieving 100% successful simulation rates under 4 hours.</p>
              </motion.div>

            </div>
         </div>
      </section>

      {/* Certifications Banner (Enhance 3D) */}
      <section className="py-24 relative overflow-hidden bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-[#121c2c] mb-16">Global Certifications</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1500px' }}>
            {[
              { title: 'ISO 9001:2015', desc: 'Internationally recognized Quality Management System guaranteeing consistent, superior operational standards.' },
              { title: 'WHO GDP Compliant', desc: 'Full compliance with WHO GDP guidelines ensuring pharmaceutical integrity is maintained throughout the supply chain.' },
              { title: 'FDA Compliant', desc: 'Strict adherence to FDA regulations regarding storage, handling, and distribution of medical products.' },
            ].map((std, idx) => (
              <motion.div 
                key={std.title}
                initial={{ opacity: 0, rotateX: 30, y: 50 }} whileInView={{ opacity: 1, rotateX: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.15, type: "spring", stiffness: 60 }}
                whileHover={{ y: -10, scale: 1.02, rotateX: 5, transition: { duration: 0.3, ease: "easeOut" } }}
                style={{ transformStyle: 'preserve-3d' }}
                className="bg-gradient-to-br from-[#f8fafc] to-white border border-gray-200 shadow-lg p-10 rounded-[2rem] hover:shadow-[0_30px_60px_rgba(0,62,122,0.12)] transition-shadow duration-500 relative group overflow-hidden cursor-pointer"
              >
                {/* 3D Floating Globe inside card */}
                <motion.div 
                  className="absolute -bottom-10 -right-10 text-blue-500/5 group-hover:text-blue-500/10 pointer-events-none"
                  animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <Globe className="w-56 h-56" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-[#121c2c] mb-4 relative z-10" style={{ transform: 'translateZ(30px)' }}>{std.title}</h3>
                <p className="text-gray-600 leading-relaxed relative z-10" style={{ transform: 'translateZ(10px)' }}>{std.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
