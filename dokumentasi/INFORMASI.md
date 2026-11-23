# Informasi Arsitektur & Teknis: Personal Portfolio CMS

Dokumen ini mendokumentasikan spesifikasi arsitektur teknis, daftar endpoint API, konvensi kode, dan skema database aplikasi **Personal Portfolio CMS**.

---

## 1. Arsitektur Keseluruhan
Aplikasi memisahkan layer presentasi (Frontend SPA) dan layer backend (REST API) secara utuh:
- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion, Driver.js, Recharts, Axios.
- **Backend:** Laravel 11/12, PHP 8.4, Laravel Sanctum, Storage disk public link.
- **Database:** MySQL 8 / MariaDB (Database: `personal_portfolio`).

---

## 2. Skema Database
| Tabel | Penjelasan |
|---|---|
| `users` | Akun admin (id, name, email, password, remember_token, timestamps) |
| `profiles` | Data diri (name, headline, bio, about, email, phone, location, avatar_url, resume_url) |
| `skill_categories` | Kategori skill (name, sort_order) |
| `skills` | Keahlian (name, category_id, level, icon, sort_order, is_published) |
| `projects` | Proyek portofolio (title, slug, summary, description, thumbnail_url, repo_url, demo_url, status, is_featured, is_published, sort_order) |
| `project_images` | Galeri screenshot proyek (project_id, image_url, caption, sort_order) |
| `certificates` | Sertifikat (title, issuer, issue_date, expiry_date, credential_id, credential_url, file_url, is_published, sort_order) |
| `experiences` | Pengalaman kerja & magang (company, role, type, location, start_date, end_date, is_current, description, sort_order, is_published) |
| `educations` | Pendidikan (institution, degree, field_of_study, start_year, end_year, description, sort_order, is_published) |
| `social_links` | Tautan media sosial (platform, label, url, icon, sort_order, is_active) |
| `media` | Metadata media yang diunggah (filename, path, mime_type, file_size, category) |
| `contact_messages` | Pesan formulir kontak (name, email, subject, message, status: `unread`/`read`/`archived`, ip_hash) |
| `site_settings` | Konfigurasi website key-value (site_title, hero_heading, typing_roles, contact_email, seo_meta, etc.) |
| `guided_tour_steps` | Konfigurasi langkah walkthrough Driver.js (title, description, target_selector, position, sort_order, is_active) |
| `analytics_events` | Log kunjungan anonim (event_type, path, referrer, device, browser, visitor_hash, created_at) |

---

## 3. Daftar Endpoint API (`/api/v1`)

### Endpoint Publik
- `GET /api/v1/profile` - Mengambil info profil pemilik
- `GET /api/v1/projects` - Mengambil daftar proyek (opsi: `?featured=1`, `?category=...`)
- `GET /api/v1/projects/{slug}` - Detail proyek & screenshot
- `GET /api/v1/skills` - Daftar kategori & skill terbit
- `GET /api/v1/certificates` - Daftar sertifikat terbit
- `GET /api/v1/experiences` - Riwayat pengalaman terbit
- `GET /api/v1/educations` - Riwayat pendidikan terbit
- `GET /api/v1/social-links` - Tautan media sosial aktif
- `GET /api/v1/site-settings` - Pengaturan publik website
- `GET /api/v1/guided-tour` - Langkah-langkah tour aktif
- `POST /api/v1/contact` - Mengirim pesan formulir kontak
- `POST /api/v1/analytics/page-view` - Mencatat kunjungan anonim

### Endpoint Admin (Sanctum Protected)
- `POST /api/v1/admin/login` - Login admin (mendapatkan Sanctum Bearer Token)
- `POST /api/v1/admin/logout` - Revoke token
- `GET /api/v1/admin/me` - Data akun yang sedang login
- `GET /api/v1/admin/overview` - Metrik ringkasan dashboard & grafik analitik
- `GET / PUT /api/v1/admin/profile` - Update profil pemilik
- `CRUD /api/v1/admin/projects` - Kelola proyek
- `CRUD /api/v1/admin/skills` - Kelola skill & kategori
- `CRUD /api/v1/admin/certificates` - Kelola sertifikat
- `CRUD /api/v1/admin/experiences` - Kelola pengalaman
- `CRUD /api/v1/admin/educations` - Kelola pendidikan
- `CRUD /api/v1/admin/social-links` - Kelola tautan sosial
- `POST / GET / DELETE /api/v1/admin/media` - Manajemen berkas media
- `GET / PATCH /api/v1/admin/messages` - Kelola pesan masuk
- `GET /api/v1/admin/analytics` - Detail tren pengunjung
- `CRUD /api/v1/admin/guided-tour` - Pengaturan alur tour
- `GET / PUT /api/v1/admin/site-settings` - Pengaturan situs & SEO
