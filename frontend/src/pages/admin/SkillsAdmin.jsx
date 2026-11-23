import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, X, Check } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const SkillsAdmin = () => {
  const { addToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState('');
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [skillForm, setSkillForm] = useState({
    category_id: '',
    name: '',
    level: 'Advanced',
    icon: '',
    sort_order: 0,
    is_published: true,
  });

  const fetchSkills = async () => {
    try {
      const res = await api.get('/admin/skills');
      setCategories(res.data.data || []);
    } catch {
      addToast('Gagal memuat skills', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      await api.post('/admin/skill-categories', { name: newCatName });
      addToast('Kategori baru berhasil dibuat');
      setNewCatName('');
      fetchSkills();
    } catch {
      addToast('Gagal membuat kategori', 'error');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Hapus kategori ini beserta seluruh skill di dalamnya?')) return;
    try {
      await api.delete(`/admin/skill-categories/${id}`);
      addToast('Kategori berhasil dihapus');
      fetchSkills();
    } catch {
      addToast('Gagal menghapus kategori', 'error');
    }
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/skills', skillForm);
      addToast('Skill baru berhasil ditambahkan');
      setSkillModalOpen(false);
      fetchSkills();
    } catch {
      addToast('Gagal menyimpan skill', 'error');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Hapus skill ini?')) return;
    try {
      await api.delete(`/admin/skills/${id}`);
      addToast('Skill berhasil dihapus');
      fetchSkills();
    } catch {
      addToast('Gagal menghapus skill', 'error');
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Kelola Keahlian & Kategori
          </h2>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
            Kelola kategori teknologi dan daftar skill keahlian portofolio Anda.
          </p>
        </div>

        <button
          onClick={() => {
            if (categories.length === 0) {
              addToast('Buat kategori terlebih dahulu', 'error');
              return;
            }
            setSkillForm({
              category_id: categories[0]?.id || '',
              name: '',
              level: 'Advanced',
              icon: '',
              sort_order: 0,
              is_published: true,
            });
            setSkillModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Skill Baru</span>
        </button>
      </div>

      {/* Add Category Bar */}
      <form onSubmit={handleAddCategory} className="flex gap-3 max-w-md">
        <input
          type="text"
          placeholder="Nama Kategori Baru (e.g. Cloud & DevOps)"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-300 text-sm focus:outline-none focus:border-blue-500 text-white light:text-slate-900"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-200 light:text-slate-800 font-bold text-sm hover:bg-slate-700"
        >
          Tambah Kategori
        </button>
      </form>

      {/* Categories & Skills Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-3xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 light:border-slate-100 mb-4">
              <h3 className="font-bold text-lg text-white light:text-slate-900">{cat.name}</h3>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>

            <div className="space-y-2">
              {cat.skills?.length === 0 ? (
                <p className="text-xs text-slate-500 py-3">Belum ada skill dalam kategori ini.</p>
              ) : (
                cat.skills?.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 light:bg-slate-50 border border-slate-800/40 light:border-slate-200"
                  >
                    <div>
                      <span className="font-semibold text-sm text-white light:text-slate-900">{s.name}</span>
                      <span className="ml-2 text-xs text-blue-400 font-bold">{s.level}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteSkill(s.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Modal */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 light:bg-white rounded-3xl border border-slate-800 light:border-slate-200 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSkillModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white light:text-slate-900 mb-4">
              Tambah Skill Baru
            </h3>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Kategori *
                </label>
                <select
                  value={skillForm.category_id}
                  onChange={(e) => setSkillForm({ ...skillForm, category_id: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Nama Skill *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js, Docker, PostgreSQL"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Tingkat Penguasaan
                </label>
                <select
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                >
                  Simpan Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsAdmin;
