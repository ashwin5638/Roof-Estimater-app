const express = require("express");
const router = express.Router();
const {
  getConfigFull,
  updateConfig,
} = require("../controllers/ConfigControllers");
const { getLeads } = require("../controllers/LeadControllers");
const authMiddleware = require("../middleware/auth");

router.get("/config", authMiddleware, getConfigFull);
router.put("/config", authMiddleware, updateConfig);
router.get("/leads", authMiddleware, getLeads);

module.exports = router;
