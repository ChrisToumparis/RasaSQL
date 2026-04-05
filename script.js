// ==========================================
// Smooth Scrolling for Navigation
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Active Navigation Link on Scroll
// ==========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// Chapter links now use direct HTML <a> tags
// No JavaScript needed for chapter navigation
// ==========================================


// ==========================================
// Chat Widget Toggle
// ==========================================

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    chatWidget.classList.toggle('active');
    
    // Focus on input when opening
    if (chatWidget.classList.contains('active')) {
        document.getElementById('chatInput').focus();
    }
}

function openChatbot() {
    const chatWidget = document.getElementById('chatWidget');
    if (!chatWidget.classList.contains('active')) {
        toggleChat();
    }
}

// ==========================================
// Chat Message Handling
// ==========================================

const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

// Handle Enter key in chat input
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send to Rasa (or simulate response for demo)
    sendToRasa(message);
}

function addMessageToChat(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-widget-message ${sender}`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
    }
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-widget-message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p>Γράφει...</p>
        </div>
    `;
    
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// ==========================================
// Rasa Integration
// ==========================================

// Configuration for Rasa server
const RASA_SERVER_URL = 'http://localhost:5005'; // Change this to your Rasa server URL

async function sendToRasa(message) {
    try {
        // Send message to Rasa
        const response = await fetch(`${RASA_SERVER_URL}/webhooks/rest/webhook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: 'user',
                message: message
            })
        });
        
        removeTypingIndicator();
        
        if (!response.ok) {
            throw new Error('Rasa server error');
        }
        
        const data = await response.json();
        
        // Display all responses from Rasa
        if (data && data.length > 0) {
            data.forEach(msg => {
                if (msg.text) {
                    addMessageToChat(msg.text, 'bot');
                }
            });
        } else {
            addMessageToChat('Συγγνώμη, δεν κατάλαβα. Μπορείς να το ξαναδιατυπώσεις;', 'bot');
        }
        
    } catch (error) {
        console.error('Error communicating with Rasa:', error);
        removeTypingIndicator();
        
        // Fallback to demo mode if Rasa is not available
        simulateRasaResponse(message);
    }
}

// ==========================================
// Demo Mode - Simulated Responses
// ==========================================

function simulateRasaResponse(message) {
    const lowerMessage = message.toLowerCase();
    let response = '';
    
    // Simple keyword-based responses for demo
    if (lowerMessage.includes('select')) {
        response = `Η εντολή SELECT χρησιμοποιείται για να ανακτήσεις δεδομένα από μία βάση δεδομένων. 

Βασική σύνταξη:
SELECT πεδία FROM πίνακας;

Παράδειγμα:
SELECT Name, Population FROM City;

Θέλεις να μάθεις περισσότερα για τη SELECT;`;
    } 
    else if (lowerMessage.includes('where')) {
        response = `Η πρόταση WHERE χρησιμοποιείται για να φιλτράρεις τα αποτελέσματα με βάση συνθήκες.

Παράδειγμα:
SELECT * FROM Country WHERE Population > 10000000;

Μπορείς να συνδυάσεις πολλές συνθήκες με AND και OR!`;
    }
    else if (lowerMessage.includes('join')) {
        response = `Οι ενώσεις (JOINs) χρησιμοποιούνται για να συνδυάσεις δεδομένα από πολλούς πίνακες.

Βασικοί τύποι:
• INNER JOIN - κοινές εγγραφές
• LEFT JOIN - όλες από αριστερό πίνακα
• RIGHT JOIN - όλες από δεξί πίνακα

Θέλεις να δεις παράδειγμα;`;
    }
    else if (lowerMessage.includes('insert')) {
        response = `Η INSERT χρησιμοποιείται για να προσθέσεις νέες εγγραφές σε πίνακα.

Σύνταξη:
INSERT INTO πίνακας (πεδία) VALUES (τιμές);

Παράδειγμα:
INSERT INTO students (name, age) VALUES ('Νίκος', 22);`;
    }
    else if (lowerMessage.includes('update')) {
        response = `Η UPDATE τροποποιεί υπάρχουσες εγγραφές.

Σύνταξη:
UPDATE πίνακας SET πεδίο = τιμή WHERE συνθήκη;

Προσοχή: Χωρίς WHERE θα ενημερωθούν ΟΛΕΣ οι εγγραφές!`;
    }
    else if (lowerMessage.includes('delete')) {
        response = `Η DELETE διαγράφει εγγραφές από πίνακα.

Σύνταξη:
DELETE FROM πίνακας WHERE συνθήκη;

Προσοχή: Χωρίς WHERE θα διαγραφούν ΟΛΕΣ οι εγγραφές!`;
    }
    else if (lowerMessage.includes('group by')) {
        response = `Η GROUP BY ομαδοποιεί εγγραφές με βάση κοινές τιμές και συνήθως χρησιμοποιείται με συνδυαστικές συναρτήσεις.

Παράδειγμα:
SELECT Continent, COUNT(*) 
FROM Country 
GROUP BY Continent;

Αυτό θα μετρήσει τις χώρες ανά ήπειρο!`;
    }
    else if (lowerMessage.includes('βοήθεια') || lowerMessage.includes('help')) {
        response = `Μπορώ να σε βοηθήσω με:

📚 Βασικές εντολές (SELECT, INSERT, UPDATE, DELETE)
🔗 Ενώσεις πινάκων (JOIN)
📊 Συνδυαστικές συναρτήσεις (COUNT, SUM, AVG)
🎯 Φιλτράρισμα (WHERE, HAVING)
📋 Δημιουργία πινάκων (CREATE TABLE)

Τι θα ήθελες να μάθεις;`;
    }
    else {
        response = `Ενδιαφέρουσα ερώτηση! Μπορώ να σε βοηθήσω με:

• Εντολές SQL (SELECT, INSERT, UPDATE, DELETE)
• Ενώσεις πινάκων (JOIN)
• Συναρτήσεις (COUNT, SUM, AVG, κτλ)
• Υποερωτήματα
• Δημιουργία βάσεων και πινάκων

Ρώτησέ με κάτι πιο συγκεκριμένο!`;
    }
    
    // Simulate delay
    setTimeout(() => {
        addMessageToChat(response, 'bot');
    }, 1000);
}

// ==========================================
// Scroll Animations
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all chapter cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.chapter-card, .example-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ==========================================
// Initialize
// ==========================================

console.log('🚀 SQL Learning Platform Initialized');
console.log('💬 Chat widget ready');
console.log('📚 9 chapters loaded');

// Check if Rasa server is available
fetch(`${RASA_SERVER_URL}/webhooks/rest/webhook`, {
    method: 'GET',
}).then(() => {
    console.log('✅ Rasa server connected');
}).catch(() => {
    console.log('⚠️ Rasa server not available - using demo mode');
    console.log(`Expected Rasa at: ${RASA_SERVER_URL}`);
});
