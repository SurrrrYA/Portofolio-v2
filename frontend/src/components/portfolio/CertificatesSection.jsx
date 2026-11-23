import React, { useState } from 'react';
import { Award, ExternalLink, Calendar, ShieldCheck, Eye, X, ZoomIn, ChevronDown, ChevronUp } from 'lucide-react';

const INITIAL_LIMIT = 3;

const CertificatesSection = ({ certificates }) => {
  const [activeCert, setActiveCert] = useState(null);
  const [showAll, setShowAll] = useState(false);

  if (!certificates || certificates.length === 0) return null;

  const visible = showAll ? certificates : certificates.slice(0, INITIAL_LIMIT);
  const hasMore = certificates.length > INITIAL_LIMIT;

  return (
    <section id="certificates-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <Award className="w-3.5 h-3.5" />
          <span>Sertifikasi Profesional</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Kompetensi Terverifikasi & Lisensi Resmi
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
          Pengakuan resmi atas keahlian teknis dari BNSP dan institusi profesional terakreditasi. Klik kartu untuk melihat preview langsung.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal-stagger">
        {visible.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setActiveCert(cert)}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 shadow-sm hover:shadow-md group cursor-pointer hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" /> Preview
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {cert.issuer}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Diterbitkan: {cert.issue_date}</span>
              </div>

              {cert.credential_id && (
                <div className="mt-1.5 text-xs text-slate-500 font-mono">
                  ID: {cert.credential_id}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Lihat Dokumen</span>
              </span>

              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  title="Buka Verifikasi Asli"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Less Button */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {showAll ? (
              <><ChevronUp className="w-4 h-4" /> Tutup</>
            ) : (
              <><ChevronDown className="w-4 h-4" /> Lihat Semua {certificates.length} Sertifikat</>
            )}
          </button>
        </div>
      )}

      {/* In-App Certificate Lightbox Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              title="Tutup Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-12 mb-5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                  {activeCert.issuer}
                </span>
                <span className="text-xs text-slate-400">
                  Diterbitkan {activeCert.issue_date}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {activeCert.title}
              </h3>
              {activeCert.credential_id && (
                <p className="mt-1 text-xs font-mono text-slate-500">
                  Credential ID: {activeCert.credential_id}
                </p>
              )}
            </div>

            <div className="w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[350px]">
              <img
                src={
                  activeCert.file_url ||
                  'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1200'
                }
                alt={activeCert.title}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500">
                Dokumen resmi terverifikasi dan tersimpan aman di CMS.
              </span>

              <div className="flex items-center gap-2">
                {activeCert.credential_url && (
                  <a
                    href={activeCert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <span>Verifikasi Kredensial Resmi</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setActiveCert(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;
