'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, ArrowRight, Scale, ShieldAlert, BadgeCheck, Zap, Handshake, Database, Activity } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import Link from 'next/link';
import { useRef } from 'react';

export default function TermsOfService() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const terms = [
    {
      id: '01',
      title: 'Service Agreements & SLAs',
      subtitle: 'Thermal Validation Baselines',
      icon: BadgeCheck,
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      content: 'All pharmaceutical distribution services are governed by strict Service Level Agreements (SLAs) tailored to the specific thermal and regulatory requirements of the transported biologicals.'
    },
    {
      id: '02',
      title: 'Liability & Insurance',
      subtitle: 'Immutable Telemetry Audits',
      icon: Scale,
      color: 'text-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100',
      content: 'NeoVision Health Care maintains comprehensive cargo insurance. However, liability for thermal excursions is strictly evaluated against the provided baseline SLA and the unalterable telemetry data from our calibrated IoT loggers.'
    },
    {
      id: '03',
      title: 'Compliance Obligations',
      subtitle: 'International Export Controls',
      icon: ShieldAlert,
      color: 'text-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      content: 'Clients must ensure all shipments comply with international export/import controls, including providing accurate Material Safety Data Sheets (MSDS) for active pharmaceutical ingredients (APIs).'
    },
    {
      id: '04',
      title: 'Force Majeure',
      subtitle: 'Catastrophic Derisking',
      icon: Zap,
      color: 'text-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      content: 'While our AI-driven routing mitigates environmental risks, NeoVision Health Care is not liable for catastrophic thermal deviations resulting from unforeseeable acts of God, provided all redundant cooling protocols were proven to be engaged.'
    },
    {
      id: '05',
      title: 'Custody Handover Protocols',
      subtitle: 'Terminal Liability Transfer',
      icon: Handshake,
      color: 'text-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100',
      content: 'Legal liability for thermal integrity transfers precisely at the moment the digital smart-lock is engaged by the receiving entity. NeoVision\'s responsibility terminates upon successful cryptographic signature of the delivery manifest.'
    },
    {
      id: '06',
      title: 'Telemetry Data Sovereignty',
      subtitle: 'IoT Data Ownership',
      icon: Database,
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      content: 'All payload-specific temperature data belongs exclusively to the client for regulatory filing. However, anonymized spatial-thermal routing data is retained by NeoVision Health Care to continuously train our predictive logistics AI.'
    },
    {
      id: '07',
      title: 'Radiopharmaceutical Transport',
      subtitle: 'High-Hazard Biosafety',
      icon: Activity,
      color: 'text-rose-600',
      bgGradient: 'from-rose-50 to-rose-100',
      content: 'The transport of active radiopharmaceuticals or live-virus biologics requires a secondary Biosafety SLA. Clients must provide exact half-life decay charts and accept strictly truncated transit windows to ensure terminal safety.'
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-0 bg-[#f8fafc] overflow-hidden text-[#121c2c]">
      
      {/* 3D Pharma Background */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,62,122,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,62,122,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(1200px)_rotateX(75deg)_translateY(-200px)_translateZ(-300px)] origin-top"></div>
        {/* Subtle Hexagon Pattern for Pharma */}
        <div className="absolute top-40 right-0 w-[800px] h-[800px] bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-5 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
      </motion.div>

      <PageBanner
        icon={FileText}
        badgeText="LEGAL & COMPLIANCE"
        title="Terms of"
        highlightedTitle="Service"
        description="Immutable Operating Procedures & SLAs. Effective Date: January 1st, 2026."
        bottomColor="bg-[#f8fafc]"
      />

      <section ref={containerRef} className="py-24 relative z-10 max-w-5xl mx-auto px-6">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-500 font-light text-center max-w-4xl mx-auto leading-relaxed mb-24"
        >
          By engaging NeoVision Health Care for the storage, handling, or distribution of pharmaceutical materials, you explicitly agree to the <strong className="text-[#121c2c]">operational and legal parameters</strong> defined within this Immutable Compliance Ledger.
        </motion.p>

        {/* The Immutable Compliance Ledger Stack */}
        <div className="relative perspective-[2500px]">
          
          {/* Central 3D Binding Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-transparent -translate-x-1/2 rounded-full hidden md:block">
            <motion.div 
              animate={{ top: ['0%', '100%'] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute w-3 h-12 bg-white shadow-[0_0_15px_#003e7a] rounded-full left-1/2 -translate-x-1/2"
            ></motion.div>
          </div>

          <div className="space-y-4">
            {terms.map((term, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={term.id}
                  initial={{ opacity: 0, rotateX: 50, rotateY: isEven ? -15 : 15, y: 150, z: -300, scale: 0.8 }}
                  whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0, z: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, type: "spring", stiffness: 50, damping: 12 }}
                  whileHover={{ scale: 1.03, z: 50, rotateY: isEven ? 3 : -3, transition: { duration: 0.4, ease: "easeOut" } }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* 3D Ledger Block */}
                  <div className={`w-full md:w-1/2 bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,62,122,0.08)] border border-gray-100 hover:shadow-[0_40px_80px_rgba(0,62,122,0.15)] hover:border-blue-200 transition-all duration-500 relative`}>
                    
                    {/* Floating Watermark */}
                    <div className="absolute -top-4 -right-4 text-8xl font-black text-gray-50 opacity-50 pointer-events-none group-hover:scale-110 transition-transform duration-700 select-none">
                      {term.id}
                    </div>

                    <div style={{ transform: 'translateZ(30px)' }} className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${term.bgGradient} flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-500`}>
                          <term.icon size={24} className={`${term.color}`} />
                        </div>
                        <div>
                          <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 mb-1 block`}>Clause {term.id} // {term.subtitle}</span>
                          <h3 className="text-xl md:text-2xl font-bold text-[#121c2c]">{term.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-base text-gray-600 leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-500">
                        {term.content}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Node */}
                  <div className="hidden md:flex w-12 h-12 shrink-0 bg-white rounded-full border-[3px] border-blue-100 shadow-xl items-center justify-center relative z-20 group-hover:border-blue-400 group-hover:scale-125 transition-all duration-500">
                    <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:bg-[#78f7e9] transition-colors shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 perspective-[2000px] mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.02, rotateX: 5, z: 30, transition: { duration: 0.4, ease: "easeOut" } }}
            style={{ transformStyle: 'preserve-3d' }}
            className="p-12 md:p-16 bg-gradient-to-br from-[#003e7a] to-blue-900 border border-blue-400/30 rounded-[3rem] text-center shadow-[0_30px_60px_rgba(0,62,122,0.3)] relative overflow-hidden group cursor-pointer"
          >
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#78f7e9]/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div 
                className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative group-hover:shadow-[0_20px_40px_rgba(120,247,233,0.2)] transition-shadow duration-500"
                style={{ transform: 'translateZ(50px)' }}
              >
                <div className="absolute inset-0 border-2 border-dashed border-[#78f7e9]/30 rounded-3xl group-hover:rotate-180 transition-transform duration-1000"></div>
                <BadgeCheck size={48} className="text-[#78f7e9] drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div style={{ transform: 'translateZ(30px)' }}>
                <h4 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight group-hover:text-[#78f7e9] transition-colors duration-500">Compliance & Certifications</h4>
                <p className="text-blue-100/80 mb-10 text-lg max-w-2xl mx-auto font-medium">Review our ISO, GDP, and strict regulatory compliance documents that form the foundation of these operational terms.</p>
              </div>

              <div style={{ transform: 'translateZ(60px)' }}>
                <Link href="/legal/certifications">
                  <button className="inline-flex items-center gap-3 bg-[#78f7e9] text-[#003e7a] px-12 py-5 rounded-full font-black text-lg hover:bg-white hover:shadow-[0_20px_40px_rgba(120,247,233,0.3)] hover:scale-105 transition-all duration-300">
                    View Certifications <ArrowRight size={24} />
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
