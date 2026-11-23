import React, { useState, useEffect } from 'react';
import { Sun, Moon, Compass, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = ({ onStartTour, siteTitle }) => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', name: 'Home', href: '#hero-section' },
    { id: 'tentang', name: 'Tentang', href: '#about-section' },
    { id: 'proyek', name: 'Proyek', href: '#projects-section' },
    { id: 'keahlian', name: 'Keahlian', href: '#skills-section' },
    { id: 'sertifikat', name: 'Sertifikat', href: '#certificates-section' },
    { id: 'pengalaman', name: 'Pengalaman', href: '#experience-section' },
    { id: 'kontak', name: 'Kontak', href: '#contact-section' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-[46] transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm dark:shadow-slate-950/50 border-b border-slate-200 dark:border-slate-800 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero-section"
          className="flex items-center text-slate-900 dark:text-white font-extrabold text-sm sm:text-lg tracking-tight hover:opacity-90 transition-opacity truncate max-w-[180px] sm:max-w-none"
        >
          <span>{siteTitle ? siteTitle.split('|')[0].trim() : 'Ardiansyah Surya Pratama'}</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1.5 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-item-${link.id}`}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Tour, Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Guided Tour Trigger Button */}
          {onStartTour && (
            <button
              onClick={onStartTour}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all shadow-sm"
              title="Jalankan Interactive Guided Tour"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Tour Panduan</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all hover:scale-105 shadow-sm"
            title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 mt-2 flex flex-col gap-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {link.name}
            </a>
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
      )}
    </header>
  );
};

export default Navbar;
