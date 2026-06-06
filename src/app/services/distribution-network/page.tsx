'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, Route, Plane, Truck, Clock, Radar, ShieldCheck, Box, Database } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import Link from 'next/link';

// Mock Data for Live Feed
const liveUpdates = [
  { id: 1, type: 'flight', text: 'Cargo Flight NV-884 departed Frankfurt (FRA) for Singapore (SIN)', time: 'Just now', temp: '-20.1°C' },
  { id: 2, type: 'truck', text: 'Ground Fleet Unit 7B arrived at Paris Regional Hub', time: '2 min ago', temp: '4.2°C' },
  { id: 3, type: 'delivery', text: 'Successful Last-Mile Delivery: Oncology Center, Tokyo', time: '5 min ago', temp: '2.5°C' },
  { id: 4, type: 'alert', text: 'Route optimization active: Rerouting Fleet 14 due to heavy traffic', time: '12 min ago', temp: '5.0°C' },
  { id: 5, type: 'flight', text: 'Cargo Flight NV-112 landed at JFK International Airport', time: '18 min ago', temp: '-19.8°C' },
];

const lifecycleSteps = [
  {
    icon: Box,
    title: 'Secure Origin Pickup',
    desc: 'High-security induction from the manufacturing facility. Immediate thermal lockdown and tamper-evident sealing applied.',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Plane,
    title: 'Cold-Chain Air Freight',
    desc: 'Priority routing on dedicated cargo aircraft. Active temperature-controlled ULDs ensure zero thermal deviations across continents.',
    color: 'from-teal-500 to-emerald-400'
  },
  {
    icon: Database,
    title: 'Regional Hub Sorting',
    desc: 'Automated, GDP-certified facilities process pallets within minutes. Continuous thermal monitoring during transit breakdowns.',
    color: 'from-indigo-500 to-purple-400'
  },
  {
    icon: Truck,
    title: 'Last-Mile Precision',
    desc: 'Direct-to-pharmacy delivery via validated ground fleets. Electronic proof of delivery with complete temperature logs.',
    color: 'from-rose-500 to-orange-400'
  }
];

// High-Precision 3D Map Coordinates
const nodes = [
  { id: 'NY', label: 'New York', code: 'JFK', left: 15, top: 45 },
  { id: 'LDN', label: 'London', code: 'LHR', left: 35, top: 25 },
  { id: 'DXB', label: 'Dubai', code: 'DXB', left: 55, top: 50 },
  { id: 'BOM', label: 'Mumbai', code: 'BOM', left: 70, top: 45 },
  { id: 'SIN', label: 'Singapore', code: 'SIN', left: 82, top: 70 },
  { id: 'TYO', label: 'Tokyo', code: 'NRT', left: 92, top: 35 },
];

// SVG Arcs for the 3D Flight Paths
const arcs = [
  { d: 'M 15 45 Q 25 10 35 25', delay: 0.5, duration: 1.5 },
  { d: 'M 35 25 Q 45 15 55 50', delay: 2.0, duration: 1.5 },
  { d: 'M 55 50 Q 62.5 30 70 45', delay: 3.5, duration: 1.0 },
  { d: 'M 70 45 Q 76 35 82 70', delay: 4.5, duration: 1.5 },
  { d: 'M 82 70 Q 87 20 92 35', delay: 6.0, duration: 1.5 },
];

// Ground Shadow Path (offset Y by +15%)
const groundPath = 'M 15 60 L 35 40 L 55 65 L 70 60 L 82 85 L 92 50';

export default function DistributionNetwork() {
  const [feedIndex, setFeedIndex] = useState(0);

  // Cycle live feed
  useEffect(() => {
    const timer = setInterval(() => {
      setFeedIndex((prev) => (prev + 1) % liveUpdates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#f8fafc] overflow-hidden">
      {/* Redesigned Premium Hero - Compact & Elegant */}
      <PageBanner
        icon={Globe}
        badgeText="GLOBAL NETWORK"
        title="Unrivaled"
        highlightedTitle="Global Distribution"
        description="Connecting continents with an impenetrable, ultra-secure logistics framework. We ensure that critical medical supplies traverse borders safely, efficiently, and with zero thermal deviation."
        bottomColor="bg-[#f8fafc]"
      >
        <Link href="/contact">
          <motion.button
            className="flex items-center gap-2 bg-white text-[#003e7a] px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#78f7e9] hover:shadow-[0_0_20px_rgba(120,247,233,0.4)]"
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
          >
            Explore Routes <ArrowRight size={16} />
          </motion.button>
        </Link>
      </PageBanner>

      {/* True 3D Animated Arc Map Dashboard */}
      <section className="relative py-20 bg-[#f8fafc] z-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 text-center relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#121c2c] mb-4 tracking-tight">Global Reach. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#003e7a]">Local Precision.</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Watch our live logistics network span the globe with real-time route tracing.</p>
          </motion.div>

          {/* 3D Arc Map Container */}
          <div className="relative w-full h-[450px] md:h-[650px] rounded-[3rem] border border-blue-200 shadow-[0_40px_100px_rgba(0,62,122,0.12)] bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30 overflow-visible group">
            
            {/* Elegant Map Grid Background */}
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,62,122,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,62,122,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/40 to-white/90"></div>
            </div>

            {/* Top Bar Badges */}
            <div className="absolute top-8 left-8 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-blue-100 rounded-full px-5 py-2.5 shadow-md z-30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              <span className="text-xs text-[#003e7a] font-bold tracking-widest uppercase">Live 3D Route Mapping</span>
            </div>

            {/* SVG Layer for 3D Arcs & Ground Shadows */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible z-10 pointer-events-none" preserveAspectRatio="none">
              {/* Ground Shadow Path */}
              <motion.path 
                d={groundPath}
                fill="none" stroke="rgba(0,62,122,0.15)" strokeWidth="3" strokeDasharray="1,2" vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 3, ease: "linear" }}
              />

              {/* 3D Curved Flight Paths */}
              {arcs.map((arc, idx) => (
                <motion.path 
                  key={idx}
                  d={arc.d}
                  fill="none" stroke="url(#arcGradient)" strokeWidth="4" vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: arc.duration, delay: arc.delay, ease: "easeInOut" }}
                  className="drop-shadow-[0_15px_10px_rgba(37,99,235,0.3)]"
                />
              ))}

              <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#003e7a" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Render 3D Floating Nodes */}
            {nodes.map((node, i) => (
              <div key={i} className="absolute flex flex-col items-center pointer-events-none" style={{ top: `${node.top}%`, left: `${node.left}%`, transform: 'translate(-50%, -50%)', zIndex: 20 }}>
                
                {/* Ground Shadow for the Node */}
                <div className="absolute w-8 h-2 bg-black/15 rounded-[100%] blur-[2px]" style={{ top: '150px' }}></div>
                
                {/* The Floating Pillar */}
                <motion.div 
                  initial={{ height: 0 }} whileInView={{ height: '150px' }} transition={{ duration: 1, delay: i * 0.4 }}
                  className="absolute w-px bg-gradient-to-b from-blue-400 to-transparent" style={{ top: 0, transformOrigin: 'top' }}
                />

                {/* The Core Floating Dot */}
                <motion.div 
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: i * 0.4 }}
                  className="w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_25px_rgba(37,99,235,0.8)] border-2 border-white relative"
                >
                  <div className="absolute inset-0 -m-3 rounded-full border border-blue-400/50 animate-ping"></div>
                </motion.div>

                {/* The Floating Label Plate */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 + (i * 0.4) }}
                  className="absolute -top-12 bg-white/90 backdrop-blur-md border border-blue-200 rounded-xl px-4 py-2 flex flex-col items-center shadow-[0_15px_30px_rgba(0,62,122,0.15)]"
                >
                  <span className="text-[10px] text-blue-500 font-black">{node.code}</span>
                  <span className="text-sm text-[#121c2c] font-bold whitespace-nowrap">{node.label}</span>
                </motion.div>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Network Status Dashboard */}
      <section className="py-12 bg-[#f8fafc] relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,62,122,0.06)] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* Left: Live Feed Terminal */}
              <div className="w-full lg:w-[60%] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </div>
                  <h3 className="text-[#121c2c] font-bold text-lg tracking-wider uppercase flex items-center gap-2">
                    <Radar className="text-red-500" size={20} /> Live Network Feed
                  </h3>
                </div>

                <div className="relative h-[160px] bg-[#f8fafc] rounded-2xl border border-blue-100 p-5 overflow-hidden shadow-inner flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={liveUpdates[feedIndex].id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="flex flex-col gap-3 w-full"
                    >
                      <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
                        <span className="text-[11px] text-gray-500 font-bold tracking-widest uppercase flex items-center gap-1.5">
                          <Clock size={12} className="text-blue-500" /> {liveUpdates[feedIndex].time}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded border border-blue-100">Temp</span>
                          <span className="text-xs font-mono font-bold text-[#003e7a]">{liveUpdates[feedIndex].temp}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pt-1">
                        <div className="mt-1">
                          {liveUpdates[feedIndex].type === 'flight' ? <Plane size={18} className="text-blue-500" /> : 
                           liveUpdates[feedIndex].type === 'truck' ? <Truck size={18} className="text-teal-500" /> :
                           liveUpdates[feedIndex].type === 'alert' ? <Radar size={18} className="text-red-500 animate-pulse" /> :
                           <Box size={18} className="text-emerald-500" />}
                        </div>
                        <p className="text-[#121c2c] text-sm md:text-base font-medium leading-relaxed">
                          {liveUpdates[feedIndex].text}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Scanning Line Effect */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    animate={{ y: [0, 160, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Right: Premium Stats Counter */}
              <div className="w-full lg:w-[40%] flex flex-col justify-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Stat Card 1 */}
                  <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-5 rounded-2xl flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -z-10 group-hover:bg-blue-500/10 transition-colors"></div>
                    <span className="text-3xl md:text-4xl font-black text-blue-600 mb-2">1,204</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Active Routes</span>
                  </motion.div>
                  
                  {/* Stat Card 2 */}
                  <motion.div whileHover={{ y: -5, scale: 1.02 }} className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-5 rounded-2xl flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full -z-10 group-hover:bg-emerald-500/10 transition-colors"></div>
                    <span className="text-3xl md:text-4xl font-black text-emerald-600 mb-2">99.9%</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">SLA Maintained</span>
                  </motion.div>
                </div>

                {/* Stat Card 3 (Full width Premium Banner) */}
                <motion.div whileHover={{ y: -5, scale: 1.01 }} className="bg-gradient-to-r from-[#003e7a] to-blue-600 p-5 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                  <div className="relative z-10">
                    <span className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                      <ShieldCheck size={24} className="text-cyan-300" /> Fully GDP Compliant
                    </span>
                    <span className="text-[10px] text-blue-200 uppercase font-bold tracking-widest block mt-1">Global Medical Standard</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center relative z-10 backdrop-blur-sm border border-white/20 shadow-inner">
                    <Database size={20} className="text-white" />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* The Pharma Transit Lifecycle (Vertical Scroll Timeline) */}
      <section className="py-24 relative bg-[#f8fafc] overflow-hidden border-t border-gray-100">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,62,122,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,62,122,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-[#121c2c] mb-6">The Transit Lifecycle</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">An unbroken chain of custody ensuring the highest level of therapeutic integrity. Trace our meticulously optimized delivery sequence.</p>
          </div>

          <div className="relative">
            {/* Animated Vertical Line */}
            <motion.div 
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: "circOut" }}
              className="absolute left-[35px] md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#003e7a] via-[#3b82f6] to-[#06b6d4] rounded-full origin-top"
            ></motion.div>
            
            <div className="space-y-16 md:space-y-32">
              {lifecycleSteps.map((step, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Left/Right Card Area */}
                  <div className="w-full md:w-1/2 flex justify-start md:justify-end md:px-12 relative z-20">
                    <motion.div 
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className={`w-full max-w-[500px] bg-white border border-gray-100 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,62,122,0.06)] relative group hover:border-blue-200 transition-all duration-300 overflow-hidden ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                    >
                      {/* Premium Watermark Number */}
                      <div className={`absolute -top-6 ${idx % 2 === 0 ? '-left-6' : '-right-6'} text-[120px] font-black text-gray-50 opacity-50 pointer-events-none select-none transition-all duration-500 group-hover:text-blue-50 group-hover:scale-110`}>
                        0{idx + 1}
                      </div>

                      {/* Card Content */}
                      <div className="relative z-10">
                        <span className="inline-block text-[10px] font-bold text-white tracking-widest uppercase mb-4 bg-gradient-to-r from-[#003e7a] to-blue-500 px-3 py-1 rounded-full shadow-sm">
                          Phase 0{idx + 1}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#121c2c] mb-4 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">{step.desc}</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Center Node */}
                  <div className="absolute left-[35px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-30">
                    <motion.div 
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                      className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-white shadow-[0_0_30px_rgba(37,99,235,0.2)] group cursor-default"
                    >
                      <div className="absolute inset-0 -m-3 rounded-full border border-blue-400/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon size={24} />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Connecting Line from Node to Card (Desktop Only) */}
                  <div className="w-full md:w-1/2 hidden md:flex items-center absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <motion.div 
                      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.5 }}
                      className={`h-0.5 bg-gradient-to-r ${idx % 2 === 0 ? 'from-transparent to-blue-200' : 'from-blue-200 to-transparent'} w-[80%] opacity-50 ${idx % 2 === 0 ? 'origin-right' : 'origin-left'}`}
                      style={{ [idx % 2 === 0 ? 'right' : 'left']: '50%' }}
                    ></motion.div>
                  </div>
                  
                  <div className="w-full md:w-1/2 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Multimodal Fleet Cards */}
      <section className="py-24 relative z-10 bg-[#f8fafc] border-t border-gray-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/clean-textile.png')] mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3 block">Omnichannel Logistics</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#121c2c] mb-6">Multimodal Transport Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Optimized physical assets ensuring unparalleled speed, security, and scale across all terrains and borders.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12" style={{ perspective: '2000px' }}>
            {[
              { icon: Plane, title: 'Air Freight', desc: 'Direct-to-patient and next-flight-out (NFO) for ultra-urgent biologicals.', color: 'from-blue-500 to-cyan-400', glow: 'group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]', textGlow: 'text-blue-500' },
              { icon: Truck, title: 'Ground Fleet', desc: 'GDP-compliant, fully validated temperature-controlled vehicles.', color: 'from-teal-500 to-emerald-400', glow: 'group-hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)]', textGlow: 'text-teal-500' },
              { icon: Route, title: 'Route AI', desc: 'AI-driven software calculates the fastest, safest paths mitigating risks.', color: 'from-indigo-500 to-purple-400', glow: 'group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]', textGlow: 'text-indigo-500' },
              { icon: Clock, title: 'Last-Mile SLA', desc: 'Critical delivery to pharmacies maintaining rigid SLA timelines.', color: 'from-rose-500 to-orange-400', glow: 'group-hover:shadow-[0_20px_40px_rgba(244,63,94,0.15)]', textGlow: 'text-rose-500' },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, rotateY: 30, y: 50 }} 
                whileInView={{ opacity: 1, rotateY: 0, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ duration: 0.8, delay: idx * 0.15, type: "spring", stiffness: 80 }}
                className={`bg-white border border-gray-100 rounded-[2rem] p-8 relative overflow-hidden group transition-all duration-500 ${feature.glow} hover:-translate-y-3 cursor-pointer h-[350px] flex flex-col justify-between`}
              >
                {/* Huge Watermark Icon */}
                <div className="absolute -bottom-8 -right-8 text-gray-50 opacity-60 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none z-0">
                  <feature.icon size={160} strokeWidth={1} />
                </div>

                {/* Animated Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 z-0`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Block */}
                  <div className="relative w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-14 group-hover:bg-white group-hover:shadow-lg border border-gray-100 transition-all duration-300">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-10`}></div>
                    <feature.icon size={30} className={`${feature.textGlow} relative z-10`} />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-[#121c2c] mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px] group-hover:text-gray-700 transition-colors">{feature.desc}</p>
                </div>

                {/* Animated Learn More */}
                <div className="relative z-10 flex items-center gap-2 mt-auto pt-6 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out font-bold w-max group/btn cursor-pointer">
                  <span className={`${feature.textGlow} uppercase tracking-wider text-sm relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current group-hover/btn:after:w-full after:transition-all after:duration-300`}>Explore</span>
                  <ArrowRight size={18} className={`${feature.textGlow} transform transition-transform duration-300 group-hover:translate-x-1 group-hover/btn:translate-x-3`} />
                </div>
                
                {/* Top Border Glow Line */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${feature.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
