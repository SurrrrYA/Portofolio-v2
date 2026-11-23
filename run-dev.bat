@echo off
title Personal Portfolio Dev Launcher
echo ========================================================
echo   Starting Personal Portfolio CMS Development Servers
echo ========================================================
echo.

set "ROOT=%~dp0"

echo [1/2] Menjalankan Laravel Backend di http://127.0.0.1:8000 ...
start "Backend Laravel API" cmd /k "cd /d %ROOT%backend && php -d upload_max_filesize=64M -d post_max_size=128M artisan serve --port=8000"

echo [2/2] Menjalankan React Frontend di http://localhost:5173 ...
start "Frontend React Vite" cmd /k "cd /d %ROOT%frontend && npm run dev"

echo.
echo ========================================================
echo   Backend dan Frontend sedang berjalan!
echo   - Public Website: http://localhost:5173
echo   - Admin Login:    http://localhost:5173/admin/login
echo   - Backend API:    http://127.0.0.1:8000/api/v1/profile
echo ========================================================
echo.
echo Biarkan jendela terminal tetap terbuka selama Anda menggunakan web.
pause
