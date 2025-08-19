const express = require('express');
const router = express.Router();

// Mock dashboard data
const mockDashboardData = {
  overview: {
    totalAssets: 15420,
    assetsAtRisk: 342,
    activeIncidents: 8,
    crewDeployed: 24,
    systemHealth: 94.2,
    weatherAlerts: 3,
    energyDemand: 87.5,
    budgetUtilization: 68.3
  },
  trends: [
    { name: 'Jan', incidents: 12, assets: 120, demand: 85 },
    { name: 'Feb', incidents: 8, assets: 95, demand: 78 },
    { name: 'Mar', incidents: 15, assets: 110, demand: 82 },
    { name: 'Apr', incidents: 6, assets: 88, demand: 79 },
    { name: 'May', incidents: 11, assets: 102, demand: 84 },
    { name: 'Jun', incidents: 8, assets: 95, demand: 87 },
  ],
  alerts: [
    { id: 1, type: 'warning', message: 'High fire risk detected in Zone A', time: '2 min ago' },
    { id: 2, type: 'error', message: 'Substation #12 experiencing voltage fluctuations', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Scheduled maintenance completed for Line 7B', time: '1 hour ago' },
    { id: 4, type: 'success', message: 'Weather alert cleared for Northern region', time: '2 hours ago' },
  ]
};

router.get('/overview', (req, res) => {
  res.json({
    success: true,
    data: mockDashboardData.overview
  });
});

router.get('/trends', (req, res) => {
  res.json({
    success: true,
    data: mockDashboardData.trends
  });
});

router.get('/alerts', (req, res) => {
  res.json({
    success: true,
    data: mockDashboardData.alerts
  });
});

module.exports = router;
