import React from 'react';
import { Cpu, Check } from 'lucide-react';

const SkillsSection = ({ skillCategories }) => {
  return (
    <section id="skills-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <Cpu className="w-3.5 h-3.5" />
          <span>Keahlian & Teknologi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tech Stack & Alat Rekayasa Perangkat Lunak
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
          Penguasaan teknologi modern untuk menghadirkan solusi yang efisien, handal, dan mudah dirawat.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal-stagger">
        {skillCategories?.map((category) => (
          <div
            key={category.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {category.name}
                </h3>
              </div>

              <div className="space-y-2">
                {category.skills?.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                  >
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
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
