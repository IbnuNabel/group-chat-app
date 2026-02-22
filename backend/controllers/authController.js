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
    
  user.status = "online"; 

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
  if (req.user && req.user.username) {
    const user = db.users.find(u => u.username === req.user.username);
    if (user) user.status = "offline";
  }
  
  res.status(200).json({
    success: true,
    message: "Berhasil keluar dari sesi",
  });
};

module.exports = { login, logout };
