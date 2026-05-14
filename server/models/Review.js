// server/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: { type: String, required: true, maxlength: 1000 },
    source: { type: String, enum: ['Google', 'Practo', 'Manual'], default: 'Google' },
    service: { type: String, default: '' },
    isVisible: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
