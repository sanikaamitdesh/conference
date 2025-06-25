const mongoose = require('mongoose');
const User = require('../models/user');
const Paper = require('../models/paper');
require('dotenv').config();

const MONGODB_URI = 'mongodb+srv://mongodb:Sadmaashiq@users.k7kbi.mongodb.net/conference-app?retryWrites=true&w=majority';


let isConnected = false;

const connectWithRetry = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('Connected to MongoDB');
        
        // Ensure indexes are created for User model
        await User.collection.dropIndexes();
        await User.syncIndexes();
        console.log('User indexes synchronized');

        // Ensure indexes are created for Paper model
        await Paper.collection.dropIndexes();
        await Paper.syncIndexes();
        console.log('Paper indexes synchronized');
        
        // Reset database and create admin if needed
        await resetDatabase();
    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.log('Retrying in 5 seconds...');
        isConnected = false;
        setTimeout(connectWithRetry, 5000);
    }
};
const resetDatabase = async () => {
    try {
      // Remove existing admin if any
      await User.deleteOne({ email: 'admin@example.com' });
  
      // Create new admin with hashed password (thanks to pre('save'))
      const admin = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
  
      await admin.save();
      console.log('✅ Admin user recreated with hashed password');
    } catch (error) {
      console.error('Error resetting database:', error);
      throw error;
    }
  };
  
module.exports = { connectWithRetry }; 