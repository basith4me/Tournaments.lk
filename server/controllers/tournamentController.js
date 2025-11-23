const Tournament = require("../models/tournamentModel");
const { cloudinary } = require("../config/cloudinary");

// Create a new tournament
exports.postTournament = async (req, res) => {
  try {
    // Debug logging
    console.log("\n📝 Creating Tournament - Debug Info:");
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      console.error("❌ Authentication Error: req.user is undefined");
      return res.status(401).json({
        success: false,
        message: "Authentication required. User not found in request.",
      });
    }

    const {
      name,
      sport,
      startDate,
      tournamentType,
      location,
      district,
      rules,
      prize,
      contact,
    } = req.body;

    // Validate required fields
    if (!name || !sport || !startDate || !tournamentType || !location || !district || !contact) {
      console.error("❌ Validation Error: Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Get banner URL from uploaded file (if using multer-cloudinary)
    const banner = req.file ? req.file.path : null;
    console.log("Banner URL:", banner);

    const tournament = new Tournament({
      name,
      sport,
      startDate,
      tournamentType,
      location,
      district,
      rules,
      prize,
      contact,
      banner,
      creator: req.user._id, // From auth middleware
    });

    await tournament.save();
    console.log("✅ Tournament created successfully:", tournament._id);

    res.status(201).json({
      success: true,
      message: "Tournament created successfully",
      data: tournament,
    });
  } catch (error) {
    console.error("❌ Error creating tournament:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Get all tournaments (public)
exports.getAllTournaments = async (req, res) => {
  try {
    const { sport, district, status } = req.query;

    // Build filter object
    const filter = {};
    if (sport) filter.sport = sport;
    if (district) filter.district = district;
    if (status) filter.status = status;

    const tournaments = await Tournament.find(filter)
      .populate("creator", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tournaments.length,
      data: tournaments,
    });
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Get single tournament by ID
exports.getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id).populate(
      "creator",
      "name email phone"
    );

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tournament,
    });
  } catch (error) {
    console.error("Error fetching tournament:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Get tournaments created by logged-in user
exports.getMyTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({ creator: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tournaments.length,
      data: tournaments,
    });
  } catch (error) {
    console.error("Error fetching user tournaments:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Update tournament
exports.updateTournament = async (req, res) => {
  try {
    let tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    }

    // Check if user is the creator
    if (tournament.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this tournament",
      });
    }

    const updateData = { ...req.body };

    // Handle banner upload if new file is provided
    if (req.file) {
      // Delete old image from cloudinary if exists
      if (tournament.banner) {
        const publicId = tournament.banner.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`tournaments/${publicId}`);
      }
      updateData.banner = req.file.path;
    }

    tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Tournament updated successfully",
      data: tournament,
    });
  } catch (error) {
    console.error("Error updating tournament:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Delete tournament
exports.deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    }

    // Check if user is the creator
    if (tournament.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this tournament",
      });
    }

    // Delete image from cloudinary if exists
    if (tournament.banner) {
      try {
        const publicId = tournament.banner.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`tournaments/${publicId}`);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
        // Continue with deletion even if cloudinary deletion fails
      }
    }

    await Tournament.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Tournament deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tournament:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
