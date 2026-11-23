import React, { useState, useEffect, useRef } from 'react';
import { Save, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const ProfileAdmin = () => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const avatarInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: '',
    headline: '',
    bio: '',
    about: '',
    email: '',
    location: '',
    avatar_url: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/admin/profile');
        if (res.data.data) {
          setProfile(res.data.data);
        }
      } catch (err) {
        addToast('Gagal memuat profil', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Harap pilih file gambar (JPG, PNG, WebP)', 'error');
      return;
    }

    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'avatar');

    try {
      const res = await api.post('/admin/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const uploadedUrl = res.data.url;
      setProfile((prev) => ({ ...prev, avatar_url: uploadedUrl }));
      addToast('Foto profil berhasil diunggah!');
    } catch (err) {
      addToast(err.response?.data?.message || 'Gagal mengunggah foto', 'error');
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/admin/profile', profile);
      addToast(res.data.message || 'Profil berhasil disimpan!');
    } catch (err) {
      addToast('Gagal menyimpan profil', 'error');
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
          Kelola Informasi Profil
        </h2>
        <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
          Ubah data diri, headline profesi, biografi, unggah foto profil, dan informasi kontak publik Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Upload Avatar Section */}
        <div className="p-5 rounded-2xl bg-slate-950/70 light:bg-slate-50 border border-slate-800 light:border-slate-200 flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-800 border-2 border-blue-500/40 shrink-0">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                <ImageIcon className="w-8 h-8" />
              </div>
            )}
            {uploadingAvatar && (
              <div className="absolute inset-0 bg-slate-950/75 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
              </div>
            )}
          </div>

          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <span className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider">
              Foto Profil / Avatar
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <input
                type="file"
                ref={avatarInputRef}
                onChange={handleAvatarFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                disabled={uploadingAvatar}
                onClick={() => avatarInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingAvatar ? 'Mengunggah...' : 'Unggah Foto Baru'}</span>
              </button>
              {profile.avatar_url && (
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, avatar_url: '' })}
                  className="text-xs text-rose-400 hover:underline font-semibold"
                >
                  Hapus Foto
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Format yang didukung: PNG, JPG, WebP. Maksimal 15MB.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
              Nama Lengkap & Gelar *
            </label>
            <input
              type="text"
              required
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
              Headline Profesi *
            </label>
            <input
              type="text"
              required
              value={profile.headline || ''}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
            Bio Ringkas (Ditampilkan di Hero)
          </label>
          <textarea
            rows="2"
            value={profile.bio || ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
            Tentang Saya Lengkap (Ditampilkan di Bagian About)
          </label>
          <textarea
            rows="5"
            value={profile.about || ''}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
              Email Publik
            </label>
            <input
              type="email"
              value={profile.email || ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
              Lokasi Domisili
            </label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileAdmin;
