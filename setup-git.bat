@echo off
REM CodeAtlas Git Installation Script for Windows
REM This script checks for Git and provides installation instructions

echo ================================
echo CodeAtlas Git Setup
echo ================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Git is installed:
    git --version
    exit /b 0
)

echo [ERROR] Git not found in PATH
echo.
echo Please install Git from: https://git-scm.com/download/win
echo.
echo When installing:
echo   1. Choose "Git from the command line and also from 3rd-party software"
echo   2. Complete the installation
echo   3. Restart Command Prompt
echo   4. Run this script again
echo.
pause
