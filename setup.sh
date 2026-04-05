#!/bin/bash

echo "===================================================="
echo "  SQL LEARNING PLATFORM - ΕΓΚΑΤΑΣΤΑΣΗ (MAC/LINUX)"
echo "===================================================="
echo ""

# Έλεγχος Python version
echo "[1/5] Έλεγχος Python version..."
if ! command -v python3.10 &> /dev/null; then
    echo "[X] ERROR: Δεν βρέθηκε Python3!"
    echo ""
    echo "Εγκατάστησε Python 3.10:"
    echo "  Mac: brew install python@3.10"
    echo "  Ubuntu: sudo apt install python3.10"
    exit 1
fi
python3.10 --version
echo ""

# Δημιουργία virtual environment
echo "[2/5] Δημιουργία virtual environment..."
if [ -d "venv" ]; then
    echo "Virtual environment υπάρχει ήδη."
else
    python3.10 -m venv venv
    echo "Virtual environment δημιουργήθηκε!"
fi
echo ""

# Ενεργοποίηση virtual environment
echo "[3/5] Ενεργοποίηση virtual environment..."
source venv/bin/activate
echo ""

# Εγκατάσταση dependencies
echo "[4/5] Εγκατάσταση Rasa (5-10 λεπτά)..."
echo "Περίμενε... Κατεβάζει το Rasa και όλες τις βιβλιοθήκες..."
pip install --upgrade pip
pip install -r requirements.txt
echo ""

# Training του Rasa model
echo "[5/5] Εκπαίδευση Rasa model (2-5 λεπτά)..."
rasa train
echo ""

echo "===================================================="
echo "  ✅ ΕΓΚΑΤΑΣΤΑΣΗ ΟΛΟΚΛΗΡΩΘΗΚΕ!"
echo "===================================================="
echo ""
echo "ΕΠΟΜΕΝΑ ΒΗΜΑΤΑ:"
echo ""
echo "1. Άνοιξε 2 νέα Terminal windows"
echo ""
echo "2. Στο πρώτο Terminal τρέξε:"
echo "   rasa run --enable-api --cors \"*\" --port 5005"
echo ""
echo "3. Στο δεύτερο Terminal τρέξε:"
echo "   python3 -m http.server 8000"
echo ""
echo "4. Άνοιξε browser:"
echo "   http://localhost:8000"
echo ""
echo "===================================================="
