const db = require("../models/db");

exports.getDirectors = (req, res) => {
  db.query("SELECT * FROM acting_director", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createDirector = (req, res) => {
  const { acting_person, start_date, end_date } = req.body;
  db.query(
    "INSERT INTO acting_director (acting_person, start_date, end_date) VALUES (?, ?, ?)",
    [acting_person, start_date, end_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "เพิ่มข้อมูลสำเร็จ", id: result.insertId });
    }
  );
};
