import React from 'react';
import { User, Code, Smartphone, Database, CheckCircle, FolderKanban, Award, Briefcase, GraduationCap } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../common/Reveal';
import TiltCard from '../common/TiltCard';
import CountUp from '../common/CountUp';

const AboutSection = ({ profile, stats = {} }) => {
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

  const gpaRaw = stats.gpa;
  const gpaNumber = parseFloat(gpaRaw);
  const gpaHasScale = typeof gpaRaw === 'string' && gpaRaw.includes('/');

  const statItems = [
    {
      label: 'Proyek Selesai',
      value: stats.projects ?? 0,
      suffix: '+',
      icon: FolderKanban,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      label: 'Sertifikasi',
      value: stats.certificates ?? 0,
      suffix: '+',
      icon: Award,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
    },
    {
      label: 'Pengalaman',
      value: stats.experiences ?? 0,
      suffix: '+',
      icon: Briefcase,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    ...(Number.isFinite(gpaNumber)
      ? [
          {
            label: 'IPK',
            value: gpaNumber,
            suffix: gpaHasScale ? ' / 4.00' : '',
            decimals: 2,
            icon: GraduationCap,
            color: 'text-violet-600 dark:text-violet-400',
            bg: 'bg-violet-50 dark:bg-violet-950/40',
          },
        ]
      : []),
  ];

  const pillars = [
    {
      icon: Smartphone,
      title: 'Mobile Android Developer',
      description:
        'Pengembangan aplikasi mobile native Kotlin terhubung dengan Firebase & REST API untuk kebutuhan operasional bisnis nyata.',
    },
    {
      icon: Code,
      title: 'Full-Stack Web (Laravel & React)',
      description:
        'Arsitektur backend Laravel yang aman, token autentikasi Sanctum, dan frontend modern responsif menggunakan React dan Tailwind CSS.',
    },
    {
      icon: Database,
      title: 'MySQL & RESTful API',
      description:
        'Perancangan skema relasional, optimasi kueri basis data, dan endpoint API yang cepat, aman, dan terdokumentasi.',
    },
  ];

  return (
    <section id="about-section" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <Reveal className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <User className="w-3.5 h-3.5" />
          <span>Tentang Saya</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight section-heading">
          Latar Belakang & Kualifikasi Profesional
        </h2>
      </Reveal>

      {/* Animated stat strip */}
      <Stagger className="mb-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" stagger={0.08}>
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <StaggerItem key={item.label}>
              <TiltCard
                intensity={5}
                className="h-full rounded-2xl border border-slate-200 bg-white/90 p-4 text-center shadow-sm backdrop-blur transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 sm:p-5"
              >
                <div
                  className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${item.color}`}>
                  <CountUp
                    value={item.value}
                    decimals={item.decimals || 0}
                    suffix={item.suffix}
                  />
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                  {item.label}
                </div>
              </TiltCard>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: About Text & Highlights */}
        <Reveal variant="left" className="lg:col-span-7 space-y-6">
          <div className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
            {aboutText}
          </div>

          <Stagger className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.1}>
            {highlights.map((item) => (
              <StaggerItem key={item}>
                <div className="card-shine flex items-start gap-2.5 p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm card-hover-lift h-full">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-snug">
                    {item}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        {/* Right: Pillar Cards */}
        <Reveal variant="right" className="lg:col-span-5">
          <Stagger className="grid grid-cols-1 gap-4" stagger={0.12}>
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.title}>
                  <TiltCard
                    intensity={6}
                    className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:bg-blue-950/40 dark:text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{pillar.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
