'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [randomMolecules, setRandomMolecules] = useState<Array<{xStart: number, xEnd: number, yStart: number, yEnd: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    setRandomMolecules([...Array(6)].map(() => ({
      xStart: (Math.random() - 0.5) * 200,
      xEnd: (Math.random() - 0.5) * 300,
      yStart: (Math.random() - 0.5) * 200,
      yEnd: (Math.random() - 0.5) * 300,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2
    })));

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 1500); // Give time for exit animations
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010914] overflow-hidden"
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] } 
          }}
        >
          {/* Deep Medical Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
            <motion.div 
              className="absolute w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] bg-[#00f0ff]/10 rounded-full blur-[150px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[#0044ff]/20 rounded-full blur-[100px]"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="relative z-10 w-full flex flex-col items-center px-4">
            
            {/* MASSIVE 3D HYPER-REALISTIC PHARMA CAPSULE */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8 flex items-center justify-center perspective-[1200px]">
              
              {/* 3D Orbiting Atom Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute inset-0 rounded-full border-[2px] border-cyan-400/20"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ 
                    rotateX: [60, 60],
                    rotateY: [0, 360],
                    rotateZ: [i * 60, i * 60 + 360]
                  }}
                  transition={{ 
                    duration: 8 + i * 2, 
                    repeat: Infinity, 
                    ease: "linear"
                  }}
                >
                  <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_20px_#00f0ff] -translate-x-1/2 -translate-y-1/2" style={{ transform: "rotateX(90deg)" }}></div>
                </motion.div>
              ))}

              {/* The Hyper-Realistic 3D Capsule */}
              <motion.div 
                className="relative z-20 flex flex-col items-center justify-center w-20 h-48 sm:w-24 sm:h-56 drop-shadow-[0_20px_40px_rgba(0,100,255,0.6)]"
                animate={{ 
                  y: [-15, 15, -15],
                  rotate: [-15, 15, -15],
                  rotateY: [0, 360] // Creates a true 3D rotating feel if gradient is rich
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Top Half (Cyan Medicine) */}
                <div 
                  className="w-full h-1/2 rounded-t-[100px] relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)",
                    boxShadow: "inset -15px -15px 25px rgba(0,0,0,0.4), inset 15px 15px 25px rgba(255,255,255,0.6)"
                  }}
                >
                  {/* Glossy Specular Highlight */}
                  <div className="absolute top-2 left-2 w-4 h-16 bg-white/40 rounded-full blur-[2px] rotate-12"></div>
                </div>
                
                {/* Silver Joining Ring */}
                <div className="w-[105%] h-3 bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-full shadow-[0_5px_10px_rgba(0,0,0,0.3)] z-10"></div>

                {/* Bottom Half (Pure White) */}
                <div 
                  className="w-full h-1/2 rounded-b-[100px] relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                    boxShadow: "inset -15px 15px 25px rgba(0,0,0,0.2), inset 15px -15px 25px rgba(255,255,255,1)"
                  }}
                >
                   {/* Glossy Specular Highlight */}
                   <div className="absolute bottom-4 left-3 w-3 h-12 bg-white/80 rounded-full blur-[2px] rotate-12"></div>
                </div>
              </motion.div>

              {/* Floating Medical Molecules (Hexagons) */}
              {randomMolecules.map((config, i) => (
                <motion.div
                  key={`mol-${i}`}
                  className="absolute"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ 
                    x: [0, config.xStart, config.xEnd],
                    y: [0, config.yStart, config.yEnd],
                    rotateZ: [0, 360],
                    opacity: [0, 0.8, 0],
                    scale: [0.2, 1, 0.2]
                  }}
                  transition={{ 
                    duration: config.duration, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: config.delay
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                    <path d="M12 2L20.6603 7V17L12 22L3.33975 17V7L12 2Z" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              ))}

            </div>

            {/* Cinematic Typography Reveal */}
            <div className="text-center relative z-20">
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-[#94a3b8] tracking-widest drop-shadow-[0_10px_20px_rgba(0,240,255,0.4)] whitespace-nowrap"
                initial={{ opacity: 0, filter: "blur(20px)", y: 30, scale: 0.9 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                NEOVISION
              </motion.h1>
              <motion.div 
                className="flex items-center justify-center gap-4 mt-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              >
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
                <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 tracking-[0.4em] uppercase">
                  Health Care
                </h2>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
              </motion.div>
            </div>

            {/* Ultimate ECG Pulse Loading Bar */}
            <div className="mt-16 w-full max-w-lg flex flex-col items-center">
              
              <motion.div 
                className="text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              >
                {progress}<span className="text-2xl text-cyan-500 ml-1">%</span>
              </motion.div>

              <div className="relative w-full h-[60px] flex flex-col justify-center">
                {/* The ECG SVG Line */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <svg width="100%" height="40" preserveAspectRatio="none" className="stroke-cyan-500" strokeWidth="2" fill="none">
                    <path d="M 0 20 L 40% 20 L 42% 5 L 45% 35 L 48% 2 L 51% 38 L 54% 20 L 100% 20" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                {/* The Glowing Loading Progress Line */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[3px] bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-white shadow-[0_0_20px_rgba(0,240,255,1)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                  />
                </div>
              </div>
              
              <div className="mt-2 text-[10px] sm:text-xs font-bold text-cyan-500/80 tracking-[0.3em] uppercase">
                Synthesizing Medical Data...
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
