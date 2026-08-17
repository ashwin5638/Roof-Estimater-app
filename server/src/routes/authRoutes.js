const express = require("express");
const router = express.Router();
const { login, verifyToken } = require("../controllers/AuthControllers");
const authMiddleware = require("../middleware/auth");

router.post("/login", login);
router.get("/verify", authMiddleware, verifyToken);

module.exports = router;
