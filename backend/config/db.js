const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') }); // Loads root .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.log('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;