const db = require("../models/db");

exports.getMeetings = (req, res) => {
  db.query("SELECT * FROM meetings", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createMeeting = (req, res) => {
  const { title, meeting_date, location, group_id } = req.body;
  db.query(
    "INSERT INTO meetings (title, meeting_date, location, group_id) VALUES (?, ?, ?, ?)",
    [title, meeting_date, location, group_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "เพิ่มประชุมสำเร็จ", id: result.insertId });
    }
  );
};
