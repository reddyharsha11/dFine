// server/models/GalleryImage.js
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String, default: '' },
    category: {
      type: String,
      enum: ['before-after', 'clinic', 'team'],
      default: 'clinic',
    },
    beforeImageUrl: { type: String, default: '' },
    afterImageUrl: { type: String, default: '' },
    description: { type: String, default: '' },
    isVisible: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GalleryImage', gallerySchema);
