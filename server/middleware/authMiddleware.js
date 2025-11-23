const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  console.log("\n🔐 Auth Middleware Debug:");
  console.log("Authorization header:", req.headers.authorization);

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("Token extracted:", token ? "✅ Present" : "❌ Missing");

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded:", decoded);

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.error("❌ User not found in database");
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }

      console.log("✅ User authenticated:", req.user._id);
      next();
    } catch (error) {
      console.error("❌ Auth middleware error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed"
      });
    }
  } else {
    console.error("❌ No authorization header or invalid format");
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token"
    });
  }
};

module.exports = { protect };