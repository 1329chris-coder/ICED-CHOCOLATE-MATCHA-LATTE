'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { productData } from '@/data/product';
import Image from 'next/image';

export default function TravelingCup() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [15, -10, 12, -8, 5, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.8, 1.1, 0.9, 1.15, 1.0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['30vw', '-25vw', '20vw', '-15vw', '10vw', '0vw']
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['10vh', '50vh']
  );

  return (
    <div ref={containerRef} className="relative h-[400vh] pointer-events-none">
      <motion.div
        style={{ opacity, rotate, scale, x, y }}
        className="fixed left-1/2 top-0 -translate-x-1/2 z-40 w-64 md:w-96 pointer-events-none"
      >
        <Image
          src={productData.assets.staticCup}
          alt={productData.name}
          width={600}
          height={800}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </motion.div>
    </div>
  );
}
