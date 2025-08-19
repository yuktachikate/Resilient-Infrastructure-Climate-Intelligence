const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'RICI Backend Server is running!'
  });
});

// Mock API routes
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@rici.com' && password === 'password123') {
    res.json({
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@rici.com',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
});

app.get('/api/v1/dashboard/overview', (req, res) => {
  res.json({
    success: true,
    data: {
      totalAssets: 15420,
      assetsAtRisk: 342,
      activeIncidents: 8,
      crewDeployed: 24,
      systemHealth: 94.2,
      weatherAlerts: 3,
      energyDemand: 87.5,
      budgetUtilization: 68.3
    }
  });
});

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 RICI Backend Server running on port ${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Endpoint: http://localhost:${PORT}/api/v1/auth/login`);
});
