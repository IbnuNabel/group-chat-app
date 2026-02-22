const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/authConfig");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];

  // 1. Cek apakah header ada DAN dimulai dengan kata "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan atau format salah (Gunakan Bearer)",
    });
  }

  // 2. Ambil token setelah kata "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verifikasi token
    const decoded = jwt.verify(token, jwtSecret);

    // 4. Simpan hasil decode ke req.user
    // Karena di authController kamu isi { username: user.username }, 
    // maka req.user sekarang berisi objek tersebut.
    req.user = decoded;

    next();
  } catch (err) {
    // Jika token expired atau dimodifikasi, lempar error 403
    return res.status(403).json({
      success: false,
      message: "Sesi telah berakhir atau token tidak valid",
    });
  }
};
