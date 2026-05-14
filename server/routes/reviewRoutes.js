// server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/reviewController');

router.get('/', ctrl.listPublic);
router.get('/all', auth, ctrl.listAll);
router.post('/', auth, ctrl.createReview);
router.put('/:id', auth, ctrl.updateReview);
router.delete('/:id', auth, ctrl.deleteReview);

module.exports = router;
