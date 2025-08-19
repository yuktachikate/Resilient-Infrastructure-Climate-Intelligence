const express = require('express');
const router = express.Router();

// Mock authentication routes for demo purposes
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication logic
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

router.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'Registration successful'
  });
});

router.get('/profile', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 1,
      name: 'Admin User',
      email: 'admin@rici.com',
      role: 'admin'
    }
  });
});

module.exports = router;
