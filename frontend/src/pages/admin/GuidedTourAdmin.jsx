import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Compass, Loader2, X } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const GuidedTourAdmin = () => {
  const { addToast } = useToast();
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    target_selector: '',
    position: 'bottom',
    sort_order: 0,
    is_active: true,
  });

  const fetchSteps = async () => {
    try {
      const res = await api.get('/admin/guided-tour');
      setSteps(res.data.data || []);
    } catch {
      addToast('Gagal memuat langkah tour', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleOpenModal = (step = null) => {
    if (step) {
      setEditingId(step.id);
      setForm({
        title: step.title,
        description: step.description,
        target_selector: step.target_selector,
        position: step.position || 'bottom',
        sort_order: step.sort_order || 0,
        is_active: Boolean(step.is_active),
      });
    } else {
      setEditingId(null);
      setForm({
        title: '',
        description: '',
        target_selector: '#hero-section',
        position: 'bottom',
        sort_order: steps.length + 1,
        is_active: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/guided-tour/${editingId}`, form);
        addToast('Langkah tour berhasil diperbarui');
      } else {
        await api.post('/admin/guided-tour', form);
        addToast('Langkah tour baru berhasil ditambahkan');
      }
      setModalOpen(false);
      fetchSteps();
    } catch {
      addToast('Gagal menyimpan langkah tour', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus langkah panduan tour ini?')) return;
    try {
      await api.delete(`/admin/guided-tour/${id}`);
      addToast('Langkah berhasil dihapus');
      fetchSteps();
    } catch {
      addToast('Gagal menghapus langkah', 'error');
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
            Kelola Interactive Guided Tour
          </h2>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
            Atur alur penjelasan langkah-demi-langkah (walkthrough) untuk pengunjung baru.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Langkah Baru</span>
        </button>
      </div>

      <div className="bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 light:text-slate-600">
            <thead className="text-xs uppercase bg-slate-950/50 light:bg-slate-100 text-slate-400 border-b border-slate-800 light:border-slate-200">
              <tr>
                <th className="px-6 py-4">Urutan</th>
                <th className="px-6 py-4">Judul Langkah</th>
                <th className="px-6 py-4">Target Selector</th>
                <th className="px-6 py-4">Posisi Tooltip</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 light:divide-slate-200">
              {steps.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Belum ada langkah tour yang dibuat.
                  </td>
                </tr>
              ) : (
                steps.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-800/40 light:hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-blue-400">#{st.sort_order}</td>
                    <td className="px-6 py-4 font-bold text-white light:text-slate-900">
                      <div>{st.title}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">{st.description}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">
                      {st.target_selector}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold uppercase">{st.position}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(st)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(st.id)}
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
          <div className="relative w-full max-w-lg bg-slate-900 light:bg-white rounded-3xl border border-slate-800 light:border-slate-200 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white light:text-slate-900 mb-4">
              {editingId ? 'Edit Langkah Tour' : 'Tambah Langkah Tour'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Judul Langkah *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Showcase Proyek"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Deskripsi / Petunjuk *
                </label>
                <textarea
                  rows="3"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    CSS Selector Target *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="#hero-section"
                    value={form.target_selector}
                    onChange={(e) => setForm({ ...form, target_selector: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Posisi Tooltip
                  </label>
                  <select
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Nomor Urut
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                    />
                    <span>Aktif</span>
                  </label>
                </div>
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
                  Simpan Langkah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidedTourAdmin;
