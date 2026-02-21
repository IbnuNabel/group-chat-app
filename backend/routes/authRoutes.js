const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Jalur: POST /api/auth/login
router.post('/login', authController.login);

// Jalur: POST /api/auth/logout
router.post('/logout', authController.logout);

module.exports = router;
