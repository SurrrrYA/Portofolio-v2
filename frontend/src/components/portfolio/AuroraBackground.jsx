import React, { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

const FloatingParticles = () => {
  const reduce = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const seed = (index * 37) % 100;
        return {
          id: index,
          left: `${(seed * 7 + 11) % 96}%`,
          top: `${(seed * 13 + 7) % 92}%`,
          size: 2 + (index % 4),
          duration: 7 + (index % 7),
          delay: (index % 9) * 0.45,
          opacity: 0.18 + (index % 5) * 0.09,
        };
      }),
    []
  );

  if (reduce) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full bg-blue-500/40 dark:bg-cyan-300/50 blur-[0.5px] particle-float"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const AuroraBackground = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div className="aurora-blob aurora-blob-1" />
    <div className="aurora-blob aurora-blob-2" />
    <div className="aurora-blob aurora-blob-3" />
    <div className="aurora-blob aurora-blob-4" />
    <div className="aurora-grid" />
    <div className="aurora-noise" />
    <FloatingParticles />
  </div>
);

export default AuroraBackground;
