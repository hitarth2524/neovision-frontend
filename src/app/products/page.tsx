'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, CheckCircle2, AlertTriangle, XCircle, ChevronRight, X, Phone, Package, Beaker, Check, Pill, PackageCheck } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const categories = ['All', 'Eye Drop', 'Ear Drop', 'Tablet', 'Capsule', 'Nasal Spray', 'Lubricant Gel'];

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  drug?: string;
  form: string;
  packSize: string;
  stock: string;
  stockLevel: string;
  image: string;
  tags: string[];
  price?: number;
}

// Temporary price lookup map (by partial product name, case-insensitive)
const PRICE_MAP: Record<string, number> = {
  'cardiovas': 320.00,
  'oncocaps': 4850.00,
  'dermaheal': 195.00,
  'oticcare': 148.00,
  'timoclear': 185.00,
  'oculube': 220.50,
  'cipro': 165.00,
  'earwax': 95.00,
  'glucoclear': 210.00,
  'painrelief': 85.00,
  'amoxi': 175.00,
  'omepraz': 290.00,
  'aquaglide': 135.00,
  'dermasmooth': 180.00,
  'nasoclear': 520.00,
  'oculab': 210.00,
  'ocudrop': 275.00,
  'acneo': 195.00,
  'neurovit': 145.00,
  'calmrest': 225.00,
  'rheumaflex': 310.00,
  'thyronorm': 88.00,
};

function getPrice(name: string): number {
  const lower = name.toLowerCase();
  for (const key of Object.keys(PRICE_MAP)) {
    if (lower.includes(key)) return PRICE_MAP[key];
  }
  // Generate a deterministic price from name chars so every product gets a unique price
  const base = name.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  return parseFloat(((base % 800) + 80).toFixed(2));
}

const fmtPrice = (n: number) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const stockConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  high: { icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  low: { icon: AlertTriangle, color: 'text-amber-700', bg: 'bg-amber-50' },
  out: { icon: XCircle, color: 'text-rose-700', bg: 'bg-rose-50' },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStock, setActiveStock] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock body scroll when modal is open
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        const enriched = (data.data as Product[]).map(p => ({ ...p, price: p.price ?? getPrice(p.name) }));
        setProducts(enriched);
        setFiltered(enriched);
      } catch {
        const fallback: Product[] = [
          { id: 1, name: 'CardioVas Tablets', category: 'Tablet', description: 'High-efficacy statin formulation for lipid management and cardiovascular risk reduction. Clinically proven to reduce LDL cholesterol levels significantly when combined with dietary changes.', form: 'Tablets', packSize: '30s Blister', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800', tags: ['cardiovascular', 'tablet'], price: 320.00 },
          { id: 2, name: 'OncoCaps 50mg', category: 'Capsule', description: 'Targeted oral antineoplastic agent. Administered under strict medical supervision for specific oncological indications.', form: 'Capsule', packSize: '30 Capsules', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800', tags: ['oncology', 'capsule'], price: 4850.00 },
          { id: 3, name: 'DermaHeal Ointment', category: 'Ointment', description: 'Advanced topical formulation for severe dermatological conditions with rapid absorption. Provides sustained relief and promotes rapid epithelial regeneration.', form: 'Ointment Tube', packSize: '30g', stock: 'Low Stock', stockLevel: 'low', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800', tags: ['dermatology', 'ointment'], price: 195.00 },
          { id: 4, name: 'OticCare Ear Drops', category: 'Ear Drop', description: 'Formulated to treat otitis externa and outer ear infections. Features a precision dropper for easy and accurate administration.', form: 'Ear Drop', packSize: '15ml Bottle', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=800', tags: ['ear', 'drop'], price: 148.00 },
          { id: 5, name: 'TimoClear Eye Drops', category: 'Eye Drop', description: 'Effective solution for reducing elevated intraocular pressure in patients with open-angle glaucoma or ocular hypertension.', form: 'Eye Drop', packSize: '5ml Bottle', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800', tags: ['eye', 'drop'], price: 185.00 },
          { id: 6, name: 'OcuDrop Solution', category: 'Eye Drop', description: 'Preservative-free ophthalmic solution for glaucoma in single-dose vials. Designed for sensitive eyes, ensuring minimal irritation while maximizing intraocular pressure reduction.', form: 'Eye Drops', packSize: '0.5ml x 30', stock: 'Out of Stock', stockLevel: 'out', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800', tags: ['ophthalmology', 'eye'], price: 275.00 },
        ];
        setProducts(fallback);
        setFiltered(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (activeStock !== 'All') {
      result = result.filter(p => {
        if (activeStock === 'In Stock') return p.stockLevel === 'high';
        if (activeStock === 'Low Stock') return p.stockLevel === 'low';
        if (activeStock === 'Out of Stock') return p.stockLevel === 'out';
        return true;
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
  }, [activeCategory, activeStock, search, products]);

  return (
    <div className="pt-24 min-h-screen bg-[#f8fafc]">

      {/* Redesigned Premium Hero - Compact & Elegant */}
      <PageBanner
        icon={PackageCheck}
        badgeText="Premium Catalog"
        title="Pharmaceutical"
        highlightedTitle="Solutions"
        description="Discover our high-efficacy, regulatory-compliant therapeutics designed for global distribution."
        bottomColor="bg-[#f8fafc]"
      />

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 flex flex-col gap-6 max-h-[calc(100vh-7rem)] overflow-y-auto pb-4 scrollbar-hide">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              {/* Search */}
              <div className="mb-8">
                <div className="relative group">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search medicines..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Category filters */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Product Categories</h3>
                <LayoutGroup>
                  <div className="flex flex-col gap-1">
                    {categories.map(cat => (
                      <motion.button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`relative text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${activeCategory === cat ? 'text-white' : 'text-[#424751] hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {activeCategory === cat && (
                          <motion.div
                            layoutId="activeCategoryBg"
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#003e7a] rounded-2xl shadow-md"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{cat}</span>
                      </motion.button>
                    ))}
                  </div>
                </LayoutGroup>
              </div>
            </div>


          </aside>

          {/* Products Grid */}
          <section className="lg:col-span-9">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2">
              <p className="text-sm font-medium text-gray-500">
                Displaying <span className="font-bold text-[#121c2c] bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">{filtered.length}</span> therapeutic products
              </p>

              <div className="flex flex-wrap items-center bg-white rounded-2xl p-1.5 border border-gray-200 shadow-sm">
                {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map(status => (
                  <button
                    key={status}
                    onClick={() => setActiveStock(status)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeStock === status
                        ? 'bg-[#003e7a] text-white shadow-md'
                        : 'text-gray-500 hover:text-[#003e7a] hover:bg-gray-50'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-[2rem] p-6 animate-pulse border border-gray-100 shadow-sm">
                    <div className="h-64 bg-gray-100 rounded-2xl mb-6" />
                    <div className="h-5 bg-gray-100 rounded-md w-3/4 mb-3" />
                    <div className="h-4 bg-gray-100 rounded-md w-1/2 mb-6" />
                    <div className="h-10 bg-gray-100 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-10" layout>
                  {filtered.map((product, i) => {
                    const sc = stockConfig[product.stockLevel] || stockConfig.high;
                    const StockIcon = sc.icon;
                    return (
                      <motion.article
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: -10 }}
                        transition={{ duration: 0.4, delay: i * 0.05, type: 'spring', stiffness: 200 }}
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer group hover:shadow-[0_20px_50px_rgba(0,62,122,0.12)] transition-shadow duration-500 flex flex-col h-full"
                        whileHover={{ y: -8 }}
                      >
                        {/* Image */}
                        <div className="h-64 overflow-hidden bg-gray-50 relative">
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Hover Overlay Button */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                            <span className="bg-white/90 backdrop-blur-sm text-[#003e7a] font-bold px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-2">
                              View Details <ChevronRight size={16} />
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <div className="mb-3">
                            <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
                              {product.category}
                            </span>
                            <h3 className="text-xl font-bold text-[#121c2c] leading-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
                          </div>

                          <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2 flex-grow">{product.description}</p>

                          {/* Footer Info */}
                          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Format</span>
                              <span className="text-sm font-semibold text-[#121c2c] flex items-center gap-1.5"><Beaker size={12} className="text-blue-400" /> {product.form}</span>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Price / Pack</span>
                              <span className="text-lg font-extrabold text-[#003e7a]">{fmtPrice(product.price ?? getPrice(product.name))}</span>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}

            {filtered.length === 0 && !loading && (
              <motion.div
                className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#121c2c] mb-3">No therapeutics found</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find any products matching your current search criteria. Try adjusting your filters.</p>
              </motion.div>
            )}
          </section>
        </div>
      </div>

      {/* Product Details Modal (Popup) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-[#0a1118]/60"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20, rotateX: -5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_100px_rgba(0,30,80,0.4)] overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh] border border-white/20 ring-1 ring-black/5"
              style={{ perspective: "1000px" }}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-30 w-12 h-12 bg-white/80 hover:bg-black backdrop-blur-md text-[#121c2c] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:rotate-90"
              >
                <X size={24} />
              </motion.button>

              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 h-72 md:h-auto relative bg-gray-50 overflow-hidden">
                <motion.img
                  initial={{ scale: 1.2, filter: "blur(10px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001f42]/90 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#001f42]/40"></div>

                <div className="absolute bottom-6 left-6 md:hidden">
                  <span className="inline-block text-[10px] font-extrabold tracking-widest uppercase text-white bg-blue-600 px-4 py-2 rounded-xl shadow-lg border border-white/20">
                    {selectedProduct.category}
                  </span>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col relative bg-gradient-to-br from-white to-gray-50/50">
                
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="mb-6 hidden md:block">
                  <span className="inline-block text-[10px] font-extrabold tracking-widest uppercase text-blue-700 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/80 px-4 py-2 rounded-full shadow-sm">
                    {selectedProduct.category}
                  </span>
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#003e7a] to-[#121c2c]">
                  {selectedProduct.name}
                </motion.h2>

                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-gray-500 text-lg leading-relaxed mb-8 font-medium">
                  {selectedProduct.description}
                </motion.p>
                
                {/* Extra Details: Key Benefits */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-10">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Key Benefits</h4>
                  <ul className="space-y-3">
                    {['Clinically proven formulation', 'Manufactured under strict GMP guidelines', 'Fast-acting therapeutic effect'].map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-[#121c2c] font-semibold">
                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm border border-green-200">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Drug Details */}
                {selectedProduct.drug && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-8 p-4 bg-[#f8fafc] border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill size={14} className="text-purple-500" />
                      <h4 className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Active Composition</h4>
                    </div>
                    <p className="text-sm font-bold text-[#121c2c] leading-relaxed pl-5">
                      {selectedProduct.drug}
                    </p>
                  </motion.div>
                )}

                {/* Specs Grid */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-2 text-blue-500 mb-2">
                      <Beaker size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold uppercase tracking-wider">Format</span>
                    </div>
                    <div className="text-lg font-extrabold text-[#121c2c]">{selectedProduct.form}</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-2 text-indigo-500 mb-2">
                      <Package size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold uppercase tracking-wider">Pack Size</span>
                    </div>
                    <div className="text-lg font-extrabold text-[#121c2c]">{selectedProduct.packSize}</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#003e7a] to-[#0055a4] p-5 rounded-2xl shadow-lg group col-span-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200 block mb-1">Indicative Price / Pack</span>
                        <span className="text-3xl font-extrabold text-white">{fmtPrice(selectedProduct.price ?? getPrice(selectedProduct.name))}</span>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border ${stockConfig[selectedProduct.stockLevel].bg} ${stockConfig[selectedProduct.stockLevel].color} border-current/10`}>
                        {(() => { const Icon = stockConfig[selectedProduct.stockLevel].icon; return <><Icon size={16} /> {selectedProduct.stock}</>; })()}
                      </div>
                    </div>
                    <p className="text-[10px] text-blue-200/60 mt-2">*Prices are indicative. Contact us for exact pricing.</p>
                  </div>
                </motion.div>

                {/* Actions & Status */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                  <Link href="/contact" className="w-full sm:w-auto" onClick={() => setSelectedProduct(null)}>
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#003e7a] to-[#005bb5] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_10px_20px_rgba(0,62,122,0.3)] hover:shadow-[0_15px_30px_rgba(0,62,122,0.4)] hover:-translate-y-1">
                      <Phone size={18} />
                      Inquire Now
                    </button>
                  </Link>

                  <div className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold border flex-grow shadow-inner ${stockConfig[selectedProduct.stockLevel].bg} ${stockConfig[selectedProduct.stockLevel].color} border-current/10 w-full sm:w-auto`}>
                    {(() => {
                      const Icon = stockConfig[selectedProduct.stockLevel].icon;
                      return <><Icon size={20} /> {selectedProduct.stock}</>;
                    })()}
                  </div>
                </motion.div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
