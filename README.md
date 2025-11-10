# RoomBuddy

A full-stack web application for listing and booking hostel accommodations, built with Node.js, Express, and MongoDB. RoomBuddy provides a platform similar to Airbnb, specifically focused on hostel and budget accommodation listings.

## 🌟 Features

### User Management
- **User Authentication**: Secure signup and login using Passport.js with local strategy
- **Email Verification**: OTP-based email verification during signup using SendGrid
- **Session Management**: Persistent sessions with MongoDB session store
- **Authorization**: Role-based access control for listing owners

### Listing Management
- **Create Listings**: Add new hostel/accommodation listings with images
- **Edit Listings**: Update listing details (only by owners)
- **Delete Listings**: Remove listings (only by owners)
- **Image Upload**: Cloudinary integration for image storage and management
- **Country Selection**: Validated country dropdown using country-list package
- **Default Images**: Automatic fallback to default image if no image is uploaded

### Reviews & Ratings
- **Star Ratings**: 5-star rating system for accommodations
- **Comments**: Detailed text reviews
- **Review Management**: Users can only delete their own reviews
- **Review Display**: Grid layout showing all reviews with author information

### Search & Discovery
- **Browse Listings**: View all available accommodations
- **Filter Categories**: Trending, Rooms, Mountains, Castles, Pools, Camping, Farms, Arctic
- **Location Maps**: Interactive maps using Leaflet and OpenStreetMap API
- **Geocoding**: Automatic location mapping using Nominatim API

### User Interface
- **Responsive Design**: Mobile-friendly layout using Bootstrap 5
- **Modern Styling**: Clean, Airbnb-inspired design
- **Flash Messages**: User feedback for actions (success/error)
- **Image Preview**: Real-time image preview during upload/edit
- **Modal Reviews**: Overlay modal for submitting reviews

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js v5**: Web application framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB

### Authentication & Security
- **Passport.js**: Authentication middleware
- **Passport-local**: Local authentication strategy
- **Passport-local-mongoose**: Mongoose plugin for authentication
- **Express-session**: Session management
- **Connect-mongo**: MongoDB session store

### File Upload & Storage
- **Multer**: Multipart form data handling
- **Cloudinary**: Cloud-based image storage
- **Multer-storage-cloudinary**: Cloudinary storage engine for Multer

### Validation & Error Handling
- **Joi**: Schema validation
- **Custom middleware**: Error handling and validation

### Email Services
- **SendGrid**: Email delivery service for OTP verification
- **OTP-generator**: Generate secure OTPs

### Frontend
- **EJS**: Templating engine
- **EJS-mate**: Layout support for EJS
- **Bootstrap 5**: CSS framework
- **Font Awesome**: Icons
- **Leaflet**: Interactive maps

### Additional Libraries
- **Method-override**: HTTP verb support (PUT, DELETE)
- **Connect-flash**: Flash messages
- **Dotenv**: Environment variable management
- **Country-list**: Country name data

## 📁 Project Structure

```
roombuddy/
├── controllers/          # Route controllers
│   ├── listings.js      # Listing CRUD operations
│   ├── reviews.js       # Review operations
│   └── users.js         # User authentication
├── models/              # Mongoose models
│   ├── listing.js       # Listing schema
│   ├── review.js        # Review schema
│   └── user.js          # User schema
├── routes/              # Express routes
│   ├── listing.js       # Listing routes
│   ├── review.js        # Review routes
│   └── user.js          # Auth routes
├── views/               # EJS templates
│   ├── layouts/         # Layout templates
│   ├── includes/        # Partials (navbar, footer, flash)
│   ├── listings/        # Listing views
│   └── users/           # User views
├── public/              # Static assets
│   ├── css/            # Stylesheets
│   ├── js/             # Client-side scripts
│   └── image/          # Images
├── utils/               # Utility functions
│   ├── ExpressError.js  # Custom error class
│   └── wrapAsync.js     # Async error handler
├── init/                # Database initialization
│   ├── data.js         # Sample data
│   └── index.js        # DB seeding script
├── middleware.js        # Custom middleware
├── schema.js           # Joi validation schemas
├── cloudConfig.js      # Cloudinary configuration
└── app.js              # Main application file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v22.17.0 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- SendGrid account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Pruthavik01/RoomBuddy.git
cd roombuddy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
NODE_ENV=development
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key

# Map API (MapTiler)
MAP_API=your_maptiler_api_key
```

4. **Initialize the database (optional)**

If you want to seed sample data:
```bash
node init/index.js
```

5. **Start the application**
```bash
node app.js
```

The application will run on `http://localhost:8080`

## 📝 API Routes

### Authentication Routes
- `GET /signup` - Signup form
- `POST /signup` - Create new user (sends OTP)
- `GET /verify-otp` - OTP verification form
- `POST /verify-otp` - Verify OTP and complete signup
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listing Routes
- `GET /listings` - View all listings
- `GET /listings/new` - Create listing form (protected)
- `POST /listings` - Create new listing (protected)
- `GET /listings/:id` - View single listing
- `GET /listings/:id/edit` - Edit listing form (owner only)
- `PATCH /listings/:id` - Update listing (owner only)
- `DELETE /listings/:id` - Delete listing (owner only)

### Review Routes
- `POST /listings/:id/reviews` - Add review (authenticated users)
- `DELETE /listings/:id/reviews/:review_id` - Delete review (author only)

## 🔐 Security Features

- **Password Hashing**: Automatic password hashing using passport-local-mongoose
- **Session Security**: HTTP-only cookies, secure session configuration
- **OTP Verification**: Time-limited (2 minutes) OTP for email verification
- **Authorization Middleware**: Owner-only actions for listings, author-only for reviews
- **Input Validation**: Joi schema validation for all user inputs
- **XSS Protection**: EJS automatic escaping

## 🎨 Key Features Explained

### OTP Email Verification
New users receive an 8-character OTP via email that expires in 2 minutes. This prevents spam accounts and verifies email ownership.

### Image Upload System
Users can upload images or use a default image. Images are stored in Cloudinary with automatic optimization and responsive delivery.

### Map Integration
Each listing displays an interactive map showing its location using Leaflet and OpenStreetMap, with geocoding via Nominatim API.

### Flash Messages
Floating alerts provide user feedback for actions (success/error), auto-dismissing after 3 seconds.

### Responsive Design
Mobile-first design with collapsible navigation, optimized layouts for various screen sizes.

## 🐛 Error Handling

- Custom `ExpressError` class for consistent error handling
- Async wrapper function for route handlers
- Centralized error handling middleware
- User-friendly error pages

## 📦 Database Models

### User
- Username (unique)
- Email (unique)
- Password (hashed)
- Managed by passport-local-mongoose

### Listing
- Title
- Description
- Image (URL and filename)
- Price
- Location
- Country
- Owner (reference to User)
- Reviews (array of Review references)

### Review
- Rating (0-5 stars)
- Comment
- Author (reference to User)
- CreatedAt (timestamp)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Pruthavik Gavali**
- GitHub: [@Pruthavik01](https://github.com/Pruthavik01)
- LinkedIn: [pruthavik-gavali](https://www.linkedin.com/in/pruthavik-gavali/)

## 🙏 Acknowledgments

- Inspired by Airbnb's design and functionality
- Built as a learning project for full-stack web development
- Uses open-source libraries and APIs

---

**Note**: This project requires valid API keys for Cloudinary, SendGrid, and MapTiler to function properly. Make sure to set up these services and add the credentials to your `.env` file before running the application.