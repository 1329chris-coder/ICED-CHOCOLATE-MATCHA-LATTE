'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { productData } from '@/data/product';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ChocolateSplash from '@/components/ChocolateSplash'; // ← ADDED

// Animated gradient background component
function AnimatedBackground({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <motion.div
        style={{
          background: `radial-gradient(circle at ${50 + scrollProgress * 50}% ${50 + scrollProgress * 30}%, 
            rgba(106, 153, 78, 0.15) 0%, 
            rgba(61, 40, 23, 0.1) 50%, 
            transparent 100%)`
        }}
        className="absolute inset-0"
      />
    </div>
  );
}

// Spotlight that follows scroll
function DynamicSpotlight({ scrollProgress }: { scrollProgress: number }) {
  return (
    <motion.div
      style={{
        top: `${scrollProgress * 100}%`,
        opacity: 0.4,
      }}
      className="fixed left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none z-0"
    >
      <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_var(--tw-gradient-to))] from-matchaGreen/30 via-matchaGreen/10 to-transparent rounded-full blur-3xl" />
    </motion.div>
  );
}

// Enhanced Section Component with lighting effects
function Section({ section, index }: { section: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const spotlightX = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '50%', '100%']);
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);

  const backgrounds = [
    'bg-gradient-to-br from-warmWhite via-cream to-matchaGreen/5',
    'bg-gradient-to-bl from-cream via-warmWhite to-chocolateBrown/5',
    'bg-gradient-to-tr from-matchaGreen/10 via-warmWhite to-cream',
    'bg-gradient-to-tl from-chocolateBrown/10 via-cream to-warmWhite'
  ];

  // Check if this is ingredients section
  const showChocolateSplash = section.id === 'ingredients';

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen py-32 px-6 md:px-12 ${backgrounds[index % backgrounds.length]} overflow-hidden`}
    >
      {/* CHOCOLATE SPLASH */}
      {showChocolateSplash && <ChocolateSplash />}

      {/* Animated Spotlight */}
      <motion.div
        style={{ 
          left: spotlightX,
          opacity: spotlightOpacity
        }}
        className="absolute top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-matchaLight/40 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            className="absolute w-2 h-2 bg-matchaGreen/20 rounded-full blur-sm"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <motion.h2 
            className="font-display text-5xl md:text-7xl text-chocolateBrown mb-6 relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            {section.title}
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-32 bg-gradient-to-r from-matchaGreen to-chocolateBrown mx-auto mb-6"
          />
          
          <p className="font-accent text-xl md:text-2xl text-matchaGreen uppercase tracking-wider">
            {section.subtitle}
          </p>
        </motion.div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {section.content.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
              }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-matchaGreen/10 overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="font-accent text-2xl font-bold text-chocolateBrown mb-4 group-hover:text-matchaGreen transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-matchaGreen to-chocolateBrown"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced Testimonials with dark theme
function TestimonialsSection({ section }: { section: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-32 px-6 md:px-12 bg-gradient-to-b from-chocolateBrown via-chocolateDark to-black overflow-hidden"
    >
      {/* Animated stars/sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            className="absolute w-1 h-1 bg-matchaLight rounded-full"
          />
        ))}
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_var(--tw-gradient-to))] from-matchaGreen/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-5xl md:text-7xl text-cream mb-4">
            {section.title}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-32 bg-gradient-to-r from-matchaGreen to-matchaLight mx-auto mb-6"
          />
          <p className="font-accent text-xl md:text-2xl text-matchaLight uppercase tracking-wider">
            {section.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {section.quotes.map((quote: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-matchaGreen/20 hover:border-matchaGreen/50 transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_var(--tw-gradient-to))] from-matchaGreen/0 to-matchaGreen/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              <div className="relative z-10">
                <div className="text-matchaLight text-6xl mb-4 opacity-50">"</div>
                <p className="font-body text-base md:text-lg text-cream/90 leading-relaxed mb-6 italic">
                  {quote.text}
                </p>
                <div className="border-t border-matchaGreen/30 pt-4">
                  <p className="font-accent font-bold text-matchaLight">
                    {quote.author}
                  </p>
                  <p className="font-body text-sm text-cream/60">
                    {quote.role}
                  </p>
                </div>
              </div>

              {/* Shine effect on hover */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhanced Nutrition with dynamic theming
function NutritionHighlights() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#FFFEF7', '#F5F5F5', '#FFFEF7']
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor }}
      className="relative py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(106, 153, 78, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(61, 40, 23, 0.2) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-7xl text-chocolateBrown mb-4 relative inline-block">
            Nutritional Excellence
            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-matchaGreen via-matchaLight to-matchaGreen"
            />
          </h2>
          <p className="font-accent text-xl md:text-2xl text-matchaGreen uppercase tracking-wider mt-8">
            Every Sip Delivers
          </p>
        </motion.div>

        {/* Nutrition cards with pulsing glow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {productData.nutritionHighlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -2, 2, 0],
              }}
              className="group relative bg-white rounded-3xl p-6 md:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-matchaGreen/30 overflow-hidden"
            >
              {/* Pulsing background glow */}
              <motion.div
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_var(--tw-gradient-to))] from-matchaGreen/20 to-transparent rounded-3xl"
              />

              <div className="relative z-10">
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {item.icon}
                </motion.div>
                <div className="font-display text-4xl md:text-5xl font-bold text-matchaGreen mb-2">
                  {item.value}
                </div>
                <div className="font-accent text-sm md:text-base text-chocolateBrown uppercase tracking-wide">
                  {item.label}
                </div>
              </div>

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Detailed specs with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(90deg, #6A994E, #88B04B, #3D2817, #6A994E)',
              backgroundSize: '200% 200%',
            }}
          />

          <h3 className="relative font-accent text-2xl font-bold text-center text-chocolateBrown mb-8">
            Complete Nutrition Facts
          </h3>
          <div className="relative grid md:grid-cols-3 gap-4 font-body text-gray-700">
            {Object.entries(productData.specifications).slice(0, 6).map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex justify-between py-3 px-4 border-b border-gray-300 hover:bg-matchaGreen/5 rounded-lg transition-colors"
              >
                <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="font-bold text-matchaGreen">{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Main component with scroll progress tracking
export default function PostSequenceContent() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} className="relative z-10">
      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-matchaGreen via-matchaLight to-chocolateBrown z-50 origin-left"
      />

      {/* Nutrition Highlights */}
      <NutritionHighlights />

      {/* Main Content Sections */}
      {productData.detailedSections
        .filter(s => s.id !== 'testimonials')
        .map((section, index) => (
          <Section key={section.id} section={section} index={index} />
        ))}

      {/* Testimonials with dark theme */}
      {productData.detailedSections
        .filter(s => s.id === 'testimonials')
        .map(section => (
          <TestimonialsSection key={section.id} section={section} />
        ))}
    </div>
  );
}
