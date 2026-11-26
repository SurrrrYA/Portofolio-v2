import React from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { springSoft } from '../../lib/motion';

const TiltCard = ({
  children,
  className = '',
  intensity = 7,
  glare = true,
  wrapperClassName = '',
  ...rest
}) => {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), springSoft);
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), springSoft);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(59, 130, 246, 0.16), transparent 45%)`;

  const handleMove = (event) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    px.set(x / rect.width);
    py.set(y / rect.height);
    mx.set(x);
    my.set(y);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (reduce) {
    return (
      <div className={`${wrapperClassName} h-full`} {...rest}>
        <div className={className}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`group h-full [perspective:1200px] ${wrapperClassName}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      <motion.div
        className={`relative h-full will-change-transform ${className}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;
