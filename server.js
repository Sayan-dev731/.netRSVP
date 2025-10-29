const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = 3000;

const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: '*'
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route to serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Access pages at:`);
    console.log(`  - Home: http://localhost:${PORT}/`);
    console.log(`  - Register: http://localhost:${PORT}/register.html`);
    console.log(`  - Admin: http://localhost:${PORT}/admin.html`);
    console.log(`  - Email: http://localhost:${PORT}/email.html`);
});