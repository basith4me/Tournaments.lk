const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournamentController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
  console.error("\n❌ Multer/Upload Error:");
  console.error("Error name:", err.name);
  console.error("Error message:", err.message);
  console.error("Error code:", err.code);
  console.error("Full error:", err);

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`
    });
  }

  // Cloudinary errors
  if (err.message && err.message.includes('cloudinary')) {
    return res.status(500).json({
      success: false,
      message: 'Image upload failed. Please check Cloudinary configuration.',
      error: err.message
    });
  }

  // Other errors
  return res.status(500).json({
    success: false,
    message: err.message || 'File upload failed'
  });
};

// Public routes
router.get("/", tournamentController.getAllTournaments);

// Protected routes (require authentication)
// IMPORTANT: Specific routes must come before parameterized routes
router.get("/user/my-tournaments", protect, tournamentController.getMyTournaments);

router.post(
  "/",
  protect,
  (req, res, next) => {
    console.log("\n📤 Upload middleware starting...");
    upload.single("banner")(req, res, (err) => {
      if (err) {
        console.error("❌ Upload middleware error:", err);
        return handleMulterError(err, req, res, next);
      }
      console.log("✅ Upload middleware completed");
      console.log("File uploaded:", req.file ? "Yes" : "No");
      next();
    });
  },
  tournamentController.postTournament
);

// This must come after /user/my-tournaments to avoid matching "user" as an ID
router.get("/:id", tournamentController.getTournamentById);

router.put(
  "/:id",
  protect,
  (req, res, next) => {
    upload.single("banner")(req, res, (err) => {
      if (err) {
        return handleMulterError(err, req, res, next);
      }
      next();
    });
  },
  tournamentController.updateTournament
);

router.delete("/:id", protect, tournamentController.deleteTournament);

module.exports = router;