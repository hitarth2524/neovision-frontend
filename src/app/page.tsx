'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Truck, Snowflake, ShieldCheck, Heart, Stethoscope, Baby, Eye, Ear, Brain, Globe, Network } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Partner Pharmacies' },
  { value: 85, suffix: '+', label: 'Distribution Centers' },
  { value: 42, suffix: '', label: 'Countries Served' },
];

const highlights = [
  { icon: Truck, color: 'bg-blue-50 text-[#003e7a]', title: 'Reliable Logistics', desc: 'Streamlined routing and real-time tracking systems ensure your critical supplies arrive exactly when needed.', img: '/images/logistics_card.png' },
  { icon: Snowflake, color: 'bg-teal-50 text-[#006a62]', title: 'Cold-Chain Excellence', desc: 'Strict temperature-controlled environments from warehouse to delivery, preserving medication efficacy.', img: '/images/cold_chain_card.png' },
  { icon: ShieldCheck, color: 'bg-blue-50 text-[#003e7a]', title: 'Quality Assurance', desc: 'Rigorous compliance protocols and continuous monitoring systems exceeding regulatory standards.', img: '/images/quality_card.png' },
];

const expertise = [
  {
    icon: Heart,
    label: 'Cardiology',
    desc: 'Advanced logistics for cardiovascular therapeutics, ensuring temperature integrity for life-saving medications.',
    img: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&q=80&w=800',
    color: 'from-rose-500 to-red-600'
  },
  {
    icon: Stethoscope,
    label: 'Oncology',
    desc: 'Specialized cold-chain distribution for highly sensitive oncological treatments and targeted therapies.',
    img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Baby,
    label: 'Pediatrics',
    desc: 'Dedicated safe-handling channels for pediatric formulations, prioritizing stringent quality control.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    color: 'from-teal-500 to-emerald-600'
  },
  {
    icon: Eye,
    label: 'Ophthalmology',
    desc: 'Precision distribution for delicate ophthalmic solutions and specialized eye care medications.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    icon: Ear,
    label: 'ENT (Otolaryngology)',
    desc: 'Comprehensive supply chain solutions for specialized ear, nose, and throat therapeutics.',
    img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800',
    color: 'from-orange-500 to-amber-600'
  },
  {
    icon: Brain,
    label: 'Neurology',
    desc: 'Secure and compliant logistics for complex neurological and central nervous system medications.',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    color: 'from-fuchsia-500 to-pink-600'
  }
];

const qualityStandards = [
  {
    title: 'Global Regulatory Compliance',
    desc: 'ISO 9001:2015 & ISO 13485 certified, ensuring strict adherence to international medical quality management systems.'
  },
  {
    title: 'GDP & GMP Standards',
    desc: 'Full compliance with WHO Good Distribution Practices, maintaining pharmaceutical integrity throughout the supply chain.'
  },
  {
    title: 'Advanced Cold-Chain Integrity',
    desc: '24/7 real-time temperature monitoring (2°C to 8°C) with automated alert systems for sensitive biologics and vaccines.'
  },
  {
    title: 'End-to-End Traceability',
    desc: 'Comprehensive batch-tracking and stringent pharmacovigilance protocols to prevent counterfeit medications.'
  }
];

const qualityImages = [
  {
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    caption: 'State-of-the-Art Quality Control'
  },
  {
    img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
    caption: 'Temperature-Controlled Storage'
  },
  {
    img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
    caption: 'Secure Medication Handling'
  },
  {
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
    caption: 'Global Logistics Network'
  }
];

const regions = [
  { name: 'United States', count: '25+', label: 'GDP-Compliant Hubs', desc: 'State-of-the-art facilities ensuring regulatory compliance.', color: 'from-cyan-400 to-blue-500' },
  { name: 'Germany', count: '18+', label: 'Cold-Chain Facilities', desc: 'Temperature-controlled storage for highly sensitive biologics.', color: 'from-blue-500 to-indigo-600' },
  { name: 'UAE', count: '15+', label: 'Central Transit Hubs', desc: 'Connecting Eastern and Western global pharma markets.', color: 'from-cyan-500 to-teal-500' },
  { name: 'India', count: '30+', label: 'Strategic Logistics Centers', desc: 'Rapid distribution network for time-critical medications.', color: 'from-indigo-400 to-purple-500' },
  { name: 'Singapore', count: '12+', label: 'Specialized Pharma Depots', desc: 'Secure handling and distribution of specialized therapeutics.', color: 'from-purple-400 to-pink-500' },
];

const floatingCountries = [
  { id: 'usa', name: 'United States', top: '32%', left: '20%', detail: 'Primary cold-chain logistics hub. 5 Major Distribution Centers.' },
  { id: 'germany', name: 'Germany', top: '24%', left: '52%', detail: 'Advanced therapeutics & R&D compliance depot.' },
  { id: 'uae', name: 'UAE', top: '44%', left: '62%', detail: 'Central transit hub connecting Eastern and Western markets.' },
  { id: 'india', name: 'India', top: '51%', left: '70%', detail: 'Major manufacturing and export distribution center.' },
  { id: 'singapore', name: 'Singapore', top: '64%', left: '78%', detail: 'High-tech GDP-compliant facility for the APAC region.' },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Slight delay to ensure React has fully rendered and painted the DOM 
    // before GSAP calculates scroll positions.
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Stats counter animation
        gsap.from('.stat-number', {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          }
        });

        ScrollTrigger.refresh();
      });
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [mounted]);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
            poster="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
            src="https://assets.mixkit.co/videos/preview/mixkit-medical-researcher-analyzing-liquid-in-a-test-tube-8857-large.mp4"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full pt-20 pb-16">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-blue-200 text-sm font-bold tracking-wide mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <Globe size={16} className="text-blue-400 animate-pulse" />
                Global Pharmaceutical Logistics
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                Delivering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 animate-gradient-x drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Life-Saving</span> <br />
                Solutions Worldwide
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed text-shadow-sm">
                Ensuring precise, safe, and efficient delivery of vital medical supplies with industry-leading cold-chain logistics and rigorous quality assurance protocols.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <button className="group/btn relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#003e7a] to-[#005bb5] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_10px_30px_rgba(0,62,122,0.4)] hover:shadow-[0_15px_40px_rgba(0,240,255,0.4)] w-full sm:w-auto transform hover:-translate-y-1 overflow-hidden border border-blue-400/20 hover:border-cyan-400/40">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <span className="relative z-10 flex items-center gap-2">Explore Our Products <ArrowRight size={20} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" /></span>
                  </button>
                </Link>
                <Link href="/about">
                  <button className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 hover:border-white/40 transition-all duration-500 w-full sm:w-auto transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Learn More
                  </button>
                </Link>
              </div>

              {/* Badges/Details */}
              <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 max-w-xl relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <div className="text-4xl font-black text-white drop-shadow-md">99.9%</div>
                  <div className="text-sm text-blue-200 mt-1 font-medium">On-time Delivery Rate</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-md">100%</div>
                  <div className="text-sm text-blue-200 mt-1 font-medium">GDP Compliant Facilities</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <div className="hidden lg:flex items-center justify-center relative perspective-[1000px]">
            {/* Ambient Background Glow */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" 
            />
            
            {/* Glass Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, y: [0, -10, 0] }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.2 },
                x: { duration: 0.8, delay: 0.2 },
                rotateY: { duration: 0.8, delay: 0.2 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } 
              }}
              whileHover={{ scale: 1.02, rotateY: -5, rotateX: 5 }}
              className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <motion.div className="flex items-center gap-4 mb-6 relative z-10" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-600/10 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                   <ShieldCheck size={26} className="text-blue-400" />
                 </div>
                 <div>
                   <h3 className="text-white font-bold text-lg">Secure Cold Chain</h3>
                   <p className="text-blue-200/80 text-sm">2°C to 8°C Monitoring</p>
                 </div>
              </motion.div>

              <motion.div className="flex items-center gap-4 mb-6 relative z-10" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                   <Network size={26} className="text-cyan-400" />
                 </div>
                 <div>
                   <h3 className="text-white font-bold text-lg">Global Reach</h3>
                   <p className="text-cyan-200/80 text-sm">42+ Countries Served</p>
                 </div>
              </motion.div>

              <motion.div className="flex items-center gap-4 relative z-10" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                   <CheckCircle2 size={26} className="text-emerald-400" />
                 </div>
                 <div>
                   <h3 className="text-white font-bold text-lg">Quality Assured</h3>
                   <p className="text-emerald-200/80 text-sm">ISO 9001:2015 Certified</p>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS STRIP (Animated Counters) */}
      <section className="bg-[#003e7a] text-white py-16 relative z-30 -mt-8 mx-4 md:mx-16 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-8" ref={statsRef}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/20 text-center">
            {stats.map(({ value, suffix, label }, idx) => (
              <div key={label} className="px-4">
                <div className="text-4xl md:text-5xl font-bold mb-2 font-[family-name:var(--font-inter)] flex items-center justify-center">
                  <span className="stat-number">{value}</span>
                  <span>{suffix}</span>
                </div>
                <div className="text-blue-200 text-sm md:text-base font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS VERTICALS */}
      <section ref={highlightsRef} className="py-32 bg-[#f4f7fc] relative z-0 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-blue-50/80 to-transparent rounded-bl-[150px] pointer-events-none -z-10"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SplitTextReveal text="Business Verticals" className="text-4xl md:text-6xl font-bold text-[#121c2c] font-[family-name:var(--font-inter)] mb-4 justify-center" />
            <p className="text-[#424751] text-lg max-w-3xl mx-auto">Our infrastructure is built on unwavering standards to guarantee the integrity of every pharmaceutical product we handle across our diverse divisions.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map(({ icon: Icon, color, title, desc, img }, idx) => (
              <div key={title} className="highlight-card group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 bg-white/80 backdrop-blur-xl hover:bg-white hover:shadow-[0_20px_40px_rgb(0,62,122,0.12)] transition-all duration-500 hover:-translate-y-2">

                {/* Decorative background gradient inside card */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-[0.08] rounded-full blur-2xl -translate-y-1/3 translate-x-1/4 transition-opacity duration-500 group-hover:opacity-20 ${idx === 0 ? 'from-blue-500 to-indigo-500' : idx === 1 ? 'from-teal-500 to-emerald-500' : 'from-indigo-500 to-purple-500'
                  }`} />

                {/* Subtle top border accent */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r opacity-70 transition-opacity duration-500 group-hover:opacity-100 ${idx === 0 ? 'from-blue-400 to-indigo-500' : idx === 1 ? 'from-teal-400 to-emerald-500' : 'from-indigo-400 to-purple-500'
                  }`} />

                {/* Hover Background (Image + Gradient) */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                  <img
                    src={img}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003e7a] via-[#003e7a]/90 to-[#003e7a]/40" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 p-10 h-full flex flex-col">
                  {/* Icon Container with glowing effect on hover */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-white/50 transition-all duration-500 group-hover:bg-white/20 group-hover:backdrop-blur-xl group-hover:border-white/30 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-110 relative ${color}`}>
                    <Icon size={32} className="relative z-10" />
                  </div>

                  {/* Text content that moves up on hover */}
                  <div className="mt-auto transform transition-all duration-500 group-hover:-translate-y-2">
                    <h3 className="text-3xl font-bold text-[#121c2c] font-[family-name:var(--font-inter)] mb-4 transition-colors duration-500 group-hover:text-white flex items-end justify-between">
                      <span className="leading-tight">{title}</span>
                      <div className="w-10 h-10 rounded-full bg-[#78f7e9]/20 flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                        <ArrowRight className="text-[#78f7e9]" size={20} />
                      </div>
                    </h3>
                    <p className="text-base text-[#424751] leading-relaxed transition-colors duration-500 group-hover:text-[#e0edff] opacity-90">{desc}</p>
                  </div>
                </div>

                {/* Subtle border overlay on hover */}
                <div className="absolute inset-0 border-2 border-white/0 rounded-[2rem] group-hover:border-white/20 transition-colors duration-500 pointer-events-none z-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section ref={expertiseRef} className="py-32 bg-white relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50/50 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-50/50 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-[#003e7a] text-sm font-semibold tracking-wider mb-4">THERAPEUTIC AREAS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#121c2c] font-[family-name:var(--font-inter)] mb-6">Our Expertise</h2>
            <p className="text-[#424751] text-lg max-w-2xl mx-auto">Specialized distribution networks catering to vital therapeutic areas, ensuring the highest standards of pharmaceutical care.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertise.map(({ icon: Icon, label, desc, img, color }, idx) => (
              <motion.div
                key={label}
                className="expertise-card group relative h-[380px] bg-gradient-to-br from-white to-[#f4f7fc] rounded-3xl overflow-hidden cursor-pointer border border-[#e2e8f0] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,62,122,0.15)] transition-all duration-500"
                whileHover={{ y: -8 }}
              >
                {/* Decorative background glow in idle state */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${color} opacity-10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 transition-opacity duration-500 group-hover:opacity-0`} />

                {/* Background Image that fades in on hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                  <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003e7a]/95 via-[#003e7a]/70 to-[#003e7a]/30"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} p-[2px] mb-8 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-lg group-hover:shadow-black/20`}>
                    <div className="w-full h-full bg-white group-hover:bg-transparent rounded-[14px] flex items-center justify-center transition-colors duration-500">
                      <Icon size={28} className="text-[#003e7a] group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Text (Moves up slightly on hover) */}
                  <div className="mt-auto transform transition-all duration-500 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-[#121c2c] group-hover:text-white font-[family-name:var(--font-inter)] mb-3 flex items-center justify-between transition-colors duration-500">
                      {label}
                      <ArrowRight size={20} className="opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 text-[#78f7e9]" />
                    </h3>
                    <p className="text-[#424751] group-hover:text-white/90 leading-relaxed transition-colors duration-500">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Border effect on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-3xl transition-colors duration-500 pointer-events-none z-20"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT (Sticky Scrolling Layout) */}
      <section className="bg-gradient-to-b from-[#f4f7fc] to-white relative">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-text.png')] opacity-[0.03]"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto relative z-10 gap-16 px-4 md:px-16 pb-32">

          {/* Left Side Text & Boxes - STICKY */}
          <div className="lg:w-1/2 lg:sticky lg:top-24 self-start pt-24 pb-8" ref={certRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-[#003e7a] text-sm font-semibold tracking-wider mb-4">OUR PROMISE</span>
              <SplitTextReveal text="Uncompromising Commitment to Quality" className="text-4xl md:text-5xl font-bold text-[#121c2c] font-[family-name:var(--font-inter)] leading-tight" />
            </motion.div>

            <p className="text-[#424751] text-lg mb-10 leading-relaxed max-w-lg">
              We adhere to the most stringent global standards to ensure every pharmaceutical product we distribute meets the absolute highest criteria for safety, stability, and efficacy.
            </p>

            <div className="space-y-4 max-w-lg">
              {qualityStandards.map((std, idx) => (
                <div key={std.title} className="quality-item relative flex items-start gap-5 p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,62,122,0.12)] transition-all duration-500 overflow-hidden group cursor-default hover:-translate-y-1">
                  {/* Hover background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Icon */}
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#003e7a] group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <CheckCircle2 size={24} className="text-[#003e7a] group-hover:text-white transition-colors duration-500" />
                  </div>

                  {/* Text */}
                  <div className="relative z-10">
                    <h4 className="text-[#121c2c] text-lg font-bold mb-1 font-[family-name:var(--font-inter)] group-hover:text-[#003e7a] transition-colors duration-300">{std.title}</h4>
                    <p className="text-[#424751] text-sm leading-relaxed">{std.desc}</p>
                  </div>

                  {/* Left border accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#003e7a] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Scrolling Images */}
          <div className="lg:w-1/2 w-full pt-24 pb-8">
            <div className="flex flex-col gap-[50vh] w-full">
              {qualityImages.map((item, idx) => (
                <div key={idx} className="sticky top-24 w-full h-[60vh] lg:h-[70vh] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] group border-[8px] border-white/80 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003e7a]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10" />

                  <img src={item.img} alt={item.caption} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />

                  {/* Hover Glassmorphic Badge (Hidden by default, shows on hover) */}
                  <div className="absolute bottom-8 left-8 right-8 z-20">
                    <div className="w-full bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-5 transform transition-all duration-500 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-4 shadow-2xl">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-700 delay-100">
                        <ShieldCheck size={24} className="text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-blue-200 text-xs font-bold tracking-wider uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">Quality Standard</span>
                        <h5 className="text-white text-lg font-bold font-[family-name:var(--font-inter)] tracking-wide drop-shadow-md">{item.caption}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>      {/* REGIONS */}
      <section className="bg-[#0c1a2d] relative py-24 lg:py-32 overflow-hidden" ref={regionRef}>

        {/* Animated Gradient Glows */}
        <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-blue-500/15 rounded-full blur-[120px] -translate-y-1/2 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-cyan-500/15 rounded-full blur-[120px] -translate-y-1/2 animate-pulse" style={{ animationDuration: '5s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold tracking-wider mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">GLOBAL REACH</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-inter)] mb-6 tracking-tight">Worldwide Pharmaceutical Network</h2>
            <p className="text-[#a0aabf] text-lg max-w-3xl mx-auto leading-relaxed">Our expansive, highly regulated distribution network ensures the secure, timely delivery of critical medical supplies and specialized therapeutics across multiple continents.</p>
          </div>
        </div>

        <style>{`
          @keyframes float-3d {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-12px) scale(1.05); }
          }
        `}</style>

        {/* Interactive Map Area (FULL SCREEN WIDTH) */}
        <div className="relative w-full max-w-[120rem] mx-auto px-4 sm:px-8 lg:px-12 z-10 mb-20">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.2/1] xl:aspect-[2.5/1] min-h-[450px] lg:min-h-[600px] xl:min-h-[700px] rounded-[2rem] overflow-hidden border border-white/5 bg-[#121c2c]/40 shadow-2xl backdrop-blur-sm group">
            {/* World Map Background Image */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-[10s] group-hover:scale-110"></div>

            {/* Floating Interactive Country Pins */}
            {mounted && (
              <div className="absolute inset-0 z-10 pointer-events-none">
                {floatingCountries.map((country, idx) => (
                  <div
                    key={country.id}
                    className="absolute pointer-events-auto group/pin"
                    style={{
                      top: country.top,
                      left: country.left,
                      animation: `float-3d 5s ease-in-out infinite ${idx * 0.4}s`
                    }}
                  >
                    {/* Pin Point */}
                    <div className="relative flex items-center justify-center cursor-pointer">
                      <div className="w-3 h-3 lg:w-4 lg:h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]"></div>
                      <div className="absolute w-8 h-8 lg:w-10 lg:h-10 border border-cyan-400/50 rounded-full animate-ping"></div>

                      {/* Country Name Label (Always Visible) */}
                      <div className="absolute left-6 lg:left-8 text-cyan-50 font-bold text-xs lg:text-sm tracking-wide whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-[#0a1118]/60 px-2.5 py-1 rounded-md backdrop-blur-md group-hover/pin:text-white transition-colors border border-cyan-500/20 group-hover/pin:border-cyan-400/60 shadow-lg">
                        {country.name}
                      </div>
                    </div>

                    {/* Hover Detail Card */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-56 lg:w-64 bg-[#0a1118]/95 backdrop-blur-xl border border-cyan-500/50 rounded-xl p-4 opacity-0 translate-y-4 group-hover/pin:opacity-100 group-hover/pin:translate-y-0 transition-all duration-300 pointer-events-none shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50">
                      <div className="text-cyan-400 text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-1.5">{country.name} Hub</div>
                      <div className="text-gray-200 text-xs lg:text-sm leading-relaxed">{country.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cards Area (BELOW the map) */}
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
            {regions.map((region, idx) => (
              <div key={region.name} className="region-card group relative rounded-3xl p-[1px] overflow-hidden cursor-pointer">
                {/* Glowing Border effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="absolute inset-0 bg-white/10 opacity-100 group-hover:opacity-0 transition-opacity duration-700" />

                {/* Inner Card content */}
                <div className="relative h-full bg-[#121c2c]/90 backdrop-blur-xl rounded-[23px] p-8 flex flex-col items-center text-center group-hover:-translate-y-1 transition-transform duration-500 overflow-hidden">

                  {/* Background flare on hover */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br ${region.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 rounded-full`} />

                  {/* Count & Name */}
                  <div className="relative z-10">
                    <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 group-hover:from-white group-hover:to-white transition-all duration-300 mb-2 font-[family-name:var(--font-inter)] drop-shadow-sm">
                      {region.count}
                    </div>
                    <div className="text-white font-bold text-xl mb-4 tracking-wide">{region.name}</div>
                  </div>

                  <div className="w-12 h-1 bg-gray-700/50 rounded-full mb-5 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-blue-400 group-hover:to-transparent transition-all duration-700 ease-in-out"></div>

                  <div className="relative z-10 flex-1 flex flex-col justify-between items-center w-full">
                    <div className="text-[#60e0cc] font-medium text-xs sm:text-sm uppercase tracking-widest mb-3">{region.label}</div>
                    <div className="text-[#a0aabf] text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 px-2">{region.desc}</div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP - REDESIGNED (LIGHT/PROFESSIONAL THEME) */}
      <section className="relative py-32 bg-gradient-to-b from-[#f8fafc] to-[#f0f4f8] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-16 relative z-10">
          <motion.div
            className="relative bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 md:p-16 text-center shadow-[0_20px_60px_rgba(0,62,122,0.08)] overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,62,122,0.12)] transition-shadow duration-500"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            {/* Inner glowing hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-cyan-50/0 to-white/0 opacity-0 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />

            {/* Pharma-specific top badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#003e7a] text-xs md:text-sm font-bold tracking-wider mb-6 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <ShieldCheck size={16} className="text-blue-500" /> GDP-CERTIFIED DISTRIBUTION PARTNER
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            >
              Secure Your Clinical Supply Chain
            </motion.h2>

            <motion.p
              className="text-[#424751] text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            >
              Join 500+ global healthcare institutions trusting our temperature-controlled, end-to-end logistics network for the safe delivery of critical biologics, vaccines, and specialized therapeutics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <motion.button
                  className="relative overflow-hidden bg-gradient-to-r from-[#003e7a] to-[#005bb5] text-white px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg inline-flex items-center gap-3 shadow-[0_10px_30px_rgba(0,62,122,0.25)] border border-blue-400/20 group/btn hover:shadow-[0_15px_40px_rgba(0,62,122,0.35)] transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10">Initiate Partnership Request</span>
                  <ArrowRight size={20} className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />

                  {/* Button shine effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Bottom mini-stats */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-[#424751] font-semibold"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#003e7a]" /> 24/7 Global Support</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#003e7a]" /> 100% Temperature Compliance</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#003e7a]" /> API Integration Ready</div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
