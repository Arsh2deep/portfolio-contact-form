const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// In-memory database array to store contact form submissions
const contacts = [];

// Set EJS view engine & views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Serve static assets from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// GET / - Home page renders Online Resume
app.get('/', (req, res) => {
    res.render('index');
});

// GET /contact - Contact form page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// POST /contact - Process form submission and store timestamped contact object
app.post('/contact', (req, res) => {
    const { firstName, lastName, email, mailingList, emailFormat, linkedin, howWeMet, otherMet, message } = req.body;
    
    // Create new contact submission object with timestamp
    const newContact = {
        firstName: firstName ? firstName.trim() : '',
        lastName: lastName ? lastName.trim() : '',
        email: email ? email.trim() : '',
        mailingList: mailingList ? 'Subscribed' : 'Not Subscribed',
        emailFormat: mailingList ? emailFormat : 'N/A',
        linkedin: linkedin && linkedin.trim() !== '' ? linkedin.trim() : 'N/A',
        howWeMet: howWeMet || 'N/A',
        otherMet: howWeMet === 'other' && otherMet ? otherMet.trim() : 'N/A',
        message: message && message.trim() !== '' ? message.trim() : 'N/A',
        submittedAt: new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        })
    };

    // Push to backend memory array
    contacts.push(newContact);
    console.log('New Contact Stored:', newContact);

    // Render confirmation template passing the submitted contact object
    res.render('confirmation', { contact: newContact });
});

// GET /admin - Display all contact form submissions
app.get('/admin', (req, res) => {
    res.render('admin', { contacts });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});