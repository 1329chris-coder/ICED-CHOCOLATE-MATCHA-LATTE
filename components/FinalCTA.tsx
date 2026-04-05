'use client';

import { motion } from 'framer-motion';
import { productData } from '@/data/product';
import Image from 'next/image';

export default function FinalCTA() {
  const handlePurchase = () => {
    alert(`Adding ${productData.name} to cart - $${productData.price.toFixed(2)}`);
  };

  return (
    <section
      id="purchase-section"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-cream via-matchaGreen/20 to-chocolateBrown/20 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#6A994E_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-display-md md:text-display-lg text-chocolateBrown mb-8 leading-tight text-balance">
            {productData.assets.finalTagline}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Image
            src={productData.assets.staticCup}
            alt={productData.name}
            width={400}
            height={600}
            className="mx-auto w-64 md:w-96 drop-shadow-2xl animate-float"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="font-display text-6xl md:text-7xl font-bold text-matchaGreen mb-4">
            ${productData.price.toFixed(2)}
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            {productData.keyBenefits.slice(0, 3).map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
                className="font-body text-sm md:text-base text-gray-700"
              >
                ✓ {benefit}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={handlePurchase}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-12 md:px-16 py-6 rounded-full font-accent font-bold text-xl md:text-2xl text-white overflow-hidden group shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-matchaGreen via-matchaLight to-chocolateBrown" />
          <div className="absolute inset-0 bg-gradient-to-r from-matchaLight to-matchaGreen opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          <span className="relative z-10 flex items-center gap-3 justify-center">
            <span>ORDER NOW</span>
            <span className="text-2xl">→</span>
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 font-body text-sm text-gray-600 space-y-2"
        >
          <p>🚚 Free Shipping on Orders Over $25</p>
          <p>💯 100% Satisfaction Guaranteed</p>
          <p>🌱 Made with Premium Organic Ingredients</p>
        </motion.div>
      </div>
    </section>
  );
}
