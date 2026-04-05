'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { productData } from '@/data/product';

export default function Navbar() {
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.8)']
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );

  const handlePurchase = () => {
    const footer = document.getElementById('purchase-section');
    footer?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-xl md:text-2xl tracking-tight"
        >
          <span className="text-matchaGreen font-bold">ICED</span>{' '}
          <span className="text-chocolateBrown font-bold">CHOCOLATE</span>{' '}
          <span className="text-matchaGreen font-bold">MATCHA</span>
        </motion.div>

        <motion.button
          onClick={handlePurchase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 md:px-8 py-3 rounded-full font-accent font-bold text-sm md:text-base text-white overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-matchaGreen via-matchaLight to-chocolateBrown" />
          <div className="absolute inset-0 bg-gradient-to-r from-matchaLight to-matchaGreen opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">
            ${productData.price.toFixed(2)} BUY NOW
          </span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
