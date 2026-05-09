$root = Resolve-Path "$PSScriptRoot\.."
Set-Location $root

Write-Host "🔴 Dropping database..." -ForegroundColor Red
dotnet ef database drop -f

Write-Host "🧹 Removing migrations folder..." -ForegroundColor Yellow
if (Test-Path ".\Migrations") {
    Remove-Item -Recurse -Force ".\Migrations"
    Write-Host "Migrations deleted" -ForegroundColor Yellow
} else {
    Write-Host "No migrations found" -ForegroundColor DarkYellow
}

Write-Host "🆕 Creating fresh migration..." -ForegroundColor Green
dotnet ef migrations add InitialCreate

Write-Host " 📨 Adding email constraint..." -ForegroundColor Green
dotnet ef migrations add AddUniqueEmailConstraint

Write-Host "🆙 Updating database..." -ForegroundColor Cyan
dotnet ef database update

Write-Host "✅ Done" -ForegroundColor Green