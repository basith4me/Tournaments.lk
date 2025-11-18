const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tournament name is required"],
      trim: true,
    },
    sport: {
      type: String,
      required: [true, "Sport type is required"],
      enum: ["cricket", "football", "basketball", "volleyball", "tennis", "badminton", "other"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    tournamentType: {
      type: String,
      required: [true, "Tournament type is required"],
      enum: ["day", "day-night"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
    },
    rules: {
      type: String,
      trim: true,
    },
    prize: {
      type: String,
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    banner: {
      type: String, // URL to the uploaded image
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tournament", tournamentSchema);
