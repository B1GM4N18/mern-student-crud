require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');

const app = express();

app.use(express.json());

connectDB();

app.get('/', (req, res) => res.json({ success: true, msg: 'Backend alive'}));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on ${PORT}'));