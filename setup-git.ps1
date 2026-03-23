#!/usr/bin/env powershell
# CodeAtlas Git Installation Script
# Run this script to automatically detect and install Git

param(
    [switch]$SkipChocolatey = $false
)

Write-Host "================================" -ForegroundColor Cyan
Write-Host "CodeAtlas Git Setup Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is already installed
Write-Host "Checking for Git installation..." -ForegroundColor Yellow

try {
    $gitVersion = & git --version 2>$null
    Write-Host "✓ Git is already installed: $gitVersion" -ForegroundColor Green
    exit 0
} catch {
    Write-Host "✗ Git not found in PATH" -ForegroundColor Red
}

Write-Host ""
Write-Host "Attempting to install Git..." -ForegroundColor Yellow
Write-Host ""

# Option 1: Use Chocolatey
if (-not $SkipChocolatey) {
    Write-Host "Checking for Chocolatey..." -ForegroundColor Yellow
    
    try {
        $chocVersion = & choco --version 2>$null
        Write-Host "✓ Chocolatey found: $chocVersion" -ForegroundColor Green
        Write-Host ""
        Write-Host "Installing Git via Chocolatey..." -ForegroundColor Yellow
        
        # Check if running as admin
        $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
        
        if (-not $isAdmin) {
            Write-Host ""
            Write-Host "⚠️  This script needs to run as Administrator to install Git." -ForegroundColor Yellow
            Write-Host "Please right-click PowerShell and 'Run as administrator', then run:" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "  choco install git -y" -ForegroundColor Cyan
            Write-Host ""
            exit 1
        }
        
        choco install git -y
        
        # Refresh PATH
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        Write-Host ""
        Write-Host "Verifying Git installation..." -ForegroundColor Yellow
        
        try {
            $gitVersion = & git --version 2>$null
            Write-Host "✓ Git successfully installed: $gitVersion" -ForegroundColor Green
            Write-Host ""
            Write-Host "✓ Please restart PowerShell for changes to take effect" -ForegroundColor Green
            exit 0
        } catch {
            Write-Host "✗ Git still not found. Try restarting PowerShell." -ForegroundColor Yellow
        }
        
    } catch {
        Write-Host "✗ Chocolatey not found." -ForegroundColor Yellow
    }
}

# Option 2: Direct download
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Manual Installation Required" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please install Git for Windows manually:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Visit: https://git-scm.com/download/win" -ForegroundColor White
Write-Host "2. Download and run the installer" -ForegroundColor White
Write-Host "3. When prompted, choose:" -ForegroundColor White
Write-Host "   - 'Git from the command line and also from 3rd-party software'" -ForegroundColor Cyan
Write-Host "4. Complete the installation" -ForegroundColor White
Write-Host "5. Restart PowerShell" -ForegroundColor White
Write-Host "6. Run this script again" -ForegroundColor White
Write-Host ""

# Offer to open browser
$response = Read-Host "Would you like me to open the Git download page? (y/n)"
if ($response -eq 'y' -or $response -eq 'Y') {
    Start-Process "https://git-scm.com/download/win"
    Write-Host ""
    Write-Host "Opening Git download page in browser..." -ForegroundColor Cyan
}

Write-Host ""
Write-Host "After installing Git:" -ForegroundColor Green
Write-Host "1. Restart PowerShell" -ForegroundColor White
Write-Host "2. Navigate to: c:\Users\HP\Desktop\CodeAtlas" -ForegroundColor White
Write-Host "3. Run: python backend\app.py" -ForegroundColor Cyan
