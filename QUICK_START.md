# CodeAtlas Quick Setup - Windows Guide

## Prerequisites

### 1. Install Git for Windows (Required)

#### Method A: Download from Website (Easiest)
1. Go to: https://git-scm.com/download/win
2. Download "Git for Windows Setup"
3. Run installer with default settings
4. **Important:** Choose "Git from the command line and also from 3rd-party software"
5. Click "Install"
6. Restart PowerShell/Command Prompt

#### Method B: Install via Chocolatey
```powershell
choco install git -y
```

#### Verify Installation
```powershell
git --version
# Should show: git version 2.x.x.windows.x
```

### 2. Install Python 3.8+ (Already Have This)
```powershell
python --version
```

### 3. Install Node.js & npm
1. Go to: https://nodejs.org
2. Download LTS version
3. Run installer (use default settings)
4. Verify:
```powershell
node --version
npm --version
```

---

## Quick Start

### Run Everything

#### Step 1: Open PowerShell as Administrator

#### Step 2: Start Backend (Terminal 1)
```powershell
cd c:\Users\HP\Desktop\CodeAtlas\backend
pip install -r requirements.txt
python app.py
```

Expected output:
```
 * Running on http://0.0.0.0:5000
 * Press CTRL+C to quit
```

#### Step 3: Start Frontend (Terminal 2)
```powershell
cd c:\Users\HP\Desktop\CodeAtlas\frontend
npm install
$env:REACT_APP_API_URL="http://localhost:5000/api"
npm start
```

Expected output:
```
Compiled successfully!
You can now view codeatlas-frontend in the browser.
  Local:            http://localhost:3000
```

#### Step 4: Open Browser
- Navigate to: http://localhost:3000
- Click "Start Analyzing"
- Enter a GitHub repository URL
- Click "Analyze"

---

## Automated Setup Scripts

### Option A: PowerShell Script
```powershell
# Run from c:\Users\HP\Desktop\CodeAtlas
.\setup-git.ps1
```

### Option B: Batch Script
```powershell
# Run from c:\Users\HP\Desktop\CodeAtlas
setup-git.bat
```

---

## Testing Each Component

### Test Backend
```powershell
# Check health
curl http://localhost:5000/health

# Check API status  
curl http://localhost:5000/api/status

# Test with repository (via Postman or curl)
$body = @{ repo_url = "https://github.com/facebook/react" } | ConvertTo-Json
curl -Method POST -Uri "http://localhost:5000/api/analyze" -Body $body -ContentType "application/json"
```

### Test Frontend
- Open http://localhost:3000
- Verify navigation bar appears
- Click Home and Analyze links
- Form should be responsive

---

## Common Issues & Fixes

### Issue 1: "Git is not installed"
```powershell
# Install Git
# https://git-scm.com/download/win
```

### Issue 2: "Port 5000 already in use"
```powershell
# Find process
netstat -ano | findstr :5000

# Kill it
taskkill /PID <PID> /F

# Or use different port
$env:PORT="5001"
python app.py
```

### Issue 3: "npm: command not found"
- Node.js not installed
- Download from https://nodejs.org
- Restart PowerShell after installing

### Issue 4: "Python module not found"
```powershell
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### Issue 5: CORS errors in browser
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` is set correctly
- Restart both servers

---

## Project Locations

| Component | Path |
|-----------|------|
| Backend | `c:\Users\HP\Desktop\CodeAtlas\backend` |
| Frontend | `c:\Users\HP\Desktop\CodeAtlas\frontend` |
| Documentation | `c:\Users\HP\Desktop\CodeAtlas\README.md` |
| Git Guide | `c:\Users\HP\Desktop\CodeAtlas\GIT_SETUP_GUIDE.md` |
| Terraform Analysis | `c:\Users\HP\Desktop\CodeAtlas\TF_ARCHITECTURE_ANALYSIS.md` |

---

## What Can You Do?

1. **Analyze Any GitHub Repo** - See architecture automatically
2. **View Technologies** - Detect frameworks and dependencies
3. **See Insights** - Get recommendations for improvements
4. **Explore Architecture** - Interactive dependency graph

---

## Example Repositories to Analyze

- https://github.com/facebook/react - Popular React repo
- https://github.com/django/django - Python web framework
- https://github.com/kubernetes/kubernetes - Container orchestration
- https://github.com/torvalds/linux - Linux kernel

---

## Next Steps

- [ ] Install Git for Windows
- [ ] Restart PowerShell
- [ ] Start backend: `python app.py`
- [ ] Start frontend: `npm start`
- [ ] Analyze first repository
- [ ] Read `TF_ARCHITECTURE_ANALYSIS.md` for Terraform insights

---

## More Help

- **Git Setup:** See `GIT_SETUP_GUIDE.md`
- **Getting Started:** See `GETTING_STARTED.md`
- **Project Info:** See `README.md`
- **Terraform Analysis:** See `TF_ARCHITECTURE_ANALYSIS.md`

---

**CodeAtlas v0.1.0** - Understand Complex Codebases Instantly
