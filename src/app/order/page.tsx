'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Plus, Minus, Search,
  CheckCircle, ArrowRight, ArrowLeft, Pill,
  Eye, Ear, Droplets, Package, ShieldCheck, X,
  AlertCircle, ClipboardList, Building2, Mail, Phone, MapPin,
  Sparkles, ChevronLeft, Star
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://neovision-backend-ngm8.onrender.com';

// ─── Price Lookup (matches product name, case-insensitive) ───────────────────
const PRICE_MAP: Record<string, number> = {
  'cardiovas': 320.00, 'oncocaps': 4850.00, 'dermaheal': 195.00,
  'oticcare': 148.00, 'timoclear': 185.00, 'oculube': 220.50,
  'cipro': 165.00, 'earwax': 95.00, 'glucoclear': 210.00,
  'painrelief': 85.00, 'amoxi': 175.00, 'omepraz': 290.00,
  'aquaglide': 135.00, 'dermasmooth': 180.00, 'nasoclear': 520.00,
  'oculab': 210.00, 'ocudrop': 275.00, 'acneo': 195.00,
  'neurovit': 145.00, 'calmrest': 225.00, 'rheumaflex': 310.00,
  'thyronorm': 88.00,
};
function getPrice(name: string): number {
  const lower = name.toLowerCase();
  for (const key of Object.keys(PRICE_MAP)) {
    if (lower.includes(key)) return PRICE_MAP[key];
  }
  const base = name.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  return parseFloat(((base % 800) + 80).toFixed(2));
}

// ─── Category Definitions ────────────────────────────────────────────────────
const CATEGORY_CONFIG = [
  {
    id: 'Tablet',
    label: 'Tablets',
    sub: 'Oral solid dosage forms',
    icon: Pill,
    gradient: 'from-[#003e7a] to-[#0055a4]',
    glow: 'rgba(0,62,122,0.35)',
    accent: '#003e7a',
    lightBg: 'from-blue-50 to-indigo-50',
    badge: 'bg-blue-100 text-blue-700',
    float: { y: [0, -10, 0], rotate: [0, 5, 0] },
  },
  {
    id: 'Capsule',
    label: 'Capsules',
    sub: 'Gelatin encapsulated drugs',
    icon: Pill,
    gradient: 'from-[#4f46e5] to-[#7c3aed]',
    glow: 'rgba(79,70,229,0.35)',
    accent: '#4f46e5',
    lightBg: 'from-indigo-50 to-violet-50',
    badge: 'bg-violet-100 text-violet-700',
    float: { y: [0, -8, 0], rotate: [0, -5, 0] },
  },
  {
    id: 'Eye Drop',
    label: 'Eye Drops',
    sub: 'Ophthalmic solutions & suspensions',
    icon: Eye,
    gradient: 'from-[#0891b2] to-[#0e7490]',
    glow: 'rgba(8,145,178,0.35)',
    accent: '#0891b2',
    lightBg: 'from-cyan-50 to-sky-50',
    badge: 'bg-cyan-100 text-cyan-700',
    float: { y: [0, -12, 0], rotate: [0, 3, 0] },
  },
  {
    id: 'Ear Drop',
    label: 'Ear Drops',
    sub: 'Otic preparations',
    icon: Ear,
    gradient: 'from-[#059669] to-[#047857]',
    glow: 'rgba(5,150,105,0.35)',
    accent: '#059669',
    lightBg: 'from-emerald-50 to-teal-50',
    badge: 'bg-emerald-100 text-emerald-700',
    float: { y: [0, -9, 0], rotate: [0, -4, 0] },
  },
  {
    id: 'Lubricant Gel',
    label: 'Lubricant Gels',
    sub: 'Topical lubricating formulations',
    icon: Droplets,
    gradient: 'from-[#d97706] to-[#b45309]',
    glow: 'rgba(217,119,6,0.35)',
    accent: '#d97706',
    lightBg: 'from-amber-50 to-yellow-50',
    badge: 'bg-amber-100 text-amber-700',
    float: { y: [0, -11, 0], rotate: [0, 6, 0] },
  },
  {
    id: 'Nasal Spray',
    label: 'Nasal Sprays',
    sub: 'Intranasal delivery systems',
    icon: Droplets,
    gradient: 'from-[#e11d48] to-[#be123c]',
    glow: 'rgba(225,29,72,0.35)',
    accent: '#e11d48',
    lightBg: 'from-rose-50 to-pink-50',
    badge: 'bg-rose-100 text-rose-700',
    float: { y: [0, -10, 0], rotate: [0, -3, 0] },
  },
];

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

type CartItem = {
  productId: number;
  name: string;
  category: string;
  form: string;
  packSize: string;
  quantity: number;
  price: number;
  accent: string;
  badge: string;
};

type CheckoutData = {
  company: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
};

// ─── ProductCard ─────────────────────────────────────────────────────────────
function ProductCard({
  product, catConfig, onAdd, isInCart, cartQty,
}: {
  product: Product;
  catConfig: typeof CATEGORY_CONFIG[0];
  onAdd: (item: Omit<CartItem, 'quantity'>) => void;
  isInCart: boolean;
  cartQty: number;
}) {
  const [hovered, setHovered] = useState(false);
  const safePrice = product.price ?? 0;
  const fmt = (n: number) => `₹${(n ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93, y: -12 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl bg-white border border-gray-100 overflow-hidden group flex flex-col"
      style={{
        boxShadow: hovered
          ? `0 20px 50px -10px ${catConfig.glow}`
          : '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-10" style={{ background: `linear-gradient(to right, ${catConfig.accent}, transparent)` }} />

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-50">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
            product.stockLevel === 'high' ? 'bg-emerald-500/90 text-white' :
            product.stockLevel === 'low' ? 'bg-amber-500/90 text-white' :
            'bg-red-500/90 text-white'
          }`}>
            {product.stock}
          </span>
        </div>
        {isInCart && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#003e7a]/90 text-white flex items-center gap-1">
              <CheckCircle size={10} /> In Order
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${catConfig.badge}`}>
            {product.form}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 group-hover:text-[#003e7a] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-grow leading-relaxed">
          {product.description}
        </p>

        {/* Pack size + Price */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1.5 font-medium">
            <Package size={11} />
            {product.packSize}
          </span>
          {product.drug && (
            <span className="flex items-center gap-1 text-purple-500 font-semibold truncate max-w-[100px]" title={product.drug}>
              <Star size={9} />
              {product.drug.length > 18 ? product.drug.slice(0, 18) + '…' : product.drug}
            </span>
          )}
        </div>
        {/* Price per pack */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-400 font-medium">Price / pack</span>
          {safePrice > 0 ? (
            <span className="text-base font-extrabold" style={{ color: catConfig.accent }}>{fmt(safePrice)}</span>
          ) : (
            <span className="text-xs text-gray-400 italic">Price on request</span>
          )}
        </div>
        {/* Cart qty preview */}
        {cartQty > 0 && safePrice > 0 && (
          <div className="text-xs text-center text-gray-500 mb-2 font-medium">
            Subtotal: <span className="font-bold text-gray-800">{fmt(safePrice * cartQty)}</span> ({cartQty} packs)
          </div>
        )}

        {/* Add button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onAdd({
            productId: product.id,
            name: product.name,
            category: product.category,
            form: product.form,
            packSize: product.packSize,
            price: product.price ?? 0,
            accent: catConfig.accent,
            badge: catConfig.badge,
          })}
          disabled={product.stockLevel === 'out'}
          className="w-full py-2.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: product.stockLevel === 'out'
              ? '#9ca3af'
              : `linear-gradient(135deg, ${catConfig.accent}, ${catConfig.accent}cc)`,
            boxShadow: product.stockLevel !== 'out' ? `0 6px 18px ${catConfig.glow}` : 'none',
          }}
        >
          <Plus size={14} />
          {product.stockLevel === 'out' ? 'Out of Stock' : isInCart ? 'Add More' : 'Add to Order'}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OrderPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCat, setSelectedCat] = useState<typeof CATEGORY_CONFIG[0] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState<CheckoutData>({ company: '', contact: '', email: '', phone: '', address: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.drug || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch products when category selected
  const handleCategorySelect = async (cat: typeof CATEGORY_CONFIG[0]) => {
    setSelectedCat(cat);
    setLoadingProducts(true);
    setSearchQuery('');
    try {
      const res = await fetch(`/api/products`);
      const data = await res.json();
      const allProducts: Product[] = (data.data || []).map((p: Product) => ({ ...p, price: p.price ?? getPrice(p.name) }));
      // Filter by category (Tablet & Capsule share similar DB category names)
      setProducts(allProducts.filter((p: Product) => p.category === cat.id));
    } catch {
      // Fallback dummy products per category
      const fallbackMap: Record<string, Product[]> = {
        'Eye Drop': [
          { id: 1, name: 'TimoClear 0.5%', category: 'Eye Drop', description: 'Effective solution for reducing elevated intraocular pressure in open-angle glaucoma.', drug: 'Timolol Maleate 0.5%', form: 'Eye Drops', packSize: '5ml Bottle', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800', tags: ['eye', 'glaucoma'], price: 185.00 },
          { id: 2, name: 'OcuLube Tears', category: 'Eye Drop', description: 'Preservative-free lubricating eye drops for dry eye syndrome providing long-lasting relief.', drug: 'Carboxymethylcellulose 0.5%', form: 'Eye Drops', packSize: '10ml Bottle', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800', tags: ['eye', 'lubricant'], price: 220.50 },
          { id: 3, name: 'CiproEye 0.3%', category: 'Eye Drop', description: 'Broad-spectrum antibiotic eye drops for bacterial conjunctivitis and corneal ulcers.', drug: 'Ciprofloxacin HCl 0.3%', form: 'Eye Drops', packSize: '5ml Bottle', stock: 'Low Stock', stockLevel: 'low', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=800', tags: ['eye', 'antibiotic'], price: 165.00 },
        ],
        'Ear Drop': [
          { id: 4, name: 'OticCare Plus', category: 'Ear Drop', description: 'Formulated to treat otitis externa and outer ear infections with precision dropper.', drug: 'Ofloxacin 0.3%', form: 'Ear Drops', packSize: '10ml Bottle', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=800', tags: ['ear', 'antibiotic'], price: 148.00 },
          { id: 5, name: 'EarWax Softener', category: 'Ear Drop', description: 'Carbamide peroxide ear drops to safely soften and remove cerumen buildup.', drug: 'Carbamide Peroxide 6.5%', form: 'Ear Drops', packSize: '15ml Bottle', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800', tags: ['ear', 'cerumen'], price: 95.00 },
        ],
        'Tablet': [
          { id: 6, name: 'CardioVas 20mg', category: 'Tablet', description: 'High-efficacy statin formulation for lipid management and cardiovascular risk reduction.', drug: 'Atorvastatin 20mg', form: 'Tablets', packSize: '30s Blister', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800', tags: ['cardiology', 'statin'], price: 320.00 },
          { id: 7, name: 'GlucoClear 500', category: 'Tablet', description: 'Extended release metformin tablet for type 2 diabetes management with reduced GI side effects.', drug: 'Metformin HCl 500mg', form: 'Tablets', packSize: '60s Strip', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800', tags: ['diabetes', 'metformin'], price: 210.00 },
          { id: 8, name: 'PainRelief 500', category: 'Tablet', description: 'Fast-acting paracetamol tablet for fever and mild to moderate pain relief.', drug: 'Paracetamol 500mg', form: 'Tablets', packSize: '10×10 Strip', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800', tags: ['analgesic', 'fever'], price: 85.00 },
          { id: 9, name: 'AmoxiTab 500', category: 'Tablet', description: 'Broad-spectrum antibiotic for respiratory, urinary, and skin infections.', drug: 'Amoxicillin 500mg', form: 'Tablets', packSize: '10×10 Strip', stock: 'Low Stock', stockLevel: 'low', image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=800', tags: ['antibiotic', 'amoxicillin'], price: 175.00 },
        ],
        'Capsule': [
          { id: 10, name: 'OncoCaps 50mg', category: 'Capsule', description: 'Targeted oral antineoplastic agent for specific oncological indications under supervision.', drug: 'Capecitabine 50mg', form: 'Capsules', packSize: '30 Capsules', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800', tags: ['oncology', 'capsule'], price: 4850.00 },
          { id: 11, name: 'OmePraz 20mg', category: 'Capsule', description: 'Proton pump inhibitor for GERD, peptic ulcer, and Zollinger-Ellison syndrome.', drug: 'Omeprazole 20mg', form: 'Capsules', packSize: '10×10 Blister', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800', tags: ['gastro', 'PPI'], price: 290.00 },
        ],
        'Lubricant Gel': [
          { id: 12, name: 'AquaGlide Gel', category: 'Lubricant Gel', description: 'Water-based sterile lubricating gel for medical procedures and catheterization.', drug: 'Hydroxypropyl Methylcellulose', form: 'Gel Tube', packSize: '30g Tube', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800', tags: ['lubricant', 'sterile'], price: 135.00 },
          { id: 13, name: 'DermaSmooth Gel', category: 'Lubricant Gel', description: 'Topical gel with soothing properties for skin dryness and dermatological conditions.', drug: 'Carbomer 0.5% + Glycerin', form: 'Gel Tube', packSize: '50g Tube', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800', tags: ['derma', 'lubricant'], price: 180.00 },
        ],
        'Nasal Spray': [
          { id: 14, name: 'NasoClear 50mcg', category: 'Nasal Spray', description: 'Corticosteroid nasal spray for allergic rhinitis providing 24-hour relief.', drug: 'Fluticasone Propionate 50mcg', form: 'Nasal Spray', packSize: '120 doses', stock: 'In Stock', stockLevel: 'high', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800', tags: ['nasal', 'allergy'], price: 520.00 },
        ],
      };
      setProducts(fallbackMap[cat.id] || []);
    } finally {
      setLoadingProducts(false);
    }
    setStep(2);
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(c => c.productId === item.productId);
      if (existing) return prev.map(c => c.productId === item.productId ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const changeQty = (productId: number, qty: number) => setCart(prev => prev.map(c => c.productId === productId ? { ...c, quantity: qty } : c));
  const removeItem = (productId: number) => setCart(prev => prev.filter(c => c.productId !== productId));
  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 2000);
  };

  const resetAll = () => {
    setSubmitted(false); setCart([]); setStep(1); setSelectedCat(null);
    setCheckout({ company: '', contact: '', email: '', phone: '', address: '', notes: '' });
  };

  // ── Success ────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f7ff] via-[#f9f9ff] to-[#eefbf8] px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="max-w-xl w-full text-center"
        >
          <div className="relative mx-auto w-36 h-36 mb-8">
            {[1, 1.5, 2].map((scale, i) => (
              <motion.div key={i}
                className="absolute inset-0 rounded-full bg-emerald-400/20"
                animate={{ scale: [1, scale, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 280 }}
                className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]"
              >
                <CheckCircle size={44} className="text-white" />
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Order Confirmed! 🎉</h1>
            <p className="text-gray-500 text-lg mb-2">Thank you, <span className="font-bold text-gray-800">{checkout.contact}</span>.</p>
            <p className="text-gray-500 mb-8">Your order from <span className="font-bold text-[#003e7a]">{checkout.company}</span> has been received. Our team will contact you within <span className="font-semibold text-gray-800">24 hours</span>.</p>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8 text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Order Summary</p>
              <div className="space-y-2">
                {cart.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.accent }} />
                      <span className="font-semibold text-gray-800 truncate">{c.name}</span>
                      <span className="text-gray-400 hidden sm:inline flex-shrink-0">×{c.quantity}</span>
                    </div>
                    <span className="font-bold text-gray-700 flex-shrink-0 ml-3">
                      ₹{(c.price * c.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
              {/* Bill totals */}
              {(() => {
                const subtotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);
                const gst = subtotal * 0.18;
                const grand = subtotal + gst;
                const fmt = (n: number) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                return (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Subtotal</span><span className="font-medium">{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>GST (18%)</span><span className="font-medium">{fmt(gst)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold pt-1 border-t border-gray-100" style={{ color: '#003e7a' }}>
                      <span>Grand Total</span><span>{fmt(grand)}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
            <button onClick={resetAll} className="px-8 py-3.5 rounded-xl bg-[#003e7a] text-white font-bold hover:bg-[#0055a4] transition-all shadow-lg hover:shadow-xl">
              Place Another Order
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-[#f9f9ff] to-[#eefbf8] pt-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#020d1a] py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-blue-700/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[35vw] h-[35vw] bg-cyan-500/15 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>

        {/* Floating category icons background */}
        {CATEGORY_CONFIG.slice(0, 4).map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.id}
              className="absolute hidden md:block"
              style={{ top: `${10 + i * 20}%`, left: i % 2 === 0 ? `${3 + i * 5}%` : 'auto', right: i % 2 !== 0 ? `${3 + i * 4}%` : 'auto' }}
              animate={cat.float}
              transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center opacity-20" style={{ background: cat.accent }}>
                <Icon size={22} className="text-white" />
              </div>
            </motion.div>
          );
        })}

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <Sparkles size={14} /> Pharmaceutical B2B Ordering Portal
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
            Order{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Medicines
            </span>
            <br />
            <span className="text-3xl md:text-4xl font-semibold text-white/60">by Category</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-blue-200/60 text-lg max-w-2xl mx-auto">
            Select your product category below to browse specific medicines, choose dosages, and build your order.
          </motion.p>

          {/* Cart badge in hero */}
          {totalItems > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold backdrop-blur-sm">
              <ShoppingCart size={15} />
              {totalItems} item{totalItems !== 1 ? 's' : ''} in order
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-br from-[#f0f7ff] via-[#f9f9ff] to-[#eefbf8] -skew-y-2 origin-bottom-right translate-y-8 z-20" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 pb-24">

        {/* ── Step Indicator ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {[
            { n: 1, label: 'Choose Category', icon: Package },
            { n: 2, label: 'Select Products', icon: ClipboardList },
            { n: 3, label: 'Review & Order', icon: ShoppingCart },
            { n: 4, label: 'Checkout', icon: Building2 },
          ].map(({ n, label, icon: Icon }, i) => (
            <div key={n} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{ scale: step === n ? 1.15 : 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step >= n ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-400'
                  }`}
                  style={step >= n ? { background: '#003e7a', boxShadow: '0 0 20px rgba(0,62,122,0.35)' } : {}}
                >
                  {step > n ? <CheckCircle size={18} /> : <Icon size={15} />}
                </motion.div>
                <span className={`text-[11px] font-semibold hidden sm:block text-center max-w-[80px] leading-tight ${step >= n ? 'text-[#003e7a]' : 'text-gray-400'}`}>{label}</span>
              </div>
              {i < 3 && (
                <div className="w-12 sm:w-20 h-0.5 mx-2 mb-5 bg-gray-200 overflow-hidden">
                  <motion.div className="h-full bg-[#003e7a]" initial={{ width: '0%' }} animate={{ width: step > n ? '100%' : '0%' }} transition={{ duration: 0.5 }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── STEP 1: Category Selection ──────────────────────────────── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.45 }}>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">What would you like to order?</h2>
                <p className="text-gray-500">Select a product category to view available medicines.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORY_CONFIG.map((cat, i) => {
                  const Icon = cat.icon;
                  const catCartCount = cart.filter(c => c.category === cat.id).reduce((s, c) => s + c.quantity, 0);

                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategorySelect(cat)}
                      className={`relative text-left rounded-3xl overflow-hidden p-7 group cursor-pointer border border-white/30`}
                      style={{
                        background: `linear-gradient(145deg, #ffffff, #f8faff)`,
                        boxShadow: `0 8px 30px rgba(0,0,0,0.06)`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Gradient orb */}
                      <div
                        className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-150 scale-100"
                        style={{ background: `radial-gradient(circle, ${cat.accent}, transparent)`, transition: 'transform 0.6s ease, opacity 0.4s ease' }}
                      />

                      {/* Top stripe */}
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: `linear-gradient(to right, ${cat.accent}, transparent)` }} />

                      {/* Cart indicator */}
                      {catCartCount > 0 && (
                        <div className="absolute top-4 right-4">
                          <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: cat.accent }}>
                            <CheckCircle size={10} /> {catCartCount} added
                          </span>
                        </div>
                      )}

                      {/* Icon */}
                      <motion.div
                        animate={cat.float}
                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-5 shadow-xl"
                        style={{ background: `linear-gradient(135deg, ${cat.accent}, ${cat.accent}bb)`, boxShadow: `0 12px 28px ${cat.glow}` }}
                      >
                        <Icon size={30} />
                      </motion.div>

                      <h3 className="text-xl font-extrabold text-gray-900 mb-1.5 group-hover:text-[#003e7a] transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-sm text-gray-500 mb-5 leading-relaxed">{cat.sub}</p>

                      <div className="flex items-center gap-2 font-bold text-sm" style={{ color: cat.accent }}>
                        Browse Medicines <ArrowRight size={15} />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Cart summary if items already added */}
              {cart.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#003e7a] rounded-xl flex items-center justify-center">
                      <ShoppingCart size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{cart.length} product type{cart.length !== 1 ? 's' : ''} in order</p>
                      <p className="text-sm text-gray-500">{totalItems} total units</p>
                    </div>
                  </div>
                  <button onClick={() => setStep(3)} className="px-6 py-3 rounded-xl bg-[#003e7a] text-white font-bold flex items-center gap-2 hover:bg-[#0055a4] transition-all shadow-md hover:shadow-lg">
                    Review Order <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── STEP 2: Products by Category ───────────────────────────── */}
          {step === 2 && selectedCat && (
            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.45 }}>
              <div className="flex flex-col lg:flex-row gap-7">

                {/* Main: Products */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => { setStep(1); setSelectedCat(null); }}
                      className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all flex-shrink-0">
                      <ChevronLeft size={18} />
                    </button>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                      style={{ background: selectedCat.accent }}>
                      <selectedCat.icon size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-gray-900">{selectedCat.label}</h2>
                      <p className="text-sm text-gray-500">{selectedCat.sub}</p>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative mb-6">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder={`Search in ${selectedCat.label}...`}
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white shadow-sm focus:border-[#003e7a] focus:ring-4 focus:ring-[#003e7a]/10 outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  {/* Products Grid */}
                  {loadingProducts ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 animate-pulse border border-gray-100 shadow-sm">
                          <div className="h-44 bg-gray-100 rounded-xl mb-4" />
                          <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                          <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
                          <div className="h-10 bg-gray-100 rounded-xl" />
                        </div>
                      ))}
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      <AnimatePresence>
                        {filteredProducts.map(product => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            catConfig={selectedCat}
                            onAdd={addToCart}
                            isInCart={cart.some(c => c.productId === product.id)}
                            cartQty={cart.find(c => c.productId === product.id)?.quantity ?? 0}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-400">
                      <Search size={40} className="mx-auto mb-3 opacity-40" />
                      <p className="font-medium">No medicines found for &quot;{searchQuery}&quot;</p>
                    </motion.div>
                  )}
                </div>

                {/* Sidebar: Cart */}
                <div className="lg:w-80 xl:w-96 flex-shrink-0">
                  <div className="sticky top-24">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_40px_rgba(0,62,122,0.07)] overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between"
                        style={{ background: `linear-gradient(135deg, #003e7a, #0055a4)` }}>
                        <div className="flex items-center gap-2 text-white font-bold">
                          <ShoppingCart size={18} /> Order List
                        </div>
                        {totalItems > 0 && (
                          <span className="bg-white text-[#003e7a] text-xs font-bold px-2.5 py-1 rounded-full">{totalItems}</span>
                        )}
                      </div>

                      <div className="p-3 max-h-[420px] overflow-y-auto space-y-2 no-scrollbar">
                        <AnimatePresence>
                          {cart.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-gray-400">
                              <Package size={34} className="mx-auto mb-2 opacity-30" />
                              <p className="text-sm font-medium">Add medicines to start ordering</p>
                            </motion.div>
                          ) : cart.map((item, i) => (
                            <motion.div
                              key={`${item.productId}-${i}`}
                              initial={{ opacity: 0, x: 20, height: 0 }}
                              animate={{ opacity: 1, x: 0, height: 'auto' }}
                              exit={{ opacity: 0, x: 20, height: 0 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                              className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: item.accent }}>
                                <Pill size={13} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                                <p className="text-[10px] text-gray-400 truncate">{item.form} · {item.packSize}</p>
                                <p className="text-[10px] font-semibold mt-0.5" style={{ color: item.accent }}>
                                  ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} × {item.quantity} = <span className="text-gray-700">₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button onClick={() => item.quantity > 1 ? changeQty(item.productId, item.quantity - 1) : removeItem(item.productId)}
                                  className="w-5 h-5 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                                  <Minus size={9} />
                                </button>
                                <input
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 1) changeQty(item.productId, v); }}
                                  onBlur={e => { if (!e.target.value || parseInt(e.target.value) < 1) changeQty(item.productId, 1); }}
                                  className="w-10 text-center text-xs font-bold text-gray-800 border border-gray-200 rounded-md py-0.5 bg-white focus:border-[#003e7a] focus:ring-2 focus:ring-[#003e7a]/20 outline-none"
                                />
                                <button onClick={() => changeQty(item.productId, item.quantity + 1)}
                                  className="w-5 h-5 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                                  <Plus size={9} />
                                </button>
                              </div>
                              <button onClick={() => removeItem(item.productId)}
                                className="w-6 h-6 rounded hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100">
                                <X size={12} />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {cart.length > 0 && (
                        <div className="px-4 py-4 border-t border-gray-100 bg-gray-50/50 space-y-2">
                          {/* Bill Summary */}
                          {(() => {
                            const subtotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);
                            const gst = subtotal * 0.18;
                            const grand = subtotal + gst;
                            const fmt = (n: number) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                            return (
                              <div className="bg-white rounded-xl border border-gray-200 p-3 mb-2 space-y-1.5">
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Subtotal</span><span className="font-semibold text-gray-800">{fmt(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>GST (18%)</span><span className="font-semibold text-gray-800">{fmt(gst)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-extrabold border-t border-gray-100 pt-1.5" style={{ color: '#003e7a' }}>
                                  <span>Total</span><span>{fmt(grand)}</span>
                                </div>
                              </div>
                            );
                          })()}
                          <button onClick={() => setStep(1)}
                            className="w-full py-2.5 rounded-xl border-2 border-gray-200 font-semibold text-gray-500 hover:bg-gray-100 transition-all text-sm flex items-center justify-center gap-2">
                            <Plus size={13} /> Add More Categories
                          </button>
                          <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(3)}
                            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all"
                            style={{ background: 'linear-gradient(135deg, #003e7a, #0055a4)', boxShadow: '0 8px 20px rgba(0,62,122,0.25)' }}>
                            Review Order <ArrowRight size={16} />
                          </motion.button>
                        </div>
                      )}
                    </div>

                    {/* Tips */}
                    <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-4">
                      <div className="flex gap-2">
                        <AlertCircle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-amber-800 mb-1">Order Tips</p>
                          <ul className="text-xs text-amber-700 space-y-0.5 list-disc list-inside">
                            <li>Qty = number of packs/boxes</li>
                            <li>Min order: 5 units per item</li>
                            <li>Go back to add from other categories</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Review ──────────────────────────────────────────── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.45 }}>
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Review Your Order</h2>
                  <p className="text-gray-500">Confirm all items before proceeding to checkout.</p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,62,122,0.07)] overflow-hidden mb-6">
                  <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3"
                    style={{ background: 'linear-gradient(135deg, #003e7a, #0055a4)' }}>
                    <ClipboardList size={20} className="text-white" />
                    <h3 className="text-white font-bold text-lg">Order Summary</h3>
                    <span className="ml-auto bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {cart.length} product type{cart.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-4">Product</div>
                    <div className="col-span-2">Pack Size</div>
                    <div className="col-span-2 text-right">Rate</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-1 text-right">Amount</div>
                    <div className="col-span-1" />
                  </div>

                  <div className="divide-y divide-gray-50">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div key={item.productId}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 20 }}
                          className="grid grid-cols-12 px-6 py-3.5 items-center hover:bg-gray-50/50 transition-colors"
                        >
                          <div className="col-span-4 flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: item.accent }}>
                              <Pill size={12} />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm leading-tight">{item.name}</p>
                              <p className="text-xs text-gray-400">{item.form}</p>
                            </div>
                          </div>
                          <div className="col-span-2 text-xs text-gray-500 font-medium">{item.packSize}</div>
                          <div className="col-span-2 text-right text-xs font-semibold text-gray-700">
                            ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </div>
                          <div className="col-span-2 flex items-center justify-center gap-1">
                            <button onClick={() => item.quantity > 1 ? changeQty(item.productId, item.quantity - 1) : removeItem(item.productId)}
                              className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center"><Minus size={9} /></button>
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 1) changeQty(item.productId, v); }}
                              onBlur={e => { if (!e.target.value || parseInt(e.target.value) < 1) changeQty(item.productId, 1); }}
                              className="w-10 text-center text-xs font-bold text-gray-900 border border-gray-200 rounded py-0.5 bg-white focus:border-[#003e7a] outline-none"
                            />
                            <button onClick={() => changeQty(item.productId, item.quantity + 1)}
                              className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center"><Plus size={9} /></button>
                          </div>
                          <div className="col-span-1 text-right text-xs font-bold text-gray-800">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <button onClick={() => removeItem(item.productId)}
                              className="w-6 h-6 rounded hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-all">
                              <X size={13} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Bill breakdown */}
                  {(() => {
                    const subtotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);
                    const gst = subtotal * 0.18;
                    const grand = subtotal + gst;
                    const fmt = (n: number) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    return (
                      <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30 space-y-2">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{totalItems} unit{totalItems !== 1 ? 's' : ''} across {cart.length} product{cart.length !== 1 ? 's' : ''}</span>
                          <span className="font-semibold text-gray-700">Subtotal: {fmt(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-emerald-500" /> Quality Certified</span>
                          <span className="font-semibold text-gray-700">GST (18%): {fmt(gst)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-blue-100">
                          <span className="text-sm font-bold text-gray-800">Estimated Total</span>
                          <span className="text-xl font-extrabold" style={{ color: '#003e7a' }}>{fmt(grand)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 text-right">*Prices are indicative. Final invoice may vary.</p>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)}
                    className="px-6 py-4 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                    <ArrowLeft size={16} /> Add More
                  </button>
                  <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(4)}
                    className="flex-1 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all"
                    style={{ background: 'linear-gradient(135deg, #003e7a, #0055a4)', boxShadow: '0 10px 24px rgba(0,62,122,0.2)' }}>
                    Proceed to Checkout <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Checkout ────────────────────────────────────────── */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.45 }}>
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,62,122,0.07)] p-8 md:p-10 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="relative z-10">
                    <h2 className="text-2xl font-extrabold text-[#003e7a] mb-1">Shipping & Contact Details</h2>
                    <p className="text-gray-500 text-sm mb-8">Fill in delivery details to complete your order.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700"><Building2 size={14} /> Hospital / Company Name <span className="text-red-400">*</span></label>
                        <input value={checkout.company} onChange={e => setCheckout(p => ({ ...p, company: e.target.value }))}
                          placeholder="e.g. City General Hospital"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#003e7a] focus:ring-4 focus:ring-[#003e7a]/10 outline-none text-gray-800 transition-all text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700"><ShoppingCart size={14} /> Contact Person <span className="text-red-400">*</span></label>
                        <input value={checkout.contact} onChange={e => setCheckout(p => ({ ...p, contact: e.target.value }))}
                          placeholder="Full name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#003e7a] focus:ring-4 focus:ring-[#003e7a]/10 outline-none text-gray-800 transition-all text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700"><Phone size={14} /> Phone Number <span className="text-red-400">*</span></label>
                        <input value={checkout.phone} onChange={e => setCheckout(p => ({ ...p, phone: e.target.value }))}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#003e7a] focus:ring-4 focus:ring-[#003e7a]/10 outline-none text-gray-800 transition-all text-sm" />
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700"><Mail size={14} /> Email Address <span className="text-red-400">*</span></label>
                        <input type="email" value={checkout.email} onChange={e => setCheckout(p => ({ ...p, email: e.target.value }))}
                          placeholder="procurement@hospital.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#003e7a] focus:ring-4 focus:ring-[#003e7a]/10 outline-none text-gray-800 transition-all text-sm" />
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700"><MapPin size={14} /> Delivery Address <span className="text-red-400">*</span></label>
                        <textarea value={checkout.address} onChange={e => setCheckout(p => ({ ...p, address: e.target.value }))}
                          placeholder="Full delivery address with city, state, pincode..."
                          rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#003e7a] focus:ring-4 focus:ring-[#003e7a]/10 outline-none text-gray-800 transition-all text-sm resize-none" />
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700"><AlertCircle size={14} /> Special Instructions <span className="text-gray-400 font-normal">(optional)</span></label>
                        <textarea value={checkout.notes} onChange={e => setCheckout(p => ({ ...p, notes: e.target.value }))}
                          placeholder="Any delivery instructions..." rows={2}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#003e7a] focus:ring-4 focus:ring-[#003e7a]/10 outline-none text-gray-800 transition-all text-sm resize-none" />
                      </div>
                    </div>

                    {/* Mini order chips */}
                    <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                      <p className="text-xs font-bold text-[#003e7a] mb-2 uppercase tracking-wider">Order Contains</p>
                      <div className="flex flex-wrap gap-2">
                        {cart.map((c, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-blue-100 text-gray-700 shadow-sm">
                            <div className="w-2 h-2 rounded-full" style={{ background: c.accent }} />
                            {c.name} ×{c.quantity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(3)} className="px-6 py-4 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={!checkout.company || !checkout.contact || !checkout.email || !checkout.phone || !checkout.address || submitting}
                    className="flex-1 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 10px 24px rgba(16,185,129,0.25)' }}>
                    {submitting ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                        Processing...
                      </>
                    ) : (
                      <><ShieldCheck size={18} /> Confirm &amp; Submit Order</>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
