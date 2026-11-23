import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Archive, Loader2, X } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const MessagesAdmin = () => {
  const { addToast } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState(null);
  const [filter, setFilter] = useState('');

  const fetchMessages = async () => {
    try {
      const url = filter ? `/admin/messages?status=${filter}` : '/admin/messages';
      const res = await api.get(url);
      setMessages(res.data.data?.data || []);
    } catch {
      addToast('Gagal memuat pesan', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/messages/${id}`, { status });
      addToast(`Status pesan diubah ke ${status}`);
      if (activeMessage && activeMessage.id === id) {
        setActiveMessage({ ...activeMessage, status });
      }
      fetchMessages();
    } catch {
      addToast('Gagal mengubah status pesan', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus pesan ini secara permanen?')) return;
    try {
      await api.delete(`/admin/messages/${id}`);
      addToast('Pesan berhasil dihapus');
      setActiveMessage(null);
      fetchMessages();
    } catch {
      addToast('Gagal menghapus pesan', 'error');
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
            Pesan Masuk Pengunjung
          </h2>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
            Pesan yang dikirimkan melalui formulir kontak portofolio.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['', 'unread', 'read', 'archived'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === s
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 light:bg-slate-100 text-slate-400 hover:text-white'
              }`}
            >
              {s === '' ? 'Semua' : s === 'unread' ? 'Belum Dibaca' : s === 'read' ? 'Sudah Dibaca' : 'Arsip'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 light:text-slate-600">
            <thead className="text-xs uppercase bg-slate-950/50 light:bg-slate-100 text-slate-400 border-b border-slate-800 light:border-slate-200">
              <tr>
                <th className="px-6 py-4">Pengirim</th>
                <th className="px-6 py-4">Subjek</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 light:divide-slate-200">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Tidak ada pesan yang ditemukan.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => {
                      setActiveMessage(msg);
                      if (msg.status === 'unread') {
                        handleUpdateStatus(msg.id, 'read');
                      }
                    }}
                    className="hover:bg-slate-800/40 light:hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white light:text-slate-900">{msg.name}</div>
                      <div className="text-xs text-slate-500">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-200 light:text-slate-800">
                      {msg.subject}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(msg.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          msg.status === 'unread'
                            ? 'bg-amber-500/10 text-amber-400'
                            : msg.status === 'read'
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      {msg.status === 'unread' ? (
                        <button
                          onClick={() => handleUpdateStatus(msg.id, 'read')}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          title="Tandai Sudah Dibaca"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateStatus(msg.id, 'unread')}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                          title="Tandai Belum Dibaca"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                        title="Hapus Pesan"
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

      {/* Message Detail Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-slate-900 light:bg-white rounded-3xl border border-slate-800 light:border-slate-200 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveMessage(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Detail Pesan Kontak
            </span>
            <h3 className="text-xl font-bold text-white light:text-slate-900 mt-1">
              {activeMessage.subject}
            </h3>

            <div className="mt-4 p-4 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-200 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-slate-200 light:text-slate-800">{activeMessage.name}</p>
                <p className="text-slate-400">{activeMessage.email}</p>
              </div>
              <span className="text-slate-500">
                {new Date(activeMessage.created_at).toLocaleString('id-ID')}
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-950/50 light:bg-slate-50 text-sm text-slate-200 light:text-slate-700 whitespace-pre-line leading-relaxed min-h-[120px]">
              {activeMessage.message}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800 light:border-slate-100">
              <a
                href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500"
              >
                Balas via Email Client
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateStatus(activeMessage.id, 'archived')}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Arsipkan
                </button>
                <button
                  onClick={() => handleDelete(activeMessage.id)}
                  className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-bold hover:bg-rose-500/20"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesAdmin;
