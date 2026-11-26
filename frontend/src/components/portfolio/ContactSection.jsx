import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, MessageSquare, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { Reveal, Stagger, StaggerItem } from '../common/Reveal';
import MagneticButton from '../common/MagneticButton';
import { easeOutExpo } from '../../lib/motion';

const ContactSection = ({ profile, socialLinks }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/contact', formData);
      addToast(res.data.message || 'Pesan Anda berhasil dikirim!');
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengirim pesan. Silakan coba lagi.';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <Reveal className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Hubungi Saya</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight section-heading">
          Mari Memulai Diskusi Proyek atau Peluang Karir
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
          Saya selalu terbuka untuk mendiskusikan peluang karir, konsultasi pengembangan aplikasi, atau tawaran kerja sama profesional.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Info Cards */}
        <Reveal variant="left" className="lg:col-span-5 space-y-4">
          <div className="card-shine p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              Informasi Kontak
            </h3>

            <div className="space-y-5">
              {/* Hanya tampilkan Lokasi — Email & HP disembunyikan untuk privasi */}
              {profile?.location && (
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lokasi</span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{profile.location}</p>
                  </div>
                </div>
              )}

              {/* Ajakan gunakan form */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pesan Langsung</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                    Gunakan formulir di bawah untuk mengirim pesan — saya akan merespons secepat mungkin.
                  </p>
                </div>
              </div>
            </div>

            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Sosial Media & Jaringan
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {socialLinks
                    .filter((s) => !s.platform.toLowerCase().includes('whatsapp') && !s.url.includes('wa.me'))
                    .map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      {s.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* Right Column: Interactive Form */}
        <Reveal variant="right" className="lg:col-span-7">
          <div className="card-shine p-6 sm:p-8 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur">
            {success ? (
              <motion.div
                className="relative py-12 text-center"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              >
                <div className="relative mx-auto mb-4 h-20 w-20">
                  <motion.svg
                    viewBox="0 0 52 52"
                    className="h-20 w-20 text-emerald-500"
                    initial="hidden"
                    animate="show"
                  >
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="23"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        show: {
                          pathLength: 1,
                          opacity: 1,
                          transition: { duration: 0.7, ease: easeOutExpo },
                        },
                      }}
                    />
                    <motion.path
                      d="M15 27l7 7 15-16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={{
                        hidden: { pathLength: 0 },
                        show: {
                          pathLength: 1,
                          transition: { duration: 0.5, delay: 0.35, ease: easeOutExpo },
                        },
                      }}
                    />
                  </motion.svg>

                  {Array.from({ length: 8 }).map((_, index) => {
                    const angle = (index / 8) * Math.PI * 2;
                    return (
                      <motion.span
                        key={index}
                        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-emerald-400"
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{
                          x: Math.cos(angle) * 46,
                          y: Math.sin(angle) * 46,
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0.5],
                        }}
                        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                      />
                    );
                  })}
                </div>

                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Pesan Terkirim!</h4>
                <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
                  Terima kasih telah menghubungi saya. Pesan Anda telah tersimpan dengan aman dan saya akan segera membalasnya.
                </p>
                <motion.button
                  onClick={() => setSuccess(false)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Kirim Pesan Lain
                </motion.button>
              </motion.div>
            ) : (
              <Stagger as="form" onSubmit={handleSubmit} className="space-y-4" stagger={0.07}>
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <StaggerItem className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Budi Santoso"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-glow w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="budi@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-glow w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Subjek *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Diskusi Proyek Web / Peluang Karir"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-glow w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 text-sm"
                  />
                </StaggerItem>

                <StaggerItem>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Pesan *
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tuliskan pesan Anda secara detail di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-glow w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 text-sm resize-none"
                  />
                </StaggerItem>

                <StaggerItem>
                  <MagneticButton
                    type="submit"
                    disabled={loading}
                    className="btn-shine w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Mengirim Pesan...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Kirim Pesan Sekarang
                      </>
                    )}
                  </MagneticButton>
                </StaggerItem>
              </Stagger>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
