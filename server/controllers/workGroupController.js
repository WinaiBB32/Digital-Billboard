const db = require("../models/db");

exports.getWorkGroups = (req, res) => {
  db.query("SELECT * FROM work_groups", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createWorkGroup = (req, res) => {
  const { group_name, description } = req.body;
  db.query(
    "INSERT INTO work_groups (group_name, description) VALUES (?, ?)",
    [group_name, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "เพิ่มกลุ่มงานสำเร็จ", id: result.insertId });
    }
  );
};
