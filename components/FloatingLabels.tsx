'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingLabels() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const features = [
    {
      id: 1,
      title: 'Ceremonial Grade',
      subtitle: 'Japanese Matcha',
      icon: '🍵',
      scrollRange: [0, 0.25],
      position: { x: '-40%', y: '-20%' }
    },
    {
      id: 2,
      title: 'Velvety Smooth',
      subtitle: 'Organic Oat Milk',
      icon: '🥛',
      scrollRange: [0.25, 0.5],
      position: { x: '45%', y: '10%' }
    },
    {
      id: 3,
      title: 'Rich Chocolate',
      subtitle: 'Belgian Cacao',
      icon: '🍫',
      scrollRange: [0.5, 0.75],
      position: { x: '-35%', y: '25%' }
    },
    {
      id: 4,
      title: 'Ice Cold',
      subtitle: 'Perfectly Chilled',
      icon: '🧊',
      scrollRange: [0.75, 1],
      position: { x: '40%', y: '-15%' }
    }
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-20">
      {features.map((feature) => {
        const opacity = useTransform(
          scrollYProgress,
          [
            feature.scrollRange[0] - 0.1,
            feature.scrollRange[0],
            feature.scrollRange[1],
            feature.scrollRange[1] + 0.1
          ],
          [0, 1, 1, 0]
        );

        const scale = useTransform(
          scrollYProgress,
          [
            feature.scrollRange[0] - 0.1,
            feature.scrollRange[0],
            feature.scrollRange[1],
            feature.scrollRange[1] + 0.1
          ],
          [0.8, 1, 1, 0.8]
        );

        return (
          <motion.div
            key={feature.id}
            style={{
              opacity,
              scale,
              left: `calc(50% + ${feature.position.x})`,
              top: `calc(50% + ${feature.position.y})`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-2xl border border-matchaGreen/20">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{feature.icon}</span>
                <div>
                  <h3 className="font-accent text-lg font-bold text-chocolateBrown">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-gray-600">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
