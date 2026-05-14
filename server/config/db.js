require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

// Fix for querySrv ECONNREFUSED issues in some environments
if (dns.setServers) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    console.warn('MONGODB_URI is not set. Server will run without MongoDB until it is configured.');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
