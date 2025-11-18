const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournamentController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

// Public routes
router.get("/", tournamentController.getAllTournaments);
router.get("/:id", tournamentController.getTournamentById);

// Protected routes (require authentication)
router.post(
  "/",
  protect,
  upload.single("banner"),
  tournamentController.postTournament
);

router.get("/user/my-tournaments", protect, tournamentController.getMyTournaments);

router.put(
  "/:id",
  protect,
  upload.single("banner"),
  tournamentController.updateTournament
);

router.delete("/:id", protect, tournamentController.deleteTournament);

module.exports = router;