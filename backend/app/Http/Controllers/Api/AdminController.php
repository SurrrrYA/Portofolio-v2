<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsEvent;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\GuidedTourStep;
use App\Models\Media;
use App\Models\Profile;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\SiteSetting;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\SocialLink;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    // ==========================================
    // 1. DASHBOARD OVERVIEW & ANALYTICS
    // ==========================================
    public function overview()
    {
        $totalProjects = Project::count();
        $totalSkills = Skill::count();
        $totalCertificates = Certificate::count();
        $unreadMessages = ContactMessage::where('status', 'unread')->count();
        $totalPageViews = AnalyticsEvent::count();

        // 7-day trend chart
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dateStr = $date->format('Y-m-d');
            $dayLabel = $date->format('d M');

            $views = AnalyticsEvent::whereDate('created_at', $dateStr)->count();
            $visitors = AnalyticsEvent::whereDate('created_at', $dateStr)
                ->distinct('visitor_hash')
                ->count('visitor_hash');

            $chartData[] = [
                'date' => $dayLabel,
                'views' => $views,
                'visitors' => $visitors,
            ];
        }

        // Recent messages
        $recentMessages = ContactMessage::orderBy('created_at', 'desc')->take(5)->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_projects' => $totalProjects,
                'total_skills' => $totalSkills,
                'total_certificates' => $totalCertificates,
                'unread_messages' => $unreadMessages,
                'total_views' => $totalPageViews,
                'chart_data' => $chartData,
                'recent_messages' => $recentMessages,
            ],
        ]);
    }

    public function analyticsDetail()
    {
        // Device breakdown
        $devices = AnalyticsEvent::select('device', DB::raw('count(*) as count'))
            ->groupBy('device')
            ->get();

        // Top pages
        $topPages = AnalyticsEvent::select('path', DB::raw('count(*) as count'))
            ->groupBy('path')
            ->orderBy('count', 'desc')
            ->take(10)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'devices' => $devices,
                'top_pages' => $topPages,
            ],
        ]);
    }

    // ==========================================
    // 2. PROFILE MANAGEMENT
    // ==========================================
    public function getProfile()
    {
        $profile = Profile::firstOrCreate(['id' => 1], [
            'name' => 'Portfolio Owner',
            'headline' => 'Software Engineer',
        ]);
        return response()->json(['status' => 'success', 'data' => $profile]);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'headline' => 'required|string|max:200',
            'bio' => 'nullable|string',
            'about' => 'nullable|string',
            'email' => 'nullable|email|max:150',
            'phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:100',
            'avatar_url' => 'nullable|string',
            'resume_url' => 'nullable|string',
        ]);

        $profile = Profile::updateOrCreate(['id' => 1], $validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Profil berhasil diperbarui',
            'data' => $profile,
        ]);
    }

    // ==========================================
    // 3. PROJECT MANAGEMENT
    // ==========================================
    public function getProjects()
    {
        $projects = Project::with(['skills', 'images'])->orderBy('sort_order', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $projects]);
    }

    public function storeProject(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'slug' => 'nullable|string|unique:projects,slug',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'thumbnail_url' => 'nullable|string',
            'repo_url' => 'nullable|string',
            'demo_url' => 'nullable|string',
            'status' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
            'skill_ids' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        }

        $skillIds = $validated['skill_ids'] ?? [];
        $imagesData = $validated['images'] ?? [];
        unset($validated['skill_ids'], $validated['images']);

        if (empty($validated['thumbnail_url']) && !empty($imagesData)) {
            $firstImg = $imagesData[0];
            $validated['thumbnail_url'] = is_string($firstImg) ? $firstImg : ($firstImg['image_url'] ?? null);
        }

        $project = Project::create($validated);

        if (!empty($skillIds)) {
            $project->skills()->sync($skillIds);
        }

        if (!empty($imagesData) && is_array($imagesData)) {
            foreach ($imagesData as $idx => $img) {
                $url = is_string($img) ? $img : ($img['image_url'] ?? null);
                if ($url) {
                    $project->images()->create([
                        'image_url' => $url,
                        'caption' => is_array($img) ? ($img['caption'] ?? null) : null,
                        'sort_order' => is_array($img) ? ($img['sort_order'] ?? ($idx + 1)) : ($idx + 1),
                    ]);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Proyek berhasil ditambahkan',
            'data' => $project->load('skills', 'images'),
        ], 201);
    }

    public function updateProject(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'slug' => 'nullable|string|unique:projects,slug,' . $id,
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'thumbnail_url' => 'nullable|string',
            'repo_url' => 'nullable|string',
            'demo_url' => 'nullable|string',
            'status' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
            'skill_ids' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $skillIds = $validated['skill_ids'] ?? null;
        $imagesData = $request->has('images') ? $request->input('images') : null;
        unset($validated['skill_ids'], $validated['images']);

        if (empty($validated['thumbnail_url']) && !empty($imagesData) && is_array($imagesData)) {
            $firstImg = $imagesData[0];
            $validated['thumbnail_url'] = is_string($firstImg) ? $firstImg : ($firstImg['image_url'] ?? null);
        }

        $project->update($validated);

        if ($skillIds !== null) {
            $project->skills()->sync($skillIds);
        }

        if ($imagesData !== null && is_array($imagesData)) {
            $project->images()->delete();
            foreach ($imagesData as $idx => $img) {
                $url = is_string($img) ? $img : ($img['image_url'] ?? null);
                if ($url) {
                    $project->images()->create([
                        'image_url' => $url,
                        'caption' => is_array($img) ? ($img['caption'] ?? null) : null,
                        'sort_order' => is_array($img) ? ($img['sort_order'] ?? ($idx + 1)) : ($idx + 1),
                    ]);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Proyek berhasil diperbarui',
            'data' => $project->load('skills', 'images'),
        ]);
    }

    public function deleteProject($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Proyek berhasil dihapus',
        ]);
    }

    // ==========================================
    // 4. SKILLS & CATEGORIES MANAGEMENT
    // ==========================================
    public function getSkills()
    {
        $categories = SkillCategory::with('skills')->orderBy('sort_order', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $categories]);
    }

    public function storeSkillCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'sort_order' => 'integer',
        ]);

        $category = SkillCategory::create($validated);
        return response()->json(['status' => 'success', 'data' => $category], 201);
    }

    public function deleteSkillCategory($id)
    {
        SkillCategory::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Kategori berhasil dihapus']);
    }

    public function storeSkill(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:skill_categories,id',
            'name' => 'required|string|max:100',
            'level' => 'nullable|string',
            'icon' => 'nullable|string',
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ]);

        $skill = Skill::create($validated);
        return response()->json(['status' => 'success', 'data' => $skill], 201);
    }

    public function updateSkill(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        $validated = $request->validate([
            'category_id' => 'required|exists:skill_categories,id',
            'name' => 'required|string|max:100',
            'level' => 'nullable|string',
            'icon' => 'nullable|string',
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ]);

        $skill->update($validated);
        return response()->json(['status' => 'success', 'data' => $skill]);
    }

    public function deleteSkill($id)
    {
        Skill::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Skill berhasil dihapus']);
    }

    // ==========================================
    // 5. CERTIFICATES MANAGEMENT
    // ==========================================
    public function getCertificates()
    {
        $certs = Certificate::orderBy('sort_order', 'asc')->orderBy('issue_date', 'desc')->get();
        return response()->json(['status' => 'success', 'data' => $certs]);
    }

    public function storeCertificate(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'issuer' => 'required|string|max:150',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date',
            'credential_id' => 'nullable|string|max:100',
            'credential_url' => 'nullable|string',
            'file_url' => 'nullable|string',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $cert = Certificate::create($validated);
        return response()->json(['status' => 'success', 'data' => $cert], 201);
    }

    public function updateCertificate(Request $request, $id)
    {
        $cert = Certificate::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'issuer' => 'required|string|max:150',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date',
            'credential_id' => 'nullable|string|max:100',
            'credential_url' => 'nullable|string',
            'file_url' => 'nullable|string',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $cert->update($validated);
        return response()->json(['status' => 'success', 'data' => $cert]);
    }

    public function deleteCertificate($id)
    {
        Certificate::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Sertifikat berhasil dihapus']);
    }

    // ==========================================
    // 6. EXPERIENCES MANAGEMENT
    // ==========================================
    public function getExperiences()
    {
        $exp = Experience::orderBy('sort_order', 'asc')->orderBy('start_date', 'desc')->get();
        return response()->json(['status' => 'success', 'data' => $exp]);
    }

    public function storeExperience(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:150',
            'role' => 'required|string|max:150',
            'type' => 'required|string',
            'location' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'is_current' => 'boolean',
            'description' => 'nullable|string',
            'responsibilities' => 'nullable|string',
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ]);

        $item = Experience::create($validated);
        return response()->json(['status' => 'success', 'data' => $item], 201);
    }

    public function updateExperience(Request $request, $id)
    {
        $item = Experience::findOrFail($id);
        $validated = $request->validate([
            'company' => 'required|string|max:150',
            'role' => 'required|string|max:150',
            'type' => 'required|string',
            'location' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'is_current' => 'boolean',
            'description' => 'nullable|string',
            'responsibilities' => 'nullable|string',
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ]);

        $item->update($validated);
        return response()->json(['status' => 'success', 'data' => $item]);
    }

    public function deleteExperience($id)
    {
        Experience::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Pengalaman berhasil dihapus']);
    }

    // ==========================================
    // 7. EDUCATIONS MANAGEMENT
    // ==========================================
    public function getEducations()
    {
        $edu = Education::orderBy('sort_order', 'asc')->orderBy('start_year', 'desc')->get();
        return response()->json(['status' => 'success', 'data' => $edu]);
    }

    public function storeEducation(Request $request)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:150',
            'degree' => 'required|string|max:150',
            'field_of_study' => 'required|string|max:150',
            'start_year' => 'required|integer',
            'end_year' => 'nullable|integer',
            'description' => 'nullable|string',
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ]);

        $item = Education::create($validated);
        return response()->json(['status' => 'success', 'data' => $item], 201);
    }

    public function updateEducation(Request $request, $id)
    {
        $item = Education::findOrFail($id);
        $validated = $request->validate([
            'institution' => 'required|string|max:150',
            'degree' => 'required|string|max:150',
            'field_of_study' => 'required|string|max:150',
            'start_year' => 'required|integer',
            'end_year' => 'nullable|integer',
            'description' => 'nullable|string',
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ]);

        $item->update($validated);
        return response()->json(['status' => 'success', 'data' => $item]);
    }

    public function deleteEducation($id)
    {
        Education::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Pendidikan berhasil dihapus']);
    }

    // ==========================================
    // 8. SOCIAL LINKS MANAGEMENT
    // ==========================================
    public function getSocialLinks()
    {
        $links = SocialLink::orderBy('sort_order', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $links]);
    }

    public function storeSocialLink(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:100',
            'label' => 'required|string|max:150',
            'url' => 'required|string',
            'icon' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $item = SocialLink::create($validated);
        return response()->json(['status' => 'success', 'data' => $item], 201);
    }

    public function updateSocialLink(Request $request, $id)
    {
        $item = SocialLink::findOrFail($id);
        $validated = $request->validate([
            'platform' => 'required|string|max:100',
            'label' => 'required|string|max:150',
            'url' => 'required|string',
            'icon' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $item->update($validated);
        return response()->json(['status' => 'success', 'data' => $item]);
    }

    public function deleteSocialLink($id)
    {
        SocialLink::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Social link berhasil dihapus']);
    }

    // ==========================================
    // 9. MESSAGES MANAGEMENT
    // ==========================================
    public function getMessages(Request $request)
    {
        $query = ContactMessage::orderBy('created_at', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $messages = $query->paginate(20);
        return response()->json(['status' => 'success', 'data' => $messages]);
    }

    public function updateMessageStatus(Request $request, $id)
    {
        $msg = ContactMessage::findOrFail($id);
        $validated = $request->validate([
            'status' => 'required|in:unread,read,archived',
        ]);

        $msg->update(['status' => $validated['status']]);
        return response()->json(['status' => 'success', 'data' => $msg]);
    }

    public function deleteMessage($id)
    {
        ContactMessage::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Pesan berhasil dihapus']);
    }

    // ==========================================
    // 10. MEDIA LIBRARY (UPLOAD & MANAGE)
    // ==========================================
    public function getMedia()
    {
        $media = Media::orderBy('created_at', 'desc')->paginate(30);
        return response()->json(['status' => 'success', 'data' => $media]);
    }

    public function uploadMedia(Request $request)
    {
        $category = $request->input('category');

        // Handle multiple files upload
        if ($request->hasFile('files')) {
            $request->validate([
                'files' => 'required|array',
                'files.*' => 'file|max:15360', // Max 15MB each
                'category' => 'nullable|string',
            ]);

            $uploaded = [];
            $urls = [];

            foreach ($request->file('files') as $file) {
                $originalName = $file->getClientOriginalName();
                $mime = $file->getClientMimeType();
                $size = $file->getSize();
                $fileCategory = $category ?: (str_starts_with($mime, 'image/') ? 'image' : 'document');

                $path = $file->store('media', 'public');
                $publicUrl = '/storage/' . $path;

                $media = Media::create([
                    'filename' => basename($path),
                    'original_name' => $originalName,
                    'path' => $publicUrl,
                    'mime_type' => $mime,
                    'file_size' => $size,
                    'category' => $fileCategory,
                ]);

                $uploaded[] = $media;
                $urls[] = $publicUrl;
            }

            return response()->json([
                'status' => 'success',
                'message' => count($uploaded) . ' file berhasil diunggah',
                'data' => $uploaded,
                'urls' => $urls,
            ], 201);
        }

        // Handle single file upload
        $request->validate([
            'file' => 'required|file|max:15360',
            'category' => 'nullable|string',
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $mime = $file->getClientMimeType();
        $size = $file->getSize();
        $category = $category ?: (str_starts_with($mime, 'image/') ? 'image' : 'document');

        $path = $file->store('media', 'public');
        $publicUrl = '/storage/' . $path;

        $media = Media::create([
            'filename' => basename($path),
            'original_name' => $originalName,
            'path' => $publicUrl,
            'mime_type' => $mime,
            'file_size' => $size,
            'category' => $category,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'File berhasil diunggah',
            'data' => $media,
            'url' => $publicUrl,
        ], 201);
    }

    public function deleteMedia($id)
    {
        $media = Media::findOrFail($id);

        $diskPath = str_replace('/storage/', '', $media->path);
        if (Storage::disk('public')->exists($diskPath)) {
            Storage::disk('public')->delete($diskPath);
        }

        $media->delete();
        return response()->json(['status' => 'success', 'message' => 'Media berhasil dihapus']);
    }

    // ==========================================
    // 11. GUIDED TOUR MANAGEMENT
    // ==========================================
    public function getGuidedTour()
    {
        $steps = GuidedTourStep::orderBy('sort_order', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $steps]);
    }

    public function storeTourStep(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'target_selector' => 'required|string',
            'position' => 'required|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $step = GuidedTourStep::create($validated);
        return response()->json(['status' => 'success', 'data' => $step], 201);
    }

    public function updateTourStep(Request $request, $id)
    {
        $step = GuidedTourStep::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'target_selector' => 'required|string',
            'position' => 'required|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $step->update($validated);
        return response()->json(['status' => 'success', 'data' => $step]);
    }

    public function deleteTourStep($id)
    {
        GuidedTourStep::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Langkah tour berhasil dihapus']);
    }

    // ==========================================
    // 12. SITE & SEO SETTINGS MANAGEMENT
    // ==========================================
    public function getSettings()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return response()->json(['status' => 'success', 'data' => $settings]);
    }

    public function updateSettings(Request $request)
    {
        $data = $request->all();
        foreach ($data as $key => $val) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => is_array($val) ? json_encode($val) : (string) $val]
            );
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Pengaturan situs berhasil disimpan',
            'data' => SiteSetting::all()->pluck('value', 'key'),
        ]);
    }
}
