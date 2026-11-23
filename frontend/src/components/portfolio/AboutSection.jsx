import React from 'react';
import { User, Code, Smartphone, Database, CheckCircle } from 'lucide-react';

const AboutSection = ({ profile }) => {
  const aboutText =
    profile?.about ||
    profile?.bio ||
    'Software Engineer yang berfokus pada perancangan solusi digital Web & Mobile terstruktur, performa tinggi, dan berorientasi pengguna.';

  const highlights = [
    'Pengembangan Aplikasi Mobile Android (Kotlin) & Real-time Sync',
    'Arsitektur REST API & Backend Web Terstruktur (PHP Laravel)',
    'Pengalaman pengguna (UI/UX) responsif, bersih, dan cepat (React & Tailwind)',
    'Publikasi artikel ilmiah pada Jurnal Nasional Terakreditasi SINTA 4',
  ];

  return (
    <section id="about-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <User className="w-3.5 h-3.5" />
          <span>Tentang Saya</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Latar Belakang & Kualifikasi Profesional
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: About Text & Highlights */}
        <div className="lg:col-span-7 space-y-6 scroll-reveal-left">
          <div className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
            {aboutText}
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 scroll-reveal-stagger">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover-lift"
              >
                <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Solid Clean Pillar Cards (No gradients) */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4 scroll-reveal-right">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover-lift">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Mobile Android Developer</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Pengembangan aplikasi mobile native Kotlin terhubung dengan Firebase & REST API untuk kebutuhan operasional bisnis nyata.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover-lift">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Full-Stack Web (Laravel & React)</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Arsitektur backend Laravel yang aman, token autentikasi Sanctum, dan frontend modern responsif menggunakan React dan Tailwind CSS.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm card-hover-lift">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">MySQL & RESTful API</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Perancangan skema relasional, optimasi kueri basis data, dan endpoint API yang cepat, aman, dan terdokumentasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
