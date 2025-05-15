import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

interface AnimatedPageProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.95
  }
};

const pageTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5
};

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  // Preload images
  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.src) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = img.src;
        document.head.appendChild(preloadLink);
      }
    });
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ 
        width: '100%',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        perspective: 1000,
        WebkitPerspective: 1000
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;