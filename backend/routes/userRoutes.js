const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const auth = require('../middlewares/auth');

// SuperAdmin-only access to Admin routes
router.get('/admins', auth(['SuperAdmin']), userController.getAdmins);
router.post('/admins', auth(['SuperAdmin']), userController.createAdmin);
router.put('/admins/:id', auth(['SuperAdmin']), userController.updateAdmin);
router.delete('/admins/:id', auth(['SuperAdmin']), userController.deleteAdmin);


// ── Delivery (accessible by SuperAdmin & Admin)
router.get('/deliveries', auth(['SuperAdmin', 'Admin']), userController.getDeliveries);
router.post('/deliveries', auth(['SuperAdmin', 'Admin']), userController.createDelivery);
router.put('/deliveries/:id', auth(['SuperAdmin', 'Admin']), userController.updateDelivery);
router.delete('/deliveries/:id', auth(['SuperAdmin', 'Admin']), userController.deleteDelivery);

module.exports = router;
