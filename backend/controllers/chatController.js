const Message = require('../models/Message');

const sendMessage = (req, res) => {
    const { text } = req.body;
  
    const sender = req.user ? req.user.username : "Anonymous";

    if (!text || text.trim() === "") {
        return res.status(400).json({ message: 'Isi pesan tidak boleh kosong' });
    }

    const newMessage = Message.create(sender, text);

    res.status(201).json({
        success: true,
        data: newMessage
    });
};

const getMessages = (req, res) => {

    const messages = Message.getAll();
    
    res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
    });
};

module.exports = { sendMessage, getMessages };
