@echo off
echo ========================================
echo   3D-Plates - Demarrage du serveur
echo ========================================
echo.

echo Verification de Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERREUR: Python n'est pas installe.
    echo Telechargez-le sur https://www.python.org/
    pause
    exit /b 1
)

echo Python detecte!
echo.

echo Verification de CUDA/GPU...
python -c "import torch; print('GPU:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'Non detecte')"
echo.

echo Verification des dependances...
if not exist "venv\" (
    echo Creation de l'environnement virtuel...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo Installation des dependances...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ERREUR: Echec de l'installation des dependances
        pause
        exit /b 1
    )
) else (
    call venv\Scripts\activate.bat
)

echo.
echo Verification de FFmpeg...
ffmpeg -version >nul 2>&1
if errorlevel 1 (
    echo ATTENTION: FFmpeg n'est pas installe.
    echo Installez-le avec: choco install ffmpeg
    echo Ou telechargez-le sur https://ffmpeg.org/
    echo.
)

echo.
echo ========================================
echo   Demarrage du serveur Flask...
echo ========================================
echo.
echo Le serveur sera accessible sur:
echo   http://localhost:5000
echo   http://[VOTRE_IP]:5000
echo.
echo Pour trouver votre IP locale: ipconfig
echo.

python app.py

pause
