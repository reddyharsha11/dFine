// server/models/ClinicSettings.js
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    clinicName: { type: String, default: 'dFine Dental & Health Care' },
    phone: { type: String, default: '+91 96663 53426' },
    email: { type: String, default: 'care@dfinedental.com' },
    address: {
      type: String,
      default: '2nd Floor, Arka Jewel, Lanco Hills Road, Khajaguda, Hyderabad',
    },
    hours: { type: String, default: 'Mon-Sun 10:00 AM - 10:00 PM' },
    googleMapsUrl: {
      type: String,
      default: 'https://maps.app.goo.gl/e3R4BERXmvJhCsnq9',
    },
    instagramUrl: { type: String, default: '' },
    facebookUrl: { type: String, default: '' },
    whatsappNumber: { type: String, default: '919666353426' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClinicSettings', settingsSchema);
