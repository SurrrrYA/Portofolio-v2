Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Starting Personal Portfolio CMS Development Servers" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$root = $PSScriptRoot

Write-Host "`n[1/2] Menjalankan Laravel Backend di http://127.0.0.1:8000 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\backend'; php -d upload_max_filesize=64M -d post_max_size=128M artisan serve --port=8000"

Write-Host "[2/2] Menjalankan React Frontend di http://localhost:5173 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\frontend'; npm run dev"

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  Backend dan Frontend telah dibuka di jendela terpisah!" -ForegroundColor Green
Write-Host "  - Public Website: http://localhost:5173" -ForegroundColor White
Write-Host "  - Admin Login:    http://localhost:5173/admin/login" -ForegroundColor White
Write-Host "========================================================`n" -ForegroundColor Green
