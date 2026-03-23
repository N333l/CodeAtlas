@echo off
REM CodeAtlas Complete Startup Script for Windows

echo ====================================
echo CodeAtlas - Full Stack Startup
echo ====================================
echo.

REM Define paths
set CODEATLAS_DIR=C:\Users\HP\Desktop\CodeAtlas
set BACKEND_DIR=%CODEATLAS_DIR%\backend
set FRONTEND_DIR=%CODEATLAS_DIR%\frontend

echo [1] Verifying paths...
if not exist "%BACKEND_DIR%" (
    echo ERROR: Backend directory not found at %BACKEND_DIR%
    pause
    exit /b 1
)

if not exist "%FRONTEND_DIR%" (
    echo ERROR: Frontend directory not found at %FRONTEND_DIR%
    pause
    exit /b 1
)

echo [OK] Paths verified
echo.

REM Check for Python
echo [2] Checking Python...
python --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: Python not found
    pause
    exit /b 1
)
echo [OK] Python found
echo.

REM Check for Node.js
echo [3] Checking Node.js...
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js not found
    pause
    exit /b 1
)
echo [OK] Node.js found
echo.

REM Check for Git
echo [4] Checking Git...
git --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo WARNING: Git not found - repository analysis will not work
    echo Install from: https://git-scm.com/download/win
    echo.
) else (
    echo [OK] Git found
    echo.
)

echo ====================================
echo Starting CodeAtlas Services
echo ====================================
echo.

echo [STEP 1] Starting Backend Server...
echo Location: %BACKEND_DIR%
echo Command: python app.py
echo URL: http://localhost:5000
echo.
start "CodeAtlas Backend" cmd /k "cd /d %BACKEND_DIR% && python app.py"

timeout /t 3 /nobreak

echo.
echo [STEP 2] Starting Frontend Server...
echo Location: %FRONTEND_DIR%
echo Command: npm start
echo URL: http://localhost:3000
echo.

set REACT_APP_API_URL=http://localhost:5000/api
start "CodeAtlas Frontend" cmd /k "cd /d %FRONTEND_DIR% && npm start"

echo.
echo ====================================
echo Services Starting...
echo ====================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo The frontend will open automatically in your browser.
echo If not, visit: http://localhost:3000
echo.
echo Press any key to close this window...
pause
