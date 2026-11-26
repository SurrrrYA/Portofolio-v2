import React, { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { easeOutExpo } from '../../lib/motion';

const STORAGE_KEY = 'portfolio_intro_seen';

const readSeen = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const Preloader = ({ name = 'Ardiansyah Surya Pratama' }) => {
  const [visible, setVisible] = useState(() => !readSeen());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;

    const controls = animate(0, 100, {
      duration: 1.45,
      ease: easeOutExpo,
      onUpdate: (latest) => setProgress(Math.round(latest)),
      onComplete: () => {
        try {
          sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {
          // Private mode: allow the intro to run again next visit.
        }
        window.setTimeout(() => setVisible(false), 260);
      },
    });

    return () => controls.stop();
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-white"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.85, ease: easeOutExpo } }}
        >
          <div className="absolute inset-0 opacity-60">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[110px]" />
            <div className="absolute left-1/3 top-1/3 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-[90px]" />
            <div className="absolute bottom-1/4 right-1/4 h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-[90px]" />
          </div>

          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-blue-500/30" />
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.span
                className="text-2xl font-black tracking-tight text-white"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
              >
                AP
              </motion.span>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-blue-300/80">
              Portfolio
            </p>
            <h1 className="mt-2 max-w-[80vw] text-center text-lg font-extrabold tracking-tight sm:text-2xl">
              {name.split(',')[0]}
            </h1>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs font-bold tabular-nums text-slate-400">
                {progress}%
              </span>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading experience
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
