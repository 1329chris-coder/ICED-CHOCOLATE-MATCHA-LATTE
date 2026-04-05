'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function ChocolateSplash() {
  const triggerRef = useRef(null);
  const isInView = useInView(triggerRef, { once: true, margin: '-20%' });
  const [hasTriggered, setHasTriggered] = useState(false);

  // Trigger splash when in view
  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
    }
  }, [isInView, hasTriggered]);

  return (
    <div ref={triggerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      
      {/* MASSIVE Center Explosion Blob */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={hasTriggered ? { 
          scale: [0, 3, 2.5],
          opacity: [0, 1, 0.8, 0],
          rotate: [0, 180, 360]
        } : {}}
        transition={{ 
          duration: 3,
          times: [0, 0.4, 0.7, 1],
          ease: [0.34, 1.56, 0.64, 1]
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]"
      >
        <div className="relative w-full h-full">
          {/* Main massive chocolate blob */}
          <motion.div
            animate={hasTriggered ? {
              scale: [1, 1.3, 1.1],
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 bg-gradient-radial from-chocolateDark via-chocolateBrown to-transparent opacity-90"
            style={{
              filter: 'blur(60px) contrast(2)',
              borderRadius: '40% 60% 70% 30% / 60% 30% 70% 40%',
            }}
          />
          
          {/* Secondary chocolate layer */}
          <motion.div
            animate={hasTriggered ? {
              scale: [1, 1.4, 1.2],
              rotate: [0, -180, -360],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 bg-gradient-radial from-[#2A1810] via-chocolateBrown/70 to-transparent opacity-80"
            style={{
              filter: 'blur(40px) contrast(1.8)',
              borderRadius: '60% 40% 30% 70% / 40% 70% 30% 60%',
            }}
          />

          {/* Inner intense chocolate core */}
          <motion.div
            animate={hasTriggered ? {
              scale: [1, 1.5, 1.3],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 bg-gradient-radial from-[#1a0f08] via-chocolateDark/90 to-transparent"
            style={{
              filter: 'blur(80px) contrast(2.5)',
              borderRadius: '50% 50% 50% 50%',
            }}
          />
        </div>
      </motion.div>

      {/* HUGE Viscous Drips */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={`drip-${i}`}
          initial={{ y: 0, opacity: 0, scaleY: 0, scaleX: 1 }}
          animate={hasTriggered ? {
            y: [0, 250 + i * 50, 400 + i * 60],
            opacity: [0, 0.9, 0],
            scaleY: [0, 2, 1],
            scaleX: [1, 0.8, 0.5],
          } : {}}
          transition={{
            duration: 2.5 + i * 0.15,
            delay: 0.4 + i * 0.08,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="absolute top-1/2 bg-gradient-to-b from-chocolateBrown via-chocolateDark to-chocolateDark/50 rounded-full"
          style={{
            left: `${20 + i * 5}%`,
            width: `${40 + Math.random() * 60}px`,
            height: '200px',
            transformOrigin: 'top',
            filter: 'blur(8px)',
          }}
        />
      ))}

      {/* MASSIVE Splatter Particles */}
      {[...Array(50)].map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const distance = 400 + Math.random() * 400;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const size = 30 + Math.random() * 80;

        return (
          <motion.div
            key={`splatter-${i}`}
            initial={{ 
              x: '50%', 
              y: '50%', 
              scale: 0, 
              opacity: 0 
            }}
            animate={hasTriggered ? {
              x: `calc(50% + ${x}px)`,
              y: `calc(50% + ${y}px)`,
              scale: [0, 2, 1],
              opacity: [0, 1, 0],
              rotate: [0, Math.random() * 720],
            } : {}}
            transition={{
              duration: 2.5,
              delay: 0.3 + Math.random() * 0.5,
              ease: 'easeOut',
            }}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? '#3D2817' : '#2A1810'
              } 0%, ${i % 2 === 0 ? '#2A1810' : '#1a0f08'} 100%)`,
              filter: 'blur(4px)',
            }}
          />
        );
      })}

      {/* Fine Chocolate Mist (HUGE cloud) */}
      {[...Array(100)].map((_, i) => {
        const angle = (i / 100) * Math.PI * 2;
        const distance = 500 + Math.random() * 500;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.div
            key={`mist-${i}`}
            initial={{ 
              x: '50%', 
              y: '50%', 
              scale: 0, 
              opacity: 0 
            }}
            animate={hasTriggered ? {
              x: `calc(50% + ${x}px)`,
              y: `calc(50% + ${y}px)`,
              scale: [0, 1.5, 0],
              opacity: [0, 0.7, 0],
            } : {}}
            transition={{
              duration: 3,
              delay: 0.2 + Math.random() * 0.6,
              ease: 'easeOut',
            }}
            className="absolute w-2 h-2 bg-chocolateBrown/50 rounded-full blur-sm"
          />
        );
      })}

      {/* MASSIVE Viscous Chocolate Streams (Thick syrup flows) */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x2 = Math.cos(angle) * 600;
        const y2 = Math.sin(angle) * 600;

        return (
          <motion.div
            key={`stream-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={hasTriggered ? {
              scaleY: [0, 1],
              opacity: [0, 0.9, 0],
            } : {}}
            transition={{
              duration: 2.5,
              delay: 0.4 + i * 0.1,
              ease: 'easeInOut',
            }}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${15 + Math.random() * 15}px`,
              height: '700px',
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                #3D2817 20%, 
                #2A1810 50%, 
                #1a0f08 80%, 
                transparent 100%)`,
              transform: `rotate(${i * 30}deg) translateY(-350px)`,
              transformOrigin: 'center',
              filter: 'blur(6px)',
              borderRadius: '50%',
            }}
          />
        );
      })}

      {/* GIANT Chocolate Crown/Splash (SVG) */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={hasTriggered ? {
          scale: [0, 2, 1.5],
          opacity: [0, 1, 0.4],
          rotate: [0, 360],
        } : {}}
        transition={{
          duration: 3,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="1200" height="1200" viewBox="0 0 1200 1200" className="opacity-80">
          <defs>
            <radialGradient id="chocolateGradient">
              <stop offset="0%" stopColor="#3D2817" stopOpacity="1" />
              <stop offset="50%" stopColor="#2A1810" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1a0f08" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Massive chocolate crown petals */}
          {[...Array(24)].map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const x1 = 600;
            const y1 = 600;
            const x2 = 600 + Math.cos(angle) * 550;
            const y2 = 600 + Math.sin(angle) * 550;
            const controlX = 600 + Math.cos(angle) * 300;
            const controlY = 600 + Math.sin(angle) * 200;
            
            return (
              <motion.path
                key={i}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={hasTriggered ? {
                  pathLength: [0, 1],
                  opacity: [0, 0.9, 0.5],
                } : {}}
                transition={{
                  duration: 2,
                  delay: i * 0.04,
                  ease: 'easeOut',
                }}
                d={`M ${x1} ${y1} Q ${controlX} ${controlY}, ${x2} ${y2}`}
                fill="none"
                stroke="url(#chocolateGradient)"
                strokeWidth={40 + Math.random() * 40}
                strokeLinecap="round"
                filter="blur(8px)"
              />
            );
          })}
        </svg>
      </motion.div>

      {/* MASSIVE Flash Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={hasTriggered ? {
          opacity: [0, 0.5, 0],
        } : {}}
        transition={{
          duration: 0.8,
          times: [0, 0.3, 1],
        }}
        className="absolute inset-0 bg-chocolateBrown mix-blend-multiply"
      />

      {/* HUGE Residual Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={hasTriggered ? {
          opacity: [0, 0.6, 0.2],
          scale: [0, 2.5, 3],
        } : {}}
        transition={{
          duration: 4,
          ease: 'easeOut',
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-chocolateBrown/40 via-chocolateDark/20 to-transparent rounded-full blur-[100px]"
      />

      {/* Chocolate Tsunami Wave Effect */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={hasTriggered ? {
            scale: [0, 3 + i, 4 + i],
            opacity: [0, 0.4, 0],
          } : {}}
          transition={{
            duration: 3 + i * 0.5,
            delay: i * 0.3,
            ease: 'easeOut',
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-chocolateBrown/30"
          style={{
            width: '800px',
            height: '800px',
            filter: 'blur(10px)',
          }}
        />
      ))}

      {/* Chocolate Splatter Rings */}
      {[...Array(5)].map((_, ring) => (
        <div key={`ring-${ring}`}>
          {[...Array(20)].map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const distance = 300 + ring * 150;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const size = 60 - ring * 10;

            return (
              <motion.div
                key={`ring-${ring}-particle-${i}`}
                initial={{ 
                  x: '50%', 
                  y: '50%', 
                  scale: 0, 
                  opacity: 0 
                }}
                animate={hasTriggered ? {
                  x: `calc(50% + ${x}px)`,
                  y: `calc(50% + ${y}px)`,
                  scale: [0, 1.5, 0.8],
                  opacity: [0, 1, 0],
                  rotate: [0, 360],
                } : {}}
                transition={{
                  duration: 2,
                  delay: 0.3 + ring * 0.1 + i * 0.02,
                  ease: 'easeOut',
                }}
                className="absolute bg-chocolateBrown rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  filter: 'blur(5px)',
                }}
              />
            );
          })}
        </div>
      ))}

    </div>
  );
}
