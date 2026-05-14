// server/controllers/reviewController.js
const Review = require('../models/Review');

exports.listPublic = async (req, res, next) => {
  try {
    const list = await Review.find({ isVisible: true }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: list });
  } catch (e) {
    next(e);
  }
};

exports.listAll = async (req, res, next) => {
  try {
    const list = await Review.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: list });
  } catch (e) {
    next(e);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const doc = await Review.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const doc = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
