'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxText() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Different parallax speeds for depth
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);

  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.05, 0.15, 0.15, 0.05]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.03, 0.1, 0.1, 0.03]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.04, 0.12, 0.12, 0.04]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Layer 1 - MATCHA */}
      <motion.div
        style={{ y: y1, opacity: opacity1 }}
        className="absolute left-0 top-1/4 w-full text-center"
      >
        <h2 className="font-display text-[12rem] md:text-[18rem] font-bold text-matchaGreen/20 tracking-tighter whitespace-nowrap">
          MATCHA
        </h2>
      </motion.div>

      {/* Layer 2 - CHOCOLATE */}
      <motion.div
        style={{ y: y2, opacity: opacity2 }}
        className="absolute right-0 top-1/2 w-full text-center"
      >
        <h2 className="font-display text-[10rem] md:text-[16rem] font-bold text-chocolateBrown/20 tracking-tighter whitespace-nowrap">
          CHOCOLATE
        </h2>
      </motion.div>

      {/* Layer 3 - ENERGY */}
      <motion.div
        style={{ y: y3, opacity: opacity3 }}
        className="absolute left-0 bottom-1/4 w-full text-center"
      >
        <h2 className="font-accent text-[8rem] md:text-[14rem] font-black text-matchaLight/20 tracking-wider whitespace-nowrap">
          ENERGY
        </h2>
      </motion.div>
    </div>
  );
}
