'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Snowflake, Activity, ArrowRight, ThermometerSnowflake, 
  PackageCheck, ShieldCheck, Droplet, Wind, Zap
} from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: ThermometerSnowflake,
    title: 'Precision Temperature Control',
    desc: 'Maintaining strict parameters from +2°C to +8°C and below -20°C for sensitive biologics and vaccines.',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Activity,
    title: '24/7 Real-Time Monitoring',
    desc: 'Advanced IoT sensors tracking location, temperature, and humidity throughout the entire transit lifecycle.',
    color: 'from-teal-500 to-emerald-500',
    iconColor: 'text-emerald-400',
  },
  {
    icon: PackageCheck,
    title: 'Validated Packaging',
    desc: 'Utilizing phase change materials and VIP insulated shippers qualified for up to 120 hours of thermal protection.',
    color: 'from-indigo-500 to-purple-500',
    iconColor: 'text-indigo-400',
  },
];

const tempZones = [
  { temp: '15°C to 25°C', name: 'Controlled Ambient', desc: 'Regulated room temperature for standard pharmaceuticals and medical devices.', color: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50' },
  { temp: '2°C to 8°C', name: 'Refrigerated', desc: 'Strict cold-chain for vaccines, biologics, and sensitive therapies.', color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50' },
  { temp: '-20°C', name: 'Frozen', desc: 'Deep freeze capabilities for active pharmaceutical ingredients (APIs).', color: 'from-indigo-400 to-blue-600', bg: 'bg-indigo-50' },
  { temp: '-80°C', name: 'Ultra-Low', desc: 'Cryogenic transit for cell & gene therapies and mRNA vaccines.', color: 'from-purple-500 to-indigo-600', bg: 'bg-purple-50' },
];

export default function ColdChainLogistics() {
  const [mounted, setMounted] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-0 bg-white">
      {/* 1. ADVANCED HERO SECTION */}
      <PageBanner
        icon={Snowflake}
        badgeText="Unbroken Chain"
        title="Absolute"
        highlightedTitle="Thermal Integrity"
        description="Safeguarding the efficacy of life-saving biologics and vaccines through our globally validated, zero-tolerance temperature-controlled network."
        bottomColor="bg-white"
      />

      {/* 2. "ZERO-TOLERANCE" PARALLAX SECTION */}
      <section ref={parallaxRef} className="max-w-7xl mx-auto px-6 md:px-16 py-32 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121c2c] mb-8 font-[family-name:var(--font-inter)] leading-tight">
              Zero-Tolerance for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003e7a] to-cyan-500">Excursions</span>
            </h2>
            <div className="space-y-6 text-lg text-[#5a6072] leading-relaxed">
              <p>
                At NeoVision Health Care, we understand that a single degree variation can compromise a life-saving treatment. Our cold-chain infrastructure is engineered with absolute precision, utilizing state-of-the-art active and passive cooling technologies.
              </p>
              <p>
                From the moment the product leaves the manufacturing facility to its final destination at the patient's bedside, our unbroken cold-chain guarantees 100% thermal integrity.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-6 bg-[#f0f4ff] rounded-2xl border border-[#d9e3f9]">
                <ShieldCheck size={32} className="text-[#003e7a] mb-4" />
                <h4 className="font-bold text-[#121c2c] mb-2">GDP Compliant</h4>
                <p className="text-sm text-[#5a6072]">Globally certified processes.</p>
              </div>
              <div className="p-6 bg-[#f0f4ff] rounded-2xl border border-[#d9e3f9]">
                <Activity size={32} className="text-[#003e7a] mb-4" />
                <h4 className="font-bold text-[#121c2c] mb-2">Live Telemetry</h4>
                <p className="text-sm text-[#5a6072]">Sub-second data tracking.</p>
              </div>
            </div>
          </motion.div>

          {/* Parallax Image Grid */}
          <div className="relative h-[600px] w-full hidden lg:block">
            <motion.div style={{ y: y1 }} className="absolute top-0 right-10 w-2/3 h-[400px] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,30,80,0.15)] z-10 border-4 border-white group transition-all duration-500 hover:scale-[1.02] hover:z-30 hover:shadow-[0_40px_80px_rgba(0,30,80,0.25)]">
              <img src="/images/cold_chain_card.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Lab tech" />
              {/* Glassmorphic Overlay Top */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-5 py-3 rounded-xl border border-white/50 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Protocol</p>
                  <p className="font-bold text-[#121c2c] text-sm">GDP Verified</p>
                </div>
              </div>
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-2/3 h-[350px] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,30,80,0.15)] z-20 border-4 border-white group transition-all duration-500 hover:scale-[1.02] hover:z-30 hover:shadow-[0_40px_80px_rgba(0,30,80,0.25)]">
              <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Quality check" />
              {/* Glassmorphic Overlay Bottom */}
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-5 py-3 rounded-xl border border-white/50 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <ThermometerSnowflake className="text-emerald-600" size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Live Sensor</p>
                  <p className="font-bold text-[#121c2c] text-sm">Stable at 4.2°C</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TEMPERATURE SPECTRUM TIMELINE */}
      <section className="py-32 bg-[#f8faff] border-y border-[#e7eeff] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#121c2c] mb-6 font-[family-name:var(--font-inter)]">The Thermal Spectrum</h2>
            <p className="text-[#5a6072] max-w-2xl mx-auto text-lg leading-relaxed">We provide highly specialized infrastructure designed to maintain strict temperature bands across the entire pharmaceutical lifecycle.</p>
          </div>
          
          <div className="temp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tempZones.map((zone, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.15 }}
                key={idx} className="temp-card group relative bg-white rounded-3xl p-8 border border-[#e7eeff] hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,62,122,0.08)] overflow-hidden">
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${zone.color} transition-opacity duration-500 z-0`}></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl ${zone.bg} group-hover:bg-white/20 flex items-center justify-center mb-8 transition-colors duration-500`}>
                    <ThermometerSnowflake size={28} className="text-[#003e7a] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl font-black text-[#121c2c] group-hover:text-white mb-2 transition-colors duration-500 tracking-tight">{zone.temp}</h3>
                  <h4 className="text-sm font-bold text-[#003e7a] group-hover:text-white/90 uppercase tracking-widest mb-4 transition-colors duration-500">{zone.name}</h4>
                  <p className="text-[#5a6072] group-hover:text-white/80 leading-relaxed text-sm transition-colors duration-500">{zone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREMIUM FEATURES GRID */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f4ff] rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <span className="text-sm font-bold text-[#003e7a] uppercase tracking-widest mb-4 block">Our Technology</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121c2c] mb-6 font-[family-name:var(--font-inter)]">Engineered for Reliability</h2>
          </div>
          
          <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.15 }}
                key={feature.title}
                className="feature-card relative bg-white border border-[#e7eeff] rounded-[2rem] p-10 hover:shadow-[0_30px_60px_rgba(0,30,80,0.06)] transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
              >
                {/* Glowing Top Border */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <feature.icon className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#121c2c] mb-4 font-[family-name:var(--font-inter)]">{feature.title}</h3>
                <p className="text-[#5a6072] leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#003e7a] via-[#0052a3] to-cyan-600 shadow-[0_30px_60px_rgba(0,62,122,0.3)]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-400/30 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 px-8 py-20 text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-[family-name:var(--font-inter)]">Ready to secure your supply chain?</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 font-light">Partner with NeoVision to ensure your life-saving products reach their destination exactly as intended.</p>
              <Link href="/contact">
                <button className="group relative overflow-hidden bg-white text-[#003e7a] font-bold text-lg px-10 py-5 rounded-2xl flex items-center gap-3 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1">
                  {/* Button Sweep Effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#f0f4ff] to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></span>
                  <span className="relative z-10">Request a Cold-Chain Audit</span>
                  <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
