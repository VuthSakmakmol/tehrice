const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');



// ── Admin (superadmin only)
router.get('/admins', auth(['superadmin']), userController.getAdmins);
router.post('/admins', auth(['superadmin']), userController.createAdmin);
router.put('/admins/:id', auth(['superadmin']), userController.updateAdmin);
router.delete('/admins/:id', auth(['superadmin']), userController.deleteAdmin);
router.get('/admin-count', auth(['superadmin']), userController.getAdminCount);
router.put('/admins/:id/permissions', auth(['superadmin']), userController.updatePermissions);



// ── Delivery (admin + superadmin)
router.get('/deliveries', auth(['admin', 'superadmin']), userController.getDeliveries);
router.post('/deliveries', auth(['admin', 'superadmin']), userController.createDelivery);
router.put('/deliveries/:id', auth(['admin', 'superadmin']), userController.updateDelivery);
router.delete('/deliveries/:id', auth(['admin', 'superadmin']), userController.deleteDelivery);



// Customers (admin + superadmin)
router.get('/customers', auth(['admin', 'superadmin']), userController.getCustomers)
router.post('/customers', auth(['admin', 'superadmin']), userController.createCustomer)
router.put('/customers/:id', auth(['admin', 'superadmin']), userController.updateCustomer)
router.delete('/customers/:id', auth(['admin', 'superadmin']), userController.deleteCustomer)

module.exports = router;
