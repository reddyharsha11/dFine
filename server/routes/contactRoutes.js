// server/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/contactController');

router.post('/', ctrl.createContact);
router.get('/', auth, ctrl.listContacts);
router.put('/:id', auth, ctrl.updateContact);
router.delete('/:id', auth, ctrl.deleteContact);

module.exports = router;
