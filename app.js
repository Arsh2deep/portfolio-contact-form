const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

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
    //log the submission to terminal for test
    console.log('Contact form submission received: ',{
        firstName,
        lastName,
        email,
        mailingList: mailingList ? 'Subscribed': 'Not Subscribed',
        emailFormat: mailingList ? emailFormat : 'N/A',
        linkedin,
        howWeMet,
        otherMet: howWeMet === 'other'? otherMet:'N/A',
        message
    });
    //Send a response back to the client
    res.send(`<h2>Thank you, ${firstName}! Your message has been sent successfully.</h2><a href= "/">Go back home</a>`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});