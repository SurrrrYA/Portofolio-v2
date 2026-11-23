import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  Loader2,
  X,
  Upload,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const ProjectsAdmin = () => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    description: '',
    thumbnail_url: '',
    repo_url: '',
    demo_url: '',
    status: 'Completed',
    is_featured: false,
    is_published: true,
    sort_order: 0,
    images: [],
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get('/admin/projects');
      setProjects(res.data.data || []);
    } catch {
      addToast('Gagal memuat proyek', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setForm({
        title: project.title,
        slug: project.slug,
        summary: project.summary || '',
        description: project.description || '',
        thumbnail_url: project.thumbnail_url || '',
        repo_url: project.repo_url || '',
        demo_url: project.demo_url || '',
        status: project.status || 'Completed',
        is_featured: Boolean(project.is_featured),
        is_published: Boolean(project.is_published),
        sort_order: project.sort_order || 0,
        images: project.images
          ? project.images.map((img, idx) => ({
              id: img.id,
              image_url: img.image_url,
              caption: img.caption || '',
              sort_order: img.sort_order || idx + 1,
            }))
          : [],
      });
    } else {
      setEditingId(null);
      setForm({
        title: '',
        slug: '',
        summary: '',
        description: '',
        thumbnail_url: '',
        repo_url: '',
        demo_url: '',
        status: 'Completed',
        is_featured: false,
        is_published: true,
        sort_order: projects.length + 1,
        images: [],
      });
    }
    setModalOpen(true);
  };

  // Multi-upload handler
  const handleFilesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingImages(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files[]', file);
    });
    formData.append('category', 'project');

    try {
      const res = await api.post('/admin/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const urls = res.data.urls || [res.data.url];
      const newImages = urls.map((url, idx) => ({
        image_url: url,
        caption: '',
        sort_order: (form.images.length || 0) + idx + 1,
      }));

      setForm((prev) => {
        const updatedImages = [...prev.images, ...newImages];
        return {
          ...prev,
          images: updatedImages,
          thumbnail_url: prev.thumbnail_url || updatedImages[0]?.image_url || '',
        };
      });

      addToast(`${urls.length} gambar berhasil diunggah!`);
    } catch (err) {
      addToast(err.response?.data?.message || 'Gagal mengunggah gambar proyek', 'error');
    } finally {
      setUploadingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Image reordering
  const moveImage = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= form.images.length) return;

    const updated = [...form.images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Recalculate sort_order
    const reordered = updated.map((img, idx) => ({ ...img, sort_order: idx + 1 }));
    setForm((prev) => ({ ...prev, images: reordered }));
  };

  const removeImage = (index) => {
    const updated = form.images.filter((_, idx) => idx !== index);
    const reordered = updated.map((img, idx) => ({ ...img, sort_order: idx + 1 }));
    setForm((prev) => ({
      ...prev,
      images: reordered,
      thumbnail_url:
        prev.thumbnail_url === form.images[index]?.image_url
          ? reordered[0]?.image_url || ''
          : prev.thumbnail_url,
    }));
  };

  const setAsThumbnail = (url) => {
    setForm((prev) => ({ ...prev, thumbnail_url: url }));
    addToast('Thumbnail utama diperbarui');
  };

  const updateImageCaption = (index, caption) => {
    const updated = [...form.images];
    updated[index] = { ...updated[index], caption };
    setForm((prev) => ({ ...prev, images: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/admin/projects/${editingId}`, form);
        addToast('Proyek berhasil diperbarui!');
      } else {
        await api.post('/admin/projects', form);
        addToast('Proyek baru berhasil ditambahkan!');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      addToast(err.response?.data?.message || 'Gagal menyimpan proyek', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus proyek ini?')) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      addToast('Proyek berhasil dihapus');
      fetchProjects();
    } catch {
      addToast('Gagal menghapus proyek', 'error');
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
            Kelola Proyek Portofolio
          </h2>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
            Tambah, edit, multi-unggah gambar, urutkan galeri, dan tentukan status karya portofolio Anda.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 light:text-slate-600">
            <thead className="text-xs uppercase bg-slate-950/50 light:bg-slate-100 text-slate-400 border-b border-slate-800 light:border-slate-200">
              <tr>
                <th className="px-6 py-4">Proyek & Galeri</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Publikasi</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 light:divide-slate-200">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Belum ada data proyek. Klik tombol Tambah Proyek untuk mulai.
                  </td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-800/40 light:hover:bg-slate-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                        <img
                          src={proj.thumbnail_url || 'https://via.placeholder.com/150'}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white light:text-slate-900">{proj.title}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{proj.slug}</span>
                          {proj.images?.length > 0 && (
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-blue-400 text-[10px] font-semibold">
                              {proj.images.length} foto
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700">
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {proj.is_featured ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> Ya
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">Tidak</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {proj.is_published ? (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-400">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(proj)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                        title="Hapus"
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

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 light:bg-white rounded-3xl border border-slate-800 light:border-slate-200 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white light:text-slate-900 mb-6">
              {editingId ? 'Edit Proyek' : 'Tambah Proyek Baru'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Judul Proyek *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    placeholder="otomatis dari judul bila kosong"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Ringkasan Singkat
                </label>
                <textarea
                  rows="2"
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Deskripsi Lengkap
                </label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Multi-Upload Gallery & Image Ordering Section */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                      Galeri Gambar Proyek (Bisa Multi-Upload & Diurutkan)
                    </span>
                    <span className="text-xs text-slate-400">
                      Unggah screenshot, diagram arsitektur, atau bukti demo proyek.
                    </span>
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFilesUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploadingImages}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      {uploadingImages ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span>{uploadingImages ? 'Mengunggah...' : 'Pilih Gambar (Multi)'}</span>
                    </button>
                  </div>
                </div>

                {/* Images List / Sort Grid */}
                {form.images && form.images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    {form.images.map((img, idx) => {
                      const isMainThumb = form.thumbnail_url === img.image_url;
                      return (
                        <div
                          key={idx}
                          className={`relative rounded-xl border p-2.5 bg-slate-900 flex flex-col justify-between gap-2 transition-all ${
                            isMainThumb ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-800'
                          }`}
                        >
                          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-950">
                            <img
                              src={img.image_url}
                              alt={`Gambar ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {isMainThumb && (
                              <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold shadow flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Sampul Utama</span>
                              </div>
                            )}
                            <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-mono">
                              #{idx + 1}
                            </span>
                          </div>

                          <input
                            type="text"
                            placeholder="Keterangan gambar..."
                            value={img.caption || ''}
                            onChange={(e) => updateImageCaption(idx, e.target.value)}
                            className="w-full px-2.5 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                          />

                          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => moveImage(idx, -1)}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                                title="Geser ke Kiri / Atas"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === form.images.length - 1}
                                onClick={() => moveImage(idx, 1)}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                                title="Geser ke Kanan / Bawah"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {!isMainThumb && (
                                <button
                                  type="button"
                                  onClick={() => setAsThumbnail(img.image_url)}
                                  className="text-[11px] text-blue-400 hover:underline font-semibold"
                                >
                                  Jadikan Sampul
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="p-1 text-rose-400 hover:bg-rose-500/10 rounded"
                                title="Hapus Gambar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-600" />
                    Belum ada gambar di galeri proyek ini. Klik tombol di atas untuk unggah multiple gambar.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    URL Thumbnail Utama
                  </label>
                  <input
                    type="text"
                    value={form.thumbnail_url}
                    onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                    placeholder="https://... atau /storage/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Repository URL
                  </label>
                  <input
                    type="text"
                    value={form.repo_url}
                    onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={form.demo_url}
                    onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                  />
                  <span>Tampilkan sebagai Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                  />
                  <span>Publikasikan (Published)</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Simpan Proyek</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;
