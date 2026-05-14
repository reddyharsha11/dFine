// server/controllers/contactController.js
const Contact = require('../models/Contact');
const { sendMail } = require('../utils/sendMail');

exports.createContact = async (req, res, next) => {
  try {
    const doc = await Contact.create(req.body);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await sendMail({
        to: adminEmail,
        subject: `Contact form: ${doc.name}`,
        text: `${doc.message}\n\nFrom: ${doc.name} ${doc.phone} ${doc.email}`,
      }).catch(() => {});
    }
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.listContacts = async (req, res, next) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: list });
  } catch (e) {
    next(e);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const doc = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
