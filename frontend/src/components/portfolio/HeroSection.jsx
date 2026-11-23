import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, ShieldCheck } from 'lucide-react';

const HeroSection = ({ profile, settings, socialLinks }) => {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = React.useMemo(() => {
    try {
      if (settings?.typing_roles) {
        return JSON.parse(settings.typing_roles);
      }
    } catch {
      // Fallback
    }
    return [
      'Web Developer di Oemah Daun',
      'Fresh Graduate Teknik Informatika (IPK 3.73)',
      'Pemrogram Tersertifikasi BNSP',
      'Full-Stack Web Developer (Laravel & React)',
      'Android Kotlin Developer',
    ];
  }, [settings?.typing_roles]);

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    let timeout;

    if (!isDeleting && typedText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => prev + 1);
    } else {
      const speed = isDeleting ? 35 : 75;
      timeout = setTimeout(() => {
        setTypedText(
          isDeleting
            ? currentRole.substring(0, typedText.length - 1)
            : currentRole.substring(0, typedText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex, roles]);

  const name = profile?.name || 'Ardiansyah Surya Pratama, S.Kom';
  const bio = profile?.bio || 'Software Engineer & Full-Stack Developer yang berfokus pada perancangan solusi digital berbasis Web dan Mobile dengan arsitektur bersih, performa tinggi, dan teruji di lingkungan produksi.';
  const avatar = profile?.avatar_url || '/storage/media/ardiansyah_avatar.jpg';

  return (
    <section
      id="hero-section"
      className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 relative z-10 w-full">
        {/* Left Column: Greeting, Headline, Bio, Buttons */}
        <div className="flex-1 text-center md:text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 text-xs font-bold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Terbuka untuk Peluang Karir & Proyek Baru</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Halo, Saya{' '}
            <span className="text-blue-600 dark:text-blue-400">
              {name.split(',')[0]}
            </span>
          </h1>

          {/* Typing Roles */}
          <div className="min-h-[2.5rem] mt-3 flex items-center justify-center md:justify-start">
            <p className="text-sm sm:text-lg md:text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{typedText}</span>
              <span className="w-0.5 h-5 bg-blue-500 animate-pulse ml-0.5" />
            </p>
          </div>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            {bio}
          </p>

          {/* Location */}
          {profile?.location && (
            <div className="mt-4 flex items-center justify-center md:justify-start gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{profile.location}</span>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3.5">
            <a
              href="#projects-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Lihat Proyek</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="#contact-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              <span>Hubungi Saya</span>
            </a>
          </div>

          {/* Social Links Quick Bar */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="mt-8 flex items-center justify-center md:justify-start gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Terhubung:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks
                  .filter((item) => !item.platform.toLowerCase().includes('whatsapp') && !item.url.includes('wa.me'))
                  .map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
                    title={item.platform}
                  >
                    <span className="text-xs font-bold px-1">{item.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Avatar with two clean floating badges */}
        <div className="relative shrink-0 animate-float-gentle">
          {/* Top-left badge: Open to Work */}
          <div className="absolute -top-3 -left-2 z-10 bg-emerald-500 text-white py-1.5 px-3 rounded-full shadow-md flex items-center gap-1.5 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Open to Work
          </div>

          {/* Avatar Photo */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover object-center hover:scale-105 transition duration-300"
              loading="eager"
            />
          </div>

          {/* Bottom-right badge: BNSP Certified */}
          <div className="absolute -bottom-3 -right-2 z-10 bg-white dark:bg-slate-900 border-2 border-blue-100 dark:border-blue-900 py-2 px-3.5 rounded-2xl shadow-lg flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              BNSP Certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
