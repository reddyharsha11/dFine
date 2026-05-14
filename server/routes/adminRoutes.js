// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/adminController');

router.post('/login', ctrl.login);
router.get('/me', auth, ctrl.me);
router.put('/change-password', auth, ctrl.changePassword);

module.exports = router;
