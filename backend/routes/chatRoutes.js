const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send-message', authMiddleware, chatController.sendMessage);
router.get('/get-messages', authMiddleware, chatController.getMessages);

module.exports = router;
