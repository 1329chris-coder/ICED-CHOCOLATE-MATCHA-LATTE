'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxLeaf() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      <motion.div
        style={{ y, rotate }}
        className="absolute right-10 top-1/4 w-32 md:w-48 opacity-60 filter blur-sm hover:blur-none transition-all duration-500"
      >
        <Image
          src="/matcha-leaves.png"
          alt="Floating matcha leaves"
          width={400}
          height={400}
          className="w-full h-auto drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -400]), rotate: -15 }}
        className="absolute left-[-5%] top-1/2 w-40 md:w-56 opacity-40 filter blur-md"
      >
        <Image
          src="/matcha-leaves.png"
          alt="Floating matcha leaves"
          width={400}
          height={400}
          className="w-full h-auto drop-shadow-2xl scale-x-[-1]"
        />
      </motion.div>
    </div>
  );
}
