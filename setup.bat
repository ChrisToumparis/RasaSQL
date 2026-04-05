@echo off
echo ====================================================
echo   SQL LEARNING PLATFORM - ΕΓΚΑΤΑΣΤΑΣΗ (WINDOWS)
echo ====================================================
echo.

:: Έλεγχος Python version
echo [1/5] Έλεγχος Python version...
python --version >nul 2>&1
if errorlevel 1 (
    echo [X] ERROR: Δεν βρέθηκε Python!
    echo.
    echo Παρακαλώ εγκατάστησε Python 3.8, 3.9, ή 3.10 από:
    echo https://www.python.org/downloads/
    echo.
    echo ΣΗΜΑΝΤΙΚΟ: Κατά την εγκατάσταση, τσέκαρε "Add Python to PATH"
    pause
    exit /b 1
)
python --version
echo.

:: Δημιουργία virtual environment
echo [2/5] Δημιουργία virtual environment...
if exist venv (
    echo Virtual environment υπάρχει ήδη.
) else (
    python -m venv venv
    echo Virtual environment δημιουργήθηκε!
)
echo.

:: Ενεργοποίηση virtual environment
echo [3/5] Ενεργοποίηση virtual environment...
call venv\Scripts\activate.bat
echo.

:: Εγκατάσταση dependencies
echo [4/5] Εγκατάσταση Rasa (5-10 λεπτά)...
echo Περίμενε... Κατεβάζει το Rasa και όλες τις βιβλιοθήκες...
pip install --upgrade pip
pip install -r requirements.txt --break-system-packages
echo.

:: Training του Rasa model
echo [5/5] Εκπαίδευση Rasa model (2-5 λεπτά)...
rasa train
echo.

echo ====================================================
echo   ✅ ΕΓΚΑΤΑΣΤΑΣΗ ΟΛΟΚΛΗΡΩΘΗΚΕ!
echo ====================================================
echo.
echo ΕΠΟΜΕΝΑ ΒΗΜΑΤΑ:
echo.
echo 1. Άνοιξε 2 νέα CMD windows
echo.
echo 2. Στο πρώτο CMD τρέξε:
echo    rasa run --enable-api --cors "*" --port 5005
echo.
echo 3. Στο δεύτερο CMD τρέξε:
echo    python -m http.server 8000
echo.
echo 4. Άνοιξε browser:
echo    http://localhost:8000
echo.
echo ====================================================
pause
