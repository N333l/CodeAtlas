#!/usr/bin/env powershell
# CodeAtlas Complete Startup Script for Windows PowerShell

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "CodeAtlas - Full Stack Startup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$CodeAtlasDir = "C:\Users\HP\Desktop\CodeAtlas"
$BackendDir = "$CodeAtlasDir\backend"
$FrontendDir = "$CodeAtlasDir\frontend"

# Verify paths
Write-Host "[1] Verifying paths..." -ForegroundColor Yellow
if (-not (Test-Path $BackendDir)) {
    Write-Host "ERROR: Backend directory not found at $BackendDir" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $FrontendDir)) {
    Write-Host "ERROR: Frontend directory not found at $FrontendDir" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Paths verified" -ForegroundColor Green
Write-Host ""

# Check Python
Write-Host "[2] Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = & python --version 2>$null
    Write-Host "[OK] Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Python not found" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Check Node.js
Write-Host "[3] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = & node --version 2>$null
    Write-Host "[OK] Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js not found" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Check Git
Write-Host "[4] Checking Git..." -ForegroundColor Yellow
try {
    $gitVersion = & git --version 2>$null
    Write-Host "[OK] Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] Git not found - repository analysis will not work" -ForegroundColor Yellow
    Write-Host "Install from: https://git-scm.com/download/win" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Starting CodeAtlas Services" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[STEP 1] Starting Backend Server..." -ForegroundColor Cyan
Write-Host "Location: $BackendDir" -ForegroundColor White
Write-Host "Command: python app.py" -ForegroundColor White
Write-Host "URL: http://localhost:5000" -ForegroundColor White
Write-Host ""

Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "cd '$BackendDir'; python app.py" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host "[STEP 2] Starting Frontend Server..." -ForegroundColor Cyan
Write-Host "Location: $FrontendDir" -ForegroundColor White
Write-Host "Command: npm start" -ForegroundColor White
Write-Host "URL: http://localhost:3000" -ForegroundColor White
Write-Host ""

$env:REACT_APP_API_URL = "http://localhost:5000/api"
Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "cd '$FrontendDir'; `$env:REACT_APP_API_URL='http://localhost:5000/api'; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "Services Starting..." -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "The frontend will open automatically in your browser." -ForegroundColor Yellow
Write-Host "If not, visit: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the servers" -ForegroundColor Yellow
