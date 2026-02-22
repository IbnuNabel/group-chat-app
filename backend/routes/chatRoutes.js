const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');


// Import middleware dari Anggota 3 (asumsi file sudah ada)
// const authMiddleware = require('../middleware/authMiddleware');

// Jalur: POST /api/chat/send-message
// Kita tambahkan 'authMiddleware' di tengah untuk memverifikasi token sebelum masuk ke controller
router.post('/send-message', /* authMiddleware, */ chatController.sendMessage);

// Jalur: GET /api/chat/get-messages
router.get('/get-messages', /* authMiddleware, */ chatController.getMessages);

module.exports = router;
