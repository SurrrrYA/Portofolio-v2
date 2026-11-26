import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Compass, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { easeOutExpo } from '../../lib/motion';

const navLinks = [
  { id: 'home', name: 'Home', target: 'hero-section' },
  { id: 'tentang', name: 'Tentang', target: 'about-section' },
  { id: 'proyek', name: 'Proyek', target: 'projects-section' },
  { id: 'keahlian', name: 'Keahlian', target: 'skills-section' },
  { id: 'sertifikat', name: 'Sertifikat', target: 'certificates-section' },
  { id: 'pengalaman', name: 'Pengalaman', target: 'experience-section' },
  { id: 'kontak', name: 'Kontak', target: 'contact-section' },
];

const Navbar = ({ onStartTour, siteTitle }) => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.target))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-38% 0px -54% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-[46] transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl shadow-sm dark:shadow-slate-950/50 border-b border-slate-200/80 dark:border-slate-800/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero-section"
          onClick={(e) => handleNavClick(e, 'hero-section')}
          className="group flex items-center text-slate-900 dark:text-white font-extrabold text-sm sm:text-lg tracking-tight hover:opacity-90 transition-opacity truncate max-w-[180px] sm:max-w-none"
        >
          <span className="relative">
            {siteTitle ? siteTitle.split('|')[0].trim() : 'Ardiansyah Surya Pratama'}
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1.5 shadow-sm backdrop-blur">
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <a
                key={link.name}
                id={`nav-item-${link.id}`}
                href={`#${link.target}`}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors duration-300 ${
                  isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-slate-800 shadow-sm"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Buttons: Tour, Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Guided Tour Trigger Button */}
          {onStartTour && (
            <button
              onClick={onStartTour}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all shadow-sm btn-shine"
              title="Jalankan Interactive Guided Tour"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Tour Panduan</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all hover:scale-105 shadow-sm"
            title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: easeOutExpo }}
                className="flex items-center justify-center"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 mt-2 shadow-lg"
          >
            <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={`#${link.target}`}
                  onClick={(e) => handleNavClick(e, link.target)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.3, ease: easeOutExpo }}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    activeSection === link.target
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              {onStartTour && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartTour();
                  }}
                  className="flex items-center justify-center gap-2 mt-2 py-2 px-3 bg-blue-600 text-white rounded-lg text-sm font-semibold"
                >
                  <Compass className="w-4 h-4" /> Mulai Tour Panduan
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
