// server/models/Appointment.js
const mongoose = require('mongoose');

const SERVICE_ENUM = [
  'Dental Implants',
  'Root Canal',
  'Teeth Whitening',
  'Smile Designing',
  'Invisible Braces',
  'Veneers',
  'Orthodontics',
  'General Checkup',
  'Other',
];

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: '', lowercase: true, trim: true },
    service: { type: String, required: true, enum: SERVICE_ENUM },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true, trim: true },
    message: { type: String, default: '', maxlength: 500 },
    wantsWhatsApp: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

appointmentSchema.path('phone').validate(function (v) {
  const digits = v.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(digits);
}, 'Invalid Indian mobile number');

module.exports = mongoose.model('Appointment', appointmentSchema);
module.exports.SERVICE_ENUM = SERVICE_ENUM;
