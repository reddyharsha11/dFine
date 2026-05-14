// server/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/appointmentController');

router.post('/', ctrl.createAppointment);
router.get('/', auth, ctrl.listAppointments);
router.get('/today', auth, ctrl.todayAppointments);
router.get('/stats', auth, ctrl.stats);
router.get('/:id', auth, ctrl.getAppointment);
router.put('/:id', auth, ctrl.updateAppointment);
router.delete('/:id', auth, ctrl.deleteAppointment);

module.exports = router;
