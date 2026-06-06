'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import SplitTextReveal from '@/components/animations/SplitTextReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Flag, VerifiedIcon, Crosshair, Heart, Truck, Thermometer, Gavel, ShieldCheck, Activity } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';

gsap.registerPlugin(ScrollTrigger);

const FloatingCells = dynamic(() => import('@/components/three/FloatingCells'), { ssr: false });

// Reusable 3D Tilt Card Component
const TiltCard = ({ children, className, depth = 30 }: { children: React.ReactNode, className?: string, depth?: number }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate -12 to 12 degrees for a smooth, premium feel
    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY, transformPerspective: 1200 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: `translateZ(${depth}px)` }} className="w-full h-full relative z-10">
        {children}
      </div>
      {/* Subtle 3D background glow/shadow to enhance depth */}
      <div style={{ transform: 'translateZ(-10px)' }} className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-black/5 to-transparent pointer-events-none blur-md" />
    </motion.div>
  );
};

const timeline = [
  { year: '2007', title: 'Foundation', desc: 'Founded to address localized supply chain inefficiencies in healthcare.' },
  { year: '2012', title: 'National Expansion', desc: 'Scaled operations to cover major national healthcare hubs.' },
  { year: '2018', title: 'Tech Integration', desc: 'Deployed real-time IoT cold-chain monitoring systems.' },
  { year: 'Now', title: 'Industry Leadership', desc: 'Serving over 1,000 facilities with 99.9% fulfillment accuracy.' },
];

const values = [
  { icon: VerifiedIcon, label: 'Integrity', desc: 'Unwavering ethical standards in every transaction and partnership.', color: 'from-blue-500 to-blue-700' },
  { icon: Crosshair, label: 'Precision', desc: 'Mathematical exactness in inventory control and delivery scheduling.', color: 'from-cyan-400 to-cyan-600' },
  { icon: Heart, label: 'Care', desc: 'Deep respect for the end-patient who relies on our logistics.', color: 'from-indigo-500 to-purple-600' },
];

const standards = [
  { title: 'ISO 9001:2015 Certified', desc: 'Comprehensive quality management systems spanning all operational nodes.' },
  { title: 'Good Distribution Practice (GDP)', desc: 'Strict adherence to global GDP guidelines for pharmaceutical wholesale.' },
  { title: 'FDA & DEA Compliant', desc: 'Full regulatory compliance for controlled substances and biologic handling.' },
];

const whyUs = [
  { icon: Truck, title: 'Fast Delivery', desc: 'Optimized routing algorithms ensure next-day fulfillment for critical supplies across major metropolitan hubs.' },
  { icon: Thermometer, title: 'Temperature Controlled', desc: 'End-to-end cold chain logistics with real-time IoT monitoring to preserve vaccine and biologic efficacy.' },
  { icon: Gavel, title: 'Regulatory Compliance', desc: 'Strict adherence to FDA guidelines and state pharmacy board regulations. Full audit trail availability.' },
];

const team = [
  { name: 'Sarah Jenkins', role: 'Chief Executive Officer', bio: 'Over 20 years of experience in healthcare logistics and strategic supply chain management.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
  { name: 'Marcus Chen', role: 'Chief Operating Officer', bio: 'Specializes in optimizing distribution networks and implementing advanced QA protocols.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800' },
  { name: 'David Reynolds', role: 'Chief Technology Officer', bio: 'Leading the digital transformation of our real-time tracking and inventory systems.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800' },
];

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add a slight delay to ensure the DOM is fully painted and heights are calculated
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Timeline 3D staggered pop-out
        gsap.fromTo('.timeline-card-3d', 
          { z: -100, rotateX: -30, opacity: 0 },
          { z: 0, rotateX: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.5)', scrollTrigger: { trigger: timelineRef.current, start: 'top 85%' } }
        );

        // Core Values staggered 3D entry
        gsap.fromTo('.value-card-3d', 
          { y: 80, opacity: 0, rotateY: 45 },
          { y: 0, opacity: 1, rotateY: 0, transformOrigin: "left center", duration: 1.2, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: valuesRef.current, start: 'top 85%' } }
        );

        ScrollTrigger.refresh();
      });
      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-20 bg-[#f4f7fc] overflow-hidden perspective-1000">
      
      {/* 1. REDESIGNED HERO */}
      <PageBanner
        icon={ShieldCheck}
        badgeText="Our Heritage & Vision"
        title="A Legacy of Excellence in"
        highlightedTitle="Healthcare Supply Chains"
        description="Bridging the critical gap between visionary pharmaceutical manufacturers and the frontline healthcare providers with unyielding precision, innovation, and integrity since 2007."
        bottomColor="bg-[#f4f7fc]"
      />

      {/* 2. JOURNEY & MISSION - 3D GLASS CARDS */}
      <section className="py-24 relative z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            <div className="md:col-span-7 perspective-1000">
              <TiltCard className="h-full" depth={40}>
                <div className="h-full bg-white/70 backdrop-blur-2xl rounded-[2rem] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,62,122,0.08)] border border-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150" />
                  
                  <h2 className="text-3xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                      <Activity size={20} />
                    </div>
                    Our Journey
                  </h2>
                  <p className="text-[#424751] text-lg leading-relaxed font-medium">
                    Established in 2007, NeoVision Health Care emerged from a critical need for reliable pharmaceutical distribution. What began as a localized logistics operation has dynamically scaled into a highly-regulated national network of temperature-controlled supply chains. We recognized early that in healthcare, logistics is not just about moving boxes — it's about delivering life-saving therapies with absolutely zero margin for error. 
                    <br/><br/>
                    Our unwavering commitment to stringent Quality Assurance standards has empowered us to partner seamlessly with leading global manufacturers, ensuring consistent availability for pharmacies and hospitals across the world.
                  </p>
                </div>
              </TiltCard>
            </div>

            <div className="md:col-span-5 perspective-1000">
              <TiltCard className="h-full" depth={50}>
                <div className="h-full bg-gradient-to-br from-[#003e7a] via-[#0055a4] to-[#0070cc] text-white rounded-[2rem] p-10 md:p-12 shadow-[0_30px_60px_rgba(0,62,122,0.25)] border border-blue-400/30 flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-[inherit] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10 transform-gpu transition-transform duration-500 group-hover:translate-z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                      <Flag size={32} className="text-cyan-300 drop-shadow-md" />
                    </div>
                    <h3 className="text-3xl font-extrabold font-[family-name:var(--font-inter)] mb-4 tracking-wide">Our Mission</h3>
                    <p className="text-blue-100/90 text-lg leading-relaxed font-medium">
                      To meticulously bridge the critical gap between visionary pharmaceutical manufacturers and the frontline pharmacies that depend on them — with extreme precision, absolute integrity, and profound care.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* 3. NEW INFRASTRUCTURE BENTO GRID */}
      <section className="py-32 relative overflow-hidden bg-[#f4f7fc]" ref={videoRef}>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-16 text-center mb-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block py-1 px-3 rounded-full bg-white shadow-sm border border-blue-100 text-[#003e7a] text-sm font-bold tracking-widest mb-4 uppercase">Infrastructure</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] mb-6">Our Capabilities</h2>
            <p className="text-[#424751] text-xl max-w-3xl mx-auto font-medium">We are completely redefining healthcare supply chains with cutting-edge infrastructure, real-time IoT, and uncompromising ethics.</p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-30 perspective-1000">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Big Feature (IoT) */}
            <TiltCard className="md:col-span-2 md:row-span-2" depth={40}>
              <div className="h-full min-h-[400px] rounded-[2.5rem] bg-gradient-to-br from-[#0a1118] to-[#001f3f] p-10 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,62,122,0.15)] border border-gray-800 flex flex-col justify-between">
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/20 blur-[80px] rounded-full group-hover:bg-cyan-400/30 transition-colors duration-700" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

                <div className="relative z-10 w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mb-12 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:scale-110 transition-transform duration-500">
                  <Activity size={32} className="text-cyan-400" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-extrabold text-white font-[family-name:var(--font-inter)] mb-4">Real-Time IoT Monitoring</h3>
                  <p className="text-blue-100/90 text-lg font-medium max-w-lg leading-relaxed">
                    Our proprietary sensor networks provide second-by-second visibility into temperature, humidity, and precise geospatial location for every single specialized therapeutic shipment globally.
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Small Feature 1 */}
            <TiltCard depth={30}>
              <div className="h-full min-h-[250px] rounded-[2.5rem] bg-white p-8 md:p-10 relative overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col justify-between">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50/80 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
                
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 relative z-10 shadow-inner">
                  <Truck size={28} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-[#121c2c] mb-3">Automated Cold-Chain Fleet</h3>
                  <p className="text-[#424751] font-medium leading-relaxed">Advanced GDP-compliant vehicles engineered specifically for maintaining strict 2°C to 8°C environments.</p>
                </div>
              </div>
            </TiltCard>

            {/* Small Feature 2 */}
            <TiltCard depth={30}>
              <div className="h-full min-h-[250px] rounded-[2.5rem] bg-gradient-to-br from-cyan-50/50 to-blue-50/50 p-8 md:p-10 relative overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-cyan-100/50 flex flex-col justify-between">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-200/40 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
                
                <div className="w-14 h-14 rounded-2xl bg-white text-cyan-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 relative z-10 shadow-sm border border-white/50">
                  <Crosshair size={28} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-[#121c2c] mb-3">Predictive AI Routing</h3>
                  <p className="text-[#424751] font-medium leading-relaxed">Machine learning algorithms calculate the fastest, safest paths, avoiding transit delays before they happen.</p>
                </div>
              </div>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* 4. OUR EVOLUTION - 3D TIMELINE */}
      <section ref={timelineRef} className="py-32 relative overflow-hidden bg-gradient-to-b from-[#f4f7fc] to-white">
        {/* 3D Background Lines */}
        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)]"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-center text-[#121c2c] font-[family-name:var(--font-inter)] mb-20"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Our Evolution
          </motion.h2>
          
          <div className="relative">
            {/* The main continuous line */}
            <div className="hidden md:block absolute top-[9px] left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#c2c6d3] to-transparent rounded-full shadow-inner z-0">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ transformOrigin: "left center" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 perspective-1000 pt-16">
              {timeline.map(({ year, title, desc }) => (
                <div key={year} className="timeline-card-3d bg-white rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 group hover:-translate-y-4 hover:shadow-[0_25px_50px_rgba(0,62,122,0.15)] transition-all duration-500 ease-out relative">
                  {/* Floating Node */}
                  <div className="hidden md:flex absolute -top-16 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] items-center justify-center group-hover:scale-125 group-hover:border-cyan-400 transition-all duration-300">
                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-cyan-400"></div>
                  </div>
                  
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#003e7a] to-blue-400 font-[family-name:var(--font-inter)] mb-3 group-hover:scale-110 origin-left transition-transform duration-300">{year}</div>
                  <h4 className="text-xl font-bold text-[#121c2c] mb-3">{title}</h4>
                  <p className="text-base text-[#424751] font-medium leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES - 3D INTERACTIVE CARDS */}
      <section ref={valuesRef} className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="text-center mb-20">
             <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-[#003e7a] text-sm font-bold tracking-widest mb-4 uppercase">Our Philosophy</span>
             <h2 className="text-4xl md:text-5xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)]">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
            {values.map(({ icon: Icon, label, desc, color }) => (
              <TiltCard key={label} depth={40}>
                <div className="value-card-3d h-full bg-white rounded-[2.5rem] p-10 text-center shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden group">
                  {/* Animated Background Glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 rounded-full scale-150 pointer-events-none`} />
                  
                  <div className={`w-24 h-24 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 relative z-10`}>
                    <Icon size={40} className="text-white" />
                  </div>
                  
                  <h4 className="text-2xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] mb-4 relative z-10">{label}</h4>
                  <p className="text-base font-medium text-[#424751] leading-relaxed relative z-10">{desc}</p>
                  
                  {/* Interactive Border */}
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-[2.5rem] transition-colors duration-500 pointer-events-none`} />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GLOBAL STANDARDS & COMPLIANCE - PREMIUM DARK 3D */}
      <section className="py-32 bg-[#0a1118] text-white relative overflow-hidden">
        {/* 3D Grid floor */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a1118] to-[#0a1118] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <div className="mb-16">
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-900/30 border border-cyan-500/30 mb-6 backdrop-blur-md"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <h2 className="text-sm text-cyan-300 font-bold uppercase tracking-widest">Compliance Guaranteed</h2>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-6xl font-extrabold font-[family-name:var(--font-inter)] mb-6 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              Global Standards
            </motion.h2>
            <motion.p
              className="text-blue-200/80 text-xl font-light max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              NeoVision operates under the most rigorous international regulatory frameworks, guaranteeing perfect efficacy and safety.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            {standards.map(({ title, desc }, i) => (
              <TiltCard key={title} depth={30}>
                <motion.div
                  className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group relative overflow-hidden"
                  initial={{ opacity: 0, rotateX: -20, y: 30 }} whileInView={{ opacity: 1, rotateX: 0, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
                >
                  {/* Glowing hover accent */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/20 blur-[50px] rounded-full group-hover:bg-cyan-400/40 transition-colors duration-500" />
                  
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:bg-cyan-500 group-hover:scale-110 transition-all duration-500 relative z-10">
                    <ShieldCheck size={24} className="text-cyan-300 group-hover:text-white" />
                  </div>
                  <h4 className="font-extrabold text-xl mb-3 text-white tracking-wide relative z-10">{title}</h4>
                  <p className="text-blue-100/70 text-base leading-relaxed font-medium relative z-10">{desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="py-32 bg-[#f4f7fc] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-center text-[#121c2c] font-[family-name:var(--font-inter)] mb-20"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="bg-white rounded-3xl p-10 border border-gray-200/70 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,30,80,0.12)] group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                
                {/* High Contrast Icon Badge */}
                <div className="w-16 h-16 bg-[#0a1128] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#0a1128]/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <Icon size={28} className="text-cyan-400" />
                </div>
                
                {/* Text Content */}
                <h3 className="font-bold text-2xl text-gray-900 font-[family-name:var(--font-inter)] mb-4 tracking-tight">{title}</h3>
                <p className="text-gray-600 text-base leading-relaxed font-medium flex-1">{desc}</p>
                
                {/* Decorative Bottom Arrow Action */}
                <div className="mt-8 flex justify-end">
                  <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors duration-500">
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TEAM - MODERN CLEAN OVERLAYS */}
      <section ref={teamRef} className="py-32 bg-gradient-to-b from-[#f4f7fc] to-white relative overflow-hidden">
        {/* Subtle Light Background Element */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-[#003e7a] text-sm font-bold tracking-widest mb-4 uppercase shadow-sm">Leadership</span>
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] mb-6"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              Meet Our Visionaries
            </motion.h2>
            <motion.p
              className="text-[#424751] text-xl max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              The experienced professionals guiding our strategic vision and pushing the boundaries of operational excellence.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            {team.map(({ name, role, bio, img }) => (
              <div key={name} className="team-card h-[480px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,30,80,0.08)] group cursor-pointer relative overflow-hidden border border-gray-100 flex flex-col hover:shadow-[0_30px_60px_rgba(0,30,80,0.12)] transition-shadow duration-500">
                
                {/* Top: Image Section */}
                <div className="flex-1 w-full overflow-hidden relative bg-gray-50">
                  <img 
                    src={img} 
                    alt={name} 
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                
                {/* Bottom: Solid Content Section (No blur, no gradient) */}
                <div className="bg-white p-8 z-10 flex flex-col relative shrink-0 border-t border-gray-50 transition-all duration-500 transform translate-y-0 group-hover:-translate-y-4">
                  <h4 className="font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] text-3xl mb-1">{name}</h4>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{role}</p>
                  
                  {/* Hover Reveal Bio & Socials */}
                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-in-out mt-0 group-hover:mt-4">
                    <div className="overflow-hidden">
                      <div>
                        <p className="text-[#424751] text-sm font-medium leading-relaxed mb-5">{bio}</p>
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-600 flex items-center justify-center text-blue-600 hover:text-white transition-colors border border-blue-100 shadow-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-600 flex items-center justify-center text-blue-600 hover:text-white transition-colors border border-blue-100 shadow-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
