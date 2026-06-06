'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Shield, Award, Globe, ArrowRight } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
  ],
  Services: [
    { label: 'Cold Chain Logistics', href: '/services/cold-chain-logistics' },
    { label: 'Distribution Network', href: '/services/distribution-network' },
    { label: 'Quality Assurance', href: '/services/quality-assurance' },
    { label: 'Partner Inquiry', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Terms of Service', href: '/legal/terms-of-service' },
    { label: 'Certifications', href: '/legal/certifications' },
    { label: 'QA Standards', href: '/legal/qa-standards' },
  ],
};

const certBadges = [
  { icon: Shield, label: 'ISO 9001:2015' },
  { icon: Award, label: 'GDP Certified' },
  { icon: Globe, label: 'FDA Compliant' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0a1118] to-[#04080f] text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative large watermark */}
      <div className="absolute -bottom-20 -right-20 text-[20rem] font-bold text-white opacity-[0.02] pointer-events-none select-none font-[family-name:var(--font-inter)]">
        NV
      </div>

      {/* Decorative blur blobs */}
      <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[25rem] h-[25rem] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter (Left Side) */}
          <div className="lg:col-span-5">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#005bb5] to-[#003e7a] flex items-center justify-center shadow-[0_0_20px_rgba(0,91,181,0.4)] border border-blue-400/20">
                <span className="text-white font-extrabold text-lg font-[family-name:var(--font-inter)] tracking-tighter">NV</span>
              </div>
              <span className="font-bold text-2xl font-[family-name:var(--font-inter)] tracking-tight">NeoVision Health Care</span>
            </motion.div>
            
            <p className="text-[#a0aabf] text-base leading-relaxed mb-8 max-w-md">
              Your trusted partner in pharmaceutical distribution excellence since 2007. Precision, safety, and efficiency in every critical delivery.
            </p>

            {/* Newsletter Subscription */}
            <div className="relative max-w-md mb-8 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center bg-[#121c2c] rounded-xl border border-white/10 p-1">
                <input 
                  type="email" 
                  placeholder="Enter your email for updates" 
                  className="bg-transparent w-full px-4 text-sm text-white outline-none placeholder:text-gray-500"
                />
                <button className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-lg transition-colors flex-shrink-0">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Cert badges */}
            <div className="flex flex-wrap gap-3">
              {certBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="group/badge cursor-default flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-[#c2c6d3] hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-300 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  <Icon size={14} className="text-blue-400 group-hover/badge:text-blue-300" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Links columns (Right Side) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">
            {Object.entries(footerLinks).map(([title, links], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[#a0aabf] text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group/link"
                      >
                        <span className="w-0 h-px bg-blue-400 transition-all duration-300 group-hover/link:w-3"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact info strip (Redesigned as Glassmorphism Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-10 mb-10">
          {[
            { icon: MapPin, text: 'NeoVision Campus, 100 Innovation Way, Basel CH-4051, Switzerland' },
            { icon: Phone, text: '+41 61 555 0198 · +41 61 555 0199' },
            { icon: Mail, text: 'sales@neovision.ch · qa@neovision.ch' },
          ].map(({ icon: Icon, text }, idx) => (
            <motion.div 
              key={text} 
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + (idx * 0.1) }}
              className="flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-2xl p-5 transition-colors duration-300 group/contact cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover/contact:bg-blue-500/20 group-hover/contact:scale-110 transition-all duration-300">
                <Icon size={20} className="text-cyan-400 group-hover/contact:text-cyan-300" />
              </div>
              <span className="text-[#a0aabf] text-sm leading-relaxed group-hover/contact:text-gray-200 transition-colors">{text}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8">
          <p className="text-[#727783] text-sm font-medium">© 2007–2024 NeoVision Health Care. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#727783] text-xs font-medium">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="text-blue-500/50">Pharmaceutical Distribution Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
