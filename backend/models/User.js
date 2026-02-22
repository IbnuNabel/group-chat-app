const db = require('../config/db');

class User {
    static findByUsername(username) {
        return db.users.find(user => user.username === username);
    }

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
