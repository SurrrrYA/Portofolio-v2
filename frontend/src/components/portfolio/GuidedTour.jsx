import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Compass,
  CheckCircle2,
} from 'lucide-react';

const GuidedTour = ({ triggerTour, onTourComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  const tourSteps = [
    {
      navId: 'nav-item-home',
      sectionId: '#hero-section',
      name: 'Beranda',
      title: 'Eksplorasi Profil & Keahlian Utama',
      description:
        'Bagian utama profil pengembang, ringkasan spesialisasi teknis, badge kesiapan kerja, dan akses cepat ke karya terpilih.',
    },
    {
      navId: 'nav-item-tentang',
      sectionId: '#about-section',
      name: 'Tentang',
      title: 'Latar Belakang & Filosofi Rekayasa',
      description:
        'Kualifikasi profesional, kompetensi terakreditasi BNSP, publikasi ilmiah SINTA 4, serta pilar spesialisasi Web & Mobile.',
    },
    {
      navId: 'nav-item-proyek',
      sectionId: '#projects-section',
      name: 'Proyek',
      title: 'Karya Nyata & Studi Kasus',
      description:
        'Koleksi proyek nyata seperti aplikasi mobile servis bengkel (Kotlin), sistem manajemen web (Laravel & React), dan repositori source code.',
    },
    {
      navId: 'nav-item-keahlian',
      sectionId: '#skills-section',
      name: 'Keahlian',
      title: 'Tech Stack & Alat Rekayasa',
      description:
        'Penguasaan teknologi modern: bahasa pemrograman (PHP, Kotlin, SQL, JS), framework (Laravel, React), database, dan IT operations.',
    },
    {
      navId: 'nav-item-sertifikat',
      sectionId: '#certificates-section',
      name: 'Sertifikat',
      title: 'Kompetensi Terverifikasi & Lisensi',
      description:
        'Sertifikat lisensi resmi BNSP, TOEFL ITP, dan keahlian teruji yang dapat langsung di-preview melalui modal dokumen interaktif.',
    },
    {
      navId: 'nav-item-pengalaman',
      sectionId: '#experience-section',
      name: 'Pengalaman',
      title: 'Rekam Jejak Karir & Kontribusi',
      description:
        'Perjalanan profesional mulai dari Web Developer di Oemah Daun, freelance aplikasi Android, hingga administrasi e-procurement.',
    },
    {
      navId: 'nav-item-kontak',
      sectionId: '#contact-section',
      name: 'Kontak',
      title: 'Mulai Kolaborasi & Diskusi',
      description:
        'Formulir terproteksi untuk menyampaikan tawaran proyek atau peluang karir yang langsung tersimpan di panel admin mandiri.',
    },
  ];

  // Only open when manually triggered by the user
  useEffect(() => {
    if (triggerTour > 0) {
      setIsOpen(true);
      setCurrentStep(0);
    }
  }, [triggerTour]);

  useEffect(() => {
    if (!isOpen) return;

    const step = tourSteps[currentStep];
    if (!step) return;

    // Scroll to the active section ONCE when step changes
    const sectionEl = document.querySelector(step.sectionId);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const updateTargetRect = () => {
      const navEl = document.getElementById(step.navId);
      if (navEl) {
        const rect = navEl.getBoundingClientRect();
        setTargetRect({
          x: rect.left + rect.width / 2,
          y: rect.bottom,
          width: rect.width,
          height: rect.height,
        });

        // Clear previous highlights
        document.querySelectorAll('.tour-highlight-pulse').forEach((el) => {
          el.classList.remove(
            'tour-highlight-pulse',
            'ring-4',
            'ring-blue-500',
            'bg-blue-600',
            'text-white',
            'scale-105',
            '!z-[47]',
            'relative'
          );
        });

        // Highlight current nav item
        navEl.classList.add(
          'tour-highlight-pulse',
          'ring-4',
          'ring-blue-500',
          'bg-blue-600',
          'text-white',
          'scale-105',
          'relative',
          '!z-[47]'
        );
      }
    };

    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);

    return () => {
      window.removeEventListener('resize', updateTargetRect);
      document.querySelectorAll('.tour-highlight-pulse').forEach((el) => {
        el.classList.remove(
          'tour-highlight-pulse',
          'ring-4',
          'ring-blue-500',
          'bg-blue-600',
          'text-white',
          'scale-105',
          '!z-[47]',
          'relative'
        );
      });
    };
  }, [isOpen, currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('has_seen_tour_v4', 'true');
    document.querySelectorAll('.tour-highlight-pulse').forEach((el) => {
      el.classList.remove(
        'tour-highlight-pulse',
        'ring-4',
        'ring-blue-500',
        'bg-blue-600',
        'text-white',
        'scale-105',
        '!z-[47]',
        'relative'
      );
    });
    if (onTourComplete) onTourComplete();
  };

  if (!isOpen) return null;

  const step = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 pointer-events-auto" style={{ zIndex: 45 }}>
      {/* Dark backdrop with soft blur */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] transition-opacity"
        style={{ zIndex: 45 }}
        onClick={handleClose}
      />

      {/* Target indicator ring */}
      {targetRect && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300"
          style={{ zIndex: 47, overflow: 'visible' }}
        >
          <circle
            cx={targetRect.x}
            cy={targetRect.y + 4}
            r="18"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            className="animate-ping opacity-60"
          />
        </svg>
      )}

      {/* Centered Guidance Card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-4 pointer-events-auto"
        style={{ zIndex: 48 }}
      >
        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-white ring-1 ring-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200/60 dark:border-blue-900/40">
              <Compass className="w-3.5 h-3.5 text-blue-500" />
              <span>Bagian: {step.name}</span>
            </div>

            <button
              onClick={handleClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              title="Tutup Panduan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Langkah {currentStep + 1} dari {tourSteps.length}
            </span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {step.title}
          </h3>

          <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {step.description}
          </p>

          {/* Progress dots */}
          <div className="flex gap-1.5 mt-5 mb-6">
            {tourSteps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? 'bg-blue-600 dark:bg-blue-500'
                    : i < currentStep
                    ? 'bg-blue-200 dark:bg-blue-900/80'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleClose}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
            >
              Lewati Tour
            </button>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <span>
                  {currentStep === tourSteps.length - 1 ? 'Selesai' : 'Lanjut'}
                </span>
                {currentStep === tourSteps.length - 1 ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;