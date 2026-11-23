import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Cpu,
  Award,
  Mail,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await api.get('/admin/overview');
        setOverview(res.data.data);
      } catch (err) {
        console.error('Failed to load overview data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Proyek',
      value: overview?.total_projects || 0,
      icon: FolderGit2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      link: '/admin/projects',
    },
    {
      title: 'Total Keahlian (Skills)',
      value: overview?.total_skills || 0,
      icon: Cpu,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      link: '/admin/skills',
    },
    {
      title: 'Total Sertifikat',
      value: overview?.total_certificates || 0,
      icon: Award,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      link: '/admin/certificates',
    },
    {
      title: 'Pesan Belum Dibaca',
      value: overview?.unread_messages || 0,
      icon: Mail,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      link: '/admin/messages',
    },
    {
      title: 'Total Page Views',
      value: overview?.total_views || 0,
      icon: Eye,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-white light:text-slate-900 tracking-tight">
          Ringkasan Dashboard CMS
        </h2>
        <p className="mt-1 text-sm text-slate-400 light:text-slate-600">
          Statistik konten portofolio dan tren pengunjung website Anda.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          const content = (
            <div className="p-5 rounded-2xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 light:text-slate-500">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl ${card.bgColor} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-black text-white light:text-slate-900">
                  {card.value}
                </span>
                {card.link && (
                  <ArrowUpRight className="w-4 h-4 text-slate-500 hover:text-white" />
                )}
              </div>
            </div>
          );

          return card.link ? (
            <Link key={idx} to={card.link}>
              {content}
            </Link>
          ) : (
            <div key={idx}>{content}</div>
          );
        })}
      </div>

      {/* Chart & Recent Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visitors Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>Tren Kunjungan 7 Hari Terakhir</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Perbandingan Page Views dan Unique Visitors
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overview?.chart_data || []}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Page Views"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  name="Pengunjung Unik"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Pesan Masuk Terbaru</span>
              </h3>
              <Link to="/admin/messages" className="text-xs text-blue-400 hover:underline">
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-3">
              {overview?.recent_messages?.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">Belum ada pesan masuk.</p>
              ) : (
                overview?.recent_messages?.slice(0, 4).map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 rounded-xl bg-slate-950/40 light:bg-slate-50 border border-slate-800/40 light:border-slate-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white light:text-slate-900 truncate">
                        {msg.name}
                      </span>
                      {msg.status === 'unread' && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-blue-400 mt-0.5 truncate">
                      {msg.subject}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 light:border-slate-100">
            <Link
              to="/admin/messages"
              className="w-full py-2 px-3 rounded-xl bg-slate-800 light:bg-slate-100 hover:bg-slate-700 text-slate-300 light:text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Kelola Pesan Kontak</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
