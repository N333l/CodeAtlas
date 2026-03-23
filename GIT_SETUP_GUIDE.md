# Git Installation & Setup Guide for CodeAtlas

## Problem

CodeAtlas requires Git to clone and analyze repositories. The error indicates Git is not installed or not in your system PATH.

## Solution Options

### Option 1: Install Git for Windows (Recommended)

#### Step 1: Download Git for Windows
1. Visit: https://git-scm.com/download/win
2. Click "Click here to download" or download the latest installer
3. Run the installer (git-for-windows-setup.exe)

#### Step 2: Run the Installer
- **Setup Type:** Default settings are fine
- **Editor:** Choose your preferred editor (VS Code recommended)
- **Default Branch:** "Let Git decide" or use "main"
- **PATH Environment:** Select "Git from the command line and also from 3rd-party software"
- **HTTPS Transport:** "Use the OpenSSL library"
- **Line Endings:** "Checkout as-is, commit as-is"

#### Step 3: Verify Installation
```powershell
git --version
# Should output: git version 2.x.x.windows.x
```

#### Step 4: Restart Your Terminal
PowerShell must be restarted to recognize the updated PATH.

---

### Option 2: Install Git via Chocolatey

If you have Chocolatey installed:

```powershell
choco install git
```

Then verify:
```powershell
git --version
```

---

### Option 3: Install Git via Windows Package Manager

If you have Windows Package Manager:

```powershell
winget install Git.Git
```

---

### Option 4: Manual PATH Configuration (If Git is Already Installed)

If Git is installed but not in your PATH:

#### Step 1: Find Your Git Installation
```powershell
# Search for git executable
Get-ChildItem -Path "C:\Program Files*" -Recurse -Filter "git.exe" -ErrorAction SilentlyContinue
```

#### Step 2: Add to PATH
```powershell
# Get current PATH
[Environment]::GetEnvironmentVariable('PATH', [EnvironmentVariableTarget]::Machine)

# Add Git bin directory (replace path as needed)
[Environment]::SetEnvironmentVariable(
    'PATH',
    "$(([Environment]::GetEnvironmentVariable('PATH', [EnvironmentVariableTarget]::Machine)));C:\Program Files\Git\cmd",
    [EnvironmentVariableTarget]::Machine
)
```

#### Step 3: Restart PowerShell
```powershell
git --version
```

---

## After Installing Git

### 1. Restart Your Terminal/VS Code
PowerShell needs to reload environment variables.

### 2. Verify Git is Available
```powershell
git --version
git config --list
```

### 3. Configure Git (First Time)
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 4. Restart CodeAtlas Backend
```powershell
cd c:\Users\HP\Desktop\CodeAtlas\backend
python app.py
```

---

## Troubleshooting

### Git Command Not Found
**Solution:** Add Git to PATH manually or reinstall with "Git from the command line" option

### Python Still Cannot Find Git
**Solution:** Set environment variable directly in PowerShell:
```powershell
$env:GIT_PYTHON_GIT_EXECUTABLE = "C:\Program Files\Git\bin\git.exe"
```

Then verify:
```powershell
python -c "from git import Repo; print('Git is available!')"
```

### Port Already in Use
```powershell
# Find process using port 5000
netstat -ano | findstr :5000
# Kill process
taskkill /PID <PID> /F
```

---

## Quick Setup Script

Run this PowerShell script to automate the process:

```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Check git
git --version

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git not found. Installing..."
    choco install git -y
}

# Restart to apply PATH
Write-Host "Please restart PowerShell to apply changes"
```

---

## Starting CodeAtlas After Git Installation

```powershell
# Terminal 1: Backend
cd c:\Users\HP\Desktop\CodeAtlas\backend
python app.py

# Terminal 2: Frontend (after backend is running)
cd c:\Users\HP\Desktop\CodeAtlas\frontend
npm start
```

---

## Verifying Everything Works

### 1. Check Backend Health
```powershell
curl http://localhost:5000/health
# Should return: {"status":"healthy"}
```

### 2. Check Git Availability
```powershell
curl http://localhost:5000/api/status
# Should show: "git_available": true
```

### 3. Test Analysis
Open http://localhost:3000 and try analyzing a repository

---

## Common Git Configurations

### Configure SSH (Optional, for private repos)
```powershell
ssh-keygen -t rsa -b 4096 -f $env:USERPROFILE\.ssh\id_rsa
# Add public key to GitHub https://github.com/settings/keys
```

### Configure Credential Storage
```powershell
git config --global credential.helper wincred
```

---

## Next Steps

Once Git is installed and verified:
1. Restart CodeAtlas backend: `python app.py`
2. The API will now have `"git_available": true`
3. Start analyzing repositories!

---

For help, visit: https://github.com/git-for-windows/git/releases
