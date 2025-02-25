const db = require("../models/db");

exports.getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { username, email, role } = req.body;
  db.query(
    "INSERT INTO users (username, email, role) VALUES (?, ?, ?)",
    [username, email, role],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "เพิ่มผู้ใช้สำเร็จ", id: result.insertId });
    }
  );
};
