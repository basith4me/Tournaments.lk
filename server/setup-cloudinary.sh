#!/bin/bash

# Cloudinary Setup Helper Script
# This script helps you update your .env file with Cloudinary credentials

echo "========================================="
echo "   Cloudinary Credentials Setup"
echo "========================================="
echo ""
echo "Get your credentials from: https://cloudinary.com/console"
echo ""

# Read credentials
read -p "Enter your CLOUDINARY_CLOUD_NAME: " cloud_name
read -p "Enter your CLOUDINARY_API_KEY: " api_key
read -p "Enter your CLOUDINARY_API_SECRET: " api_secret

echo ""
echo "Updating .env file..."

# Update .env file
sed -i "s/CLOUDINARY_CLOUD_NAME=.*/CLOUDINARY_CLOUD_NAME=$cloud_name/" .env
sed -i "s/CLOUDINARY_API_KEY=.*/CLOUDINARY_API_KEY=$api_key/" .env
sed -i "s/CLOUDINARY_API_SECRET=.*/CLOUDINARY_API_SECRET=$api_secret/" .env

echo "✅ .env file updated!"
echo ""
echo "Updated values:"
grep "^CLOUDINARY" .env
echo ""
echo "⚠️  IMPORTANT: Restart your server for changes to take effect!"
echo "   Press Ctrl+C to stop the server, then run: npm start"
echo ""
