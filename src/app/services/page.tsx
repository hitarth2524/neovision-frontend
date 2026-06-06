'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Thermometer, RadioTower, MapPin, ClipboardCheck, Clock, Shield, Zap, BarChart3, Network } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';

gsap.registerPlugin(ScrollTrigger);



const coldChainSteps = [
  { step: '01', icon: Thermometer, title: 'Temperature Monitoring', desc: 'IoT sensors track temperature every 60 seconds throughout transport, logging all data in real-time.' },
  { step: '02', icon: RadioTower, title: 'GPS Tracking', desc: 'Real-time GPS visibility for all vehicles with automated alerts for route deviations.' },
  { step: '03', icon: MapPin, title: 'Hub Validation', desc: 'Each distribution hub validates product integrity before transfer with full chain-of-custody documentation.' },
  { step: '04', icon: ClipboardCheck, title: 'Delivery Verification', desc: 'Electronic proof of delivery with temperature log attachment for full regulatory compliance.' },
];

const infraStats = [
  { icon: Clock, value: '99.9%', label: 'On-Time Delivery' },
  { icon: Shield, value: '100%', label: 'Product Integrity' },
  { icon: Zap, value: '<2h', label: 'Emergency Response' },
  { icon: BarChart3, value: '24/7', label: 'Monitoring' },
];

const services = [
  {
    title: 'Cold Chain Logistics',
    desc: 'End-to-end temperature-controlled logistics from manufacturer to final dispensing point. Maintains 2-8°C for biologics, -20°C for vaccines.',
    features: ['Reefer truck fleet with active temperature control', 'Ultra-low temperature freezers (-80°C) for specialized products', 'Validated packaging systems with phasal cooling inserts'],
  },
  {
    title: 'Controlled Substance Management',
    desc: 'Highly secure, DEA-licensed distribution of controlled substances with meticulous documentation.',
    features: ['Biometric vault access at all facilities', 'Real-time inventory auditing with discrepancy alerts', 'Full DEA 222 form management and reporting'],
  },
  {
    title: 'Reverse Logistics',
    desc: 'Compliant product recall coordination and expired medication management to meet EPA and state disposal requirements.',
    features: ['Nationwide recall coordination within 24 hours', 'Certified medication destruction partnerships', 'Full recall documentation package for regulatory submission'],
  },
];

const testimonials = [
  { quote: "NeoVision's cold chain capabilities are unmatched. Not a single product integrity failure in 3 years of partnership.", author: "Dr. Patricia Langley", role: "Chief Pharmacist, Metro General Hospital" },
  { quote: "The real-time tracking dashboard transformed how we manage our inventory. We've cut stockout events by 78%.", author: "James Ortega", role: "Supply Chain Director, PharmaCorp" },
  { quote: "Outstanding regulatory compliance. Their documentation makes our audits effortless.", author: "Susan Chow", role: "VP Operations, BioHealth Labs" },
];

export default function ServicesPage() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const infraRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Pinned scroll for Services
      const servicesContainer = servicesRef.current;
      if (servicesContainer) {
        const cards = gsap.utils.toArray('.service-card-wrapper');
        gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: servicesContainer,
            pin: true,
            scrub: 1,
            snap: 1 / (cards.length - 1),
            end: () => "+=" + (servicesContainer as HTMLElement).offsetWidth
          }
        });
      }

    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-20">
      {/* Redesigned Premium Hero - Compact & Elegant */}
      <PageBanner
        icon={Network}
        badgeText="Distribution Services"
        title="The Backbone of"
        highlightedTitle="Healthcare Supply Chains"
        description="From temperature-controlled cold chain logistics to DEA-compliant controlled substance distribution — our operational excellence is your competitive advantage."
        bottomColor="bg-[#f4f7fb]"
      >
        <Link href="/contact">
          <motion.button
            className="flex items-center gap-2 bg-white text-[#003e7a] px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#78f7e9] hover:shadow-[0_0_20px_rgba(120,247,233,0.4)]"
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
          >
            Start Partnership <ArrowRight size={16} />
          </motion.button>
        </Link>
      </PageBanner>

      {/* INFRA STATS - PREMIUM DESIGN */}
      <section ref={infraRef} className="relative py-16 bg-[#f4f7fb] overflow-hidden border-b border-[#e7eeff] shadow-inner z-10">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/clean-textile.png')]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {infraStats.map(({ icon: Icon, value, label }, index) => (
              <motion.div 
                key={label} 
                className="infra-stat group relative text-center bg-white border border-[#e7eeff] shadow-sm p-6 md:p-8 rounded-2xl hover:border-cyan-200 hover:shadow-[0_20px_40px_rgba(0,62,122,0.08)] overflow-hidden cursor-default"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                </div>
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50/50 group-hover:to-cyan-50/50 transition-all duration-500 z-0"></div>

                <div className="relative z-10 w-16 h-16 bg-[#f0f4ff] border border-blue-100 text-[#003e7a] rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gradient-to-br group-hover:from-[#003e7a] group-hover:to-blue-700 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-cyan-500/20 group-hover:scale-110 transition-all duration-500">
                  <Icon size={30} className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all" />
                </div>
                <div className="relative z-10 text-3xl md:text-4xl font-extrabold text-[#003e7a] font-[family-name:var(--font-inter)] mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#003e7a] group-hover:to-blue-500 transition-all">{value}</div>
                <div className="relative z-10 text-sm text-[#727783] font-semibold uppercase tracking-widest group-hover:text-[#424751] transition-colors">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REDESIGNED COLD CHAIN STEPS */}
      <section ref={stepsRef} className="py-32 bg-[#f8fbff] relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-sm text-[#003e7a] text-xs font-bold tracking-widest mb-6 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Logistics Framework
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] mb-6 tracking-tight">
              Cold-Chain <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003e7a] to-blue-500">Protocol Flow</span>
            </h2>
            <p className="text-[#424751] text-lg max-w-3xl mx-auto leading-relaxed">
              Every step of our logistics chain is rigorously monitored and validated, ensuring strict pharmaceutical product integrity from origin to destination without compromise.
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Animated Center Line Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 -translate-x-1/2 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-400 via-[#003e7a] to-blue-500 origin-top shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-12 md:space-y-24 relative">
              {coldChainSteps.map(({ step, icon: Icon, title, desc }, i) => (
                <div key={step} className="relative flex flex-col md:flex-row items-center justify-between w-full group">
                  
                  {/* Left Side (Empty or Card) */}
                  <div className={`w-full md:w-[calc(50%-40px)] ${i % 2 === 0 ? 'md:text-right' : 'md:order-2 md:text-left'} z-10`}>
                    <motion.div 
                      className={`bg-white rounded-3xl p-8 border border-[#e7eeff] shadow-[0_15px_40px_rgba(0,30,80,0.06)] hover:shadow-[0_20px_50px_rgba(0,62,122,0.15)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden backdrop-blur-xl ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                    >
                      {/* Glassmorphism accent lines */}
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-[#003e7a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className={`flex flex-col md:flex-row ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-6 items-center`}>
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#003e7a] to-blue-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#003e7a]/20 group-hover:shadow-cyan-400/40 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 relative z-10">
                          <Icon size={32} className="text-cyan-50 group-hover:text-white transition-colors" />
                        </div>
                        
                        <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right text-center' : 'md:text-left text-center'}`}>
                          <div className={`inline-flex items-center justify-center gap-2 mb-3 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold text-[#003e7a] tracking-widest ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <span className="text-cyan-600 bg-cyan-100/50 px-1.5 py-0.5 rounded">STEP</span> {step}
                          </div>
                          <h3 className="text-2xl font-bold text-[#121c2c] font-[family-name:var(--font-inter)] mb-3 group-hover:text-[#003e7a] transition-colors">{title}</h3>
                          <p className="text-[#5a6072] text-sm md:text-base leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Connecting Dot (Absolute Center) */}
                  <motion.div 
                    className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-[4px] border-[#e7eeff] items-center justify-center z-20 shadow-[0_0_20px_rgba(0,62,122,0.1)] group-hover:border-cyan-400 transition-colors duration-500"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
                  >
                     <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#003e7a] to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 shadow-inner shadow-black/20 relative flex items-center justify-center transition-colors duration-500">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                     </div>
                  </motion.div>
                  
                  {/* Empty Right/Left space for flex layout */}
                  <div className="hidden md:block w-[calc(50%-40px)]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES - HORIZONTAL SCROLL */}
      <section ref={servicesRef} className="py-24 bg-[#020b16] relative overflow-hidden">
        {/* Futuristic Background Patterns */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#003e7a]/30 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-16 mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-900/30 border border-cyan-400/20 text-cyan-300 text-xs font-bold tracking-widest mb-6 uppercase shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Advanced Capabilities
          </div>
          <SplitTextReveal text="Specialized Services" className="text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-inter)] justify-start" />
        </div>
        
        {/* Horizontal Scroll Container */}
        <div className="flex flex-nowrap w-[300vw] md:w-[150vw] px-4 md:px-16 pb-20 relative z-10">
            {services.map(({ title, desc, features }, index) => (
              <div key={title} className="service-card-wrapper w-screen md:w-[50vw] flex-shrink-0 pr-8">
                <div className="service-card h-full relative bg-[#0a192f]/60 backdrop-blur-xl rounded-3xl p-10 border border-[#1e3a8a]/50 group transition-all duration-500 hover:-translate-y-4 hover:border-cyan-400/50 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)] overflow-hidden">
                  
                  {/* Glowing Edge Effect */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Huge Background Number */}
                  <div className="absolute -bottom-10 -right-5 text-[180px] font-bold font-serif text-white opacity-5 select-none pointer-events-none group-hover:opacity-10 group-hover:text-cyan-200 transition-all duration-700 group-hover:scale-110">
                    0{index + 1}
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-colors shadow-inner">
                       <span className="text-cyan-400 font-bold text-xl">0{index + 1}</span>
                    </div>
                    
                    <h3 className="text-3xl font-extrabold text-white font-[family-name:var(--font-inter)] mb-4 tracking-tight group-hover:text-cyan-300 transition-colors">{title}</h3>
                    <p className="text-lg text-blue-100/70 leading-relaxed mb-8">{desc}</p>
                    
                    <ul className="space-y-4">
                      {features.map(f => (
                        <li key={f} className="flex items-start gap-4 text-base text-blue-50/80">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs font-bold mt-0.5 group-hover:bg-cyan-400 group-hover:text-[#040e1f] group-hover:border-transparent transition-all shadow-[0_0_10px_rgba(34,211,238,0)] group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* TESTIMONIALS - CLINICAL TRUST DESIGN */}
      <section ref={testimonialRef} className="py-32 bg-[#f4f8fc] relative overflow-hidden border-t border-[#e7eeff]">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/clean-textile.png')] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-50/50 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0f4ff] border border-blue-100 shadow-sm text-[#003e7a] text-xs font-bold tracking-widest mb-6 uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Clinical Trust
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] mb-4 tracking-tight">
              Validated by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003e7a] to-blue-500">Industry Leaders</span>
            </h2>
            <p className="text-[#5a6072] text-lg max-w-2xl mx-auto">
              We maintain a flawless compliance record, earning the trust of top hospitals, bio-labs, and pharmaceutical corporations.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-12">
            {testimonials.map(({ quote, author, role }, index) => {
              const initials = author.split(' ').map((n: string) => n[0]).join('');
              return (
                <motion.div 
                  key={author} 
                  className={`relative bg-white rounded-[2rem] p-8 md:p-10 border border-[#e7eeff] shadow-[0_20px_50px_rgba(0,30,80,0.04)] group transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,62,122,0.12)] z-10 overflow-hidden ${index === 1 ? 'md:mt-12' : index === 2 ? 'md:mt-24' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -12 }}
                >
                  {/* Huge Background Quote */}
                  <div className="absolute -top-10 -right-4 text-[150px] font-serif font-black text-[#f0f4ff] opacity-50 group-hover:text-cyan-50 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none leading-none">
                    &ldquo;
                  </div>
                  
                  {/* Subtle Gradient Line on Hover */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-[#003e7a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex text-cyan-400 mb-6 gap-1 drop-shadow-sm">
                      {[1,2,3,4,5].map(star => (
                         <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      ))}
                    </div>
                    
                    <p className="text-[#424751] text-lg leading-relaxed mb-10 flex-grow font-medium">
                      "{quote}"
                    </p>
                    
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#f0f4ff]">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#003e7a] to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        {initials}
                      </div>
                      <div>
                        <div className="font-bold text-[#121c2c] font-[family-name:var(--font-inter)] group-hover:text-[#003e7a] transition-colors">{author}</div>
                        <div className="text-xs text-[#727783] font-semibold tracking-wide uppercase mt-1">{role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ULTRA PREMIUM CTA - CLINICAL GLASS THEME */}
      <section className="py-28 bg-[#eef4fb] relative overflow-hidden flex items-center justify-center">
        {/* Deep Background Gradients */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent opacity-60"></div>
        
        {/* Dynamic Orbs Behind the Glass */}
        <motion.div 
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[100px] pointer-events-none"
          animate={{ x: [-50, 50, -50], scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-300/30 rounded-full blur-[100px] pointer-events-none"
          animate={{ x: [50, -50, 50], scale: [1.1, 1, 1.1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Medical Geometry */}
        <div className="absolute top-20 right-[15%] text-[#003e7a]/5 text-[150px] font-black leading-none select-none pointer-events-none rotate-12">+</div>
        <div className="absolute bottom-10 left-[10%] text-cyan-600/5 text-[200px] font-black leading-none select-none pointer-events-none -rotate-12">+</div>

        <div className="max-w-4xl w-full mx-auto px-4 relative z-10">
          {/* Glass Container */}
          <motion.div
            className="bg-white/60 backdrop-blur-3xl border border-white rounded-[2.5rem] p-10 md:p-16 text-center shadow-[0_40px_100px_rgba(0,30,80,0.08)] relative overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.97 }} 
            whileInView={{ opacity: 1, y: 0, scale: 1 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Elegant Inner Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[100px] bg-blue-400/20 blur-[50px] pointer-events-none"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
               <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#d9e3f9] text-[#003e7a] text-xs font-bold tracking-widest mb-6 uppercase shadow-sm">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                 </span>
                 Initiate Partnership
               </div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] mb-5 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            >
              Ready to Elevate Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003e7a] to-cyan-500">Supply Chain?</span>
            </motion.h2>
            
            <motion.p
              className="text-[#5a6072] text-lg max-w-xl mx-auto mb-8 leading-relaxed font-medium"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            >
              Let our logistics experts design a custom, highly-secure distribution solution tailored to your facility's exact requirements.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            >
              <Link href="/contact" className="inline-block relative group/btn">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#003e7a] to-cyan-400 rounded-[1.25rem] blur-md opacity-20 group-hover/btn:opacity-50 group-hover/btn:blur-xl transition-all duration-700 ease-out"></div>
                <motion.button
                  className="relative bg-gradient-to-b from-[#004e9a] to-[#003e7a] text-white px-10 py-4 rounded-[1.25rem] font-bold text-base inline-flex items-center gap-3 shadow-[0_15px_30px_rgba(0,62,122,0.3)] border-t border-blue-400/50"
                  whileHover={{ scale: 1.03, y: -3 }} 
                  whileTap={{ scale: 0.97, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  Contact Our Team 
                  <div className="bg-white/20 p-1.5 rounded-full group-hover/btn:bg-white group-hover/btn:text-[#003e7a] transition-colors duration-500 ease-out">
                     <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-500 ease-out" />
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
