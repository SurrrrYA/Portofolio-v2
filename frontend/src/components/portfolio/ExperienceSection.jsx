import React, { useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { easeOutExpo } from '../../lib/motion';
import { formatDate, cleanMultiline } from '../../lib/format';

const INITIAL_LIMIT = 2;

const ExperienceSection = ({ experiences }) => {
  const [filterType, setFilterType] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const timelineRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.35'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const filtered = React.useMemo(() => {
    if (!experiences) return [];
    if (filterType === 'All') return experiences;
    return experiences.filter((e) => e.type === filterType);
  }, [experiences, filterType]);

  // Show all items when filter is active (not 'All'), else limit
  const visibleItems = (showAll || filterType !== 'All')
    ? filtered
    : filtered.slice(0, INITIAL_LIMIT);

  const hasMore = filterType === 'All' && filtered.length > INITIAL_LIMIT;

  return (
    <section id="experience-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <Reveal className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Riwayat Karir</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight section-heading">
          Pengalaman Kerja & Kontribusi Profesional
        </h2>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {['All', 'Work', 'Internship'].map((type) => {
            const isActive = filterType === type;
            return (
              <motion.button
                key={type}
                onClick={() => { setFilterType(type); setShowAll(false); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="experience-filter-pill"
                    className="absolute inset-0 rounded-full bg-blue-600 shadow-sm"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {type === 'All' ? 'Semua Pengalaman' : type}
                </span>
              </motion.button>
            );
          })}
        </div>
      </Reveal>

      {/* Timeline */}
      <div
        ref={timelineRef}
        className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10"
      >
        {/* Animated gradient line */}
        <motion.div
          aria-hidden="true"
          className="absolute -left-[2px] top-0 h-full w-[2px] origin-top rounded-full bg-gradient-to-b from-blue-500 via-cyan-400 to-violet-500"
          style={{ scaleY: reduce ? 1 : lineScale }}
        />

        {visibleItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -26 : 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-600 group-hover:scale-125 transition-transform duration-300" />

            {item.is_current && (
              <span className="absolute -left-[35px] sm:-left-[43px] top-1 w-6 h-6 rounded-full bg-blue-500/30 animate-ping" />
            )}

            <div className="card-shine p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                  {item.type}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {formatDate(item.start_date)} - {item.is_current ? 'Sekarang' : formatDate(item.end_date)}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {item.role}
              </h3>
              <div className="text-base font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                {item.company}
              </div>

              {item.location && (
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.location}</span>
                </div>
              )}

              {item.description && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              )}

              {item.responsibilities && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed font-normal">
                  {cleanMultiline(item.responsibilities)}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More / Less Button */}
      {hasMore && (
        <div className="mt-10 text-center">
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {showAll ? (
              <><ChevronUp className="w-4 h-4" /> Tutup</>
            ) : (
              <><ChevronDown className="w-4 h-4" /> Lihat Semua {filtered.length} Pengalaman</>
            )}
          </motion.button>
        </div>
      )}
    </section>
  );
};

export default ExperienceSection;
