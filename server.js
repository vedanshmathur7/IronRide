const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database');

// Load config
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------
// API ROUTES FIRST
// ---------------------
app.use('/api/sitedata', (req, res) =>
    res.sendFile(path.join(__dirname, 'data.json'))
);
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// ---------------------
// STATIC FILES AFTER APIs
// ---------------------
app.use(express.static(path.join(__dirname, 'ironride op')));

// ---------------------
// WILDCARD MUST BE LAST
// ---------------------
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'ironride op', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
