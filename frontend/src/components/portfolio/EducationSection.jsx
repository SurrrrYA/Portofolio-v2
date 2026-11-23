import React from 'react';
import { GraduationCap, Calendar, ExternalLink } from 'lucide-react';

const EducationSection = ({ educations }) => {
  if (!educations || educations.length === 0) return null;

  return (
    <section id="education-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Pendidikan Resmi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Latar Belakang Akademis
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                  {edu.degree}
                </span>

                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {edu.start_year} — {edu.end_year || 'Sekarang'}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                {edu.institution}
              </h3>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                {edu.field_of_study}
              </p>

              {/* IPK Badge with optional Google Drive link */}
              {edu.gpa && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">IPK:</span>
                  {edu.transcript_url ? (
                    <a
                      href={edu.transcript_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-extrabold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      title="Lihat Transkrip di Google Drive"
                    >
                      {edu.gpa}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                      {edu.gpa}
                    </span>
                  )}
                </div>
              )}

              {edu.description && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {edu.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
