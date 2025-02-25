const db = require("../models/db");

exports.getMenuByRole = (req, res) => {
  const { role } = req.params;

  db.query(`
    SELECT menus.menu_key, menus.menu_label, menus.menu_path 
    FROM role_permissions 
    JOIN menus ON role_permissions.menu_id = menus.id 
    WHERE role_permissions.role = ?
  `, [role], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
