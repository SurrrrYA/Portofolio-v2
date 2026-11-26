import React from 'react';

const TechMarquee = ({ items = [], speed = 28, className = '' }) => {
  const list = items.filter(Boolean);
  if (list.length === 0) return null;

  return (
    <div className={`marquee-mask relative overflow-hidden py-1 ${className}`}>
      <div
        className="marquee-track flex w-max items-center gap-3"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...list, ...list].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
