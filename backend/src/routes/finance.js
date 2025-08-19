const express = require('express');
const router = express.Router();

// Mock finance data
const mockFinanceData = {
  budget: {
    total: 5000000,
    spent: 3200000,
    remaining: 1800000,
    utilization: 64
  },
  projects: [
    { id: 1, name: 'Infrastructure Upgrade', budget: 1000000, spent: 750000, status: 'in-progress' },
    { id: 2, name: 'Renewable Energy', budget: 500000, spent: 300000, status: 'planning' },
    { id: 3, name: 'Safety Equipment', budget: 200000, spent: 150000, status: 'completed' },
  ]
};

router.get('/budget', (req, res) => {
  res.json({
    success: true,
    data: mockFinanceData.budget
  });
});

router.get('/projects', (req, res) => {
  res.json({
    success: true,
    data: mockFinanceData.projects
  });
});

module.exports = router;
