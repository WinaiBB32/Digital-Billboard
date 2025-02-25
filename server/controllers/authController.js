const db = require("../models/db");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }

    const token = jwt.sign({ id: results[0].id, role: results[0].role }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token });
  });
};
