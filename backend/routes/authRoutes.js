const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { getAdminCount } = require('../controllers/authController')



// @desc    Public user registration (customer only)
router.post('/register', authController.register)

router.post('/login', authController.login);




module.exports = router;
