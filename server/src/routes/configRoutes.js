const express = require("express");
const router = express.Router();
const { getConfig } = require("../controllers/ConfigControllers");

router.get("/", getConfig);

module.exports = router;
