const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📁 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

// Helpful connection event logging
mongoose.connection.on('connected', () => console.log('🔌 Mongoose event: connected'));
mongoose.connection.on('error', (err) => console.error('❌ Mongoose event: error', err));
mongoose.connection.on('disconnected', () => console.log('⚠️ Mongoose event: disconnected'));

module.exports = connectDB;