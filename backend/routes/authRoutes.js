const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Jalur: POST /api/auth/login
router.post('/login', authController.login);

// Jalur: POST /api/auth/logout
router.post('/logout', authMiddleware, authController.logout);

// Tambahkan baris ini di bawah rute login/logout
router.get('/users', authMiddleware, authController.getUsers);

module.exports = router;
