const express = require("express");
const router = express.Router();

// ตัวอย่างเมนูแต่ละ Role
const menuData = {
  admin: [
    { key: "dashboard", label: "Dashboard", path: "/" },
    { key: "users", label: "Manage Users", path: "/users" },
    { key: "meetings", label: "Meetings", path: "/meetings" },
  ],
  user: [
    { key: "dashboard", label: "Dashboard", path: "/" },
    { key: "meetings", label: "Meetings", path: "/meetings" },
  ],
};

router.get("/:role", (req, res) => {
  const role = req.params.role;
  if (!menuData[role]) return res.status(404).json({ message: "Menu not found" });
  res.json(menuData[role]);
});

module.exports = router;
