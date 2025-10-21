@echo off
echo ========================================
echo   3D-Plates - Demarrage de l'application
echo ========================================
echo.

echo Verification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERREUR: Node.js n'est pas installe.
    echo Telechargez-le sur https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js detecte!
echo.

echo Verification des dependances...
if not exist "node_modules\" (
    echo Installation des dependances...
    call npm install
    if errorlevel 1 (
        echo ERREUR: Echec de l'installation des dependances
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   Demarrage de l'application Expo...
echo ========================================
echo.
echo Scannez le QR code avec Expo Go sur votre telephone
echo.

call npx expo start

pause
