import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Sparkles, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import MagneticButton from '../common/MagneticButton';
import { easeOutExpo, springSoft } from '../../lib/motion';

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.18 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

const HeroSection = ({ profile, settings, socialLinks }) => {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const reduce = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });
  const textParallax = useTransform(smoothScroll, [0, 1], [0, 42]);
  const avatarParallax = useTransform(smoothScroll, [0, 1], [0, 88]);

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
  const bio =
    profile?.bio ||
    'Software Engineer & Full-Stack Developer yang berfokus pada perancangan solusi digital berbasis Web dan Mobile dengan arsitektur bersih, performa tinggi, dan teruji di lingkungan produksi.';
  const avatar = profile?.avatar_url || '/storage/media/ardiansyah_avatar.jpg';
  const displayName = name.split(',')[0];

  // Interactive 3D avatar tilt
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [7, -7]), springSoft);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-7, 7]), springSoft);

  const handleAvatarMove = (event) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const resetAvatar = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-[92vh] sm:min-h-[94vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-500/15" />
        <div className="absolute bottom-10 right-1/4 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-[110px] dark:bg-cyan-400/10" />
      </div>

      <motion.div
        className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 sm:gap-14 relative z-10 w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12, margin: '0px 0px -40px 0px' }}
        variants={heroContainer}
      >
        {/* Left Column: Greeting, Headline, Bio, Buttons */}
        <motion.div
          className="flex-1 text-center md:text-left"
          style={{ y: reduce ? 0 : textParallax }}
        >
          {/* Status Badge */}
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 text-xs font-bold mb-6 shadow-sm backdrop-blur"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Terbuka untuk Peluang Karir & Proyek Baru</span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
              show: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: {
                  duration: 0.8,
                  ease: easeOutExpo,
                  staggerChildren: 0.06,
                },
              },
            }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            <motion.span variants={wordItem} className="inline-block">
              Halo, Saya{' '}
            </motion.span>
            <span className="inline-block">
              {displayName.split(' ').map((word, index, words) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={wordItem}
                  className="hero-gradient-text inline-block will-change-transform"
                >
                  {word}
                  {index < words.length - 1 ? '\u00A0' : ''}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Typing Roles */}
          <motion.div
            variants={heroItem}
            className="min-h-[2.5rem] mt-4 flex items-center justify-center md:justify-start"
          >
            <p className="text-sm sm:text-lg md:text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0 animate-pulse" />
              <span>{typedText}</span>
              <span className="w-0.5 h-5 bg-blue-500 animate-pulse ml-0.5" />
            </p>
          </motion.div>

          <motion.p
            variants={heroItem}
            className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
          >
            {bio}
          </motion.p>

          {/* Location */}
          {profile?.location && (
            <motion.div
              variants={heroItem}
              className="mt-4 flex items-center justify-center md:justify-start gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400"
            >
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{profile.location}</span>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            variants={heroItem}
            className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3.5"
          >
            <MagneticButton
              as="a"
              href="#projects-section"
              className="btn-shine group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-colors"
            >
              <span>Lihat Proyek</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#contact-section"
              className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm backdrop-blur"
            >
              <span>Hubungi Saya</span>
            </MagneticButton>
          </motion.div>

          {/* Social Links Quick Bar */}
          {socialLinks && socialLinks.length > 0 && (
            <motion.div
              variants={heroItem}
              className="mt-8 flex items-center justify-center md:justify-start gap-3"
            >
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Terhubung:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks
                  .filter(
                    (item) =>
                      !item.platform.toLowerCase().includes('whatsapp') &&
                      !item.url.includes('wa.me')
                  )
                  .map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 transition-colors shadow-sm backdrop-blur"
                      title={item.platform}
                    >
                      <span className="text-xs font-bold px-1">{item.platform}</span>
                    </motion.a>
                  ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Interactive Avatar */}
        <motion.div
          variants={heroItem}
          className="relative shrink-0"
          style={{ perspective: 1100 }}
          onMouseMove={handleAvatarMove}
          onMouseLeave={resetAvatar}
        >
          <motion.div
            className="relative will-change-transform"
            style={{
              rotateX,
              rotateY,
              y: reduce ? 0 : avatarParallax,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Glow */}
            <div className="absolute -inset-10 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/30" />

            {/* Rotating rings */}
            <div className="pointer-events-none absolute -inset-7 rounded-full border border-dashed border-blue-400/40 animate-spin-slow" />
            <div className="pointer-events-none absolute -inset-3 rounded-full border border-cyan-400/30 animate-spin-slow-reverse" />

            {/* Top-left badge: Open to Work */}
            <motion.div
              style={{ z: 45 }}
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -left-2 z-10 bg-emerald-500 text-white py-1.5 px-3 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 text-xs font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Open to Work
            </motion.div>

            {/* Avatar Photo */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/90 dark:border-slate-800 shadow-2xl shadow-blue-950/30 bg-slate-100 dark:bg-slate-800">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/10 via-transparent to-cyan-400/10" />
            </div>

            {/* Bottom-right badge: BNSP Certified */}
            <motion.div
              style={{ z: 60 }}
              animate={reduce ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute -bottom-3 -right-2 z-10 bg-white/95 dark:bg-slate-900/95 border-2 border-blue-100 dark:border-blue-900 py-2 px-3.5 rounded-2xl shadow-xl flex items-center gap-2 backdrop-blur"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                BNSP Certified
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about-section"
        aria-label="Gulir ke bagian tentang"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 sm:flex"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.35em]">Scroll</span>
        <span className="flex h-9 w-6 justify-center rounded-full border-2 border-slate-400/50 pt-1.5">
          <span className="h-2 w-1 rounded-full bg-blue-500 animate-bounce" />
        </span>
      </motion.a>
    </section>
  );
};

export default HeroSection;
