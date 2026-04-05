#  SQL Learning Platform με Rasa Chatbot

Ιστοσελίδα ασύγχρονης εκπαίδευσης για SQL με ενσωματωμένο AI βοηθό.

## Περιγραφή

Αυτή η πλατφόρμα παρέχει ολοκληρωμένο εκπαιδευτικό υλικό για την εκμάθηση της SQL (Structured Query Language) με τη χρήση του Rasa Open Source 3 ως βοηθητικού chatbot που απαντά ερωτήσεις σε πραγματικό χρόνο.

### ✨ Χαρακτηριστικά

- 📚 **9 Ολοκληρωμένα Κεφάλαια** - Από βασικές έως προχωρημένες έννοιες SQL
- 🤖 **AI Chatbot Βοηθός** - Rasa bot εκπαιδευμένο στο SQL υλικό
- 💬 **Υποστήριξη Ελληνικών** - Πλήρως στα Ελληνικά
- 📱 **Responsive Design** - Λειτουργεί σε όλες τις συσκευές
- 🎨 **Modern UI/UX** - Καθαρό και επαγγελματικό interface
- ⚡ **Γρήγορη Φόρτωση** - Optimized για performance

## 📁 Δομή Project

```
sql-learning-platform/
├── index.html              # Κύρια σελίδα
├── styles.css              # Styling
├── script.js               # Interactivity & Rasa integration
├── DEPLOYMENT_GUIDE.md     # Οδηγίες deployment
├── README.md               # Αυτό το αρχείο
│
└── rasa-bot/              # Rasa Chatbot
    ├── config.yml         # Rasa configuration
    ├── domain.yml         # Bot responses & intents
    ├── credentials.yml    # Channel credentials
    ├── endpoints.yml      # External services config
    └── data/
        ├── nlu.yml        # Training data
        └── stories.yml    # Conversation flows
```

## Quick Start

### 1. Ιστοσελίδα (Frontend)

Απλά ανοίξτε το `index.html` σε browser:

```bash
# Option 1: Άμεσα
double-click στο index.html

# Option 2: Local server (Python)
python3 -m http.server 8000
# Μετά: http://localhost:8000
```

### 2. Rasa Chatbot

```bash
# Εγκατάσταση Rasa
pip install rasa

# Εκπαίδευση
cd rasa-bot
rasa train

# Εκκίνηση server
rasa run --enable-api --cors "*" --port 5005
```

**Για αναλυτικές οδηγίες, δείτε το [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**

## Περιεχόμενο Μαθήματος

### Κεφάλαια:

1. **Εισαγωγή** - Βασικές έννοιες, δομή βάσης δεδομένων
2. **SQL & MySQL** - Τύποι δεδομένων, βασικές εντολές
3. **Ερωτήματα Επιλογής** - SELECT, WHERE, ORDER BY
4. **Συνδυαστικές Συναρτήσεις** - COUNT, SUM, AVG, GROUP BY
5. **Ορισμός & Διαχείριση** - CREATE, ALTER, DROP
6. **Χειρισμός Δεδομένων** - INSERT, UPDATE, DELETE
7. **Ένωση Πινάκων** - INNER/LEFT/RIGHT JOIN
8. **Υποερωτήματα** - Subqueries, ANY, ALL, EXISTS
9. **Όψεις** - CREATE VIEW, ALTER VIEW

## 🤖 Chatbot Capabilities

Το Rasa bot μπορεί να απαντήσει σε:

- ✅ Ερωτήσεις για βασικές εντολές (SELECT, INSERT, UPDATE, DELETE)
- ✅ Εξηγήσεις για JOINs και ενώσεις πινάκων
- ✅ Συνδυαστικές συναρτήσεις και GROUP BY
- ✅ Υποερωτήματα και Views
- ✅ Primary/Foreign Keys
- ✅ Τύπους δεδομένων
- ✅ Παραδείγματα κώδικα

### Παραδείγματα Ερωτήσεων:

```
- "Τι είναι η SELECT;"
- "Πως κάνω JOIN;"
- "Εξήγησε μου το GROUP BY"
- "Τι είναι το primary key;"
- "Δείξε μου παράδειγμα INSERT"
```

## 🛠️ Τεχνολογίες

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Chatbot:** Rasa Open Source 3.x
- **Fonts:** Google Fonts (Playfair Display, Karla, IBM Plex Mono)
- **Icons:** SVG icons (inline)

## 📦 Dependencies

### Frontend
Καμία! Pure HTML/CSS/JS - no frameworks

### Rasa Bot
- Python 3.8-3.10
- Rasa 3.x
- (Δείτε requirements.txt για πλήρη λίστα)

## 🌐 Deployment Options

### Frontend (Ιστοσελίδα):
- **Netlify** ⭐ Συνιστάται
- **Vercel**
- **GitHub Pages**
- **Traditional Web Hosting** (cPanel/FTP)

### Backend (Rasa):
- **Heroku** (Free tier available)
- **DigitalOcean**
- **AWS/Google Cloud**
- **Railway**
- **Docker**

**Αναλυτικές οδηγίες:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## ⚙️ Configuration

### Σύνδεση Chatbot με Ιστοσελίδα

Στο `script.js`, γραμμή ~150:

```javascript
const RASA_SERVER_URL = 'http://localhost:5005'; // για local testing
// ή
const RASA_SERVER_URL = 'https://your-rasa-url.com'; // για production
```

## 🎨 Customization

### Χρώματα (CSS Variables)

Στο `styles.css`:

```css
:root {
    --primary: #2563eb;        /* Κύριο μπλε */
    --secondary: #f59e0b;      /* Πορτοκαλί accent */
    --text-primary: #0f172a;   /* Κείμενο */
    /* ... άλλες μεταβλητές */
}
```

### Fonts

Αλλάξτε τα Google Fonts στο `<head>` του `index.html`

## 📊 Browser Support

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Opera (76+)

## 🔒 Security Notes

- ⚠️ Σε production, **ΜΗΝ** χρησιμοποιείτε `--cors "*"`
- ✅ Χρησιμοποιήστε HTTPS
- ✅ Καθορίστε συγκεκριμένα allowed origins

## 📈 Performance

- ⚡ First Contentful Paint: < 1s
- ⚡ Time to Interactive: < 2s
- 📦 Total Page Size: ~50KB (uncompressed)

## 🐛 Known Issues

1. **Rasa Bot Offline:** Σε αυτή την περίπτωση, το frontend λειτουργεί σε "demo mode" με προκαθορισμένες απαντήσεις
2. **Mobile Navigation:** Για screens < 480px, το navigation menu κρύβεται (future improvement: hamburger menu)

## 📄 License

Το εκπαιδευτικό υλικό βασίζεται σε σημειώσεις από το Διεθνές Πανεπιστήμιο της Ελλάδος (ΔΙΠΑΕ).

## 👥 Credits

**Εκπαιδευτικό Υλικό:**
- Επικ. Καθ. Ιωάννης Καζανίδης
- Τμήμα Πληροφορικής, ΔΠΘ
- "Εισαγωγή στην SQL" (Καβάλα 2026)

**Τεχνολογία:**
- [Rasa Open Source](https://rasa.com/)
- [MySQL](https://www.mysql.com/)

## 📞 Support

Για τεχνική υποστήριξη:
- Rasa Documentation: https://rasa.com/docs/
- MySQL Documentation: https://dev.mysql.com/doc/

## 🔗 Χρήσιμοι Σύνδεσμοι

- **Rasa Docs:** https://opensource.rasa.com
- **Πτυχιακή Εργασία:** [Google Docs Link]
- **Ιστοσελίδα Υλικού:** https://rasasqlgr.weebly.com/

---

**Φτιαγμένο με ❤️ για ασύγχρονη εκπαίδευση SQL**

*Έκδοση 1.0 - Δεκέμβριος 2025*
