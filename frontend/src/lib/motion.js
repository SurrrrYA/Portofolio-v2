// Shared motion presets for a consistent, premium feel.
export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeInOutSoft = [0.65, 0, 0.35, 1];

export const springSoft = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 };
export const springSnappy = { type: 'spring', stiffness: 260, damping: 24 };
export const springBouncy = { type: 'spring', stiffness: 320, damping: 18 };

export const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -26, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -42, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 42, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: easeOutExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: easeOutExpo } },
};

export const staggerContainer = (stagger = 0.09, delayChildren = 0.08) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const staggerItemDown = {
  ...staggerItem,
  hidden: { opacity: 0, y: -26, filter: 'blur(6px)' },
};

export const viewportReplay = {
  once: false,
  amount: 0.15,
  margin: '0px 0px -70px 0px',
};

// Kept as an alias so older imports keep working.
export const viewportOnce = viewportReplay;
