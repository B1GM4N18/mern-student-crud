require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Serve React static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API routes
app.use('/api/students', require('./routes/studentRoutes'));

// SPA fallback 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));