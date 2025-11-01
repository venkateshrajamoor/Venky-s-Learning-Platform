const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "No token provided. Authorization denied." });
    }

    const jwtToken = token.replace("Bearer", "").trim();

    // Verify token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log("Decoded JWT:", decoded);

    // ✅ FIXED: use userId from token payload
    const userData = await User.findById(decoded.userId).select("-password");

    if (!userData) {
      return res.status(404).json({ msg: "User not found." });
    }

    req.user = userData;
    req.token = jwtToken;
    req.userID = userData._id;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ msg: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
