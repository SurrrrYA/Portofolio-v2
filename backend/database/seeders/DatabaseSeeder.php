<?php

namespace Database\Seeders;

use App\Models\AnalyticsEvent;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\GuidedTourStep;
use App\Models\Profile;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\SiteSetting;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\SocialLink;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database based on Ardiansyah Surya Pratama's actual CV.
     */
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@portfolio.local'],
            [
                'name' => 'Ardiansyah Surya Pratama',
                'password' => Hash::make(env('ADMIN_DEFAULT_PASSWORD') ?? Str::random(24)),
            ]
        );

        User::updateOrCreate(
            ['email' => 'spratama029@gmail.com'],
            [
                'name' => 'Ardiansyah Surya Pratama',
                'password' => Hash::make(env('ADMIN_DEFAULT_PASSWORD') ?? Str::random(24)),
            ]
        );

        // 2. Profile
        Profile::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Ardiansyah Surya Pratama, S.Kom',
                'headline' => 'Software Engineer & Full-Stack Developer',
                'bio' => 'Software Engineer & Full-Stack Developer yang berfokus pada perancangan solusi digital berbasis Web dan Mobile. Berpengalaman membangun backend terstruktur dengan Laravel & MySQL, UI interaktif menggunakan React & Tailwind CSS, serta aplikasi Android native Kotlin yang siap pakai untuk kebutuhan dunia nyata.',
                'about' => "Halo! Saya Ardiansyah Surya Pratama, seorang Software Engineer yang berfokus pada pengembangan aplikasi Web Full-Stack dan Mobile Android.\n\nDengan dasar rekayasa perangkat lunak yang kuat dan sertifikasi kompetensi Pemrogram dari BNSP, saya terbiasa membangun sistem mulai dari arsitektur RESTful API yang terstruktur, pengelolaan basis data MySQL yang optimal, hingga antarmuka modern yang cepat dan responsif.\n\nBagi saya, menulis kode bukan sekadar membuat fitur berjalan, melainkan menghadirkan solusi perangkat lunak yang bersih, mudah dikembangkan (maintainable), dan memberi dampak nyata bagi efisiensi pengguna.",
                'email' => 'spratama029@gmail.com',
                'phone' => null,
                'location' => 'Purwokerto, Jawa Tengah, Indonesia',
                'avatar_url' => '/storage/media/ardiansyah_avatar.jpg',
                'resume_url' => null,
            ]
        );

        // 3. Skill Categories & Skills
        $categoriesData = [
            [
                'name' => 'Bahasa Pemrograman',
                'sort_order' => 1,
                'skills' => [
                    ['name' => 'PHP', 'level' => 'Expert', 'icon' => 'Code', 'sort_order' => 1],
                    ['name' => 'Kotlin', 'level' => 'Advanced', 'icon' => 'Smartphone', 'sort_order' => 2],
                    ['name' => 'SQL', 'level' => 'Advanced', 'icon' => 'Database', 'sort_order' => 3],
                    ['name' => 'JavaScript', 'level' => 'Advanced', 'icon' => 'Code2', 'sort_order' => 4],
                    ['name' => 'Go (Dasar)', 'level' => 'Basic', 'icon' => 'Terminal', 'sort_order' => 5],
                ],
            ],
            [
                'name' => 'Frameworks & Libraries',
                'sort_order' => 2,
                'skills' => [
                    ['name' => 'Laravel', 'level' => 'Expert', 'icon' => 'Server', 'sort_order' => 1],
                    ['name' => 'React', 'level' => 'Advanced', 'icon' => 'Atom', 'sort_order' => 2],
                    ['name' => 'Node.js', 'level' => 'Intermediate', 'icon' => 'Layers', 'sort_order' => 3],
                    ['name' => 'Tailwind CSS', 'level' => 'Advanced', 'icon' => 'Palette', 'sort_order' => 4],
                    ['name' => 'Bootstrap', 'level' => 'Advanced', 'icon' => 'Layout', 'sort_order' => 5],
                ],
            ],
            [
                'name' => 'Database & Tools',
                'sort_order' => 3,
                'skills' => [
                    ['name' => 'MySQL', 'level' => 'Advanced', 'icon' => 'Database', 'sort_order' => 1],
                    ['name' => 'Firebase', 'level' => 'Advanced', 'icon' => 'Flame', 'sort_order' => 2],
                    ['name' => 'REST API Architecture', 'level' => 'Expert', 'icon' => 'Cpu', 'sort_order' => 3],
                    ['name' => 'Git / GitHub', 'level' => 'Advanced', 'icon' => 'GitBranch', 'sort_order' => 4],
                    ['name' => 'Vite', 'level' => 'Advanced', 'icon' => 'Zap', 'sort_order' => 5],
                    ['name' => 'Volley & PHPMailer', 'level' => 'Intermediate', 'icon' => 'Send', 'sort_order' => 6],
                ],
            ],
            [
                'name' => 'IT Operations & Maintenance',
                'sort_order' => 4,
                'skills' => [
                    ['name' => 'Basic Networking (Cisco/TCP IP)', 'level' => 'Intermediate', 'icon' => 'Network', 'sort_order' => 1],
                    ['name' => 'User Account Management', 'level' => 'Advanced', 'icon' => 'Users', 'sort_order' => 2],
                    ['name' => 'System Maintenance & Config', 'level' => 'Advanced', 'icon' => 'Settings', 'sort_order' => 3],
                    ['name' => 'Software Installation & Config', 'level' => 'Advanced', 'icon' => 'HardDrive', 'sort_order' => 4],
                ],
            ],
            [
                'name' => 'Soft Skills',
                'sort_order' => 5,
                'skills' => [
                    ['name' => 'Problem Solving & Logical Thinking', 'level' => 'Expert', 'icon' => 'Brain', 'sort_order' => 1],
                    ['name' => 'Teamwork & Adaptability', 'level' => 'Expert', 'icon' => 'HeartHandshake', 'sort_order' => 2],
                    ['name' => 'Critical Thinking & Fast Learner', 'level' => 'Expert', 'icon' => 'Lightbulb', 'sort_order' => 3],
                    ['name' => 'Time Management & Communication', 'level' => 'Advanced', 'icon' => 'MessageCircle', 'sort_order' => 4],
                ],
            ],
        ];

        $allSkillModels = [];
        foreach ($categoriesData as $catData) {
            $cat = SkillCategory::create([
                'name' => $catData['name'],
                'sort_order' => $catData['sort_order'],
            ]);

            foreach ($catData['skills'] as $skillItem) {
                $skill = Skill::create([
                    'category_id' => $cat->id,
                    'name' => $skillItem['name'],
                    'level' => $skillItem['level'],
                    'icon' => $skillItem['icon'],
                    'sort_order' => $skillItem['sort_order'],
                    'is_published' => true,
                ]);
                $allSkillModels[$skill->name] = $skill->id;
            }
        }

        // 4. Projects based on CV experience
        $projectsData = [
            [
                'title' => 'Aplikasi Mobile Servis Bengkel Motor Sempoeloer',
                'slug' => 'aplikasi-servis-bengkel-sempoeloer',
                'summary' => 'Aplikasi Android real-time untuk manajemen servis kendaraan, pencatatan transaksi terotomatisasi, dan eliminasi pendataan manual bengkel.',
                'description' => "Merancang dan mengembangkan aplikasi Android berbasis Kotlin untuk manajemen servis kendaraan di Bengkel Motor Sempoeloer secara real-time. Aplikasi ini berhasil meningkatkan efisiensi pencatatan transaksi serta menghilangkan kerumitan pendataan manual bagi pemilik bengkel.\n\nBackend dibangun menggunakan PHP dan MySQL yang dihubungkan melalui arsitektur REST API serta otentikasi Firebase untuk sinkronisasi data yang cepat dan aman. Mengimplementasikan juga panel admin web berbasis Bootstrap guna memudahkan pengelolaan inventaris sparepart dan riwayat servis pelanggan secara terstruktur.",
                'thumbnail_url' => 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800',
                'repo_url' => 'https://github.com/spratama029',
                'demo_url' => null,
                'status' => 'Completed',
                'is_featured' => true,
                'sort_order' => 1,
                'skills' => ['Kotlin', 'PHP', 'MySQL', 'Firebase', 'REST API Architecture', 'Bootstrap'],
            ],
            [
                'title' => 'Personal Portfolio CMS & Interactive Dashboard',
                'slug' => 'personal-portfolio-cms-interactive',
                'summary' => 'Website portofolio profesional dinamis dengan Guided Tour interaktif, dark/light mode, dan admin dashboard mandiri.',
                'description' => "Aplikasi web portofolio pribadi modern yang seluruh kontennya dapat dikelola langsung dari dashboard admin tanpa perlu mengubah kode sumber. Dibangun dengan arsitektur decoupled: frontend React + Vite + Tailwind CSS dan backend REST API Laravel 12 + MySQL dilindungi autentikasi token Sanctum.\n\nMemiliki fitur Interactive Guided Tour (Driver.js) untuk memandu recruiter, visualisasi analitik tren kunjungan (Recharts), upload media library, serta contact form terproteksi honeypot anti-spam.",
                'thumbnail_url' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
                'repo_url' => 'https://github.com/spratama029',
                'demo_url' => 'http://localhost:5173',
                'status' => 'Completed',
                'is_featured' => true,
                'sort_order' => 2,
                'skills' => ['React', 'Laravel', 'Tailwind CSS', 'MySQL', 'REST API Architecture', 'Vite'],
            ],
            [
                'title' => 'Sistem Administrasi E-Procurement & Logistik',
                'slug' => 'sistem-eprocurement-logistik',
                'summary' => 'Pengelolaan alur E-Procurement perusahaan pada portal E-Katalog pemerintah / INAPROC dan validasi armada transportasi.',
                'description' => "Pengelolaan administrasi pengadaan digital pada portal E-Katalog pemerintah (INAPROC) untuk CV. Anugerah Serayu Logistik. Bertanggung jawab dalam validasi kelengkapan dokumen legalitas perusahaan, konfigurasi zonasi layanan armada, serta pengunggahan etalase armada transportasi darat untuk transaksi digital instansi pemerintah.",
                'thumbnail_url' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
                'repo_url' => null,
                'demo_url' => null,
                'status' => 'Completed',
                'is_featured' => false,
                'sort_order' => 3,
                'skills' => ['User Account Management', 'System Maintenance & Config'],
            ],
            [
                'title' => 'Publikasi Ilmiah Aplikasi Komputer (Jurnal SINTA 4)',
                'slug' => 'publikasi-ilmiah-jurnal-sinta-4',
                'summary' => 'Penyusunan serta publikasi artikel ilmiah pada Jurnal Nasional Terakreditasi SINTA 4 di bidang ilmu komputer sebagai tugas akhir non-skripsi.',
                'description' => "Menyelesaikan seluruh persyaratan akademik dan kelulusan sarjana jalur non-skripsi melalui penyusunan dan publikasi artikel ilmiah pada Jurnal Nasional Terakreditasi SINTA 4 di bidang ilmu komputer dan rekayasa perangkat lunak.",
                'thumbnail_url' => 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
                'repo_url' => null,
                'demo_url' => null,
                'status' => 'Completed',
                'is_featured' => true,
                'sort_order' => 4,
                'skills' => ['Problem Solving & Logical Thinking'],
            ],
        ];

        foreach ($projectsData as $projData) {
            $skillsToAttach = $projData['skills'];
            unset($projData['skills']);

            $project = Project::create($projData);

            ProjectImage::create([
                'project_id' => $project->id,
                'image_url' => $project->thumbnail_url,
                'caption' => 'Overview ' . $project->title,
                'sort_order' => 1,
            ]);

            foreach ($skillsToAttach as $sName) {
                if (isset($allSkillModels[$sName])) {
                    $project->skills()->attach($allSkillModels[$sName]);
                }
            }
        }

        // 5. Certificates from CV
        $certs = [
            [
                'title' => 'Sertifikasi Pemrogram (Programmer)',
                'issuer' => 'Badan Nasional Sertifikasi Profesi (BNSP)',
                'issue_date' => '2026-01-15',
                'expiry_date' => '2029-01-15',
                'credential_id' => 'BNSP-PRG-2026',
                'credential_url' => 'https://bnsp.go.id',
                'file_url' => 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1200',
                'sort_order' => 1,
            ],
            [
                'title' => 'TOEFL ITP Certificate',
                'issuer' => 'American English Course',
                'issue_date' => '2026-02-10',
                'expiry_date' => '2028-02-10',
                'credential_id' => 'TOEFL-ITP-2026',
                'credential_url' => null,
                'file_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
                'sort_order' => 2,
            ],
            [
                'title' => 'English Proficiency Certificate',
                'issuer' => 'Language Development Center UMP',
                'issue_date' => '2024-06-20',
                'expiry_date' => null,
                'credential_id' => 'LDC-UMP-2024',
                'credential_url' => null,
                'file_url' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
                'sort_order' => 3,
            ],
            [
                'title' => 'Informatics Guest Lecture – Exploring AI',
                'issuer' => 'Universitas Muhammadiyah Purwokerto',
                'issue_date' => '2026-03-05',
                'expiry_date' => null,
                'credential_id' => 'AI-GL-2026',
                'credential_url' => null,
                'file_url' => 'https://images.unsplash.com/photo-1589330694653-dad6d3240a6e?auto=format&fit=crop&q=80&w=1200',
                'sort_order' => 4,
            ],
            [
                'title' => 'Baitul Arqam - Career Competencies & Soft Skills',
                'issuer' => 'Universitas Muhammadiyah Purwokerto',
                'issue_date' => '2026-04-12',
                'expiry_date' => null,
                'credential_id' => 'BA-UMP-2026',
                'credential_url' => null,
                'file_url' => 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
                'sort_order' => 5,
            ],
            [
                'title' => 'Design & Content Development',
                'issuer' => 'Professional Workshop',
                'issue_date' => '2025-09-18',
                'expiry_date' => null,
                'credential_id' => 'DCD-2025',
                'credential_url' => null,
                'file_url' => 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1200',
                'sort_order' => 6,
            ],
            [
                'title' => 'Digital Skill Fair 12.0',
                'issuer' => 'Dibimbing.id',
                'issue_date' => '2022-11-25',
                'expiry_date' => null,
                'credential_id' => 'DSF-DIBIMBING-2022',
                'credential_url' => null,
                'file_url' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
                'sort_order' => 7,
            ],
        ];

        foreach ($certs as $c) {
            $c['is_published'] = true;
            Certificate::create($c);
        }

        // 6. Experiences from CV & Current Role
        Experience::create([
            'company' => 'Oemah Daun',
            'role' => 'Web Developer',
            'type' => 'Internship',
            'location' => 'Purwokerto, Jawa Tengah',
            'start_date' => '2026-09-01',
            'end_date' => null,
            'is_current' => true,
            'description' => 'Bertanggung jawab dalam merancang, mengembangkan, dan memelihara sistem aplikasi web untuk mendukung efisiensi operasional dan kehadiran digital Oemah Daun Purwokerto.',
            'responsibilities' => "• Mengembangkan dan mengoptimalkan antarmuka aplikasi web yang responsif, cepat, dan mudah digunakan.\n• Membangun dan mengintegrasikan modul backend dengan basis data MySQL.\n• Melakukan pemeliharaan rutin, perbaikan kendala teknis (debugging), serta peningkatan performa sistem web.",
            'sort_order' => 1,
            'is_published' => true,
        ]);

        Experience::create([
            'company' => 'Bengkel Motor Sempoeloer',
            'role' => 'Pengembang Aplikasi Mobile & Backend (Freelance)',
            'type' => 'Work',
            'location' => 'Purwokerto, Indonesia',
            'start_date' => '2026-06-01',
            'end_date' => '2026-08-31',
            'is_current' => false,
            'description' => 'Merancang dan mengembangkan aplikasi Android berbasis Kotlin untuk manajemen servis kendaraan di Bengkel Motor Sempoeloer secara real-time, yang berhasil meningkatkan efisiensi pencatatan transaksi serta menghilangkan kerumitan pendataan manual bagi pemilik bengkel.',
            'responsibilities' => "• Merancang dan mengembangkan aplikasi Android berbasis Kotlin untuk manajemen servis kendaraan di Bengkel Motor Sempoeloer secara real-time.\n• Berhasil meningkatkan efisiensi pencatatan transaksi serta menghilangkan kerumitan pendataan manual bagi pemilik bengkel.\n• Membangun backend menggunakan PHP dan MySQL yang dihubungkan melalui arsitektur REST API serta otentikasi Firebase untuk sinkronisasi data yang cepat dan aman.\n• Mengimplementasikan panel admin web berbasis Bootstrap guna memudahkan pengelolaan inventaris dan riwayat servis pelanggan secara terstruktur.",
            'sort_order' => 2,
            'is_published' => true,
        ]);

        Experience::create([
            'company' => 'CV. Anugerah Serayu Logistik',
            'role' => 'Administrasi Pengadaan (E-Procurement)',
            'type' => 'Work',
            'location' => 'Banyumas / Purwokerto',
            'start_date' => '2026-03-01',
            'end_date' => '2026-04-30',
            'is_current' => false,
            'description' => 'Mengelola alur E-Procurement perusahaan pada portal E-Katalog pemerintah / INAPROC dan validasi etalase transportasi darat.',
            'responsibilities' => "• Mengelola alur E-Procurement perusahaan pada portal E-Katalog pemerintah / INAPROC.\n• Melakukan validasi dokumen legalitas perusahaan, pengaturan zonasi layanan, dan mengunggah etalase armada transportasi darat untuk transaksi digital instansi pemerintah.",
            'sort_order' => 3,
            'is_published' => true,
        ]);

        // 7. Educations from CV
        Education::create([
            'institution' => 'Universitas Muhammadiyah Purwokerto',
            'degree' => 'Sarjana Komputer (S.Kom)',
            'field_of_study' => 'Teknik Informatika | IPK 3.73 / 4.00',
            'start_year' => 2022,
            'end_year' => 2026,
            'description' => 'Menyelesaikan seluruh persyaratan akademik dan tugas akhir jalur non-skripsi melalui penyusunan serta publikasi artikel ilmiah pada jurnal nasional terakreditasi Sinta 4 di bidang ilmu komputer.',
            'sort_order' => 1,
            'is_published' => true,
        ]);

        // 8. Social Links from CV
        SocialLink::create([
            'platform' => 'Email',
            'label' => 'spratama029@gmail.com',
            'url' => 'mailto:spratama029@gmail.com',
            'icon' => 'Mail',
            'sort_order' => 1,
            'is_active' => true,
        ]);



        SocialLink::create([
            'platform' => 'LinkedIn',
            'label' => 'LinkedIn Profile',
            'url' => 'https://www.linkedin.com',
            'icon' => 'Linkedin',
            'sort_order' => 3,
            'is_active' => true,
        ]);

        SocialLink::create([
            'platform' => 'GitHub',
            'label' => 'github.com/spratama029',
            'url' => 'https://github.com',
            'icon' => 'Github',
            'sort_order' => 4,
            'is_active' => true,
        ]);

        // 9. Site Settings from CV
        $settings = [
            'site_title' => 'Ardiansyah Surya Pratama | Software Engineer & Pemrogram BNSP',
            'site_tagline' => 'Fresh Graduate Teknik Informatika (IPK 3.73) & Pemrogram Tersertifikasi BNSP',
            'hero_heading' => 'Halo, Saya Ardiansyah Surya Pratama',
            'typing_roles' => json_encode([
                'Web Developer di Oemah Daun',
                'Fresh Graduate Teknik Informatika (IPK 3.73)',
                'Pemrogram Tersertifikasi BNSP',
                'Full-Stack Web Developer (Laravel & React)',
                'Android Kotlin Developer',
                'REST API & MySQL Specialist',
            ]),
            'about_bio_short' => 'Fresh graduate Teknik Informatika dari Universitas Muhammadiyah Purwokerto (IPK 3.73/4.00) dan Pemrogram Tersertifikasi BNSP.',
            'contact_email' => 'spratama029@gmail.com',
            'theme_default' => 'dark',
            'tour_enabled' => '1',
            'meta_description' => 'Portofolio profesional Ardiansyah Surya Pratama - Sarjana Komputer UMP (IPK 3.73), Pemrogram Tersertifikasi BNSP berpengalaman di Laravel, React, Kotlin, dan REST API.',
        ];

        foreach ($settings as $key => $val) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $val, 'group' => 'general']);
        }

        // 10. Guided Tour Steps
        $tourSteps = [
            [
                'title' => 'Selamat Datang!',
                'description' => 'Selamat datang di portofolio interaktif Ardiansyah Surya Pratama. Ikuti panduan singkat ini untuk melihat kualifikasi dan karya saya.',
                'target_selector' => '#hero-section',
                'position' => 'bottom',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Profil & Latar Belakang',
                'description' => 'Pelajari profil lulusan Teknik Informatika UMP (IPK 3.73) dan sertifikasi kompetensi Pemrogram resmi dari BNSP.',
                'target_selector' => '#about-section',
                'position' => 'top',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Proyek Nyata',
                'description' => 'Lihat aplikasi mobile Android servis bengkel, portfolio CMS, serta publikasi jurnal SINTA 4 yang telah saya selesaikan.',
                'target_selector' => '#projects-section',
                'position' => 'top',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Keahlian Teknis & Bahasa',
                'description' => 'Daftar keahlian bahasa pemrograman (PHP, Kotlin, SQL, JS), frameworks (Laravel, React), dan database.',
                'target_selector' => '#skills-section',
                'position' => 'top',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Sertifikat Kompetensi',
                'description' => 'Klik sertifikat untuk melihat preview dokumen resmi BNSP, TOEFL, dan lisensi kompetensi lainnya.',
                'target_selector' => '#certificates-section',
                'position' => 'top',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Pengalaman & Pendidikan',
                'description' => 'Riwayat freelance pengembangan aplikasi, administrasi e-procurement, dan rekam jejak akademis.',
                'target_selector' => '#experience-section',
                'position' => 'top',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'Hubungi Saya',
                'description' => 'Kirim pesan langsung melalui formulir kontak atau hubungi via email dan sosial media untuk peluang karir atau kerja sama.',
                'target_selector' => '#contact-section',
                'position' => 'top',
                'sort_order' => 7,
                'is_active' => true,
            ],
        ];

        foreach ($tourSteps as $step) {
            GuidedTourStep::create($step);
        }

        // 11. Initial Contact Message
        ContactMessage::create([
            'name' => 'HR Recruiter',
            'email' => 'hr@techindonesia.id',
            'subject' => 'Undangan Interview: Junior/Mid Software Engineer',
            'message' => 'Halo Ardiansyah, kami tertarik dengan portofolio Anda khususnya pengalaman mengembangkan aplikasi Android Kotlin dan backend Laravel, serta sertifikasi BNSP yang Anda miliki. Bisakah kita jadwalkan sesi interview online minggu ini?',
            'status' => 'unread',
            'ip_hash' => md5('127.0.0.1'),
            'created_at' => Carbon::now()->subHours(2),
        ]);

        // 12. Sample Analytics Events
        $devices = ['desktop', 'desktop', 'mobile', 'mobile', 'tablet'];
        $paths = ['/', '/', '/projects/aplikasi-servis-bengkel-sempoeloer', '/projects/personal-portfolio-cms-interactive', '/#contact'];
        for ($i = 6; $i >= 0; $i--) {
            $dayViews = rand(10, 28);
            $dayDate = Carbon::now()->subDays($i);
            for ($k = 0; $k < $dayViews; $k++) {
                AnalyticsEvent::create([
                    'event_type' => 'page_view',
                    'path' => $paths[array_rand($paths)],
                    'referrer' => array_rand(['direct' => 1, 'https://linkedin.com' => 1, 'https://github.com' => 1, 'https://google.com' => 1]),
                    'device' => $devices[array_rand($devices)],
                    'browser' => 'Chrome',
                    'visitor_hash' => md5('visitor_' . rand(1, 15) . '_' . $dayDate->format('Ymd')),
                    'created_at' => $dayDate->copy()->setHour(rand(8, 22))->setMinute(rand(0, 59)),
                ]);
            }
        }
    }
}
