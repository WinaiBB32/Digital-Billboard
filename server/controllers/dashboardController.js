const db = require("../models/db");

exports.getUserCount = (req, res) => {
  db.query("SELECT COUNT(*) AS count FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.getMeetingStats = (req, res) => {
  db.query(`
    SELECT 
      DATE_FORMAT(meeting_date, '%Y-%m') AS month, 
      work_groups.group_name, 
      COUNT(meetings.id) AS meeting_count 
    FROM meetings
    JOIN work_groups ON meetings.group_id = work_groups.id
    GROUP BY month, work_groups.group_name
    ORDER BY month DESC
  `, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
