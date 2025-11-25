require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userModel");
const connectDB = require("../config/db");

const createAdmin = async () => {
  try {
    await connectDB();

    // Admin credentials
    const adminData = {
      name: "Admin",
      email: "admin@tournaments.lk",
      password: "admin123",
      phone: "0771234567",
      address: "Colombo, Sri Lanka",
      isAdmin: true,
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });

    if (existingAdmin) {
      console.log("❌ Admin user already exists!");
      console.log("Email:", adminData.email);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create(adminData);

    console.log("✅ Admin user created successfully!");
    console.log("Email:", adminData.email);
    console.log("Password:", adminData.password);
    console.log("\n⚠️  Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
