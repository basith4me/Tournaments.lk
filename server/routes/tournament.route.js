const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournamentController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// Public routes
router.get("/", tournamentController.getAllTournaments);

// Protected routes (require authentication)
// IMPORTANT: Specific routes must come before parameterized routes
router.get("/user/my-tournaments", protect, tournamentController.getMyTournaments);

router.post(
  "/",
  protect,
  upload.single("banner"),
  tournamentController.postTournament
);

// This must come after /user/my-tournaments to avoid matching "user" as an ID
router.get("/:id", tournamentController.getTournamentById);

router.put(
  "/:id",
  protect,
  upload.single("banner"),
  tournamentController.updateTournament
);

router.delete("/:id", protect, tournamentController.deleteTournament);

module.exports = router;