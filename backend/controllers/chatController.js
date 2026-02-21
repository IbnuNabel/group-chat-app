const Message = require('../models/Message');

// Menangani pengiriman pesan baru
const sendMessage = (req, res) => {
    const { text } = req.body;
    
    // Nama pengirim didapat dari 'req.user' 
    // (req.user ini nanti diisi otomatis oleh middleware JWT milik Anggota 3)
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

// Menangani pengambilan semua pesan
const getMessages = (req, res) => {
    // Mengambil pesan yang sudah terurut berdasarkan timestamp
    const messages = Message.getAll();
    
    res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
    });
};

module.exports = { sendMessage, getMessages };
