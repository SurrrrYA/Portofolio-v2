import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = ({ siteTitle }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10 px-4 sm:px-6 lg:px-8 mt-16 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()}{' '}
            <span className="font-bold text-slate-800 dark:text-white">
              {siteTitle ? siteTitle.split('|')[0].trim() : 'Ardiansyah Surya Pratama'}
            </span>
            {' '}• Dikelola dengan Personal Portfolio CMS
          </p>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all hover:scale-105"
        >
          <span>Kembali ke Atas</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
