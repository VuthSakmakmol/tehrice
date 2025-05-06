const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // ✅ Fix: import auth middleware

// Admin routes
router.get('/admins', auth(['SuperAdmin']), userController.getAdmins);
router.post('/admins', auth(['SuperAdmin']), userController.createAdmin);
router.put('/admins/:id', auth(['SuperAdmin']), userController.updateAdmin);
router.delete('/admins/:id', auth(['SuperAdmin']), userController.deleteAdmin);

// Delivery routes
router.get('/deliveries', auth(['SuperAdmin']), userController.getDeliveries);
router.post('/deliveries', auth(['SuperAdmin']), userController.createDelivery);
router.put('/deliveries/:id', auth(['SuperAdmin']), userController.updateDelivery);
router.delete('/deliveries/:id', auth(['SuperAdmin']), userController.deleteDelivery);

module.exports = router;
