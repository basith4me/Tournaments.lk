# Tournament Management System - Documentation

## Overview

This document provides comprehensive information about the Tournament Management System implemented in Tournaments.lk. The system allows authenticated users (sports clubs or individuals) to create, view, edit, and delete tournaments with image uploads.

## Features Implemented

### 1. Tournament Creation (Protected)
- **Route**: `/post-tournaments` (Protected - requires authentication)
- **Features**:
  - Complete form validation
  - Image upload with Cloudinary integration
  - Real-time image preview
  - File size validation (5MB limit)
  - File type validation (JPEG, PNG, GIF, WEBP)
  - All Sri Lankan districts available
  - Multiple sports options
  - Tournament type selection (Day/Day & Night)
  - Optional fields: Rules, Prize, Contact

### 2. My Tournaments Dashboard (Protected)
- **Route**: `/my-tournaments` (Protected - requires authentication)
- **Features**:
  - View all tournaments created by the logged-in user
  - Grid layout with tournament cards
  - Edit tournament functionality (modal-based)
  - Delete tournament with confirmation
  - Update tournament images
  - Empty state with call-to-action
  - Real-time CRUD operations

### 3. Public Tournament Listing
- **Route**: `/alltournaments` (Public)
- **Features**:
  - Display all tournaments from all users
  - Filter by sport
  - Filter by district
  - Clear filters functionality
  - Responsive grid layout
  - API-driven data fetching

### 4. Single Tournament View
- **Route**: `/tournaments/:id` (Public)
- **Features**:
  - Detailed tournament information
  - Banner image display
  - Tournament rules and regulations
  - Creator information
  - Contact details
  - Back navigation

## Technical Implementation

### Backend (Server)

#### Database Model (`server/models/tournamentModel.js`)
```javascript
{
  name: String (required),
  sport: String (required, enum),
  startDate: Date (required),
  tournamentType: String (required, enum: ['day', 'day-night']),
  location: String (required),
  district: String (required),
  rules: String (optional),
  prize: String (optional),
  contact: String (required),
  banner: String (Cloudinary URL),
  creator: ObjectId (reference to User),
  status: String (enum: ['upcoming', 'ongoing', 'completed']),
  timestamps: true
}
```

#### API Endpoints (`server/routes/tournament.route.js`)

**Public Routes:**
- `GET /api/tournaments` - Get all tournaments (with optional filters)
- `GET /api/tournaments/:id` - Get single tournament by ID

**Protected Routes (Require Authentication):**
- `POST /api/tournaments` - Create new tournament (with image upload)
- `GET /api/tournaments/user/my-tournaments` - Get user's tournaments
- `PUT /api/tournaments/:id` - Update tournament (with optional image update)
- `DELETE /api/tournaments/:id` - Delete tournament

#### Authentication & Authorization
- JWT-based authentication
- Bearer token in Authorization header
- User-specific tournament management (users can only edit/delete their own tournaments)
- Creator reference stored in each tournament document

#### Image Upload with Cloudinary (Free Tier)
- **Service**: Cloudinary Free Tier
- **Features**:
  - 25 monthly credits
  - 25GB storage
  - 25GB bandwidth
  - No credit card required
- **Configuration**: `server/config/cloudinary.js`
- **Image Optimization**:
  - Max dimensions: 1200x630
  - Automatic format conversion
  - 5MB file size limit
  - Folder organization: `/tournaments`

### Frontend (Client)

#### Components

**1. PostTournaments.jsx**
- Location: `client/src/pages/organizations/PostTournaments.jsx`
- Form state management
- File upload handling
- Form validation
- API integration with FormData
- Success/error handling with toast notifications

**2. MyTournaments.jsx**
- Location: `client/src/pages/organizations/MyTournaments.jsx`
- Fetch user's tournaments
- Display in responsive grid
- Edit modal with form
- Delete with confirmation
- Real-time updates

**3. TournamentsListing.jsx**
- Location: `client/src/components/TournamentsListing.jsx`
- API-driven data fetching
- Filter support (sport, district)
- Loading states
- Empty states
- Homepage and all-tournaments mode

**4. TournamentCard.jsx**
- Location: `client/src/components/TournamentCard.jsx`
- Tournament preview card
- Image display
- Tournament details
- Link to single tournament page

**5. SingleTournament.jsx**
- Location: `client/src/pages/teams/SingleTournament.jsx`
- Fetch tournament by ID from URL params
- Display full tournament details
- Creator information
- Error handling and navigation

#### Routes Configuration
```javascript
// Protected Routes
/post-tournaments - Create tournament (requires auth)
/my-tournaments - My tournaments dashboard (requires auth)

// Public Routes
/ - Homepage
/alltournaments - All tournaments listing
/tournaments/:id - Single tournament view
/signin - Authentication page
/aboutus - About us page
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (free tier)

### Environment Variables

**Server (.env)**
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
# Sign up at https://cloudinary.com/users/register_free
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Client (.env)** (if needed)
```bash
VITE_API_URL=http://localhost:5000/api
```

### Cloudinary Setup

1. **Sign Up**: Visit https://cloudinary.com/users/register_free
2. **Get Credentials**: Go to https://cloudinary.com/console
3. **Copy Details**:
   - Cloud Name
   - API Key
   - API Secret
4. **Add to .env**: Update the `server/.env` file with your credentials

### Installation

**Server:**
```bash
cd server
npm install
npm start
```

**Client:**
```bash
cd client
npm install
npm run dev
```

## Usage Flow

### Creating a Tournament

1. **Login**: User must be logged in
2. **Navigate**: Go to `/post-tournaments`
3. **Fill Form**:
   - Enter tournament name
   - Select sport
   - Choose start date
   - Select tournament type (Day/Day & Night)
   - Enter location/town
   - Select district
   - Add rules (optional)
   - Add prize details (optional)
   - Enter contact number
   - Upload banner image (required)
4. **Submit**: Form validates and creates tournament
5. **Redirect**: Automatically redirected to `/my-tournaments`

### Managing Tournaments

1. **View**: Navigate to `/my-tournaments`
2. **Edit**:
   - Click "Edit" button on any tournament
   - Modal opens with pre-filled form
   - Make changes and save
   - Tournament updates immediately
3. **Delete**:
   - Click "Delete" button
   - Confirm deletion
   - Tournament removed from list and database

### Viewing Tournaments

1. **All Tournaments**: Visit `/alltournaments`
2. **Filter**: Use sport or district filters
3. **Clear**: Clear all filters with button
4. **View Details**: Click "View Details" on any tournament card
5. **Single View**: See complete tournament information

## API Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Tournament created successfully",
  "data": { /* tournament object */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Security Features

1. **Authentication**: JWT-based authentication
2. **Authorization**: Users can only edit/delete their own tournaments
3. **File Validation**: Image type and size validation
4. **Input Validation**: Server-side validation with Mongoose
5. **Protected Routes**: Authentication middleware on sensitive routes

## Future Enhancements

1. Tournament registration system
2. Team management
3. Match scheduling
4. Live score updates
5. Tournament brackets/fixtures
6. Email notifications
7. Tournament categories
8. Advanced search and filtering
9. Tournament analytics
10. Social sharing features

## Troubleshooting

### Common Issues

**1. Image Upload Fails**
- Check Cloudinary credentials in `.env`
- Verify file size is under 5MB
- Ensure file type is supported

**2. Authentication Errors**
- Verify JWT_SECRET is set in `.env`
- Check if token is being sent in headers
- Ensure user is logged in

**3. CORS Issues**
- Verify CORS is configured in `server/app.js`
- Check client API URL configuration

**4. MongoDB Connection**
- Verify MongoDB is running
- Check MONGODB_URI in `.env`
- Ensure database exists and is accessible

## Testing Checklist

- [ ] Create tournament with all fields
- [ ] Create tournament with optional fields empty
- [ ] Upload different image formats
- [ ] Edit tournament details
- [ ] Edit tournament image
- [ ] Delete tournament
- [ ] Filter tournaments by sport
- [ ] Filter tournaments by district
- [ ] View single tournament details
- [ ] Test authentication protection
- [ ] Test authorization (edit/delete own tournaments only)
- [ ] Test image upload size limit
- [ ] Test form validations
- [ ] Test responsive design

## License

MIT License

## Support

For issues and questions, please open an issue on the GitHub repository.
