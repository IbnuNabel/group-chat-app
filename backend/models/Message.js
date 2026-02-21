const db = require('../config/db');

class Message {
    static create(sender, text) {
        const newMessage = {
            id: db.messages.length + 1,
            sender,
            text,
            timestamp: new Date().toISOString()
        };
        db.messages.push(newMessage);
        return newMessage;
    }

    static getAll() {
        return db.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }
}

module.exports = Message;
