import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const CursorGlow = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const springX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduce) return undefined;
    const media = window.matchMedia('(pointer: fine)');
    if (!media.matches) return undefined;

    setEnabled(true);
    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const handleLeave = () => {
      x.set(-500);
      y.set(-500);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', handleLeave);
    };
  }, [reduce, x, y]);

  if (!enabled || reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[80px] dark:opacity-25"
      style={{
        x: springX,
        y: springY,
        background:
          'radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(34,211,238,0.18) 42%, transparent 72%)',
      }}
    />
  );
};

export default CursorGlow;
