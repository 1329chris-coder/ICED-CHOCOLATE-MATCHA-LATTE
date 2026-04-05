'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { productData } from '@/data/product';

export default function TextOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-30">
      {productData.storyBeats.map((beat) => {
        const start = beat.scrollProgress - 0.1;
        const end = beat.scrollProgress + 0.1;
        
        const opacity = useTransform(
          scrollYProgress,
          [start, beat.scrollProgress, end],
          [0, 1, 0]
        );
        
        const y = useTransform(
          scrollYProgress,
          [start, beat.scrollProgress, end],
          [20, 0, -20]
        );

        return (
          <motion.div
            key={beat.id}
            style={{ opacity, y }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center px-6 max-w-4xl">
              <motion.h2 className="font-display text-display-md md:text-display-lg text-cream mb-4 tracking-tight drop-shadow-lg">
                {beat.title}
              </motion.h2>
              
              <motion.h3 className="font-accent text-2xl md:text-3xl text-matchaLight mb-6 uppercase tracking-wider drop-shadow-md">
                {beat.subtitle}
              </motion.h3>
              
              <motion.p className="font-body text-lg md:text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                {beat.description}
              </motion.p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
