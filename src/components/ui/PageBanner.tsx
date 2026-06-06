'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PageBannerProps {
  icon: LucideIcon;
  badgeText: string;
  title: string;
  highlightedTitle: string;
  description: string;
  bottomColor?: string;
  children?: React.ReactNode;
}

export default function PageBanner({ 
  icon: Icon, 
  badgeText, 
  title, 
  highlightedTitle, 
  description,
  bottomColor = 'bg-[#f4f7fc]',
  children
}: PageBannerProps) {
  return (
    <section className="relative py-12 md:py-24 mx-0 mb-12 overflow-hidden bg-[#0a1118]">
      {/* Dynamic 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 flex flex-col items-center text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: -20, rotateX: 45 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.8, type: 'spring' }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-900/40 border border-blue-400/30 text-cyan-300 text-sm font-bold tracking-widest mb-8 uppercase shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-md"
        >
          <Icon size={16} className="text-cyan-400" />
          {badgeText}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
          className="text-5xl md:text-7xl font-extrabold text-white font-[family-name:var(--font-inter)] mb-6 tracking-tight drop-shadow-2xl flex flex-col gap-2 items-center justify-center"
        >
          <span>{title}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 filter drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            {highlightedTitle}
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className={`text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed font-light ${children ? 'mb-8' : 'mb-12'}`}
        >
          {description}
        </motion.p>
        
        {children && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            {children}
          </motion.div>
        )}
      </div>
      
      {/* Slanted Bottom Edge */}
      <div className={`absolute bottom-0 left-0 right-0 h-16 ${bottomColor} -skew-y-2 origin-bottom-right transform translate-y-8 z-20`}></div>
    </section>
  );
}
