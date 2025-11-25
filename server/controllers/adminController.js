const User = require("../models/userModel");
const Tournament = require("../models/tournamentModel");
const mongoose = require("mongoose");

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total count of tournaments
    const totalTournaments = await Tournament.countDocuments();

    // Get total count of organizers (users who have posted at least one tournament)
    const totalOrganizers = await Tournament.distinct("creator").then(
      (creators) => creators.length
    );

    res.status(200).json({
      success: true,
      data: {
        totalTournaments,
        totalOrganizers,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

// @desc    Get all organizers with their tournament counts
// @route   GET /api/admin/organizers
// @access  Private/Admin
exports.getOrganizers = async (req, res) => {
  try {
    const organizers = await Tournament.aggregate([
      {
        $group: {
          _id: "$creator",
          tournamentCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: "$user._id",
          name: "$user.name",
          email: "$user.email",
          phone: "$user.phone",
          address: "$user.address",
          tournamentCount: 1,
          createdAt: "$user.createdAt",
        },
      },
      {
        $sort: { tournamentCount: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: organizers,
    });
  } catch (error) {
    console.error("Error fetching organizers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch organizers",
    });
  }
};

// @desc    Get organizer details with their tournaments
// @route   GET /api/admin/organizers/:id
// @access  Private/Admin
exports.getOrganizerDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid organizer ID",
      });
    }

    // Get organizer details
    const organizer = await User.findById(id).select("-password");

    if (!organizer) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found",
      });
    }

    // Get all tournaments by this organizer
    const tournaments = await Tournament.find({ creator: id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: {
        organizer,
        tournaments,
        tournamentCount: tournaments.length,
      },
    });
  } catch (error) {
    console.error("Error fetching organizer details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch organizer details",
    });
  }
};

// @desc    Get all tournaments with filters
// @route   GET /api/admin/tournaments
// @access  Private/Admin
exports.getAllTournaments = async (req, res) => {
  try {
    const { organizer, sport, startDate, endDate } = req.query;

    // Build filter query
    const filter = {};

    if (organizer) {
      filter.creator = organizer;
    }

    if (sport) {
      filter.sport = sport.toLowerCase();
    }

    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) {
        filter.startDate.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.startDate.$lte = new Date(endDate);
      }
    }

    const tournaments = await Tournament.find(filter)
      .populate("creator", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tournaments,
    });
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tournaments",
    });
  }
};

// @desc    Update tournament (admin)
// @route   PUT /api/admin/tournaments/:id
// @access  Private/Admin
exports.updateTournament = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tournament ID",
      });
    }

    const tournament = await Tournament.findById(id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    }

    // Update tournament fields
    const updatedData = {
      name: req.body.name || tournament.name,
      sport: req.body.sport || tournament.sport,
      startDate: req.body.startDate || tournament.startDate,
      tournamentType: req.body.tournamentType || tournament.tournamentType,
      location: req.body.location || tournament.location,
      district: req.body.district || tournament.district,
      rules: req.body.rules !== undefined ? req.body.rules : tournament.rules,
      prize: req.body.prize !== undefined ? req.body.prize : tournament.prize,
      contact: req.body.contact || tournament.contact,
      status: req.body.status || tournament.status,
    };

    // Handle banner update if new file is uploaded
    if (req.file) {
      updatedData.banner = req.file.path;
    }

    const updatedTournament = await Tournament.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    ).populate("creator", "name email");

    res.status(200).json({
      success: true,
      data: updatedTournament,
    });
  } catch (error) {
    console.error("Error updating tournament:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update tournament",
    });
  }
};

// @desc    Delete tournament (admin)
// @route   DELETE /api/admin/tournaments/:id
// @access  Private/Admin
exports.deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tournament ID",
      });
    }

    const tournament = await Tournament.findById(id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    }

    // Delete tournament
    await Tournament.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Tournament deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tournament:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete tournament",
    });
  }
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user with password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
