const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Add this
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes.js");
const tournamentRoute = require("./routes/tournament.route.js");
const adminRoute = require("./routes/admin.route.js");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tournaments", tournamentRoute);
app.use("/api/admin", adminRoute);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "TournamentsLK API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;