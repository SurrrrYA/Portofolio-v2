# Personal Portfolio CMS

## Product Requirements Document (PRD)

**Nama proyek:** Personal Portfolio CMS\
**Dokumen:** `porto.md`\
**Versi:** 1.0\
**Status:** Draft awal\
**Bahasa:** Indonesia\
**Tujuan:** Membangun website portofolio profesional yang seluruh
kontennya dapat dikelola melalui dashboard admin.

------------------------------------------------------------------------

## 1. Ringkasan Produk

Personal Portfolio CMS adalah website portofolio pribadi yang
menampilkan profil, proyek, keahlian, sertifikat, pendidikan, pengalaman
kerja, dan pengalaman magang. Website dilengkapi dashboard admin agar
pemilik dapat menambah, mengubah, menghapus, mengurutkan,
menyembunyikan, dan memublikasikan konten tanpa mengubah source code.

Website juga menyediakan contact form, visitor analytics, dark/light
mode, animasi antarmuka, serta Interactive Guided Tour untuk membantu
pengunjung memahami isi portofolio.

Produk memiliki dua area utama:

1.  **Public Website:** halaman yang dapat diakses pengunjung,
    recruiter, HRD, dan calon klien.
2.  **Admin Dashboard:** area privat untuk mengelola konten, media,
    pesan, pengaturan website, guided tour, dan statistik.

## 2. Tujuan dan Sasaran

### 2.1 Tujuan

-   Menyediakan portofolio online yang profesional dan mudah diperbarui.
-   Menampilkan kemampuan melalui proyek nyata, teknologi, sertifikat,
    dan pengalaman.
-   Memudahkan recruiter atau calon klien menemukan informasi dan
    menghubungi pemilik.
-   Menyediakan sistem pengelolaan konten mandiri melalui dashboard.
-   Menjadi proyek portofolio yang sekaligus menunjukkan kemampuan
    frontend, backend, database, API, autentikasi, dan deployment.

### 2.2 Sasaran Pengguna

  -----------------------------------------------------------------------
  Pengguna                            Kebutuhan
  ----------------------------------- -----------------------------------
  Recruiter / HRD                     Melihat profil, CV, keahlian,
                                      pengalaman, dan proyek

  Calon klien                         Menilai kemampuan dan menghubungi
                                      pemilik

  Pengunjung umum                     Mengenal pemilik dan melihat karya

  Pemilik / Admin                     Mengelola seluruh konten dan
                                      memantau performa website
  -----------------------------------------------------------------------

### 2.3 Indikator Keberhasilan

-   Seluruh konten utama dapat dikelola dari admin.
-   Pengunjung dapat membuka halaman dengan baik di desktop dan
    perangkat mobile.
-   Proyek dapat menampilkan tautan repository dan live demo jika
    tersedia.
-   Contact form dapat menyimpan pesan dan menampilkannya di dashboard.
-   Analytics dapat mencatat page view dan metrik kunjungan yang
    disepakati.
-   Guided Tour dapat dijalankan, dilanjutkan, dilewati, ditutup, dan
    dibuka kembali.
-   Website memiliki metadata SEO dasar dan performa yang baik.

## 3. Ruang Lingkup Produk

### 3.1 Fitur Public Website

1.  Home / Hero
2.  About / Profile
3.  Projects
4.  Skills
5.  Certificates
6.  Experience
7.  Education
8.  Contact
9.  Download CV
10. Dark / Light Mode
11. Interactive Guided Tour
12. Responsive layout
13. SEO dasar

### 3.2 Fitur Admin Dashboard

1.  Admin authentication
2.  Dashboard overview
3.  Profile management
4.  Project management
5.  Skill category dan skill management
6.  Certificate management
7.  Work dan internship experience management
8.  Education management
9.  Social link management
10. CV management
11. Media library
12. Contact message management
13. Visitor analytics
14. Guided Tour management
15. Website settings
16. SEO settings

### 3.3 Di Luar Ruang Lingkup Versi Pertama

-   Multi-admin dengan role dan permission kompleks.
-   Komentar publik.
-   Sistem lamaran kerja.
-   Newsletter dan email marketing otomatis.
-   CMS multi-bahasa penuh.
-   Integrasi CRM eksternal.
-   Real-time chat.

Fitur tersebut dapat dipertimbangkan untuk versi berikutnya.

## 4. Rekomendasi Teknologi

  -----------------------------------------------------------------------
  Bagian                  Teknologi               Keterangan
  ----------------------- ----------------------- -----------------------
  Frontend                React + Vite            Public website dan
                                                  admin dashboard

  Styling                 Tailwind CSS            Styling responsif dan
                                                  konsisten

  Animation               Framer Motion           Transisi dan animasi
                                                  antarkomponen

  Backend                 Laravel                 REST API dan business
                                                  logic

  Database                MySQL                   Penyimpanan data

  Authentication          Laravel Sanctum         Autentikasi admin

  API communication       Axios                   Komunikasi frontend dan
                                                  backend

  Icons                   Lucide React            Ikon antarmuka

  Charts                  Recharts                Grafik analytics

  Guided Tour             Driver.js atau React    Walkthrough interaktif
                          Joyride                 

  Validation              Laravel Form Request +  Validasi data
                          validasi frontend       

  Image handling          Laravel Storage         Penyimpanan media
  -----------------------------------------------------------------------

**Arsitektur:** frontend React dan backend Laravel dipisahkan. React
mengakses Laravel melalui REST API. Database hanya diakses oleh backend
Laravel, bukan langsung dari browser.

## 5. Struktur Navigasi

### 5.1 Public Navigation

-   Home
-   About
-   Projects
-   Skills
-   Certificates
-   Experience
-   Education
-   Contact

Navigasi dapat berupa navbar sticky. Pada perangkat mobile, navigasi
berubah menjadi menu mobile.

### 5.2 Admin Navigation

-   Dashboard
-   Profile
-   Projects
-   Skills
-   Certificates
-   Experiences
-   Education
-   Social Links
-   CV & Documents
-   Media Library
-   Messages
-   Analytics
-   Guided Tour
-   Website Settings
-   SEO Settings
-   Logout

## 6. Detail Kebutuhan Fungsional Public Website

### 6.1 Home / Hero Section

Menampilkan kesan pertama dan ringkasan identitas pemilik.

**Konten:** - Foto profil. - Nama lengkap. - Headline atau profesi. -
Deskripsi singkat. - Teks profesi bergantian (typing animation), bila
diaktifkan. - Tombol `Lihat Proyek`. - Tombol `Download CV`. - Link
media sosial. - Ringkasan statistik opsional, misalnya jumlah proyek
atau pengalaman.

**Perilaku:** - Foto profil dan teks berasal dari data admin. - Tombol
proyek mengarah ke bagian Projects. - Tombol CV mengunduh atau membuka
dokumen CV terbaru yang dipublikasikan. - Jika foto atau CV belum
tersedia, komponen terkait tidak menampilkan tautan rusak.

### 6.2 Profile / About

Menampilkan: - Foto profil. - Nama. - Lokasi umum (opsional). -
Deskripsi singkat dan biografi lengkap. - Headline profesi. - Minat atau
fokus bidang. - Informasi kontak publik yang dipilih. - Ringkasan
pendidikan atau karier opsional.

Informasi sensitif seperti alamat rumah, nomor identitas, dan data
pribadi yang tidak relevan tidak boleh ditampilkan.

### 6.3 Projects

Halaman daftar proyek dengan kartu proyek.

**Data setiap proyek:** - Nama proyek. - Slug URL. - Ringkasan. -
Deskripsi lengkap. - Thumbnail. - Galeri screenshot. - Teknologi yang
digunakan. - Kategori proyek. - Peran atau kontribusi. - Fitur utama. -
Repository URL (opsional). - Live demo URL (opsional). - Tanggal atau
periode pengerjaan. - Status: Completed, In Progress, atau Archived. -
Status publikasi: Draft atau Published. - Penanda Featured. - Urutan
tampilan.

**Perilaku:** - Pengunjung dapat membuka halaman detail proyek. - Link
repository dan live demo hanya tampil jika URL tersedia. - Proyek dapat
difilter berdasarkan kategori atau teknologi jika jumlah proyek sudah
memadai. - Proyek Featured dapat ditampilkan di Home. - Draft tidak
boleh terlihat oleh publik. - URL proyek menggunakan slug yang mudah
dibaca.

### 6.4 Skills

Keahlian dikelompokkan, misalnya: - Programming Languages - Frontend -
Backend - Database - Tools & Platforms - Soft Skills

**Data skill:** - Nama skill. - Kategori. - Deskripsi opsional. - Level
atau label penguasaan opsional. - Ikon opsional. - Urutan tampilan. -
Status publikasi.

Hindari menampilkan persentase kemampuan yang seolah-olah merupakan
ukuran objektif jika tidak memiliki dasar yang jelas. Gunakan label
seperti Basic, Intermediate, atau Advanced bila diperlukan.

### 6.5 Certificates

**Data sertifikat:** - Nama sertifikat. - Penerbit. - Tanggal
diterbitkan. - Tanggal kedaluwarsa (opsional). - Credential ID
(opsional). - Credential URL (opsional). - File gambar atau PDF. -
Deskripsi. - Status publikasi. - Urutan tampilan.

Pengunjung dapat melihat preview sertifikat dan membuka link verifikasi
jika tersedia.

### 6.6 Experience

Pengalaman dibagi menjadi: - Work Experience - Internship Experience -
Organization / Volunteer Experience (opsional)

**Data pengalaman:** - Nama perusahaan atau organisasi. - Jabatan. -
Jenis pengalaman. - Lokasi. - Tanggal mulai. - Tanggal selesai atau
penanda `Currently Working`. - Deskripsi. - Tanggung jawab. -
Pencapaian. - Urutan tampilan. - Status publikasi.

Pengalaman ditampilkan dalam timeline atau kartu yang konsisten.

### 6.7 Education

**Data pendidikan:** - Nama institusi. - Jenjang. - Program studi. -
Lokasi. - Tahun mulai. - Tahun selesai. - Deskripsi atau pencapaian
opsional. - Status publikasi. - Urutan tampilan.

### 6.8 Contact

Halaman Contact menampilkan: - Email publik. - Link media sosial atau
platform profesional. - Contact form.

**Field contact form:** - Nama (wajib). - Email (wajib). - Subjek
(wajib). - Pesan (wajib).

**Perilaku:** - Validasi frontend dan backend. - Pesan disimpan ke
database. - Pengunjung menerima notifikasi sukses atau gagal yang
jelas. - Form memiliki proteksi spam, rate limiting, dan honeypot atau
mekanisme anti-spam lain. - Jangan menampilkan pesan pengunjung kepada
publik. - Email notification dapat ditambahkan setelah konfigurasi SMTP
tersedia.

### 6.9 Dark / Light Mode

-   Dark mode menjadi tema default.
-   Pengunjung dapat beralih ke light mode.
-   Pilihan tema disimpan secara lokal pada browser.
-   Perubahan tema tidak mengganggu keterbacaan, kontras, atau tampilan
    komponen.
-   Admin dapat mengatur tema default website, tetapi pengunjung tetap
    dapat memilih tema sendiri.

### 6.10 Responsive Design

Website harus mendukung: - Desktop. - Laptop. - Tablet. - Smartphone.

Navbar, kartu, galeri, formulir, grafik, dan dashboard harus
menyesuaikan ukuran layar. Tidak boleh ada horizontal overflow yang
tidak disengaja.

## 7. Interactive Guided Tour

### 7.1 Tujuan

Membantu pengunjung baru memahami struktur dan fitur utama portofolio
melalui panduan langkah demi langkah.

### 7.2 Alur Default

1.  Welcome: perkenalan singkat tentang website.
2.  Profile: menjelaskan bagian profil.
3.  Projects: menunjukkan daftar proyek dan tautan repository atau demo.
4.  Skills & Certificates: menunjukkan keahlian dan sertifikat.
5.  Experience & Education: menunjukkan riwayat pengalaman dan
    pendidikan.
6.  Contact: menunjukkan cara menghubungi pemilik.
7.  Finish: menutup panduan dan memberi pesan penutup.

Admin dapat mengubah, menambah, menghapus, dan mengurutkan langkah
sesuai kebutuhan.

### 7.3 Kontrol Pengunjung

-   **Next:** melanjutkan ke langkah berikutnya.
-   **Back:** kembali ke langkah sebelumnya.
-   **Skip:** melewati seluruh panduan.
-   **Close:** menutup panduan.
-   **Finish:** menyelesaikan panduan.
-   **Help:** membuka kembali panduan kapan saja.

### 7.4 Perilaku dan UX

-   Elemen yang dijelaskan diberi highlight.
-   Area lain diberi overlay yang tidak terlalu gelap.
-   Tooltip muncul dekat elemen target.
-   Halaman melakukan scroll ke target bila diperlukan.
-   Transisi antarlangkah halus.
-   Jika elemen target tidak tersedia, langkah dilewati dengan aman atau
    menampilkan fallback.
-   Guided Tour harus dapat digunakan dengan keyboard sejauh didukung
    library.
-   Hormati preferensi `prefers-reduced-motion`.
-   Jangan memaksa pengunjung menjalankan panduan.

### 7.5 Pemicu

-   Admin dapat mengaktifkan atau menonaktifkan auto-show.
-   Auto-show hanya ditujukan untuk pengunjung yang belum menyelesaikan
    atau melewati tour, berdasarkan penyimpanan browser.
-   Tombol Help tetap tersedia untuk menjalankan tour secara manual.
-   Admin dapat mengatur apakah tour muncul otomatis pada kunjungan
    pertama.

### 7.6 Admin Guided Tour Management

Admin dapat: - Mengaktifkan atau menonaktifkan Guided Tour. - Mengatur
auto-show. - Mengubah judul dan isi setiap langkah. - Menentukan target
elemen berdasarkan selector yang telah disediakan. - Mengatur posisi
tooltip. - Menambah dan menghapus langkah. - Mengubah urutan langkah. -
Melihat preview tour.

Selector target harus menggunakan identifier yang stabil dan
dikendalikan aplikasi, bukan selector rapuh yang bergantung pada
struktur CSS.

## 8. Animasi dan Motion Design

Gaya animasi: **Smooth & Elegant**. Animasi harus memperkuat pengalaman,
bukan mengganggu pembacaan.

  Area              Animasi
  ----------------- -------------------------------------------
  Hero              Fade-in, slide-up, typing effect opsional
  Foto profil       Glow atau gradient ring bergerak perlahan
  Section           Scroll reveal
  Project card      Hover lift, image zoom ringan
  Button            Hover dan tap feedback
  Navbar            Transisi warna atau blur saat scroll
  Background        Gradient atau partikel yang sangat subtle
  Page transition   Fade atau transisi ringan
  Guided Tour       Transisi tooltip dan highlight

**Ketentuan:** - Hindari animasi berlebihan dan gerakan terus-menerus
yang mengganggu. - Sediakan dukungan reduced motion. - Jangan menunda
konten utama hanya karena animasi. - Pastikan animasi tidak menurunkan
performa secara signifikan. - Hindari efek 3D berat pada perangkat
mobile kelas bawah.

## 9. Admin Dashboard

### 9.1 Authentication

-   Hanya admin yang dapat masuk ke dashboard.
-   Login menggunakan email atau username dan password sesuai
    implementasi.
-   Password disimpan dalam bentuk hash.
-   Endpoint admin dilindungi middleware autentikasi dan otorisasi.
-   Sediakan logout.
-   Sediakan mekanisme reset password yang aman jika email telah
    dikonfigurasi.
-   Validasi session/token dan penanganan unauthorized response.

Versi pertama dapat menggunakan satu akun admin. Pembuatan akun admin
dilakukan melalui seeder atau proses aman di backend, bukan registrasi
publik.

### 9.2 Dashboard Overview

Menampilkan ringkasan: - Total proyek Published. - Total sertifikat
Published. - Total skill aktif. - Total pengalaman. - Pesan belum
dibaca. - Ringkasan pengunjung. - Grafik kunjungan berdasarkan periode.

Data dashboard berasal dari API dan memiliki loading, empty, serta error
state.

### 9.3 Content Management

Setiap modul konten mendukung: - List data. - Search. - Filter jika
relevan. - Create. - Detail atau preview. - Edit. - Delete dengan
konfirmasi. - Publish / Unpublish. - Pengaturan urutan. - Validasi
form. - Feedback sukses dan gagal.

Gunakan soft delete hanya jika memang dibutuhkan oleh kebijakan
pemulihan data. Jika tidak, penghapusan permanen harus memiliki
konfirmasi yang jelas.

### 9.4 Media Library

-   Upload foto, thumbnail, screenshot, dan dokumen.
-   Preview file.
-   Menampilkan nama file, tipe, ukuran, dan tanggal upload.
-   Menghapus file yang tidak digunakan dengan validasi referensi.
-   Validasi MIME type, ukuran, dan ekstensi.
-   Nama file disimpan secara aman dan tidak mempercayai nama file dari
    pengguna.
-   File privat seperti dokumen internal tidak boleh dapat diakses
    publik.
-   File yang memang dipublikasikan, seperti foto proyek dan CV publik,
    disajikan melalui URL yang sesuai.

### 9.5 Messages Management

Admin dapat: - Melihat daftar pesan. - Membuka detail pesan. - Menandai
pesan Read atau Unread. - Mengarsipkan atau menghapus pesan. - Membuka
aplikasi email untuk membalas pengirim.

Status pesan minimal: - Unread - Read - Archived

Status Replied hanya digunakan jika sistem benar-benar dapat memastikan
email balasan telah dikirim atau statusnya dikelola secara manual dengan
label yang jelas.

### 9.6 Website Settings

Admin dapat mengatur: - Nama atau brand website. - Tagline. - Logo atau
favicon. - Foto profil. - Headline dan teks hero. - Daftar profesi untuk
typing animation. - Email dan link kontak publik. - Tema default. -
Pengaturan animasi. - Pengaturan Guided Tour. - Footer dan copyright.

### 9.7 SEO Settings

-   Site title.
-   Meta description.
-   Open Graph title.
-   Open Graph description.
-   Open Graph image.
-   Favicon.
-   Canonical URL jika diperlukan.
-   Sitemap dan robots.txt.
-   Metadata halaman proyek.

## 10. Visitor Analytics

### 10.1 Tujuan

Memberikan gambaran penggunaan website tanpa mengumpulkan data pribadi
yang tidak diperlukan.

### 10.2 Metrik

-   Page Views.
-   Unique Visitors (perkiraan berdasarkan identifier anonim dan
    periode).
-   Top Pages.
-   Top Projects.
-   Traffic Referrers.
-   Device Category.
-   Browser Category jika diperlukan.
-   Tren harian, mingguan, dan bulanan.

### 10.3 Dashboard Analytics

-   Kartu ringkasan metrik.
-   Grafik page views dari waktu ke waktu.
-   Daftar halaman populer.
-   Daftar proyek populer.
-   Ringkasan sumber trafik.
-   Filter rentang tanggal.

### 10.4 Ketentuan Privasi dan Teknis

-   Jangan menyimpan alamat IP mentah lebih lama dari yang benar-benar
    diperlukan.
-   Gunakan identifier anonim atau agregasi untuk menghitung unique
    visitors.
-   Jangan mengumpulkan nama, email, atau isi formulir sebagai data
    analytics.
-   Terapkan rate limiting dan validasi event.
-   Filter bot dan request internal sejauh memungkinkan.
-   Jelaskan penggunaan analytics melalui privacy notice.
-   Perhatikan aturan privasi dan persetujuan yang berlaku.
-   Metrik unique visitor adalah estimasi, bukan identifikasi orang
    secara pasti.

**Keputusan implementasi:** versi pertama menggunakan custom analytics
sederhana di Laravel + MySQL. Integrasi Google Analytics dapat menjadi
opsi lanjutan. Hindari menghitung setiap request API sebagai page view;
event page view harus dikirim secara eksplisit oleh frontend saat
halaman dilihat.

## 11. Rancangan Database Awal

Nama kolom dan relasi dapat disesuaikan saat tahap desain database.
Gunakan primary key dan foreign key yang konsisten. Untuk data yang
membutuhkan urutan, gunakan kolom `sort_order`.

### 11.1 Tabel Utama

  -----------------------------------------------------------------------
  Tabel                               Kolom penting / fungsi
  ----------------------------------- -----------------------------------
  users                               akun admin, email, password hash

  profiles                            nama, headline, bio, foto profil,
                                      lokasi publik

  projects                            nama, slug, deskripsi, thumbnail,
                                      repository URL, demo URL, status,
                                      featured

  project_images                      project, path gambar, alt text,
                                      sort order

  project_technologies                relasi proyek dengan
                                      teknologi/skill

  skill_categories                    nama kategori, sort order

  skills                              nama skill, kategori, level
                                      opsional, sort order

  certificates                        nama, penerbit, tanggal, credential
                                      URL, file, status

  experiences                         perusahaan, posisi, jenis, tanggal,
                                      deskripsi, status

  educations                          institusi, jenjang, program studi,
                                      periode

  social_links                        platform, label, URL, sort order

  media                               metadata file dan storage path

  contact_messages                    nama, email, subjek, pesan, status,
                                      created_at

  site_settings                       key dan value pengaturan website

  guided_tours                        konfigurasi tour dan status aktif

  guided_tour_steps                   judul, deskripsi, target selector,
                                      posisi, sort order

  analytics_events                    event anonim, path, referrer,
                                      device category, timestamp

  analytics_visitors                  identifier anonim dan
                                      tanggal/periode sesuai rancangan
                                      privasi
  -----------------------------------------------------------------------

### 11.2 Catatan Database

-   Hindari menyimpan password dalam bentuk teks biasa.
-   URL eksternal harus divalidasi.
-   Slug proyek harus unik.
-   Tanggal pengalaman harus divalidasi agar masuk akal.
-   Data publik dan draft harus dibedakan.
-   File disimpan di storage; database hanya menyimpan metadata dan
    path.
-   Hindari menyimpan data pribadi yang tidak dibutuhkan.
-   Buat index pada kolom yang sering dipakai untuk pencarian, filter,
    relasi, dan tanggal.
-   Gunakan migration dan seeder untuk pengelolaan skema serta data
    awal.

## 12. Rancangan API Awal

Prefix yang disarankan: `/api/v1`.

### 12.1 Public API

  Method   Endpoint                 Fungsi
  -------- ------------------------ -------------------------
  GET      `/profile`               Mengambil profil publik
  GET      `/projects`              Daftar proyek publik
  GET      `/projects/{slug}`       Detail proyek
  GET      `/skills`                Daftar skill
  GET      `/certificates`          Daftar sertifikat
  GET      `/experiences`           Daftar pengalaman
  GET      `/educations`            Daftar pendidikan
  GET      `/social-links`          Link sosial
  GET      `/site-settings`         Pengaturan publik
  GET      `/guided-tour`           Konfigurasi tour aktif
  POST     `/contact`               Mengirim pesan
  POST     `/analytics/page-view`   Mencatat page view

### 12.2 Admin API

  Method           Endpoint                 Fungsi
  ---------------- ------------------------ ----------------------------
  POST             `/admin/login`           Login admin
  POST             `/admin/logout`          Logout
  GET              `/admin/me`              Data admin aktif
  GET/PUT          `/admin/profile`         Kelola profil
  GET/POST         `/admin/projects`        Daftar dan tambah proyek
  GET/PUT/DELETE   `/admin/projects/{id}`   Detail, edit, hapus proyek
  GET/POST         `/admin/skills`          Kelola skill
  GET/POST         `/admin/certificates`    Kelola sertifikat
  GET/POST         `/admin/experiences`     Kelola pengalaman
  GET/POST         `/admin/educations`      Kelola pendidikan
  GET/POST         `/admin/social-links`    Kelola link sosial
  GET/POST         `/admin/media`           Kelola media
  GET              `/admin/messages`        Daftar pesan
  PATCH            `/admin/messages/{id}`   Ubah status pesan
  GET              `/admin/analytics`       Ringkasan analytics
  GET/PUT          `/admin/guided-tour`     Kelola konfigurasi tour
  GET/PUT          `/admin/site-settings`   Kelola pengaturan website

Endpoint CRUD lengkap, pagination, filter, validasi, dan response format
perlu ditetapkan saat implementasi. Semua endpoint admin harus
dilindungi autentikasi dan authorization.

## 13. Struktur Folder Proyek

``` text
personal-portfolio/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── portfolio/
│   │   │   └── admin/
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   └── admin/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── styles/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Models/
│   │   └── Services/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── storage/
│   └── ...
│
├── dokumentasi/
│   ├── porto.md
│   ├── PANDUAN.md
│   ├── INFORMASI.md
│   └── PROGRESS.md
│
└── README.md
```

Struktur dapat berkembang sesuai kebutuhan. Hindari membuat terlalu
banyak abstraksi sebelum ada kebutuhan nyata.

## 14. Kebutuhan Non-Fungsional

### 14.1 Security

-   Semua endpoint admin membutuhkan autentikasi.
-   Validasi dilakukan di backend.
-   Gunakan hashing password bawaan Laravel.
-   Terapkan rate limiting pada login, contact form, dan analytics.
-   Validasi upload file berdasarkan MIME type, ukuran, dan ekstensi.
-   Lindungi dari XSS dengan escaping output dan sanitasi input yang
    sesuai.
-   Terapkan CORS secara terbatas sesuai domain frontend.
-   Jangan menyimpan secret API atau kredensial di frontend.
-   Gunakan HTTPS pada production.
-   Jangan mengirim stack trace atau detail internal server ke
    pengunjung.

### 14.2 Performance

-   Optimalkan ukuran gambar.
-   Gunakan lazy loading untuk gambar di luar viewport.
-   Gunakan pagination untuk data admin yang panjang.
-   Gunakan caching untuk data publik yang jarang berubah.
-   Hindari library animasi atau efek berat yang tidak diperlukan.
-   Optimalkan bundle frontend.

### 14.3 Accessibility

-   Kontras warna harus memadai.
-   Gambar informatif memiliki alt text.
-   Form memiliki label.
-   Navigasi dapat diakses dengan keyboard.
-   Fokus keyboard terlihat.
-   Animasi menghormati reduced motion.
-   Jangan mengandalkan warna saja untuk menyampaikan status.

### 14.4 SEO

-   Title dan meta description yang relevan.
-   URL slug yang jelas.
-   Open Graph metadata.
-   Sitemap.
-   Robots.txt.
-   Struktur heading yang semantik.
-   Alt text pada gambar.
-   Halaman publik dapat diindeks; halaman admin tidak boleh diindeks.

## 15. Acceptance Criteria

Produk versi pertama dianggap memenuhi kebutuhan jika:

1.  Pengunjung dapat melihat seluruh bagian portofolio yang berstatus
    Published.
2.  Pengunjung dapat membuka detail proyek dan tautan repository/demo
    yang tersedia.
3.  Pengunjung dapat mengunduh CV yang dipublikasikan.
4.  Pengunjung dapat mengganti dark/light mode.
5.  Admin dapat login dan logout dengan aman.
6.  Admin dapat melakukan CRUD pada profil, proyek, skill, sertifikat,
    pengalaman, pendidikan, dan social links.
7.  Admin dapat mengunggah dan mengelola media sesuai aturan keamanan.
8.  Admin dapat membaca dan mengubah status pesan.
9.  Contact form memvalidasi dan menyimpan pesan.
10. Analytics mencatat page view dan menampilkan ringkasan.
11. Guided Tour memiliki Next, Back, Skip, Close, Finish, dan dapat
    dibuka kembali.
12. Admin dapat mengelola konten dan urutan Guided Tour.
13. Website responsif di desktop dan mobile.
14. Tidak ada error kritis pada alur utama.
15. Halaman admin terlindungi dari akses publik tanpa autentikasi.

## 16. Tahapan Pengerjaan

Pengerjaan dilakukan bertahap. Setiap tahap harus diuji sebelum lanjut
ke tahap berikutnya.

  -----------------------------------------------------------------------
  Tahap                   Pekerjaan               Hasil
  ----------------------- ----------------------- -----------------------
  1\. Perencanaan         Finalisasi kebutuhan,   Dokumen dan wireframe
                          desain, struktur        
                          aplikasi                

  2\. UI/UX               Design system, public   Acuan desain
                          layout, admin layout,   
                          responsive              

  3\. Setup               Setup React, Laravel,   Aplikasi berjalan
                          MySQL, environment      

  4\. Database            Migration, model,       Struktur database
                          relasi, seeder          

  5\. Backend Core        API publik, validasi,   REST API dasar
                          resource, error         
                          handling                

  6\. Authentication      Login, logout,          Admin aman
                          protected routes        

  7\. Admin CMS           CRUD semua konten dan   Konten dapat dikelola
                          media                   

  8\. Public Website      Home, About, Projects,  Website publik
                          Skills, Certificates,   
                          Experience, Education,  
                          Contact                 

  9\. Interaction         Dark/light mode,        UX selesai
                          animasi, responsive     
                          polish                  

  10\. Contact            Penyimpanan pesan dan   Contact berjalan
                          dashboard pesan         

  11\. Analytics          Event page view dan     Analytics dasar
                          dashboard statistik     

  12\. Guided Tour        Tour publik dan         Walkthrough berjalan
                          pengelolaan di admin    

  13\. SEO & Security     Metadata, sitemap,      Siap diuji
                          hardening, validasi     

  14\. Testing            Functional, responsive, Daftar hasil pengujian
                          security smoke test     

  15\. Deployment         Hosting                 Website online
                          frontend/backend,       
                          domain, database, HTTPS 
  -----------------------------------------------------------------------

## 17. Strategi Testing

-   **Functional testing:** seluruh CRUD, login, contact form, upload,
    guided tour, dan analytics.
-   **API testing:** status code, validasi, autentikasi, pagination, dan
    error response.
-   **Responsive testing:** desktop, tablet, dan mobile.
-   **Security testing:** akses endpoint admin tanpa login, upload file
    tidak valid, rate limiting, dan input berbahaya.
-   **Usability testing:** minta beberapa orang mencoba menemukan
    proyek, membaca profil, dan mengirim pesan.
-   **Performance testing:** ukuran gambar, loading halaman, dan
    animasi.
-   **Regression testing:** uji ulang fitur lama setelah perubahan.

## 18. Konten Awal yang Perlu Disiapkan

Sebelum website dipublikasikan, siapkan:

-   Foto profil yang layak digunakan secara profesional.
-   Nama dan headline profesi.
-   Bio singkat dan bio lengkap.
-   CV terbaru dalam PDF.
-   Daftar proyek beserta screenshot.
-   Link GitHub repository dan live demo jika ada.
-   Daftar teknologi dan keahlian.
-   File sertifikat dan link verifikasi.
-   Riwayat pendidikan.
-   Pengalaman kerja, magang, organisasi, atau kegiatan relevan.
-   Link GitHub, LinkedIn, email, dan media sosial yang ingin
    ditampilkan.

Konten yang belum tersedia dapat dibiarkan kosong atau berstatus Draft.
Jangan membuat pengalaman, sertifikat, atau pencapaian fiktif hanya agar
halaman terlihat penuh.

## 19. Dokumentasi Pendukung

Selain `porto.md`, proyek menggunakan:

### `PANDUAN.md`

Berisi: - Persyaratan instalasi. - Cara menjalankan frontend. - Cara
menjalankan backend. - Konfigurasi `.env`. - Setup database. - Cara
membuat akun admin. - Cara menjalankan migration dan seeder. - Cara
build dan deployment. - Troubleshooting.

### `INFORMASI.md`

Berisi: - Deskripsi proyek. - Stack teknologi. - Struktur aplikasi. -
Arsitektur frontend-backend. - Daftar modul. - Konvensi penamaan. -
Informasi endpoint penting. - Keputusan teknis yang sudah disepakati.

### `PROGRESS.md`

Berisi: - Tahapan yang sudah selesai. - Fitur yang sedang dikerjakan. -
Fitur yang belum dikerjakan. - Bug dan kendala. - Hasil testing. -
Perubahan keputusan. - Langkah pengerjaan berikutnya.

Setiap kali satu pekerjaan selesai, `PROGRESS.md` wajib diperbarui.
Jangan menandai fitur selesai sebelum implementasi dan pengujian
dasarnya benar-benar dilakukan.

## 20. Prinsip Pengembangan

1.  Kerjakan fitur secara bertahap dan jangan membuat semua modul
    sekaligus.
2.  Prioritaskan fungsi dan struktur data sebelum mempercantik animasi.
3.  Jangan hardcode konten portofolio yang seharusnya dapat diubah
    admin.
4.  Gunakan komponen reusable, tetapi hindari abstraksi berlebihan.
5.  Pisahkan API service dari komponen UI.
6.  Gunakan migration untuk setiap perubahan struktur database.
7.  Gunakan validasi backend sebagai sumber validasi utama.
8.  Sediakan loading, empty, success, dan error state.
9.  Pastikan setiap tombol memiliki fungsi nyata.
10. Perbarui `PROGRESS.md`, `PANDUAN.md`, dan `INFORMASI.md` ketika
    perubahan memang memengaruhi isi dokumen tersebut.
11. Jangan mengarang data pribadi, pengalaman, sertifikat, atau
    statistik.
12. Pastikan website tetap nyaman digunakan ketika animasi dimatikan.

------------------------------------------------------------------------

## 21. Definisi MVP

MVP adalah versi pertama yang sudah layak dipublikasikan.

**Wajib ada pada MVP:** - Public portfolio: Home, Profile, Projects,
Skills, Certificates, Experience, Education, Contact. - Admin login. -
CRUD seluruh konten utama. - Upload foto, gambar proyek, sertifikat, dan
CV. - Dark/light mode. - Responsive design. - Contact form dan
pengelolaan pesan. - SEO dasar. - Guided Tour dengan kontrol lengkap. -
Analytics dasar.

**Penyempurnaan setelah MVP:** - Analytics lebih mendalam. - Email
notification. - Blog. - Multi-bahasa. - Pengaturan animasi yang lebih
lengkap. - Integrasi Google Analytics. - Optimasi SEO lanjutan.

**Target akhir:** sebuah website portofolio pribadi yang profesional,
interaktif, cepat, mudah diakses, dan sepenuhnya dapat dikelola melalui
admin dashboard tanpa perlu mengubah source code untuk pembaruan konten.
