// server.js - Node.js Express Backend API
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database (In production, replace with MongoDB/PostgreSQL/etc.)
const mockDatabase = {
  users: [
    {
      id: 1,
      name: "Alex Smith",
      email: "alex.smith@company.com",
      referralCode: "ALEXSMITH2025",
      totalDonations: 12450,
      monthlyDonations: 3200,
      joinDate: "2024-01-15",
      department: "Marketing"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      referralCode: "SARAHJ2025",
      totalDonations: 18750,
      monthlyDonations: 4100,
      joinDate: "2024-01-10",
      department: "Sales"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      referralCode: "MIKECHEN2025",
      totalDonations: 9800,
      monthlyDonations: 2500,
      joinDate: "2024-02-01",
      department: "Engineering"
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.w@company.com",
      referralCode: "EMMAW2025",
      totalDonations: 15600,
      monthlyDonations: 3800,
      joinDate: "2024-01-20",
      department: "Design"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.b@company.com",
      referralCode: "DAVIDB2025",
      totalDonations: 21300,
      monthlyDonations: 5200,
      joinDate: "2024-01-05",
      department: "Operations"
    }
  ],
  
  rewards: [
    { id: 1, name: "Welcome Badge", threshold: 0, icon: "🎖️", description: "Welcome to the team!" },
    { id: 2, name: "First $1K", threshold: 1000, icon: "💵", description: "Raised your first $1,000" },
    { id: 3, name: "Team Player", threshold: 5000, icon: "🤝", description: "Contributing to team goals" },
    { id: 4, name: "High Achiever", threshold: 10000, icon: "🏅", description: "Excellent performance!" },
    { id: 5, name: "Superstar", threshold: 20000, icon: "⭐", description: "Outstanding results" },
    { id: 6, name: "Legend", threshold: 50000, icon: "👑", description: "Legendary performance" }
  ]
};

// Helper function to find user by email
const findUserByEmail = (email) => {
  return mockDatabase.users.find(user => user.email === email);
};

// Helper function to get user rewards
const getUserRewards = (userId, totalDonations) => {
  return mockDatabase.rewards.map(reward => ({
    ...reward,
    unlocked: totalDonations >= reward.threshold
  }));
};

// ===================
// AUTHENTICATION ROUTES
// ===================

// POST /api/auth/login - User login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple dummy authentication
  const user = findUserByEmail(email);
  
  if (user && password) {
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode
      },
      token: "dummy_jwt_token_" + user.id
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
});

// POST /api/auth/register - User registration
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }
  
  // Check if user already exists
  if (findUserByEmail(email)) {
    return res.status(409).json({
      success: false,
      message: "User already exists"
    });
  }
  
  // Create new user
  const newUser = {
    id: mockDatabase.users.length + 1,
    name: name,
    email: email,
    referralCode: name.toUpperCase().replace(/\s+/g, '') + '2025',
    totalDonations: 0,
    monthlyDonations: 0,
    joinDate: new Date().toISOString().split('T')[0],
    department: "New Intern"
  };
  
  mockDatabase.users.push(newUser);
  
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      referralCode: newUser.referralCode
    },
    token: "dummy_jwt_token_" + newUser.id
  });
});

// ===================
// USER DATA ROUTES
// ===================

// GET /api/user/profile/:id - Get user profile
app.get('/api/user/profile/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockDatabase.users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  
  res.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      department: user.department,
      joinDate: user.joinDate
    }
  });
});

// GET /api/user/donations/:id - Get user donation data
app.get('/api/user/donations/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockDatabase.users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  
  res.json({
    success: true,
    data: {
      userId: user.id,
      totalDonations: user.totalDonations,
      monthlyDonations: user.monthlyDonations,
      currency: "USD",
      lastUpdated: new Date().toISOString()
    }
  });
});

// GET /api/user/rewards/:id - Get user rewards
app.get('/api/user/rewards/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockDatabase.users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  
  const userRewards = getUserRewards(userId, user.totalDonations);
  
  res.json({
    success: true,
    data: {
      userId: user.id,
      totalDonations: user.totalDonations,
      rewards: userRewards,
      unlockedCount: userRewards.filter(r => r.unlocked).length,
      totalRewards: userRewards.length
    }
  });
});

// ===================
// LEADERBOARD ROUTES (BONUS)
// ===================

// GET /api/leaderboard - Get leaderboard data
app.get('/api/leaderboard', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || 'totalDonations'; // totalDonations or monthlyDonations
  
  let sortedUsers = [...mockDatabase.users];
  
  // Sort users based on criteria
  if (sortBy === 'monthlyDonations') {
    sortedUsers.sort((a, b) => b.monthlyDonations - a.monthlyDonations);
  } else {
    sortedUsers.sort((a, b) => b.totalDonations - a.totalDonations);
  }
  
  // Limit results and add ranking
  const leaderboard = sortedUsers.slice(0, limit).map((user, index) => ({
    rank: index + 1,
    id: user.id,
    name: user.name,
    department: user.department,
    totalDonations: user.totalDonations,
    monthlyDonations: user.monthlyDonations,
    referralCode: user.referralCode
  }));
  
  res.json({
    success: true,
    data: {
      leaderboard: leaderboard,
      sortBy: sortBy,
      totalUsers: mockDatabase.users.length,
      generatedAt: new Date().toISOString()
    }
  });
});

// GET /api/leaderboard/user/:id - Get user's leaderboard position
app.get('/api/leaderboard/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockDatabase.users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  
  // Calculate user's rank
  const sortedUsers = [...mockDatabase.users].sort((a, b) => b.totalDonations - a.totalDonations);
  const userRank = sortedUsers.findIndex(u => u.id === userId) + 1;
  
  res.json({
    success: true,
    data: {
      userId: user.id,
      name: user.name,
      rank: userRank,
      totalUsers: mockDatabase.users.length,
      totalDonations: user.totalDonations,
      monthlyDonations: user.monthlyDonations
    }
  });
});

// ===================
// ANALYTICS ROUTES (BONUS)
// ===================

// GET /api/analytics/summary - Get overall analytics
app.get('/api/analytics/summary', (req, res) => {
  const totalUsers = mockDatabase.users.length;
  const totalDonations = mockDatabase.users.reduce((sum, user) => sum + user.totalDonations, 0);
  const totalMonthlyDonations = mockDatabase.users.reduce((sum, user) => sum + user.monthlyDonations, 0);
  const averageDonationsPerUser = totalDonations / totalUsers;
  
  res.json({
    success: true,
    data: {
      totalUsers: totalUsers,
      totalDonationsRaised: totalDonations,
      totalMonthlyDonations: totalMonthlyDonations,
      averageDonationsPerUser: Math.round(averageDonationsPerUser),
      currency: "USD",
      topPerformer: mockDatabase.users.reduce((top, user) => 
        user.totalDonations > top.totalDonations ? user : top
      ).name
    }
  });
});

// ===================
// UTILITY ROUTES
// ===================

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: "Intern Portal API is running!",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// GET /api/users - Get all users (for testing)
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: mockDatabase.users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      totalDonations: user.totalDonations,
      department: user.department
    }))
  });
});

// ===================
// ERROR HANDLING
// ===================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    availableEndpoints: [
      "POST /api/auth/login",
      "POST /api/auth/register", 
      "GET /api/user/profile/:id",
      "GET /api/user/donations/:id",
      "GET /api/user/rewards/:id",
      "GET /api/leaderboard",
      "GET /api/leaderboard/user/:id",
      "GET /api/analytics/summary",
      "GET /api/health"
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Intern Portal API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📋 API Documentation: See comments in server.js`);
});

module.exports = app;