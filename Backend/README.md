# 🚀 Intern Portal Backend API

A complete REST API backend for the Intern Portal application built with Node.js and Express.

## 📋 Features

### ✅ **Core Requirements:**
- **REST API** with dummy data for user name, referral code, and donations
- **Mock database** with static JSON data structure
- **Postman-ready** endpoints for easy testing

### 🎁 **Bonus Features:**
- **Leaderboard API** with ranking and filtering
- **Analytics dashboard** data
- **User management** (registration/login)
- **Comprehensive error handling**

## 🛠️ Quick Setup

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Start the Server**
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

### 3. **Test the API**
- Server runs on: `http://localhost:3000`
- Health check: `http://localhost:3000/api/health`

## 📡 API Endpoints

### 🔐 **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### 👤 **User Data** *(Core Requirements)*
- `GET /api/user/profile/:id` - Get user name & referral code
- `GET /api/user/donations/:id` - Get donation amounts
- `GET /api/user/rewards/:id` - Get rewards/unlockables

### 🏆 **Leaderboard** *(Bonus Feature)*
- `GET /api/leaderboard` - Get ranked users
- `GET /api/leaderboard?limit=5` - Top 5 users
- `GET /api/leaderboard?sortBy=monthlyDonations` - Monthly rankings
- `GET /api/leaderboard/user/:id` - User's position

### 📊 **Analytics** *(Bonus Feature)*
- `GET /api/analytics/summary` - Overall statistics

### 🔧 **Utility**
- `GET /api/health` - Health check
- `GET /api/users` - All users (testing)

## 📮 Testing with Postman

### **Option 1: Import Collection**
1. Import `postman_collection.json` into Postman
2. Set base URL to `http://localhost:3000`
3. Test all endpoints with pre-configured requests

### **Option 2: Manual Testing**

**Login Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "alex.smith@company.com", "password": "password123"}'
```

**Get User Data:**
```bash
curl http://localhost:3000/api/user/profile/1
curl http://localhost:3000/api/user/donations/1
```

**Leaderboard:**
```bash
curl http://localhost:3000/api/leaderboard
curl "http://localhost:3000/api/leaderboard?limit=3"
```

## 📊 Sample API Responses

### **User Profile:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alex Smith",
    "referralCode": "ALEXSMITH2025",
    "department": "Marketing"
  }
}
```

### **Donations Data:**
```json
{
  "success": true,
  "data": {
    "totalDonations": 12450,
    "monthlyDonations": 3200,
    "currency": "USD"
  }
}
```

### **Leaderboard:**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "name": "David Brown",
        "totalDonations": 21300,
        "department": "Operations"
      }
    ]
  }
}
```

## 🗄️ Mock Database

The API uses an in-memory JavaScript object as a mock database with:
- **5 sample users** with realistic data
- **6 reward tiers** with different thresholds
- **Departments, join dates, and donation amounts**

### Sample Users:
- Alex Smith (Marketing) - $12,450
- Sarah Johnson (Sales) - $18,750  
- Mike Chen (Engineering) - $9,800
- Emma Wilson (Design) - $15,600
- David Brown (Operations) - $21,300

## 🔄 Integration with Frontend

Update your frontend to use real API calls:

```javascript
// Replace mock data with real API calls
const getUserData = async (userId) => {
  const response = await fetch(`http://localhost:3000/api/user/profile/${userId}`);
  return response.json();
};

const getDonations = async (userId) => {
  const response = await fetch(`http://localhost:3000/api/user/donations/${userId}`);
  return response.json();
};
```

## 🚀 Production Deployment

### **Environment Variables:**
```bash
PORT=3000
NODE_ENV=production
```

### **Deploy Options:**
- **Heroku:** `git push heroku main`
- **Vercel:** `vercel deploy`
- **Railway:** `railway deploy`
- **DigitalOcean:** Docker container

## 📈 Next Steps

1. **Database Integration:** Replace mock data with MongoDB/PostgreSQL
2. **Authentication:** Add JWT tokens and session management
3. **Real-time Updates:** Add WebSocket for live leaderboard
4. **Data Persistence:** Store user progress and donations
5. **API Documentation:** Generate Swagger/OpenAPI docs

## 🎯 Perfect for Interviews!

This backend demonstrates:
- **RESTful API design**
- **Express.js proficiency** 
- **Error handling**
- **Clean code structure**
- **API documentation**
- **Testing readiness**

Ready to impress with a complete full-stack solution! 🌟
