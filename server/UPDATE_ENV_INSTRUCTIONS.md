# How to Update Your .env File

## Current Problem
Your `.env` file still has placeholder values that need to be replaced with real Cloudinary credentials.

## Step-by-Step Fix

### Method 1: Using Text Editor (Recommended)

1. **Open the .env file in a text editor:**
   ```bash
   cd /home/user/Tournaments.lk/server
   nano .env
   # or use your preferred editor: vim, code, etc.
   ```

2. **Find these lines (around line 15-17):**
   ```bash
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Replace with your actual values from Cloudinary:**
   ```bash
   CLOUDINARY_CLOUD_NAME=dxyz123abc
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123
   ```

4. **Important formatting rules:**
   - ✅ NO spaces around the `=` sign
   - ✅ NO quotes around the values
   - ✅ Each value on its own line
   - ❌ Don't use: `CLOUDINARY_CLOUD_NAME = "dxyz123abc"`
   - ✅ Use: `CLOUDINARY_CLOUD_NAME=dxyz123abc`

5. **Save the file:**
   - If using nano: Press `Ctrl+X`, then `Y`, then `Enter`
   - If using vim: Press `:wq` and `Enter`

6. **Restart the server:**
   ```bash
   # Stop the server (Ctrl+C)
   # Then start again:
   npm start
   ```

### Method 2: Using Command Line

You can also update the file using sed commands:

```bash
cd /home/user/Tournaments.lk/server

# Replace cloud name (replace YOUR_CLOUD_NAME with your actual value)
sed -i 's/CLOUDINARY_CLOUD_NAME=your_cloud_name/CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME/' .env

# Replace API key (replace YOUR_API_KEY with your actual value)
sed -i 's/CLOUDINARY_API_KEY=your_api_key/CLOUDINARY_API_KEY=YOUR_API_KEY/' .env

# Replace API secret (replace YOUR_API_SECRET with your actual value)
sed -i 's/CLOUDINARY_API_SECRET=your_api_secret/CLOUDINARY_API_SECRET=YOUR_API_SECRET/' .env
```

### Where to Get Cloudinary Credentials

1. Go to: https://cloudinary.com/console
2. Log in (or sign up for free if you haven't)
3. On the dashboard, you'll see:
   ```
   Cloud name: dxyz123abc
   API Key: 123456789012345
   API Secret: *********** (click "reveal" to see it)
   ```
4. Copy these exact values (without quotes or spaces)

### Verify Your Changes

After updating, verify the file:
```bash
cat .env | grep CLOUDINARY
```

You should see your actual values, NOT:
- your_cloud_name
- your_api_key
- your_api_secret

### Restart and Test

1. **Restart the server** (important!)
   ```bash
   cd /home/user/Tournaments.lk/server
   npm start
   ```

2. **Check the server console** - You should see:
   ```
   🔍 Environment Variables Check:
   CLOUDINARY_CLOUD_NAME: dxyz123abc (your actual cloud name)
   CLOUDINARY_API_KEY: ✅ Set
   CLOUDINARY_API_SECRET: ✅ Set
   ```

3. **Test tournament creation** - Try uploading a tournament with an image

## Common Issues

### Issue: Still showing placeholders after editing
**Solution:** Make sure you:
- Saved the file after editing
- Restarted the server
- Are editing the correct .env file (in `/home/user/Tournaments.lk/server/`)

### Issue: "Not Set" in console
**Solution:** Check for:
- Typos in variable names
- Spaces around `=` sign
- Quotes around values
- Extra spaces at the end of lines

### Issue: Still getting 500 error
**Solution:**
1. Check server console for the actual error message
2. Verify all three Cloudinary variables are set
3. Make sure credentials are copied correctly from Cloudinary dashboard
4. Try logging in to Cloudinary console to verify account is active

## Example .env File (with fake values)

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/tournaments_lk

# JWT Configuration
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d

# Cloudinary Configuration (Free Tier)
CLOUDINARY_CLOUD_NAME=dk4h8x9yz
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefGHIJKLmnopQRST12345
```

Note: Replace the Cloudinary values above with YOUR actual values from the Cloudinary console.
