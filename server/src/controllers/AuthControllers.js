const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username, role: "admin" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ token, username });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};

const verifyToken = async (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
};

module.exports = { login, verifyToken };
