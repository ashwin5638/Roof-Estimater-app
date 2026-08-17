const express = require("express");
const router = express.Router();
const { postEstimate } = require("../controllers/LeadControllers");

router.post("/", postEstimate);

module.exports = router;
