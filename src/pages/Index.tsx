import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene } from '../components/Scene';
import { LoadingScreen } from '../components/LoadingScreen';
import { gsap } from 'gsap';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      gsap.from('.hero-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-background text-secondary overflow-hidden">
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Scene />
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-accent text-sm tracking-widest uppercase mb-4"
              >
                Welcome to
              </motion.span>
              <h1 className="hero-text text-6xl md:text-8xl font-bold text-center mb-8">
                Virtual Tour
              </h1>
              <p className="hero-text text-xl md:text-2xl text-center max-w-2xl mb-12 text-secondary/80">
                Experience an immersive journey through our interactive 3D world
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hero-text px-8 py-4 bg-accent text-accent-foreground rounded-full text-lg font-medium transition-colors hover:bg-accent/90"
              >
                Start Tour
              </motion.button>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;