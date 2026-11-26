import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 shadow-[0_0_12px_rgba(59,130,246,0.65)]"
      style={{ scaleX: reduce ? scrollYProgress : smoothProgress }}
    />
  );
};

export default ScrollProgress;
