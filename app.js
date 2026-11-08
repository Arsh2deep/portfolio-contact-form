const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// database array to store contact form submissions
const contacts = [];

//Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Serve all static files (HTML, CSS, favicon) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Root route sends home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Handles Contact Form submission
app.post('/contact',(req,res)=>{
    //Get form fields from client
    const {firstName,lastName, email,mailingList,emailFormat,linkedin,howWeMet,otherMet,message}=req.body;
    
    //Structre Submission data Object First
    const newContact = {
        firstName,
        lastName,
        email,
        mailingList: mailingList ? 'Subscribed': 'Not Subscribed',
        emailFormat: mailingList ? emailFormat : 'N/A',
        linkedin,
        howWeMet,
        otherMet: howWeMet === 'other'? otherMet:'N/A',
        message,
        submittedAt: new Date().toLocaleString()
    };

    //store in-memory array backend
    contacts.push(newContact);

    //log the submission to terminal for testing
    console.log('Contact form submission received: ', newContact);

    //render Confirmation template
    res.render('confirmation', { firstName });

});

//Admin Route to display data dump of all submission
app.get('/admin',(req,res)=>{
    res.render('admin', {contacts});

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});