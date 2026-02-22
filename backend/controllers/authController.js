const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpires } = require("../config/authConfig");

const login = (req, res) => {
  const { username, password } = req.body;

  // 1. Validasi Kredensial (Tugas Backend)
  // Mencari user di "database" dummy kita
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
    token: token, // Token ini yang akan disimpan Anggota 4 di Web Storage
    user: { username: user.username },
  });
};

const logout = (req, res) => {
  // Di sisi server, kita cukup beri respon sukses.
  // Penghapusan token yang sebenarnya dilakukan oleh Anggota 4 di frontend.
  res.status(200).json({
    success: true,
    message: "Berhasil keluar dari sesi",
  });
};

module.exports = { login, logout };
