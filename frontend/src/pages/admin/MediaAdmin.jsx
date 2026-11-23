import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Copy, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const MediaAdmin = () => {
  const { addToast } = useToast();
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const fetchMedia = async () => {
    try {
      const res = await api.get('/admin/media');
      setMediaList(res.data.data?.data || []);
    } catch {
      addToast('Gagal memuat berkas media', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await api.post('/admin/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      addToast('Berkas berhasil diunggah!');
      fetchMedia();
    } catch {
      addToast('Gagal mengunggah berkas', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus berkas ini dari media library?')) return;
    try {
      await api.delete(`/admin/media/${id}`);
      addToast('Berkas berhasil dihapus');
      fetchMedia();
    } catch {
      addToast('Gagal menghapus berkas', 'error');
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    addToast('URL berkas disalin ke clipboard!');
    setTimeout(() => setCopiedUrl(null), 2500);
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
            Media Library
          </h2>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
            Unggah dan kelola gambar thumbnail, sertifikat, dan berkas PDF CV portofolio.
          </p>
        </div>

        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 cursor-pointer transition-all">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <span>{uploading ? 'Mengunggah...' : 'Upload Berkas Baru'}</span>
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*,.pdf"
          />
        </label>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mediaList.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500">
            <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>Belum ada media yang diunggah. Klik Upload Berkas Baru.</p>
          </div>
        ) : (
          mediaList.map((m) => (
            <div
              key={m.id}
              className="group relative bg-slate-900 light:bg-white rounded-2xl border border-slate-800 light:border-slate-200 overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div className="aspect-square bg-slate-950 flex items-center justify-center overflow-hidden">
                {m.mime_type?.startsWith('image/') ? (
                  <img
                    src={m.path}
                    alt={m.original_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="text-center p-2 text-blue-400">
                    <span className="text-xs font-bold uppercase">{m.mime_type}</span>
                  </div>
                )}
              </div>

              <div className="p-3">
                <p className="text-xs font-semibold text-white light:text-slate-900 truncate" title={m.original_name}>
                  {m.original_name}
                </p>
                <p className="text-[10px] text-slate-500">
                  {(m.file_size / 1024).toFixed(1)} KB
                </p>
              </div>

              {/* Action Overlay */}
              <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                <button
                  onClick={() => handleCopy(m.path)}
                  className="p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700"
                  title="Salin URL"
                >
                  {copiedUrl === m.path ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/40"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MediaAdmin;
