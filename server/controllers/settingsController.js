// server/controllers/settingsController.js
const ClinicSettings = require('../models/ClinicSettings');

async function getOrCreate() {
  let doc = await ClinicSettings.findOne();
  if (!doc) {
    doc = await ClinicSettings.create({});
  }
  return doc;
}

exports.getSettings = async (req, res, next) => {
  try {
    const doc = await getOrCreate();
    res.json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const doc = await getOrCreate();
    Object.assign(doc, req.body);
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};
