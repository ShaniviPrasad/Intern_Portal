# Intern Portal - Full Stack Application

A comprehensive intern dashboard built with React frontend and Node.js/Express backend, featuring user management, donation tracking, rewards system, and leaderboards.

## 🚀 Features

### Frontend (React)
- **Authentication Pages**: Login and signup forms with form validation
- **Dashboard**: Personalized intern dashboard showing:
  - Intern name and profile
  - Unique referral code generation
  - Total donations raised with progress tracking
  - Rewards/unlockables section with achievement system
- **Leaderboard**: Rankings of top-performing interns
- **Responsive Design**: Mobile-friendly interface with modern UI
- **Interactive Elements**: Progress bars, achievement badges, and smooth animations

### Backend (Node.js/Express)
- **REST API**: Complete CRUD operations for intern management
- **Data Storage**: In-memory storage with JSON file persistence
- **API Endpoints**:
  - `GET /api/interns` - Get all interns
  - `GET /api/interns/:id` - Get specific intern
  - `POST /api/interns` - Create new intern
  - `PUT /api/interns/:id` - Update intern data
  - `GET /api/leaderboard` - Get ranked interns
- **CORS Support**: Cross-origin requests enabled
- **Error Handling**: Comprehensive error responses

### Bonus Features ✨
- **Leaderboard System**: Real-time rankings based on donations
- **Achievement System**: Unlockable rewards based on performance
- **Progress Tracking**: Visual progress indicators
- **Mock Data**: Pre-populated with sample intern data
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Modern CSS with Flexbox/Grid
- Lucide React Icons
- Responsive Design

**Backend:**
- Node.js
- Express.js
- CORS middleware
- JSON file storage

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Backend Setup

1. **Create project directory and navigate to backend:**
```bash
mkdir intern-portal
cd intern-portal
mkdir backend
cd backend
```

2. **Initialize Node.js project:**
```bash
npm init -y
```

3. **Install dependencies:**
```bash
npm install express cors
npm install -D nodemon
```

4. **Create the backend files:**
   - Copy the `server.js` file to your backend directory
   - Copy the `data.json` file to your backend directory

5. **Update package.json scripts:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

6. **Start the backend server:**
```bash
npm run dev
```
Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to project root and create React app:**
```bash
cd ..
npx create-react-app frontend
cd frontend
```

2. **Install additional dependencies:**
```bash
npm install lucide-react
```

3. **Replace the default React files:**
   - Replace `src/App.js` with the provided React component
   - Replace `src/App.css` with the provided styles
   - Update `public/index.html` title if desired

4. **Start the frontend development server:**
```bash
npm start
```
Frontend will run on `http://localhost:3000`

## 🗂️ Project Structure

```
intern-portal/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── data.json          # JSON database file
│   ├── package.json       # Backend dependencies
│   └── node_modules/      # Backend packages
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   └── index.js       # React entry point
│   ├── package.json       # Frontend dependencies
│   └── node_modules/      # Frontend packages
└── README.md              # This file
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/interns` | Get all interns |
| GET | `/interns/:id` | Get intern by ID |
| POST | `/interns` | Create new intern |
| PUT | `/interns/:id` | Update intern data |
| GET | `/leaderboard` | Get ranked interns |

### Example API Responses

**GET /api/interns/1:**
```json
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "referralCode": "alice2025",
  "donationsRaised": 15420,
  "joinDate": "2024-01-15",
  "rewards": ["Bronze Badge", "First Donation", "Team Player"]
}
```

**GET /api/leaderboard:**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "donationsRaised": 15420,
    "rank": 1
  },
  // ... more interns
]
```

## 🧪 Testing with Postman

1. **Import the following requests into Postman:**

   - **GET All Interns**: `GET http://localhost:5000/api/interns`
   - **GET Specific Intern**: `GET http://localhost:5000/api/interns/1`
   - **POST New Intern**: `POST http://localhost:5000/api/interns`
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "referralCode": "john2025",
       "donationsRaised": 5000
     }
     ```
   - **PUT Update Intern**: `PUT http://localhost:5000/api/interns/1`
     ```json
     {
       "donationsRaised": 20000
     }
     ```
   - **GET Leaderboard**: `GET http://localhost:5000/api/leaderboard`

## 🎯 Usage

1. **Access the application**: Open `http://localhost:3000` in your browser
2. **Navigate**: Use the login/signup forms (dummy authentication)
3. **Dashboard**: View intern profile, donations, and rewards
4. **Leaderboard**: Check rankings and performance metrics
5. **API Testing**: Use Postman to test backend endpoints

## 🔧 Customization

### Adding New Rewards
Edit the rewards logic in `server.js`:
```javascript
const getRewards = (donationsRaised) => {
  const rewards = [];
  if (donationsRaised >= 1000) rewards.push("Bronze Badge");
  if (donationsRaised >= 5000) rewards.push("Silver Badge");
  if (donationsRaised >= 10000) rewards.push("Gold Badge");
  // Add your custom rewards here
  return rewards;
};
```

### Styling Modifications
- Edit `frontend/src/App.css` for visual changes
- Modify component structure in `frontend/src/App.js`
- Add new icons from Lucide React library

### Database Integration
To connect to a real database (MongoDB, PostgreSQL, etc.):
1. Install database driver (e.g., `mongoose` for MongoDB)
2. Replace JSON file operations in `server.js`
3. Add environment variables for database connection

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Vercel)
1. Add `package.json` start script
2. Set PORT environment variable
3. Deploy backend first, note the URL

### Frontend Deployment (Netlify/Vercel)
1. Update API base URL in frontend code
2. Build the React app: `npm run build`
3. Deploy the build folder

## 🐛 Troubleshooting

**Common Issues:**

1. **CORS Errors**: Ensure backend CORS is configured for frontend URL
2. **Port Conflicts**: Change ports in server.js or React if needed
3. **API Connection**: Verify backend is running before starting frontend
4. **Missing Dependencies**: Run `npm install` in both directories

## 📝 Future Enhancements

- Real authentication with JWT tokens
- Database integration (MongoDB/PostgreSQL)
- Real-time updates with WebSockets
- Email notifications for achievements
- Advanced analytics dashboard
- Mobile app with React Native
- Payment integration for donations

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for the Intern Portal Challenge**
