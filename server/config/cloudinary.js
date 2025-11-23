const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Validate Cloudinary configuration
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("❌ ERROR: Cloudinary credentials are not configured!");
  console.error("Please set the following in your .env file:");
  console.error("  - CLOUDINARY_CLOUD_NAME");
  console.error("  - CLOUDINARY_API_KEY");
  console.error("  - CLOUDINARY_API_SECRET");
  console.error("\nSign up for free at: https://cloudinary.com/users/register_free");
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Test Cloudinary connection
console.log("\n☁️  Testing Cloudinary Connection...");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.api.ping((error, result) => {
  if (error) {
    console.error("❌ Cloudinary connection FAILED:");
    console.error("Error:", error.message);
    console.error("\n⚠️  Please verify your Cloudinary credentials:");
    console.error("1. Go to: https://cloudinary.com/console");
    console.error("2. Check if Cloud Name is correct (case-sensitive!)");
    console.error("3. Verify API Key and API Secret");
    console.error("4. Your Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
  } else {
    console.log("✅ Cloudinary connected successfully!");
  }
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tournaments", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1200, height: 630, crop: "limit" }], // Optimize image size
  },
});

// Create multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

module.exports = { cloudinary, upload };
