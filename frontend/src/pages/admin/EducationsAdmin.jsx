import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const EducationsAdmin = () => {
  const { addToast } = useToast();
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    institution: '',
    degree: '',
    field_of_study: '',
    start_year: 2018,
    end_year: 2022,
    description: '',
    gpa: '',
    transcript_url: '',
    sort_order: 0,
    is_published: true,
  });

  const fetchEdu = async () => {
    try {
      const res = await api.get('/admin/educations');
      setEducations(res.data.data || []);
    } catch {
      addToast('Gagal memuat pendidikan', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEdu();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setForm({
        institution: item.institution,
        degree: item.degree,
        field_of_study: item.field_of_study,
        start_year: item.start_year,
        end_year: item.end_year || '',
        description: item.description || '',
        gpa: item.gpa || '',
        transcript_url: item.transcript_url || '',
        sort_order: item.sort_order || 0,
        is_published: Boolean(item.is_published),
      });
    } else {
      setEditingId(null);
      setForm({
        institution: '',
        degree: 'Sarjana Komputer (S.Kom)',
        field_of_study: 'Teknik Informatika',
        start_year: new Date().getFullYear() - 4,
        end_year: new Date().getFullYear(),
        description: '',
        gpa: '',
        transcript_url: '',
        sort_order: educations.length + 1,
        is_published: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/educations/${editingId}`, form);
        addToast('Pendidikan berhasil diperbarui');
      } else {
        await api.post('/admin/educations', form);
        addToast('Pendidikan baru berhasil ditambahkan');
      }
      setModalOpen(false);
      fetchEdu();
    } catch {
      addToast('Gagal menyimpan pendidikan', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus riwayat pendidikan ini?')) return;
    try {
      await api.delete(`/admin/educations/${id}`);
      addToast('Pendidikan berhasil dihapus');
      fetchEdu();
    } catch {
      addToast('Gagal menghapus pendidikan', 'error');
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
            Kelola Pendidikan
          </h2>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
            Riwayat pendidikan resmi dan pencapaian akademis.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pendidikan</span>
        </button>
      </div>

      <div className="bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 light:text-slate-600">
            <thead className="text-xs uppercase bg-slate-950/50 light:bg-slate-100 text-slate-400 border-b border-slate-800 light:border-slate-200">
              <tr>
                <th className="px-6 py-4">Institusi</th>
                <th className="px-6 py-4">Jenjang</th>
                <th className="px-6 py-4">Program Studi</th>
                <th className="px-6 py-4">Tahun</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 light:divide-slate-200">
              {educations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Belum ada riwayat pendidikan.
                  </td>
                </tr>
              ) : (
                educations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 light:hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-white light:text-slate-900">
                      {item.institution}
                    </td>
                    <td className="px-6 py-4">{item.degree}</td>
                    <td className="px-6 py-4">{item.field_of_study}</td>
                    <td className="px-6 py-4 text-xs">
                      {item.start_year} — {item.end_year || 'Sekarang'}
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
          <div className="relative w-full max-w-lg bg-slate-900 light:bg-white rounded-3xl border border-slate-800 light:border-slate-200 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white light:text-slate-900 mb-4">
              {editingId ? 'Edit Pendidikan' : 'Tambah Pendidikan'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Institusi / Universitas *
                </label>
                <input
                  type="text"
                  required
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Jenjang / Gelar *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.degree}
                    onChange={(e) => setForm({ ...form, degree: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Program Studi *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.field_of_study}
                    onChange={(e) => setForm({ ...form, field_of_study: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Tahun Mulai *
                  </label>
                  <input
                    type="number"
                    required
                    value={form.start_year}
                    onChange={(e) => setForm({ ...form, start_year: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Tahun Lulus
                  </label>
                  <input
                    type="number"
                    value={form.end_year}
                    onChange={(e) => setForm({ ...form, end_year: e.target.value })}
                    placeholder="Kosongkan jika masih studi"
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Deskripsi / IPK / Prestasi
                </label>
                <textarea
                  rows="2"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    IPK
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3.73 / 4.00"
                    value={form.gpa}
                    onChange={(e) => setForm({ ...form, gpa: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Link Transkrip (Drive)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={form.transcript_url}
                    onChange={(e) => setForm({ ...form, transcript_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
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

export default EducationsAdmin;
