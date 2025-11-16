# 🚗 IronRide - Premium Taxi & Chauffeur Service

IronRide is a full-stack web application for a luxury taxi and chauffeur service. It features a modern, responsive frontend and a robust Node.js backend with MongoDB integration for managing bookings, contact inquiries, and job applications.

---

## ✨ Features

- **🎨 Modern UI/UX**: Sleek, responsive design that works seamlessly across all devices
- **📅 Real-time Booking System**: Interactive booking modal with service selection and price calculation
- **💾 MongoDB Integration**: All data is securely stored in MongoDB database
- **📧 Contact Form**: Users can send inquiries directly through the website
- **👔 Career Portal**: Job application system for potential employees
- **🔄 RESTful API**: Well-structured backend API built with Express.js
- **✅ Data Validation**: Mongoose schema validation ensures data integrity
- **🎯 Dynamic Service Loading**: Services are loaded from JSON and rendered dynamically

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3
- Vanilla JavaScript (ES6+)
- Responsive Design (Mobile-first approach)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- CORS enabled for cross-origin requests

### Dev Tools
- dotenv (Environment variable management)
- nodemon (Auto-restart during development)

---

## 📁 Project Structure

```
IronRide/
│
├── .env                          # Environment variables (not in repo)
├── .env.example                  # Template for environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Node.js dependencies and scripts
├── package-lock.json             # Locked dependency versions
├── server.js                     # Main Express server file
├── data.json                     # Static data for services
├── README.md                     # Project documentation
│
├── config/
│   └── database.js               # MongoDB connection configuration
│
├── ironride op/                  # Frontend files
│   ├── index.html                # Homepage
│   ├── booking.html              # Booking page (if separate)
│   ├── contact.html              # Contact page
│   ├── join.html                 # Career/Join page
│   ├── style.css                 # Main stylesheet
│   └── app.js                    # Frontend JavaScript logic
│
├── models/                       # Mongoose schemas
│   ├── Booking.js                # Booking data model
│   ├── Contact.js                # Contact message model
│   └── Application.js            # Job application model
│
├── routes/                       # API route definitions
│   ├── bookingRoutes.js          # Routes for /api/bookings
│   ├── contactRoutes.js          # Routes for /api/contacts
│   └── applicationRoutes.js      # Routes for /api/applications
│
└── controllers/                  # Business logic handlers
    ├── bookingController.js      # Booking request handlers
    ├── contactController.js      # Contact request handlers
    └── applicationController.js  # Application request handlers
```

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v14 or higher) - includes npm
- **[MongoDB](https://www.mongodb.com/try/download/community)** - local installation or MongoDB Atlas account
- **[Git](https://git-scm.com/)** - for version control
- **Code Editor** - VS Code recommended

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ironride.git
cd ironride
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- express
- mongoose
- dotenv
- cors
- nodemon (dev dependency)

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Windows PowerShell
New-Item -Path .env -ItemType File

# Mac/Linux
touch .env
```

Add the following configuration to `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ironride
NODE_ENV=development
```

**Important:** Never commit `.env` to GitHub. It's already in `.gitignore`.

### 4. Start MongoDB

**Windows:**
```powershell
net start MongoDB
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 5. Start the Development Server

```bash
npm run dev
```

You should see:
```
🚀 Server is running in development mode on port 5000
✅ MongoDB Connected. Frontend available at http://localhost:5000
```

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start the development server with nodemon (auto-restart) |

---

## 🎯 How to Use the Website

### For Users

1. **Browse Services**
   - Visit the homepage
   - Scroll to the "Our Services" section
   - View available ride options with pricing

2. **Book a Ride**
   - Click "Book Now" on any service card
   - Fill in the booking form:
     - Pickup & dropoff locations
     - Date and time
     - Number of passengers
     - Your contact details
   - Click "Confirm Booking"
   - Data is saved to MongoDB instantly

3. **Contact Us**
   - Navigate to the Contact page
   - Fill in your name, email, and message
   - Submit the form
   - Your message is stored in the database

4. **Apply for a Job**
   - Go to the "Join Us" page
   - Fill in the application form
   - Submit your application
   - HR team will review it in the database

---

## 🔌 API Endpoints

### Bookings

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/bookings` | Create a new booking | `{ serviceType, customerName, customerEmail, customerPhone, pickupLocation, dropoffLocation, pickupDate, pickupTime, passengers, specialRequests, estimatedPrice }` |
| `GET` | `/api/bookings` | Get all bookings | - |

**Example Request:**
```javascript
fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    serviceType: "Standard Ride",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+1234567890",
    pickupLocation: "123 Main St",
    dropoffLocation: "456 Park Ave",
    pickupDate: "2025-11-20",
    pickupTime: "14:30",
    passengers: 2,
    specialRequests: "Need child seat",
    estimatedPrice: 75
  })
});
```

### Contacts

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/contacts` | Submit a contact message | `{ name, email, message }` |
| `GET` | `/api/contacts` | Get all contact messages | - |

### Applications

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/applications` | Submit a job application | `{ fullName, email, phone, jobCategory, experience }` |

### Site Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/sitedata` | Fetch services and site content from `data.json` |

---

## 🗄️ Database Schema

### Booking Model

```javascript
{
  serviceType: String (required),
  customerName: String (required),
  customerEmail: String (required),
  customerPhone: String (required),
  pickupLocation: String (required),
  dropoffLocation: String (required),
  pickupDate: String (required),
  pickupTime: String (required),
  passengers: Number (required, min: 1),
  specialRequests: String,
  estimatedPrice: Number (required),
  status: String (default: "confirmed"),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Contact Model

```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  status: String (default: "new"),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Application Model

```javascript
{
  fullName: String (required),
  email: String (required),
  phone: String (required),
  jobCategory: String (required),
  experience: String (required),
  status: String (default: "pending"),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Check if MongoDB is running:
   ```powershell
   # Windows
   net start MongoDB
   
   # Check if port 27017 is listening
   netstat -ano | findstr :27017
   ```

2. Verify your `MONGODB_URI` in `.env` is correct

3. Try connecting with MongoDB Compass to test the connection

### Issue: "Port 5000 already in use"

**Solution:**
1. Change the `PORT` in `.env` to another number (e.g., `5001`)
2. Or stop the process using port 5000:
   ```powershell
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <process_id> /F
   ```

### Issue: "Booking not saving to database"

**Solution:**
1. Check browser console for errors (F12)
2. Check server terminal for validation errors
3. Ensure all required fields are filled
4. Verify field names match between frontend and backend

### Issue: "CORS Error"

**Solution:**
The `cors()` middleware is already configured in `server.js`. If you still see CORS errors:
1. Make sure you're accessing the site through `http://localhost:5000` (not Live Server)
2. Clear browser cache (`Ctrl + Shift + R`)

---

## 🧪 Testing with MongoDB Compass

1. **Install MongoDB Compass**
2. **Connect to:** `mongodb://127.0.0.1:27017`
3. **Select Database:** `ironride`
4. **View Collections:**
   - `bookings` - All ride bookings
   - `contacts` - Contact form submissions
   - `applications` - Job applications

---

## 🔐 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port number for the Express server | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/ironride` |
| `NODE_ENV` | Environment mode (development/production) | `development` |

---

## 🚀 Deployment

### Deploy to Render/Railway/Heroku

1. Create a new web service
2. Connect your GitHub repository
3. Add environment variables in the dashboard:
   - `MONGODB_URI` (use MongoDB Atlas connection string)
   - `NODE_ENV=production`
4. Deploy!

### MongoDB Atlas Setup (Cloud Database)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/ironride?retryWrites=true&w=majority
   ```
   
   **Replace:**
   - `<username>` with your MongoDB Atlas username
   - `<password>` with your database password
   - `<cluster-url>` with your cluster URL

**⚠️ Security Warning:** Never commit your actual credentials to GitHub!

---

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Icons from [FontAwesome](https://fontawesome.com/)
- Design inspiration from modern taxi booking platforms
- Built with ❤️ and lots of ☕

---

## 📞 Support

If you have any questions or run into issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Contact the development team

---

**Made with 💙 by IronRide Team**

### 🔒 Security Best Practices

**Never commit these to GitHub:**
- `.env` file with real credentials
- Database passwords or API keys
- MongoDB connection strings with actual usernames/passwords
- Any file containing sensitive information

**Safe to commit:**
- `.env.example` (template with placeholder values)
- `README.md` (with generic examples only)
- Code files without hardcoded secrets

**If you accidentally committed `.env`:**
```bash
# Remove from Git history
git rm --cached .env
git commit -m "Remove .env from tracking"

# Then immediately:
# 1. Change your MongoDB password
# 2. Rotate any exposed API keys
# 3. Add .env to .gitignore (if not already there)
```