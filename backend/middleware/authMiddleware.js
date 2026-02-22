// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/authConfig");

module.exports = function (req, res, next) {
  // Ambil header authorization
  const authHeader = req.headers["authorization"];

  // Jika header tidak ada
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan",
    });
  }

  // Format harus: Bearer <token>
  const token = authHeader.split(" ")[1];

  // Jika token kosong / format salah
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Format token salah",
    });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, jwtSecret);

    // Simpan data user hasil decode ke request
    req.user = decoded;

    // lanjut ke controller berikutnya
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Token tidak valid",
    });
  }
};

