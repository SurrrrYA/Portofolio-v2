# Panduan Instalasi & Penggunaan: Personal Portfolio CMS

Dokumen ini berisi panduan teknis lengkap untuk menginstal, mengonfigurasi, dan menjalankan aplikasi **Personal Portfolio CMS** pada lingkungan lokal (development).

---

## 1. Prasyarat Sistem
Pastikan perangkat Anda telah terinstal:
- **PHP** >= 8.2 (dengan ekstensi `pdo_mysql`, `curl`, `mbstring`, `fileinfo`, `gd`, `openssl`)
- **Composer** >= 2.0
- **Node.js** >= 18.x dan **npm**
- **MySQL / MariaDB** (misal via XAMPP) berjalan pada port `3306`

---

## 2. Struktur Proyek
```text
D:\PROJEK\Portofolio2\
├── backend/            # REST API Laravel (PHP)
├── frontend/           # Public & Admin SPA (React + Vite + Tailwind CSS)
├── dokumentasi/        # Arsip PRD, panduan, arsitektur, dan progress
├── run-dev.bat         # Script otomatis menjalankan backend & frontend
└── README.md
```

---

## 3. Menjalankan Aplikasi Secara Cepat (Satu Klik)
Di root direktori `D:\PROJEK\Portofolio2`, cukup jalankan:
```cmd
run-dev.bat
```
Script ini akan:
1. Membuka terminal untuk menjalankan server backend (`php artisan serve` pada `http://127.0.0.1:8000`)
2. Membuka terminal untuk menjalankan frontend dev server (`npm run dev` pada `http://localhost:5173`)

---

## 4. Menjalankan Secara Manual

### 4.1 Backend (Laravel)
1. Masuk ke direktori backend:
   ```powershell
   cd backend
   ```
2. Pastikan file `.env` sudah sesuai (terutama koneksi database MySQL `personal_portfolio`):
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=personal_portfolio
   DB_USERNAME=root
   DB_PASSWORD=
   ```
3. Jalankan migrasi dan seeder awal:
   ```powershell
   php artisan migrate --seed
   ```
4. Pastikan storage link telah dibuat:
   ```powershell
   php artisan storage:link
   ```
5. Jalankan server Laravel:
   ```powershell
   php artisan serve
   ```
   Backend aktif di `http://127.0.0.1:8000`.

### 4.2 Frontend (React + Vite)
1. Buka terminal baru dan masuk ke direktori frontend:
   ```powershell
   cd frontend
   ```
2. Install dependency (jika belum):
   ```powershell
   npm install
   ```
3. Jalankan development server:
   ```powershell
   npm run dev
   ```
   Frontend aktif di `http://localhost:5173`.

---

## 5. Kredensial Akun Admin Default
Setelah menjalankan seeder database, Anda dapat login ke Dashboard Admin:
- **URL Login:** `http://localhost:5173/admin/login`
- **Email:** `admin@portfolio.local`
- **Password:** nilai `ADMIN_DEFAULT_PASSWORD` yang Anda set di file `.env`

> [!WARNING]
> Segera ganti password dan email admin melalui Dashboard Pengaturan sebelum mendeploy aplikasi ke lingkungan produksi.

---

## 6. Fitur & Penggunaan

### Website Publik
- **Navigasi:** Single-page scroll dengan navbar sticky untuk bagian Hero, Profil/About, Proyek, Skills, Sertifikat, Pengalaman, Pendidikan, dan Kontak.
- **Dark / Light Mode:** Tombol toggle di navbar atas kanan (pilihan disimpan di browser).
- **Interactive Guided Tour:** Klik tombol panduan "Mulai Tour" di sudut kanan bawah atau jalankan secara otomatis untuk mengenal navigasi web.
- **Form Kontak:** Pengunjung dapat mengirimkan pesan langsung ke dashboard admin.

### Admin Dashboard
- **Overview:** Ringkasan statistik (jumlah proyek, sertifikat, pesan belum dibaca, grafik tren kunjungan).
- **Content Management:** CRUD untuk Profile, Proyek, Kategori & Skill, Sertifikat, Pengalaman, Pendidikan, dan Social Links.
- **Media Library:** Upload gambar thumbnail proyek, screenshot, dan dokumen PDF CV.
- **Pesan Masuk:** Membaca pesan pengunjung dan mengubah status (dibaca/arsip).
- **Guided Tour Manager:** Menambah dan mengatur urutan langkah tutorial publik.
- **Website & SEO Settings:** Mengubah informasi situs, headline hero, teks typing, dan meta tags.
