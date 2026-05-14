// server/controllers/galleryController.js
const GalleryImage = require('../models/GalleryImage');

exports.listPublic = async (req, res, next) => {
  try {
    const q = { isVisible: true };
    if (req.query.category) q.category = req.query.category;
    const list = await GalleryImage.find(q).sort({ sortOrder: 1, createdAt: -1 }).lean();
    res.json({ success: true, data: list });
  } catch (e) {
    next(e);
  }
};

exports.listAll = async (req, res, next) => {
  try {
    const list = await GalleryImage.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    res.json({ success: true, data: list });
  } catch (e) {
    next(e);
  }
};

exports.createGallery = async (req, res, next) => {
  try {
    const doc = await GalleryImage.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.updateGallery = async (req, res, next) => {
  try {
    const doc = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true, data: doc });
  } catch (e) {
    next(e);
  }
};

exports.deleteGallery = async (req, res, next) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
