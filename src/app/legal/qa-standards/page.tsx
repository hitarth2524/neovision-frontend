'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Microscope, PackageSearch, TestTube2, BadgeCheck, ClipboardCheck, Network, Cpu, ArrowLeft, ThermometerSnowflake, ShieldCheck, AlertTriangle, FileSignature } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import Link from 'next/link';
import { useRef } from 'react';

const steps = [
  {
    icon: Microscope,
    title: 'Pre-Shipment Facility Audit',
    desc: 'Before onboarding any new pharmaceutical origin point, our QA team conducts rigorous thermal mapping and hygienic auditing of the loading facility to ensure a pristine handover environment.',
    color: 'from-blue-500 to-blue-700',
    phase: 'Phase 01',
    metric: '99.9% Audit Pass Rate'
  },
  {
    icon: ThermometerSnowflake,
    title: 'Packaging Thermal Validation',
    desc: 'All VIP (Vacuum Insulated Panel) shippers and Phase Change Materials (PCMs) are thermally validated in our chambers against extreme simulated weather profiles (+40°C to -20°C).',
    color: 'from-cyan-500 to-cyan-700',
    phase: 'Phase 02',
    metric: 'Zero Excursion Tolerance'
  },
  {
    icon: Cpu,
    title: 'Telemetry Calibration Matrix',
    desc: 'Data loggers and IoT tracking devices are calibrated monthly in an ISO 17025 accredited laboratory to ensure zero-drift accuracy in temperature reporting.',
    color: 'from-indigo-500 to-indigo-700',
    phase: 'Phase 03',
    metric: '< 0.1°C Variance'
  },
  {
    icon: Network,
    title: 'Active In-Transit Auditing',
    desc: 'Our digital control tower performs randomized virtual audits of active shipments, verifying route adherence, dwell times, and real-time thermal stability.',
    color: 'from-emerald-500 to-emerald-700',
    phase: 'Phase 04',
    metric: 'Real-Time Interventions'
  },
  {
    icon: ShieldCheck,
    title: 'Chain of Custody Protocols',
    desc: 'Every physical handover of biological material is audited via multi-factor authentication, ensuring the physical security and thermal integrity of the payload is never compromised.',
    color: 'from-purple-500 to-purple-700',
    phase: 'Phase 05',
    metric: '100% Cryptographic Traceability'
  },
  {
    icon: AlertTriangle,
    title: 'CAPA & Excursion Quarantine',
    desc: 'In the event of a predicted thermal excursion, our QA team executes immediate Corrective and Preventive Actions (CAPA), digitally quarantining the payload until a full root-cause analysis is concluded.',
    color: 'from-rose-500 to-rose-700',
    phase: 'Phase 06',
    metric: 'Zero-Fail Quarantine Lock'
  },
  {
    icon: FileSignature,
    title: 'Post-Transit Efficacy Release',
    desc: 'Biological payloads are legally released to the receiving hospital only after our QA engineers cross-reference the IoT thermal graph against the specific stability profile of the drug.',
    color: 'from-teal-500 to-teal-700',
    phase: 'Phase 07',
    metric: 'Final Pharmacist Sign-off'
  },
];

export default function QAStandards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <main className="min-h-screen pt-24 pb-0 bg-[#f8fafc] overflow-hidden text-[#121c2c]">
      
      {/* 3D Validation Background */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,62,122,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,62,122,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [transform:perspective(1200px)_rotateX(75deg)_translateY(-200px)_translateZ(-300px)] origin-top"></div>
        <div className="absolute top-20 right-0 w-[1000px] h-[1000px] bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-5 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
      </motion.div>

      <PageBanner
        icon={BadgeCheck}
        badgeText="LEGAL & QA"
        title="Internal QA"
        highlightedTitle="Standards"
        description="The stringent internal methodologies and validation pipelines that guarantee absolute biological safety."
        bottomColor="bg-[#f8fafc]"
      />

      {/* 3D Validation Pipeline */}
      <section ref={containerRef} className="py-24 relative z-10 max-w-6xl mx-auto px-6">
        
        <div className="relative perspective-[2000px]">
          
          {/* Central 3D Core Tube */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-4 bg-white border border-blue-100 -translate-x-1/2 rounded-full shadow-inner hidden md:block overflow-hidden z-0">
            {/* Liquid Flow Animation */}
            <motion.div 
              animate={{ top: ['-10%', '110%'] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent blur-sm"
            ></motion.div>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, rotateY: isEven ? -25 : 25, x: isEven ? -100 : 100, z: -200, scale: 0.9 }}
                  whileInView={{ opacity: 1, rotateY: 0, x: 0, z: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 60 }}
                  whileHover={{ scale: 1.02, z: 40, rotateY: isEven ? 2 : -2, transition: { duration: 0.3 } }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`flex flex-col md:flex-row items-center gap-4 md:gap-6 group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* QA Pipeline Block */}
                  <div className={`w-full md:w-5/12 bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,62,122,0.06)] border border-gray-100 hover:shadow-[0_40px_80px_rgba(0,62,122,0.12)] hover:border-blue-200 transition-all duration-500 relative`}>
                    
                    {/* Glowing Validation Node */}
                    <div className={`absolute top-0 ${isEven ? 'right-0 rounded-bl-3xl' : 'left-0 rounded-br-3xl'} px-4 py-1.5 bg-gradient-to-r ${step.color} text-white font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg rounded-t-3xl`}>
                      {step.phase}
                    </div>

                    <div style={{ transform: 'translateZ(30px)' }} className="relative z-10 mt-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                          <step.icon size={24} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-[#121c2c] leading-tight">{step.title}</h3>
                      </div>
                      
                      <p className="text-sm text-gray-600 leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-500 mb-4">
                        {step.desc}
                      </p>

                      <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-blue-600 bg-blue-50 px-3 py-2 md:px-4 md:py-2 rounded-lg border border-blue-100">
                        <ClipboardCheck size={16} />
                        Metric: {step.metric}
                      </div>
                    </div>
                  </div>

                  {/* 3D Connector Node */}
                  <div className="hidden md:flex w-2/12 justify-center relative z-20">
                    <div className="w-12 h-12 bg-white rounded-full border-[3px] border-blue-50 shadow-xl flex items-center justify-center group-hover:border-blue-200 group-hover:scale-110 transition-all duration-500">
                       <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${step.color} shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse`}></div>
                    </div>
                  </div>

                  {/* Empty space */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Return Action Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 perspective-[2000px] mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.02, rotateX: 5, z: 30, transition: { duration: 0.4, ease: "easeOut" } }}
            style={{ transformStyle: 'preserve-3d' }}
            className="p-10 md:p-14 bg-gradient-to-br from-[#121c2c] to-[#0a1118] border border-blue-900/50 rounded-[3rem] text-center shadow-[0_30px_60px_rgba(0,62,122,0.2)] relative overflow-hidden group cursor-pointer max-w-4xl mx-auto"
          >
            {/* Animated Background Gradients */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              
              <div style={{ transform: 'translateZ(30px)' }}>
                <h4 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight group-hover:text-blue-200 transition-colors duration-500">Quality Assured Logistics</h4>
                <p className="text-blue-100/80 mb-10 text-lg max-w-xl mx-auto font-medium">Return to the main Quality Assurance service page to explore our full suite of biological transport solutions.</p>
              </div>

              <div style={{ transform: 'translateZ(60px)' }}>
                <Link href="/services/quality-assurance">
                  <button className="inline-flex items-center gap-3 bg-blue-500 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:scale-105 transition-all duration-300">
                    <ArrowLeft size={20} /> Back to Services
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
