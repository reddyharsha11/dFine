// server/routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/galleryController');

router.get('/', ctrl.listPublic);
router.get('/all', auth, ctrl.listAll);
router.post('/', auth, ctrl.createGallery);
router.put('/:id', auth, ctrl.updateGallery);
router.delete('/:id', auth, ctrl.deleteGallery);

module.exports = router;
