<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsEvent;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\GuidedTourStep;
use App\Models\Profile;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\SkillCategory;
use App\Models\SocialLink;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function getProfile()
    {
        $profile = Profile::first();
        return response()->json(['status' => 'success', 'data' => $profile]);
    }

    public function getProjects(Request $request)
    {
        $query = Project::with(['skills', 'images'])
            ->where('is_published', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc');

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->filled('category')) {
            $query->whereHas('skills.category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        $projects = $query->get();
        return response()->json(['status' => 'success', 'data' => $projects]);
    }

    public function getProject(string $slug)
    {
        $project = Project::with(['skills', 'images'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json(['status' => 'success', 'data' => $project]);
    }

    public function getSkills()
    {
        $categories = SkillCategory::with(['skills' => function ($q) {
            $q->where('is_published', true)->orderBy('sort_order', 'asc');
        }])->orderBy('sort_order', 'asc')->get();

        return response()->json(['status' => 'success', 'data' => $categories]);
    }

    public function getCertificates()
    {
        $certificates = Certificate::where('is_published', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('issue_date', 'desc')
            ->get();

        return response()->json(['status' => 'success', 'data' => $certificates]);
    }

    public function getExperiences()
    {
        $experiences = Experience::where('is_published', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json(['status' => 'success', 'data' => $experiences]);
    }

    public function getEducations()
    {
        $educations = Education::where('is_published', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('start_year', 'desc')
            ->get();

        return response()->json(['status' => 'success', 'data' => $educations]);
    }

    public function getSocialLinks()
    {
        $links = SocialLink::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return response()->json(['status' => 'success', 'data' => $links]);
    }

    public function getSiteSettings()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return response()->json(['status' => 'success', 'data' => $settings]);
    }

    public function getGuidedTour()
    {
        $steps = GuidedTourStep::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        $settings = SiteSetting::whereIn('key', ['tour_enabled', 'theme_default'])->pluck('value', 'key');

        return response()->json([
            'status' => 'success',
            'enabled' => ($settings['tour_enabled'] ?? '1') === '1',
            'steps' => $steps,
        ]);
    }

    public function submitContact(Request $request)
    {
        // Honeypot check: If the hidden 'website' field is filled, silently discard spam
        if ($request->filled('website')) {
            return response()->json([
                'status' => 'success',
                'message' => 'Pesan Anda telah berhasil dikirim!',
            ]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:5000',
        ]);

        $ip = $request->ip();
        $ipHash = md5($ip . 'portfolio_salt');

        // Simple rate limit check: max 5 messages per IP per hour
        $recentCount = ContactMessage::where('ip_hash', $ipHash)
            ->where('created_at', '>=', Carbon::now()->subHour())
            ->count();

        if ($recentCount >= 5) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terlalu banyak permintaan kirim pesan. Silakan coba kembali beberapa saat lagi.',
            ], 429);
        }

        $msg = ContactMessage::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'status' => 'unread',
            'ip_hash' => $ipHash,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Terima kasih! Pesan Anda berhasil dikirim dan akan segera direspons.',
            'data' => $msg,
        ]);
    }

    public function trackPageView(Request $request)
    {
        $validated = $request->validate([
            'path' => 'required|string|max:255',
            'referrer' => 'nullable|string|max:255',
            'device' => 'nullable|string|max:50',
            'browser' => 'nullable|string|max:50',
            'visitor_id' => 'nullable|string|max:100',
        ]);

        $ip = $request->ip();
        $visitorHash = $validated['visitor_id'] ?? md5($ip . $request->userAgent() . date('Y-m-d'));

        AnalyticsEvent::create([
            'event_type' => 'page_view',
            'path' => $validated['path'],
            'referrer' => $validated['referrer'] ?? null,
            'device' => $validated['device'] ?? 'desktop',
            'browser' => $validated['browser'] ?? 'Browser',
            'visitor_hash' => $visitorHash,
            'created_at' => Carbon::now(),
        ]);

        return response()->json(['status' => 'success']);
    }
}
