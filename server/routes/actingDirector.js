const express = require("express");
const router = express.Router();
const { getDirectors, createDirector } = require("../controllers/actingDirectorController");

router.get("/", getDirectors);
router.post("/", createDirector);

module.exports = router;
