'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // 0-100%
      y: Math.random() * 100,
      size: Math.random() * 20 + 10, // 10-30px
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2, // 2-5s
      type: ['matcha', 'chocolate', 'ice'][Math.floor(Math.random() * 3)]
    }));
  }, []);

  const getParticleColor = (type: string) => {
    switch (type) {
      case 'matcha': return 'bg-matchaGreen/30';
      case 'chocolate': return 'bg-chocolateBrown/30';
      case 'ice': return 'bg-blue-200/40';
      default: return 'bg-gray-300/30';
    }
  };

  const getParticleShape = (type: string) => {
    switch (type) {
      case 'matcha': return 'rounded-full'; // Powder grain
      case 'chocolate': return 'rounded-sm rotate-45'; // Chocolate chip
      case 'ice': return 'rounded-md'; // Ice cube
      default: return 'rounded-full';
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {particles.map((particle) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [particle.y, particle.y + 30]
        );

        const opacity = useTransform(
          scrollYProgress,
          [0, 0.3, 0.7, 1],
          [0, 0.6, 0.6, 0]
        );

        return (
          <motion.div
            key={particle.id}
            style={{
              left: `${particle.x}%`,
              y,
              opacity,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
            className={`absolute ${getParticleColor(particle.type)} ${getParticleShape(particle.type)} backdrop-blur-sm`}
          />
        );
      })}
    </div>
  );
}
