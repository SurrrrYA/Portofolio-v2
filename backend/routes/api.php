<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // ==========================================
    // PUBLIC ROUTES
    // ==========================================
    Route::get('/profile', [PublicController::class, 'getProfile']);
    Route::get('/projects', [PublicController::class, 'getProjects']);
    Route::get('/projects/{slug}', [PublicController::class, 'getProject']);
    Route::get('/skills', [PublicController::class, 'getSkills']);
    Route::get('/certificates', [PublicController::class, 'getCertificates']);
    Route::get('/experiences', [PublicController::class, 'getExperiences']);
    Route::get('/educations', [PublicController::class, 'getEducations']);
    Route::get('/social-links', [PublicController::class, 'getSocialLinks']);
    Route::get('/site-settings', [PublicController::class, 'getSiteSettings']);
    Route::get('/guided-tour', [PublicController::class, 'getGuidedTour']);

    Route::post('/contact', [PublicController::class, 'submitContact']);
    Route::post('/analytics/page-view', [PublicController::class, 'trackPageView']);

    // ==========================================
    // AUTH ROUTES
    // ==========================================
    Route::post('/admin/login', [AuthController::class, 'login']);

    // ==========================================
    // PROTECTED ADMIN ROUTES (SANCTUM)
    // ==========================================
    Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        // Dashboard & Analytics
        Route::get('/overview', [AdminController::class, 'overview']);
        Route::get('/analytics-detail', [AdminController::class, 'analyticsDetail']);

        // Profile
        Route::get('/profile', [AdminController::class, 'getProfile']);
        Route::put('/profile', [AdminController::class, 'updateProfile']);

        // Projects
        Route::get('/projects', [AdminController::class, 'getProjects']);
        Route::post('/projects', [AdminController::class, 'storeProject']);
        Route::put('/projects/{id}', [AdminController::class, 'updateProject']);
        Route::delete('/projects/{id}', [AdminController::class, 'deleteProject']);

        // Skills & Categories
        Route::get('/skills', [AdminController::class, 'getSkills']);
        Route::post('/skills', [AdminController::class, 'storeSkill']);
        Route::put('/skills/{id}', [AdminController::class, 'updateSkill']);
        Route::delete('/skills/{id}', [AdminController::class, 'deleteSkill']);
        Route::post('/skill-categories', [AdminController::class, 'storeSkillCategory']);
        Route::delete('/skill-categories/{id}', [AdminController::class, 'deleteSkillCategory']);

        // Certificates
        Route::get('/certificates', [AdminController::class, 'getCertificates']);
        Route::post('/certificates', [AdminController::class, 'storeCertificate']);
        Route::put('/certificates/{id}', [AdminController::class, 'updateCertificate']);
        Route::delete('/certificates/{id}', [AdminController::class, 'deleteCertificate']);

        // Experiences
        Route::get('/experiences', [AdminController::class, 'getExperiences']);
        Route::post('/experiences', [AdminController::class, 'storeExperience']);
        Route::put('/experiences/{id}', [AdminController::class, 'updateExperience']);
        Route::delete('/experiences/{id}', [AdminController::class, 'deleteExperience']);

        // Educations
        Route::get('/educations', [AdminController::class, 'getEducations']);
        Route::post('/educations', [AdminController::class, 'storeEducation']);
        Route::put('/educations/{id}', [AdminController::class, 'updateEducation']);
        Route::delete('/educations/{id}', [AdminController::class, 'deleteEducation']);

        // Social Links
        Route::get('/social-links', [AdminController::class, 'getSocialLinks']);
        Route::post('/social-links', [AdminController::class, 'storeSocialLink']);
        Route::put('/social-links/{id}', [AdminController::class, 'updateSocialLink']);
        Route::delete('/social-links/{id}', [AdminController::class, 'deleteSocialLink']);

        // Messages
        Route::get('/messages', [AdminController::class, 'getMessages']);
        Route::patch('/messages/{id}', [AdminController::class, 'updateMessageStatus']);
        Route::delete('/messages/{id}', [AdminController::class, 'deleteMessage']);

        // Media Library
        Route::get('/media', [AdminController::class, 'getMedia']);
        Route::post('/media', [AdminController::class, 'uploadMedia']);
        Route::delete('/media/{id}', [AdminController::class, 'deleteMedia']);

        // Guided Tour
        Route::get('/guided-tour', [AdminController::class, 'getGuidedTour']);
        Route::post('/guided-tour', [AdminController::class, 'storeTourStep']);
        Route::put('/guided-tour/{id}', [AdminController::class, 'updateTourStep']);
        Route::delete('/guided-tour/{id}', [AdminController::class, 'deleteTourStep']);

        // Settings
        Route::get('/site-settings', [AdminController::class, 'getSettings']);
        Route::post('/site-settings', [AdminController::class, 'updateSettings']);
        Route::put('/site-settings', [AdminController::class, 'updateSettings']);
    });
});
