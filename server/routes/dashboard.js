const express = require("express");
const router = express.Router();
const { getUserCount, getMeetingStats } = require("../controllers/dashboardController");

router.get("/user-count", getUserCount);
router.get("/meeting-stats", getMeetingStats);

module.exports = router;
