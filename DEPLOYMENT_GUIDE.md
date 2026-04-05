# 📘 Οδηγός Εγκατάστασης & Deployment - SQL Learning Platform

## 📋 Περιεχόμενα

1. [Απαιτήσεις Συστήματος](#απαιτήσεις-συστήματος)
2. [Εγκατάσταση Rasa](#εγκατάσταση-rasa)
3. [Εκπαίδευση Chatbot](#εκπαίδευση-chatbot)
4. [Deployment Ιστοσελίδας](#deployment-ιστοσελίδας)
5. [Επιλογές Hosting](#επιλογές-hosting)
6. [Troubleshooting](#troubleshooting)

---

## 🖥️ Απαιτήσεις Συστήματος

### Για το Rasa Bot:
- Python 3.8, 3.9, ή 3.10
- pip (Python package manager)
- 4GB RAM τουλάχιστον
- 2GB αποθηκευτικός χώρος

### Για την Ιστοσελίδα:
- Οποιοσδήποτε web server (Apache, Nginx, ή hosting service)
- Υποστήριξη για static files (HTML, CSS, JS)

---

## ⚙️ Εγκατάσταση Rasa

### Βήμα 1: Εγκατάσταση Python

#### Windows:
```bash
# Κατεβάστε το Python από https://www.python.org/downloads/
# Βεβαιωθείτε ότι επιλέξατε "Add Python to PATH"
```

#### Linux/Mac:
```bash
# Ελέγξτε αν έχετε Python
python3 --version

# Αν χρειάζεται εγκατάσταση (Ubuntu/Debian):
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

### Βήμα 2: Δημιουργία Virtual Environment

```bash
# Δημιουργία virtual environment
python3 -m venv rasa-env

# Ενεργοποίηση (Linux/Mac)
source rasa-env/bin/activate

# Ενεργοποίηση (Windows)
rasa-env\Scripts\activate
```

### Βήμα 3: Εγκατάσταση Rasa

```bash
# Αναβάθμιση pip
pip install --upgrade pip

# Εγκατάσταση Rasa
pip install rasa

# Επαλήθευση εγκατάστασης
rasa --version
```

---

## 🎓 Εκπαίδευση Chatbot

### Βήμα 1: Προετοιμασία Αρχείων

Βεβαιωθείτε ότι έχετε τα εξής αρχεία στον φάκελο `rasa-bot/`:

```
rasa-bot/
├── config.yml
├── domain.yml
├── credentials.yml
├── endpoints.yml
└── data/
    ├── nlu.yml
    └── stories.yml
```

### Βήμα 2: Εκπαίδευση Μοντέλου

```bash
# Μεταφερθείτε στον φάκελο rasa-bot
cd rasa-bot

# Εκπαίδευση
rasa train

# Αυτό θα δημιουργήσει το μοντέλο στον φάκελο models/
```

**⏱️ Χρόνος εκπαίδευσης:** 5-15 λεπτά (ανάλογα με το σύστημά σας)

### Βήμα 3: Δοκιμή του Bot

```bash
# Διαδραστική δοκιμή στο terminal
rasa shell

# Παραδείγματα ερωτήσεων:
# - τι είναι η select
# - πως κάνω join
# - εξήγησε μου το insert
```

### Βήμα 4: Εκκίνηση Server

```bash
# Εκκίνηση Rasa server
rasa run --enable-api --cors "*" --port 5005

# Το bot είναι τώρα διαθέσιμο στο http://localhost:5005
```

---

## 🌐 Deployment Ιστοσελίδας

### Επιλογή 1: Local Testing

```bash
# Απλός Python HTTP Server
cd /path/to/website/files
python3 -m http.server 8000

# Ανοίξτε browser: http://localhost:8000
```

### Επιλογή 2: Free Hosting Services

#### A. **Netlify** (Συνιστάται για Static Sites)

1. Δημιουργήστε λογαριασμό: https://www.netlify.com
2. Drag & drop τον φάκελο με τα αρχεία (index.html, styles.css, script.js)
3. Το site σας είναι live σε λίγα δευτερόλεπτα!

**📝 Σημείωση:** Θα πρέπει να ενημερώσετε το `RASA_SERVER_URL` στο `script.js`

#### B. **GitHub Pages**

```bash
# 1. Δημιουργήστε GitHub repository
# 2. Upload τα αρχεία
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/sql-learning.git
git push -u origin main

# 3. Ενεργοποιήστε GitHub Pages στις Settings του repo
# Το site θα είναι διαθέσιμο στο: https://username.github.io/sql-learning
```

#### C. **Vercel**

1. Εγκαταστήστε Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel`
3. Ακολουθήστε τις οδηγίες

### Επιλογή 3: Traditional Web Hosting

#### Χρησιμοποιώντας cPanel/FTP:

1. Συνδεθείτε στο hosting σας
2. Upload τα αρχεία στον φάκελο `public_html/` ή `www/`:
   - index.html
   - styles.css
   - script.js
3. Επισκεφτείτε το domain σας

---

## 🚀 Deployment Rasa Bot

### Επιλογή 1: Local Server (για Testing)

```bash
# Εκκίνηση με nohup για background execution
nohup rasa run --enable-api --cors "*" --port 5005 &

# Έλεγχος λειτουργίας
curl http://localhost:5005
```

### Επιλογή 2: Cloud Hosting

#### A. **Heroku** (Free Tier Available)

**Βήμα 1:** Δημιουργήστε `Procfile`:
```
web: rasa run --enable-api --cors "*" --port $PORT
```

**Βήμα 2:** Δημιουργήστε `requirements.txt`:
```bash
pip freeze > requirements.txt
```

**Βήμα 3:** Deploy:
```bash
heroku login
heroku create sql-rasa-bot
git push heroku main
```

#### B. **DigitalOcean / AWS / Google Cloud**

**Βασική Ρύθμιση Ubuntu Server:**

```bash
# 1. Σύνδεση στον server
ssh user@your-server-ip

# 2. Εγκατάσταση dependencies
sudo apt update
sudo apt install python3 python3-pip python3-venv nginx

# 3. Clone/Upload τα αρχεία Rasa
cd /var/www
git clone your-repo.git rasa-bot
cd rasa-bot

# 4. Setup virtual environment
python3 -m venv venv
source venv/bin/activate
pip install rasa

# 5. Train model
rasa train

# 6. Δημιουργία systemd service
sudo nano /etc/systemd/system/rasa.service
```

**Περιεχόμενο `rasa.service`:**
```ini
[Unit]
Description=Rasa Server
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/rasa-bot
Environment="PATH=/var/www/rasa-bot/venv/bin"
ExecStart=/var/www/rasa-bot/venv/bin/rasa run --enable-api --cors "*" --port 5005

[Install]
WantedBy=multi-user.target
```

```bash
# 7. Ενεργοποίηση service
sudo systemctl enable rasa
sudo systemctl start rasa
sudo systemctl status rasa
```

#### C. **Docker Deployment**

**Βήμα 1:** Δημιουργήστε `Dockerfile`:
```dockerfile
FROM rasa/rasa:3.6.0-full

WORKDIR /app
COPY . /app

USER root
RUN rasa train

EXPOSE 5005

CMD ["run", "--enable-api", "--cors", "*", "--port", "5005"]
```

**Βήμα 2:** Build & Run:
```bash
docker build -t sql-rasa-bot .
docker run -p 5005:5005 sql-rasa-bot
```

---

## 🔗 Σύνδεση Ιστοσελίδας με Rasa

### Ενημέρωση RASA_SERVER_URL

Στο αρχείο `script.js`, γραμμή ~150:

```javascript
// Για local testing
const RASA_SERVER_URL = 'http://localhost:5005';

// Για production (αντικαταστήστε με το δικό σας URL)
const RASA_SERVER_URL = 'https://your-rasa-server.com';
```

### CORS Configuration

Αν έχετε προβλήματα CORS, στο Rasa server:

```bash
# Επιτρέπει όλα τα domains (μόνο για development!)
rasa run --enable-api --cors "*"

# Για production, καθορίστε συγκεκριμένα domains:
rasa run --enable-api --cors "https://your-website.com"
```

---

## 📊 Συνιστώμενη Αρχιτεκτονική για Πελάτη

### Setup 1: Οικονομική Λύση (€0-10/μήνα)

- **Frontend:** Netlify/Vercel (Free)
- **Rasa Bot:** Heroku Free Tier ή Railway
- **Κόστος:** €0-5/μήνα

### Setup 2: Professional (€10-30/μήνα)

- **Frontend:** Netlify Pro ή Custom Domain
- **Rasa Bot:** DigitalOcean Droplet ($6/μήνα)
- **Domain:** Namecheap/Google Domains (~€10/έτος)
- **Κόστος:** €10-20/μήνα

### Setup 3: Enterprise (€50+/μήνα)

- **Frontend:** AWS S3 + CloudFront
- **Rasa Bot:** AWS EC2 ή Google Cloud Run
- **Database:** MongoDB Atlas
- **Monitoring:** Sentry, Datadog
- **Κόστος:** €50-200/μήνα

---

## 🐛 Troubleshooting

### Πρόβλημα 1: Rasa δεν εγκαθίσταται

```bash
# Λύση: Χρησιμοποιήστε Python 3.8-3.10
python3 --version

# Αν έχετε Python 3.11+, εγκαταστήστε παλιότερη έκδοση
# ή χρησιμοποιήστε pyenv
```

### Πρόβλημα 2: CORS Errors

```javascript
// Στο script.js, προσθέστε error handling:
fetch(`${RASA_SERVER_URL}/webhooks/rest/webhook`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    mode: 'cors', // Προσθήκη αυτής της γραμμής
    body: JSON.stringify({...})
})
```

### Πρόβλημα 3: Bot δεν απαντά

```bash
# Ελέγξτε αν τρέχει ο server
curl http://localhost:5005

# Ελέγξτε logs
rasa run --enable-api --cors "*" --debug

# Re-train το μοντέλο
rasa train --force
```

### Πρόβλημα 4: Ελληνικά χαρακτήρες δεν εμφανίζονται σωστά

```html
<!-- Βεβαιωθείτε ότι έχετε στο <head>: -->
<meta charset="UTF-8">
```

```bash
# Στα αρχεία .yml, χρησιμοποιήστε UTF-8 encoding
# VS Code: File > Preferences > Settings > Files: Encoding > UTF-8
```

---

## 📚 Επόμενα Βήματα

### Βελτιώσεις που μπορείτε να κάνετε:

1. **Προσθήκη περισσότερων intents** στο `nlu.yml`
2. **Custom Actions** για πιο σύνθετες απαντήσεις
3. **Analytics** με Google Analytics
4. **Feedback System** για το chatbot
5. **Multilingual Support** (Αγγλικά + Ελληνικά)
6. **SQL Playground** για εκτέλεση queries

### Χρήσιμοι Σύνδεσμοι:

- Rasa Documentation: https://rasa.com/docs/
- Rasa Community Forum: https://forum.rasa.com/
- SQL Tutorial: https://www.w3schools.com/sql/
- MySQL Documentation: https://dev.mysql.com/doc/

---

## 📞 Υποστήριξη

Αν ο πελάτης σας έχει ερωτήσεις:

1. **Rasa Issues:** https://github.com/RasaHQ/rasa/issues
2. **Web Hosting:** Επικοινωνήστε με το hosting provider
3. **Τεχνική Υποστήριξη:** Μπορείτε να προσφέρετε support contract

---

## ✅ Checklist Pre-Deployment

- [ ] Εκπαιδευμένο Rasa μοντέλο
- [ ] Δοκιμή chatbot σε local environment
- [ ] Ενημέρωση RASA_SERVER_URL στο script.js
- [ ] Upload files σε hosting
- [ ] Έλεγχος λειτουργίας σε mobile devices
- [ ] HTTPS enabled (για production)
- [ ] Google Analytics setup (optional)
- [ ] Backup των αρχείων
- [ ] Documentation για τον πελάτη

---

**Καλή Επιτυχία! 🚀**

Για περαιτέρω βοήθεια, ανατρέξτε στην επίσημη τεκμηρίωση του Rasa:
https://rasa.com/docs/rasa/
