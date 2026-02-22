const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/authConfig");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan atau format salah (Gunakan Bearer)",
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;

    next();
  } catch (err) {
    
    return res.status(403).json({
      success: false,
      message: "Sesi telah berakhir atau token tidak valid",
    });
  }
};
