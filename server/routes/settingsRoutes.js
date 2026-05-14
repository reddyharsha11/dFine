// server/routes/settingsRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/settingsController');

router.get('/', ctrl.getSettings);
router.put('/', auth, ctrl.updateSettings);

module.exports = router;
