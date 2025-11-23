# Debugging Guide for 500 Error

## ✅ Current Status

Your `.env` file is now correctly configured:
```bash
CLOUDINARY_CLOUD_NAME=Root
CLOUDINARY_API_KEY=638656815445686
CLOUDINARY_API_SECRET=nRi5mZYtjriFjRLE0v0KArERgt0
```

## 🔍 Next Steps to Find the Bug

I've added comprehensive logging to help identify the exact issue. Follow these steps:

### Step 1: Restart Your Server

**IMPORTANT:** Stop and restart the server to load the new .env values and debugging code.

```bash
# Stop the server (Ctrl+C in the terminal where it's running)

# Then restart:
cd /home/user/Tournaments.lk/server
npm start
```

### Step 2: Check Server Startup Logs

When the server starts, you should see:

```
🔍 Environment Variables Check:
PORT: 5000
MONGODB_URI: ✅ Set
JWT_SECRET: ✅ Set
CLOUDINARY_CLOUD_NAME: Root
CLOUDINARY_API_KEY: ✅ Set
CLOUDINARY_API_SECRET: ✅ Set

✅ Server running on port 5000
🌐 Environment: development
```

**If you see "❌ Not Set"** for any Cloudinary variable, the .env file isn't being loaded properly.

### Step 3: Verify You're Logged In

1. Open your browser console (F12)
2. Go to **Application** tab → **Local Storage**
3. Check for:
   - `token` - Should have a long JWT string
   - `user` - Should have your user data

**If these are missing:** You're not logged in! Log in first at `/signin`

### Step 4: Try Creating a Tournament

1. Make sure you're logged in
2. Go to `/post-tournaments`
3. Fill in the form
4. Upload an image
5. Click "Submit Tournament"

### Step 5: Check Server Console Output

Look for detailed logs in the server console. You'll see:

**Authentication Middleware:**
```
🔐 Auth Middleware Debug:
Authorization header: Bearer eyJhbGc...
Token extracted: ✅ Present
Token decoded: { id: '...', iat: ..., exp: ... }
✅ User authenticated: 6745abc123...
```

**Tournament Creation:**
```
📝 Creating Tournament - Debug Info:
req.user: { _id: '6745abc123...', name: 'John', email: '...' }
req.body: { name: 'Test Tournament', sport: 'cricket', ... }
req.file: { path: 'https://res.cloudinary.com/...', ... }
Banner URL: https://res.cloudinary.com/...
✅ Tournament created successfully: 6745def456...
```

### Step 6: Identify the Error

Based on what you see in the logs, identify which of these is happening:

#### Error A: Authentication Issue
```
❌ No authorization header or invalid format
```
**Solution:** You're not logged in. Go to `/signin` and log in first.

#### Error B: User Not Found
```
❌ User not found in database
```
**Solution:** Your token is valid but the user doesn't exist in the database. Create a new account.

#### Error C: Missing Required Fields
```
❌ Validation Error: Missing required fields
```
**Solution:** Check that all required fields are filled in the form.

#### Error D: Cloudinary Error
```
❌ Error creating tournament:
Error name: Error
Error message: ...cloudinary...
```
**Solution:** Issue with Cloudinary. Check credentials are correct.

#### Error E: MongoDB Error
```
❌ Error creating tournament:
Error name: MongoError
```
**Solution:** MongoDB issue. Make sure MongoDB is running:
```bash
# Check if MongoDB is running
sudo systemctl status mongod
# or
ps aux | grep mongod
```

## 📋 Checklist Before Testing

- [ ] Server is restarted with latest code
- [ ] .env file has correct Cloudinary credentials (no spaces around =)
- [ ] MongoDB is running
- [ ] User is logged in (check localStorage in browser)
- [ ] All form fields are filled
- [ ] Image is selected (under 5MB, JPG/PNG/GIF/WEBP)

## 🔧 Common Issues and Solutions

### Issue: "undefined" in server console

**Possible Causes:**
1. `req.user` is undefined → Not logged in or token invalid
2. `req.body` fields are undefined → Form data not being sent correctly
3. `req.file` is undefined → Multer not processing file upload

**Check:** Look at the debug logs to see which one is undefined.

### Issue: Token Expired

**Error:**
```
❌ Auth middleware error: jwt expired
```

**Solution:** Log in again. Tokens expire after 7 days.

### Issue: MongoDB Not Connected

**Error:**
```
MongoServerSelectionError: connect ECONNREFUSED
```

**Solution:** Start MongoDB:
```bash
sudo systemctl start mongod
# or on macOS:
brew services start mongodb-community
```

### Issue: Multer/Cloudinary Error

**Error:**
```
Error: Missing required parameter - api_key
```

**Solution:** Cloudinary credentials not loaded. Check:
1. .env file exists in `/home/user/Tournaments.lk/server/`
2. No typos in variable names
3. Server was restarted after updating .env

## 📸 What to Share if Still Stuck

If you're still getting the error, please share:

1. **Server console output** when you try to create a tournament
2. **Browser console error** (the full error object)
3. **Screenshot** of the Network tab showing the request details:
   - Request URL
   - Request Headers (especially Authorization header)
   - Request Payload

## 🎯 Quick Test Commands

Test if server can connect to all services:

```bash
# Test MongoDB connection
mongosh --eval "db.adminCommand('ping')"

# Test if .env is loaded
cd /home/user/Tournaments.lk/server
node -e "require('dotenv').config(); console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME)"

# Should output: CLOUDINARY_CLOUD_NAME: Root
```

## Next Steps

1. **Restart server**
2. **Try creating tournament**
3. **Copy the EXACT output from server console**
4. **Share it** so we can identify the specific error

The detailed logging will show us exactly where the problem is!
