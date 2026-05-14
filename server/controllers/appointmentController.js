// server/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const { notifyBooking } = require('../utils/bookingNotifications');

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

exports.createAppointment = async (req, res, next) => {
  try {
    const body = { ...req.body };
    body.phone = normalizePhone(body.phone);
    const doc = await Appointment.create(body);
    await notifyBooking(doc);
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.listAppointments = async (req, res, next) => {
  try {
    const list = await Appointment.find().sort({ date: -1, createdAt: -1 }).lean();
    res.json({ success: true, data: list });
  } catch (e) {
    next(e);
  }
};

exports.getAppointment = async (req, res, next) => {
  try {
    const doc = await Appointment.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const doc = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

exports.todayAppointments = async (req, res, next) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const list = await Appointment.find({ date: { $gte: start, $lt: end } }).sort({ timeSlot: 1 });
    res.json({ success: true, data: list });
  } catch (e) {
    next(e);
  }
};

exports.stats = async (req, res, next) => {
  try {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [pending, completedMonth, totalMonth] = await Promise.all([
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'completed', updatedAt: { $gte: startMonth } }),
      Appointment.countDocuments({ createdAt: { $gte: startMonth } }),
    ]);
    res.json({
      success: true,
      data: { pending, completedThisMonth: completedMonth, bookingsThisMonth: totalMonth },
    });
  } catch (e) {
    next(e);
  }
};
