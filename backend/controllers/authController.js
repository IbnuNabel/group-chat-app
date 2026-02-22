const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpires } = require("../config/authConfig");

const login = (req, res) => {
  const { username, password } = req.body;

  const user = db.users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Username atau password salah!",
    });
  }

  const token = jwt.sign({ username: user.username }, jwtSecret, {
    expiresIn: jwtExpires,
  });

  res.status(200).json({
    success: true,
    message: "Login berhasil",
    token: token, 
    user: { username: user.username },
  });
};

const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Berhasil keluar dari sesi",
  });
};

const getUsers = (req, res) => {
    const userList = db.users.map(u => ({
        username: u.username,
        status: u.status
    }));
    res.json({ success: true, users: userList });
};

module.exports = { login, logout, getUsers };
