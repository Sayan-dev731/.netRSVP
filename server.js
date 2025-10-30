const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/health', (req, res) => {
    res.status(200).send('OK!!');
});

// Port the server listens on

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});

// Error handling middleware

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});