const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Serve all static files (HTML, CSS, favicon) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Root route sends index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});