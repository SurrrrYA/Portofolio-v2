import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Loader2, X } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const SocialLinksAdmin = () => {
  const { addToast } = useToast();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    platform: '',
    label: '',
    url: '',
    icon: '',
    sort_order: 0,
    is_active: true,
  });

  const fetchLinks = async () => {
    try {
      const res = await api.get('/admin/social-links');
      setLinks(res.data.data || []);
    } catch {
      addToast('Gagal memuat link sosial', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setForm({
        platform: item.platform,
        label: item.label,
        url: item.url,
        icon: item.icon || '',
        sort_order: item.sort_order || 0,
        is_active: Boolean(item.is_active),
      });
    } else {
      setEditingId(null);
      setForm({
        platform: 'GitHub',
        label: 'github.com/username',
        url: 'https://github.com/',
        icon: 'Github',
        sort_order: links.length + 1,
        is_active: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/social-links/${editingId}`, form);
        addToast('Link berhasil diperbarui');
      } else {
        await api.post('/admin/social-links', form);
        addToast('Link baru berhasil ditambahkan');
      }
      setModalOpen(false);
      fetchLinks();
    } catch {
      addToast('Gagal menyimpan link', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus link sosial ini?')) return;
    try {
      await api.delete(`/admin/social-links/${id}`);
      addToast('Link berhasil dihapus');
      fetchLinks();
    } catch {
      addToast('Gagal menghapus link', 'error');
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Kelola Social Links
          </h2>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
            Tautan media sosial dan profil profesional Anda di halaman publik.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Social Link</span>
        </button>
      </div>

      <div className="bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 light:text-slate-600">
            <thead className="text-xs uppercase bg-slate-950/50 light:bg-slate-100 text-slate-400 border-b border-slate-800 light:border-slate-200">
              <tr>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Label</th>
                <th className="px-6 py-4">Tautan URL</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 light:divide-slate-200">
              {links.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Belum ada tautan sosial.
                  </td>
                </tr>
              ) : (
                links.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 light:hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-white light:text-slate-900">
                      {item.platform}
                    </td>
                    <td className="px-6 py-4">{item.label}</td>
                    <td className="px-6 py-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline flex items-center gap-1 text-xs"
                      >
                        <span className="truncate max-w-xs">{item.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                        Aktif
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 light:bg-white rounded-3xl border border-slate-800 light:border-slate-200 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white light:text-slate-900 mb-4">
              {editingId ? 'Edit Social Link' : 'Tambah Social Link'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Platform *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GitHub, LinkedIn, Instagram"
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Label Tampilan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="github.com/username"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Tautan URL Lengkap *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinksAdmin;
