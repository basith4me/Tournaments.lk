# Cloudinary Setup Guide (FREE TIER)

## The 500 Error Fix

The error you're experiencing is because **Cloudinary credentials are not configured**. Follow these steps to fix it:

## Quick Setup (5 minutes)

### Step 1: Sign Up for Cloudinary (FREE)

1. Go to: **https://cloudinary.com/users/register_free**
2. Sign up with:
   - Email address
   - Or sign up with Google/GitHub
3. **No credit card required!** ✅

### Step 2: Get Your Credentials

1. After signing up, you'll be taken to the Dashboard
2. Or go to: **https://cloudinary.com/console**
3. On the dashboard, you'll see:
   ```
   Account Details
   Cloud name: your_cloud_name
   API Key: 123456789012345
   API Secret: abc123def456ghi789 (click to reveal)
   ```

### Step 3: Update Your .env File

1. Open the file: `server/.env`
2. Replace the placeholder values with your real credentials:

```bash
# Cloudinary Configuration (Free Tier)
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

**Example (with fake values):**
```bash
CLOUDINARY_CLOUD_NAME=dk4h8x9yz
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abc123def456ghi789jkl
```

### Step 4: Restart Your Server

1. Stop the server (Ctrl+C in the terminal where server is running)
2. Start it again:
   ```bash
   cd server
   npm start
   ```

### Step 5: Test Tournament Creation

1. Log in to your application
2. Go to `/post-tournaments`
3. Fill in the form and upload an image
4. Click "Submit Tournament"
5. ✅ Should work now!

## What You Get (FREE Tier)

- ✅ 25 monthly credits
- ✅ 25GB storage
- ✅ 25GB bandwidth
- ✅ Automatic image optimization
- ✅ Image transformations
- ✅ No credit card required
- ✅ No expiration

## Troubleshooting

### Still Getting 500 Error?

1. **Check server console** - You should see this error if credentials are missing:
   ```
   ❌ ERROR: Cloudinary credentials are not configured!
   ```

2. **Verify .env file**:
   ```bash
   cd server
   cat .env
   ```
   Make sure the values are NOT:
   - `your_cloud_name`
   - `your_api_key`
   - `your_api_secret`

3. **Check for typos**:
   - No spaces around the `=` sign
   - No quotes around values
   - Correct: `CLOUDINARY_CLOUD_NAME=dk4h8x9yz`
   - Wrong: `CLOUDINARY_CLOUD_NAME = "dk4h8x9yz"`

4. **Restart server** after updating .env

### Can't Find Credentials?

1. Go to: https://cloudinary.com/console
2. Log in
3. Click on "Dashboard" in the sidebar
4. Your credentials are at the top

### Image Upload Still Failing?

Check:
- File size is under 5MB
- File type is: JPEG, PNG, GIF, or WEBP
- You're logged in (tournament creation requires authentication)

## Alternative: Use Local Storage (Development Only)

If you want to test without Cloudinary temporarily, you can:

1. Comment out the cloudinary upload in `server/routes/tournament.route.js`
2. Use local file storage with regular multer
3. Note: Images won't persist and this is NOT recommended for production

## Need Help?

- Cloudinary Docs: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com/

## Security Note

⚠️ **IMPORTANT**:
- Never commit your `.env` file to git (it's already in .gitignore)
- Never share your API Secret publicly
- The `.env.example` file is safe to commit (it has placeholder values)
