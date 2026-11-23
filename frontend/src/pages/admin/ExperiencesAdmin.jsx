import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const ExperiencesAdmin = () => {
  const { addToast } = useToast();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    company: '',
    role: '',
    type: 'Work',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    responsibilities: '',
    sort_order: 0,
    is_published: true,
  });

  const fetchExp = async () => {
    try {
      const res = await api.get('/admin/experiences');
      setExperiences(res.data.data || []);
    } catch {
      addToast('Gagal memuat pengalaman', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExp();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setForm({
        company: item.company,
        role: item.role,
        type: item.type || 'Work',
        location: item.location || '',
        start_date: item.start_date,
        end_date: item.end_date || '',
        is_current: Boolean(item.is_current),
        description: item.description || '',
        responsibilities: item.responsibilities || '',
        sort_order: item.sort_order || 0,
        is_published: Boolean(item.is_published),
      });
    } else {
      setEditingId(null);
      setForm({
        company: '',
        role: '',
        type: 'Work',
        location: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        is_current: false,
        description: '',
        responsibilities: '',
        sort_order: experiences.length + 1,
        is_published: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/experiences/${editingId}`, form);
        addToast('Pengalaman berhasil diperbarui');
      } else {
        await api.post('/admin/experiences', form);
        addToast('Pengalaman baru berhasil ditambahkan');
      }
      setModalOpen(false);
      fetchExp();
    } catch {
      addToast('Gagal menyimpan pengalaman', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus pengalaman ini?')) return;
    try {
      await api.delete(`/admin/experiences/${id}`);
      addToast('Pengalaman berhasil dihapus');
      fetchExp();
    } catch {
      addToast('Gagal menghapus pengalaman', 'error');
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
            Kelola Pengalaman
          </h2>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
            Riwayat pekerjaan, magang, dan peran profesional Anda.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengalaman Baru</span>
        </button>
      </div>

      <div className="bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 light:text-slate-600">
            <thead className="text-xs uppercase bg-slate-950/50 light:bg-slate-100 text-slate-400 border-b border-slate-800 light:border-slate-200">
              <tr>
                <th className="px-6 py-4">Peran / Jabatan</th>
                <th className="px-6 py-4">Perusahaan</th>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Periode</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 light:divide-slate-200">
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Belum ada riwayat pengalaman.
                  </td>
                </tr>
              ) : (
                experiences.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 light:hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-white light:text-slate-900">
                      {item.role}
                    </td>
                    <td className="px-6 py-4">{item.company}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {item.start_date} — {item.is_current ? 'Sekarang' : item.end_date}
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
          <div className="relative w-full max-w-xl bg-slate-900 light:bg-white rounded-3xl border border-slate-800 light:border-slate-200 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white light:text-slate-900 mb-4">
              {editingId ? 'Edit Pengalaman' : 'Tambah Pengalaman'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Jabatan / Peran *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Perusahaan / Organisasi *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Tipe Pengalaman
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Work">Pekerjaan (Work)</option>
                    <option value="Internship">Magang (Internship)</option>
                    <option value="Organization">Organisasi / Volunteer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Jakarta (Hybrid)"
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Tanggal Mulai *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    disabled={form.is_current}
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-40"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={form.is_current}
                  onChange={(e) => setForm({ ...form, is_current: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                <span>Masih aktif bekerja di sini (Currently Working)</span>
              </label>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Deskripsi Peran
                </label>
                <textarea
                  rows="2"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Tanggung Jawab & Pencapaian
                </label>
                <textarea
                  rows="3"
                  value={form.responsibilities}
                  onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
                  placeholder="• Mengoptimalkan performa...&#10;• Memimpin tim..."
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

export default ExperiencesAdmin;
