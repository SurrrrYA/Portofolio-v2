import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Check } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../common/Reveal';
import TiltCard from '../common/TiltCard';
import TechMarquee from './TechMarquee';
import { easeOutExpo } from '../../lib/motion';

const levelPercent = {
  Basic: 35,
  Intermediate: 60,
  Advanced: 82,
  Expert: 100,
};

const SkillsSection = ({ skillCategories }) => {
  const allSkills = React.useMemo(() => {
    if (!skillCategories) return [];
    const names = skillCategories.flatMap((category) =>
      (category.skills || []).map((skill) => skill.name)
    );
    return [...new Set(names)];
  }, [skillCategories]);

  return (
    <section id="skills-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <Reveal className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <Cpu className="w-3.5 h-3.5" />
          <span>Keahlian & Teknologi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight section-heading">
          Tech Stack & Alat Rekayasa Perangkat Lunak
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
          Penguasaan teknologi modern untuk menghadirkan solusi yang efisien, handal, dan mudah dirawat.
        </p>
      </Reveal>

      {/* Infinite tech marquee */}
      {allSkills.length > 0 && (
        <Reveal delay={0.1} className="mb-12">
          <TechMarquee items={allSkills} />
        </Reveal>
      )}

      {/* Grid of Categories */}
      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.09}>
        {skillCategories?.map((category) => (
          <StaggerItem key={category.id} className="h-full">
            <TiltCard
              intensity={5}
              className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full backdrop-blur"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 transition-transform duration-300 group-hover:scale-150" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.skills?.map((skill) => {
                    const percent = levelPercent[skill.level] || 72;
                    return (
                      <div
                        key={skill.id}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {skill.name}
                            </span>
                          </div>

                          {skill.level && (
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {skill.level}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percent}%` }}
                            viewport={{ once: false, amount: 0.35, margin: '0px 0px -40px 0px' }}
                            transition={{ duration: 1.05, ease: easeOutExpo, delay: 0.08 }}
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};

export default SkillsSection;
