const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.dbName,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

module.exports = dbConnect;
