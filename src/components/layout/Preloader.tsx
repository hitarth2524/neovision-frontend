'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total loading time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 600); // Small pause at 100% before exit
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010b18] overflow-hidden"
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } 
          }}
        >
          {/* Deep Medical Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
            <motion.div 
              className="absolute w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-blue-600/10 rounded-full blur-[120px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] bg-cyan-400/10 rounded-full blur-[100px]"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6">
            
            {/* 3D PROPER PHARMA DNA HELIX */}
            <div className="relative mb-12 flex justify-center items-center w-full h-40" style={{ perspective: '800px' }}>
              
              <div className="flex flex-col justify-between h-full w-24">
                {[...Array(14)].map((_, i) => {
                  const delay = i * -0.15; // Negative delay creates the wave structure immediately
                  return (
                    <motion.div
                      key={i}
                      className="w-full h-0.5 relative flex items-center"
                      style={{ transformStyle: 'preserve-3d' }}
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay }}
                    >
                      {/* Connecting Line */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-cyan-400/10 to-blue-500/30"></div>
                      
                      {/* 3D Orbiting Atoms */}
                      <motion.div 
                        className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"
                        style={{ boxShadow: '0 0 15px 2px rgba(59,130,246,0.6)' }}
                      />
                      <motion.div 
                        className="absolute right-0 translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300"
                        style={{ boxShadow: '0 0 15px 2px rgba(34,211,238,0.6)' }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Brand Identity */}
            <div className="overflow-hidden mb-2 relative z-30">
              <motion.h1 
                className="text-4xl md:text-5xl font-black tracking-tight font-[family-name:var(--font-inter)] text-white"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                NEO<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">VISION</span>
              </motion.h1>
            </div>

            <motion.p
              className="text-cyan-200/60 text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Health Care
            </motion.p>

            {/* Premium Progress Bar */}
            <motion.div 
              className="flex flex-col items-center w-full max-w-[240px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-full h-1 bg-[#0f1f38] rounded-full overflow-hidden mb-3 relative">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.05 }}
                />
              </div>
              <div className="flex w-full justify-between items-center text-[10px] sm:text-xs font-bold tracking-widest">
                <span className="text-[#4b6a97]">INITIALIZING</span>
                <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{progress}%</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
