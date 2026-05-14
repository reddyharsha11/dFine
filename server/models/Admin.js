// server/models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Admin' },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
