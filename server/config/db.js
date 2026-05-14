require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

// Fix for querySrv ECONNREFUSED issues in some environments
if (dns.setServers) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

let cachedConn = null;

const connectDB = async () => {
  if (cachedConn) return cachedConn;

  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    console.warn('MONGODB_URI is not set.');
    return null;
  }

  try {
    cachedConn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${cachedConn.connection.host}`);
    return cachedConn;
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    // Do not exit process in serverless
    throw error;
  }
};

module.exports = connectDB;
