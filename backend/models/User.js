const db = require('../config/db');

class User {
    // Fungsi untuk mencari user berdasarkan username
    static findByUsername(username) {
        return db.users.find(user => user.username === username);
    }

    // Fungsi tambahan jika nanti ingin fitur registrasi
    static create(username, password) {
        const newUser = {
            id: db.users.length + 1,
            username,
            password 
        };
        db.users.push(newUser);
        return newUser;
    }
}

module.exports = User;
