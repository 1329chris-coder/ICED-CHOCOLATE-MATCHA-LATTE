'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { productData } from '@/data/product';

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const currentFrame = useTransform(
    scrollYProgress,
    [0, 1],
    [0, productData.assets.sequenceFrameCount - 1]
  );

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = [];
      
      for (let i = 1; i <= productData.assets.sequenceFrameCount; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          const frameNumber = i.toString().padStart(3, '0');
          img.src = `${productData.assets.sequenceFolder}${productData.assets.sequencePrefix}${frameNumber}.jpg`;
          
          img.onload = () => {
            setLoadingProgress(i / productData.assets.sequenceFrameCount * 100);
            resolve(img);
          };
          img.onerror = reject;
        });
        
        imagePromises.push(promise);
      }

      try {
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading sequence images:', error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const unsubscribe = currentFrame.on('change', (latest) => {
      const frameIndex = Math.round(latest);
      const img = images[frameIndex];
      
      if (img) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    });

    return () => unsubscribe();
  }, [currentFrame, images, imagesLoaded]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-center">
              <div className="text-cream font-accent text-lg mb-4">
                Loading Experience...
              </div>
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-matchaGreen to-chocolateBrown"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="text-cream/60 font-body text-sm mt-2">
                {Math.round(loadingProgress)}%
              </div>
            </div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ opacity: imagesLoaded ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
