const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// SuperAdmin-only
router.get('/admins', authMiddleware(['SuperAdmin']), userController.getAdmins);
router.post('/admins', authMiddleware(['SuperAdmin']), userController.createAdmin);
router.put('/admins/:id', authMiddleware(['SuperAdmin']), userController.updateAdmin);
router.delete('/admins/:id', authMiddleware(['SuperAdmin']), userController.deleteAdmin);

module.exports = router;
