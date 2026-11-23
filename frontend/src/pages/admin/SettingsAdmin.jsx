import React, { useState, useEffect } from 'react';
import { Save, Loader2, Settings } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const SettingsAdmin = () => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    site_title: '',
    site_tagline: '',
    hero_heading: '',
    typing_roles: '[]',
    contact_email: '',
    theme_default: 'dark',
    tour_enabled: '1',
    meta_description: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/site-settings');
        if (res.data.data) {
          setSettings(res.data.data);
        }
      } catch {
        addToast('Gagal memuat pengaturan', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/admin/site-settings', settings);
      addToast('Pengaturan situs & SEO berhasil disimpan!');
    } catch {
      addToast('Gagal menyimpan pengaturan', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white light:text-slate-900 tracking-tight">
          Pengaturan Situs & SEO
        </h2>
        <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
          Sesuaikan judul situs, meta deskripsi SEO, animasi teks profesi, dan konfigurasi guided tour.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
              Judul Website (Site Title) *
            </label>
            <input
              type="text"
              required
              value={settings.site_title || ''}
              onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
              Slogan / Tagline
            </label>
            <input
              type="text"
              value={settings.site_tagline || ''}
              onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
            Profesi Typing Animation (JSON Array String)
          </label>
          <input
            type="text"
            value={settings.typing_roles || ''}
            onChange={(e) => setSettings({ ...settings, typing_roles: e.target.value })}
            placeholder='["Full-Stack Developer", "Laravel Specialist"]'
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
            Meta Description (SEO & Open Graph)
          </label>
          <textarea
            rows="3"
            value={settings.meta_description || ''}
            onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
              Tema Default Website
            </label>
            <select
              value={settings.theme_default || 'dark'}
              onChange={(e) => setSettings({ ...settings, theme_default: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
            >
              <option value="dark">Dark Mode (Default)</option>
              <option value="light">Light Mode</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
              Aktifkan Guided Tour Publik
            </label>
            <select
              value={settings.tour_enabled || '1'}
              onChange={(e) => setSettings({ ...settings, tour_enabled: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
            >
              <option value="1">Aktif (Enabled)</option>
              <option value="0">Non-aktif (Disabled)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsAdmin;
