import React from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const MagneticButton = ({
  children,
  className = '',
  as = 'button',
  strength = 0.28,
  ...rest
}) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });
  const Tag = motion[as] || motion.button;

  const handleMove = (event) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) {
    const PlainTag = as;
    return (
      <PlainTag className={className} {...rest}>
        {children}
      </PlainTag>
    );
  }

  return (
    <Tag
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.965 }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
