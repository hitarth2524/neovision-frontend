'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/order', label: 'Order' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md border-b border-[#e7eeff]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-16 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-9 h-9 rounded-lg bg-[#003e7a] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="text-white font-bold text-sm font-[family-name:var(--font-inter)]">NV</span>
            </motion.div>
            <span className="text-[#003e7a] font-bold text-lg font-[family-name:var(--font-inter)] hidden sm:block">
              NeoVision Health Care
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative group">
                  <span className={`text-base font-semibold transition-colors duration-200 ${
                    isActive ? 'text-[#003e7a]' : 'text-[#424751] hover:text-[#003e7a]'
                  }`}>
                    {link.label}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-[#003e7a] rounded-full"
                    initial={false}
                    animate={{ width: isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/contact">
              <motion.button
                className="hidden md:flex items-center gap-2 bg-[#003e7a] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#0055a4] transition-colors shadow-sm"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Inquiry
                <ChevronRight size={14} />
              </motion.button>
            </Link>
            <motion.button
              className="md:hidden p-2 text-[#003e7a]"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#f9f9ff]/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              className="relative flex flex-col items-center justify-center h-full gap-6 px-8"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className={`text-3xl font-bold font-[family-name:var(--font-inter)] transition-colors ${
                      pathname === link.href ? 'text-[#003e7a]' : 'text-[#424751] hover:text-[#003e7a]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
              >
                <Link href="/contact">
                  <button className="mt-4 bg-[#003e7a] text-white px-8 py-3 rounded-xl text-lg font-semibold">
                    Submit Inquiry
                  </button>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
