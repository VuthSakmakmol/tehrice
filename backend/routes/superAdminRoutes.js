const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const verifyToken = require('../middleware/verifyToken');         // ✅ JWT token verification
const requireSuperAdmin = require('../middleware/requireSuperAdmin'); // ✅ Role check

// ✅ Login route (no auth needed)
router.post('/login', superAdminController.login);

// ✅ All routes below require token + SuperAdmin role
router.use(verifyToken, requireSuperAdmin);

// ✅ Get all admins
router.get('/admins', superAdminController.getAdmins);

// ✅ Create new admin
router.post('/admins', superAdminController.createAdmin);

// ✅ Update admin by ID
router.put('/admins/:id', superAdminController.updateAdmin);

// ✅ Delete admin by ID
router.delete('/admins/:id', superAdminController.deleteAdmin);

module.exports = router;
