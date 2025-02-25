const express = require("express");
const router = express.Router();
const { getWorkGroups, createWorkGroup } = require("../controllers/workGroupController");

router.get("/", getWorkGroups);
router.post("/", createWorkGroup);

module.exports = router;
