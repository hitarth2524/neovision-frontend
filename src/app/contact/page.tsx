'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ChevronDown, Send, CheckCircle2, Loader2 } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const faqs = [
  { 
    q: 'What is the typical onboarding timeline for new partners?', 
    a: 'Our streamlined onboarding process typically takes 5-10 business days, including facility audit, system integration, and initial order processing.',
    related: [
      { q: 'Is there an onboarding fee?', a: 'No, our initial onboarding process and facility audit are completely complimentary for all approved partners.' },
      { q: 'What IT systems are required for integration?', a: 'We support standard EDI and provide a modern REST API for seamless integration with most major ERP systems.' }
    ]
  },
  { 
    q: 'Do you offer emergency or rush delivery services?', 
    a: 'Yes, we provide 24/7 emergency distribution capabilities for critical healthcare facilities, with response times under 2 hours for metropolitan areas.',
    related: [
      { q: 'Is there an extra charge for emergency delivery?', a: 'Emergency deliveries outside of contracted SLA terms may incur a priority logistics surcharge.' },
      { q: 'How do I trigger an emergency order?', a: 'Emergency orders can be triggered via our 24/7 dedicated hot-line or through the priority portal.' }
    ]
  },
  { 
    q: 'What temperature ranges do your cold-chain facilities support?', 
    a: 'We support the full pharmaceutical temperature spectrum: ambient (15-25°C), refrigerated (2-8°C), frozen (-20°C), and ultra-low temperature (-80°C) for specialized biologics.',
    related: [
      { q: 'How is temperature monitored during transit?', a: 'All vehicles are equipped with IoT sensors providing real-time telemetry back to our central control tower.' },
      { q: 'What happens in case of a temperature excursion?', a: 'Our systems trigger automated alerts and drivers follow strict SOPs to quarantine affected products immediately.' }
    ]
  },
  { 
    q: 'How do I track my orders in real-time?', 
    a: 'All partners receive access to our secure online portal with live GPS tracking, temperature logs, and ETA updates for all active shipments.',
    related: [
      { q: 'Can I integrate tracking into my own app?', a: 'Yes, our Enterprise API allows you to pull real-time tracking data directly into your native systems.' },
      { q: 'Are temperature logs available for download?', a: 'Yes, fully compliant PDF temperature logs are automatically generated upon delivery completion.' }
    ]
  },
  {
    q: 'What are your compliance and quality assurance certifications?',
    a: 'NeoVision operates under strict GDP (Good Distribution Practice) guidelines and holds ISO 9001, ISO 13485, and specific regional regulatory approvals across all operating markets.',
    related: [
      { q: 'Do you conduct regular internal audits?', a: 'Yes, we conduct quarterly internal quality audits and welcome partner audits with prior scheduling.' },
      { q: 'How do you handle product recalls?', a: 'We have an automated rapid-recall system capable of isolating affected batches across our entire network within 4 hours.' }
    ]
  }
];

const steps = [
  { num: '01', title: 'Submit Inquiry', desc: 'Fill out our B2B inquiry form with your organization details and requirements.' },
  { num: '02', title: 'Initial Assessment', desc: 'Our partnerships team reviews your needs within 1 business day.' },
  { num: '03', title: 'Proposal & Agreement', desc: 'Receive a tailored distribution proposal and sign partnership agreement.' },
  { num: '04', title: 'Onboarding', desc: 'System integration, account setup, and first order fulfillment.' },
];

const offices = [
  { city: 'Basel, Switzerland', role: 'Global HQ', address: '100 Innovation Way, Basel CH-4051', phone: '+41 61 555 0198' },
  { city: 'New York, USA', role: 'North America Hub', address: '500 Commerce Park, NJ 07094', phone: '+1 201 555 0123' },
  { city: 'Singapore', role: 'Asia Pacific Hub', address: '30 Biopolis Street, #07-02', phone: '+65 6555 0198' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ orgName: '', contactName: '', email: '', phone: '', inquiryType: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-item', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' }
      });
      gsap.from('.office-card', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: officesRef.current, start: 'top 80%' }
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.message);
        setForm({ orgName: '', contactName: '', email: '', phone: '', inquiryType: '', message: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Could not connect to server. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 bg-[#f9f9ff]">
      {/* Redesigned Premium Hero - Compact & Elegant */}
      <PageBanner
        icon={Send}
        badgeText="Get In Touch"
        title="Partner With"
        highlightedTitle="NeoVision"
        description="Ready to optimize your pharmaceutical supply chain? Our partnerships team will craft a tailored distribution solution for your organization."
        bottomColor="bg-[#f9f9ff]"
      />

      {/* FORM + INFO */}
      <section className="max-w-7xl mx-auto px-4 md:px-16 pb-32 pt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* FORM */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-[2rem] p-10 md:p-14 shadow-[0_30px_60px_rgba(0,30,80,0.06)] border border-[#e7eeff] relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Elegant Header Accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-[#003e7a]"></div>

            <h2 className="text-3xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)] mb-2">B2B Partnership Inquiry</h2>
            <p className="text-[#5a6072] mb-10">Please provide your organization details to begin the onboarding process.</p>

            <AnimatePresence>
              {success && (
                <motion.div
                  className="mb-8 p-5 bg-green-50/80 border border-green-200 rounded-2xl flex items-start gap-4 shadow-sm"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }} animate={{ opacity: 1, height: 'auto', scale: 1 }} exit={{ opacity: 0, height: 0 }}
                >
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 size={24} className="text-green-600 flex-shrink-0" />
                  </div>
                  <div className="mt-0.5">
                    <h4 className="text-green-800 font-bold mb-1">Inquiry Submitted Successfully</h4>
                    <p className="text-green-700 text-sm leading-relaxed">{success}</p>
                  </div>
                </motion.div>
              )}
              {error && (
                <motion.div
                  className="mb-8 p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 shadow-sm"
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                >
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'orgName', label: 'Organization Name', placeholder: 'e.g. City General Hospital', required: true },
                  { name: 'contactName', label: 'Contact Name', placeholder: 'e.g. Dr. Jane Smith', required: true },
                ].map(({ name, label, placeholder, required }) => (
                  <motion.div key={name} className="group">
                    <label className="block text-xs font-bold text-[#003e7a] uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-cyan-600">{label} {required && <span className="text-red-500">*</span>}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={form[name as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                      required={required}
                      className="w-full px-5 py-4 bg-[#f8faff] border border-[#d9e3f9] rounded-2xl text-[15px] text-[#121c2c] placeholder:text-[#8892a3] focus:bg-white focus:outline-none focus:border-[#003e7a] focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all duration-300"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div className="group">
                  <label className="block text-xs font-bold text-[#003e7a] uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-cyan-600">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email" placeholder="e.g. purchasing@hospital.org"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                    className="w-full px-5 py-4 bg-[#f8faff] border border-[#d9e3f9] rounded-2xl text-[15px] text-[#121c2c] placeholder:text-[#8892a3] focus:bg-white focus:outline-none focus:border-[#003e7a] focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all duration-300"
                  />
                </motion.div>
                <motion.div className="group">
                  <label className="block text-xs font-bold text-[#003e7a] uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-cyan-600">Phone</label>
                  <input
                    type="tel" placeholder="e.g. +1 (212) 555-0198"
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-5 py-4 bg-[#f8faff] border border-[#d9e3f9] rounded-2xl text-[15px] text-[#121c2c] placeholder:text-[#8892a3] focus:bg-white focus:outline-none focus:border-[#003e7a] focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all duration-300"
                  />
                </motion.div>
              </div>

              <motion.div className="group relative">
                <label className="block text-xs font-bold text-[#003e7a] uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-cyan-600">Inquiry Type <span className="text-red-500">*</span></label>
                <select
                  value={form.inquiryType} onChange={e => setForm(f => ({ ...f, inquiryType: e.target.value }))} required
                  className="w-full px-5 py-4 bg-[#f8faff] border border-[#d9e3f9] rounded-2xl text-[15px] text-[#121c2c] focus:bg-white focus:outline-none focus:border-[#003e7a] focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all duration-300 appearance-none"
                >
                  <option value="" disabled className="text-gray-400">Select inquiry type...</option>
                  <option value="distribution">Distribution Partnership</option>
                  <option value="product">Product Availability</option>
                  <option value="compliance">Compliance & Regulatory</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown size={20} className="absolute right-5 top-[42px] text-[#727783] pointer-events-none" />
              </motion.div>

              <motion.div className="group">
                <label className="block text-xs font-bold text-[#003e7a] uppercase tracking-wider mb-2 ml-1 transition-colors group-focus-within:text-cyan-600">Message <span className="text-red-500">*</span></label>
                <textarea
                  rows={5} placeholder="Please describe your organization's distribution needs..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required
                  className="w-full px-5 py-4 bg-[#f8faff] border border-[#d9e3f9] rounded-2xl text-[15px] text-[#121c2c] placeholder:text-[#8892a3] focus:bg-white focus:outline-none focus:border-[#003e7a] focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all duration-300 resize-none"
                />
              </motion.div>

              <div className="pt-4 w-full">
                <motion.button
                  type="submit" disabled={submitting}
                  className="relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#003e7a] to-[#004e9a] text-white py-5 rounded-2xl font-bold text-lg disabled:opacity-70 shadow-[0_8px_16px_rgba(0,62,122,0.15)] border-t border-blue-400/40 overflow-hidden group/btn"
                  whileHover={!submitting ? { scale: 1.01, y: -2, boxShadow: "0 20px 40px rgba(0,62,122,0.25)" } : {}} 
                  whileTap={!submitting ? { scale: 0.98, y: 0 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {submitting ? <><Loader2 size={20} className="animate-spin" /> Transmitting...</> : <><Send size={20} className="group-hover/btn:translate-x-1 transition-transform duration-300" /> Submit Inquiry</>}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* SIDE INFO */}
          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-[2rem] p-8 border border-[#e7eeff] relative overflow-hidden group/card shadow-[0_20px_40px_rgba(0,30,80,0.04)] hover:shadow-[0_30px_60px_rgba(0,30,80,0.08)] hover:-translate-y-1 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Light Card BG effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-[60px] pointer-events-none group-hover/card:bg-cyan-400/20 transition-colors duration-700"></div>
              
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-12 h-12 bg-[#f8faff] border border-[#d9e3f9] rounded-xl flex items-center justify-center shadow-sm">
                  <MapPin size={24} className="text-[#003e7a]" />
                </div>
                <h3 className="text-xl font-bold text-[#121c2c] font-[family-name:var(--font-inter)] tracking-tight">Global HQ</h3>
              </div>

              <div className="space-y-6 relative z-10">
                {[
                  { icon: MapPin, title: 'Address', text: '100 Innovation Way, Basel CH-4051' },
                  { icon: Phone, title: 'Direct Line', text: '+41 61 555 0198' },
                  { icon: Mail, title: 'Partnerships', text: 'partnerships@neovision.ch' },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={text} className="flex items-start gap-4 group/item">
                    <div className="mt-1 bg-[#f8faff] p-1.5 rounded-lg border border-[#e7eeff] shadow-sm group-hover/item:bg-white group-hover/item:border-cyan-200 group-hover/item:shadow-md transition-all duration-300">
                      <Icon size={16} className="text-[#004e9a] group-hover/item:text-cyan-600 transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#5a6072] uppercase tracking-wider mb-1">{title}</div>
                      <div className="text-[15px] text-[#121c2c] font-medium transition-colors">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-[2rem] p-8 border border-[#e7eeff] shadow-[0_20px_40px_rgba(0,30,80,0.04)] relative overflow-hidden group/sys hover:shadow-[0_30px_60px_rgba(0,30,80,0.08)] hover:-translate-y-1 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Light Card BG effects */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-400/10 rounded-full blur-[40px] pointer-events-none group-hover/sys:bg-green-400/20 transition-colors duration-700"></div>

              <h3 className="font-bold text-[#121c2c] font-[family-name:var(--font-inter)] mb-4 text-lg">System Status</h3>
              
              <div className="bg-[#f8faff] border border-[#d9e3f9] rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#5a6072]">Inquiry Response</span>
                  <div className="flex items-center gap-2 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Online</span>
                  </div>
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d9e3f9] to-transparent"></div>
                
                <div>
                   <span className="text-[13px] text-[#727783]">Typical Response Time</span>
                   <div className="text-lg font-bold text-[#003e7a] mt-0.5">{"< 1 Business Day"}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP STEPS */}
      <section ref={stepsRef} className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#d9e3f9] to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-2 block">The Process</span>
            <h2 className="text-4xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)]">Partnership Onboarding Journey</h2>
            <p className="text-[#5a6072] mt-4 text-lg">A streamlined, four-step integration process designed for speed and regulatory compliance.</p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line (Desktop) - Animated Draw Effect */}
            <motion.div 
              className="hidden md:block absolute top-16 left-12 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-[#e7eeff] z-0"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 'calc(100% - 6rem)', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            ></motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {steps.map(({ num, title, desc }, i) => (
                <motion.div 
                  key={num} 
                  className="group relative bg-white rounded-[2rem] p-8 border border-[#e7eeff] shadow-[0_15px_30px_rgba(0,30,80,0.03)] hover:shadow-[0_30px_60px_rgba(0,30,80,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                  initial={{ opacity: 0, y: 80, scale: 0.9 }} 
                  whileInView={{ opacity: 1, y: 0, scale: 1 }} 
                  viewport={{ once: true, margin: "-50px" }} 
                  transition={{ delay: 0.3 + (i * 0.25), duration: 0.7, type: "spring", bounce: 0.4 }}
                >
                  {/* Hover gradient border top */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#e7eeff] to-[#d9e3f9] group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-500"></div>
                  
                  {/* Elegant Top-Right Number */}
                  <div className="absolute top-6 right-6 text-6xl font-black text-[#f4f7fc] group-hover:text-[#e3ebfc] group-hover:-translate-y-1 transition-all duration-500 pointer-events-none select-none z-0">
                    {num}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Number Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-[#f8faff] border border-[#d9e3f9] flex items-center justify-center text-xl font-bold text-[#003e7a] group-hover:bg-[#003e7a] group-hover:text-white group-hover:border-[#003e7a] transition-all duration-500 mb-6 shadow-sm">
                      {num}
                    </div>
                    
                    <h4 className="text-xl font-bold text-[#121c2c] font-[family-name:var(--font-inter)] mb-3 group-hover:text-[#003e7a] transition-colors duration-300">{title}</h4>
                    <p className="text-[15px] text-[#5a6072] leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#f4f7fc] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-3xl mx-auto px-4 md:px-16 relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-2 block">Support & Information</span>
            <h2 className="text-4xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)]">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map(({ q, a, related }, i) => {
              const isActive = openFaq === i;
              return (
                <motion.div
                  key={i}
                  className={`relative bg-white rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${isActive ? 'border-[#003e7a]/30 shadow-[0_20px_40px_rgba(0,62,122,0.08)] -translate-y-1' : 'border-[#e7eeff] hover:border-[#d9e3f9] hover:shadow-[0_10px_20px_rgba(0,30,80,0.04)] hover:-translate-y-0.5'}`}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  {/* Active left indicator */}
                  <div className={`absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-[#003e7a] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

                  <button
                    className={`w-full flex justify-between items-center p-6 text-left transition-colors duration-300 ${isActive ? 'bg-[#f8faff]' : 'bg-white'}`}
                    onClick={() => setOpenFaq(isActive ? null : i)}
                  >
                    <span className={`font-bold font-[family-name:var(--font-inter)] pr-4 transition-colors duration-300 ${isActive ? 'text-[#003e7a] text-[17px]' : 'text-[#121c2c] text-[16px]'}`}>{q}</span>
                    <motion.div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-[#003e7a] text-white' : 'bg-[#f4f7fc] text-[#727783]'}`}
                      animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 pt-5 bg-white border-t border-[#e7eeff]">
                          <p className="text-[15px] text-[#5a6072] leading-relaxed">
                            {a}
                          </p>
                          
                          {/* Related Questions */}
                          {related && related.length > 0 && (
                            <div className="mt-6 pt-5 border-t border-dashed border-[#d9e3f9]">
                              <span className="text-xs font-bold text-[#003e7a] uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                Related Questions
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {related.map((rel, idx) => (
                                  <div key={idx} className="bg-[#f8faff] p-5 rounded-2xl border border-[#e7eeff] hover:border-[#d9e3f9] transition-colors">
                                    <h5 className="font-bold text-[#121c2c] text-sm mb-2">{rel.q}</h5>
                                    <p className="text-[13px] text-[#5a6072] leading-relaxed">{rel.a}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section ref={officesRef} className="py-24 relative overflow-hidden bg-[#e7eeff]">
        {/* Soft Premium Background */}
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#d9e3f9]/50 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-sm font-bold text-[#003e7a] uppercase tracking-widest mb-2 block">Our Global Presence</span>
            <h2 className="text-4xl font-extrabold text-[#121c2c] font-[family-name:var(--font-inter)]">Global Office Locations</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map(({ city, role, address, phone }, i) => (
              <motion.div 
                key={city} 
                className="group relative bg-white rounded-[2rem] p-8 border border-[#d9e3f9] shadow-[0_10px_20px_rgba(0,30,80,0.02)] hover:shadow-[0_30px_60px_rgba(0,30,80,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                {/* Glowing Hover Border */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#e7eeff] to-[#d9e3f9] group-hover:from-[#003e7a] group-hover:to-cyan-400 transition-all duration-500"></div>
                
                {/* Ambient Internal Watermark */}
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#f4f7fc] rounded-full group-hover:bg-[#e7eeff] transition-colors duration-500 pointer-events-none z-0"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#f8faff] border border-[#e7eeff] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#003e7a] group-hover:border-[#003e7a] transition-all duration-500 shadow-sm">
                    <MapPin size={24} className="text-[#003e7a] group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <p className="text-[11px] font-black text-cyan-600 uppercase tracking-[0.2em] mb-2">{role}</p>
                  <h4 className="text-2xl font-bold text-[#121c2c] font-[family-name:var(--font-inter)] mb-6 group-hover:text-[#003e7a] transition-colors duration-300">{city}</h4>
                  
                  <div className="space-y-4 pt-4 border-t border-[#f0f3ff]">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-[#727783] mt-0.5 flex-shrink-0 group-hover:text-cyan-500 transition-colors" /> 
                      <p className="text-[15px] text-[#5a6072] leading-relaxed group-hover:text-[#121c2c] transition-colors">{address}</p>
                    </div>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-[15px] text-[#5a6072] hover:text-[#003e7a] transition-colors">
                      <Phone size={18} className="text-[#727783] flex-shrink-0 group-hover:text-cyan-500 transition-colors" /> 
                      {phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
