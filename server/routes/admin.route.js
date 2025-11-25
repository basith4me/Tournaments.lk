const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// Public route - Admin login
router.post("/login", adminController.adminLogin);

// Protected admin routes - require authentication and admin privileges
router.get("/stats", protect, admin, adminController.getDashboardStats);
router.get("/organizers", protect, admin, adminController.getOrganizers);
router.get(
  "/organizers/:id",
  protect,
  admin,
  adminController.getOrganizerDetails
);
router.get("/tournaments", protect, admin, adminController.getAllTournaments);
router.put(
  "/tournaments/:id",
  protect,
  admin,
  upload.single("banner"),
  adminController.updateTournament
);
router.delete(
  "/tournaments/:id",
  protect,
  admin,
  adminController.deleteTournament
);

module.exports = router;
