const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });
  }

  // ✅ ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลหรือไม่
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }

    const user = results[0];

    // ✅ ตรวจสอบรหัสผ่าน
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Error comparing passwords" });

      console.log("🔑 Comparing Input Password:", password);
      console.log("🔑 Stored Hashed Password:", user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
      }

      // ✅ สร้าง Token (แก้ไขตรงนี้)
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log("✅ Password Matched! Sending Token...");
      return res.json({ token });
    });
  });
};
