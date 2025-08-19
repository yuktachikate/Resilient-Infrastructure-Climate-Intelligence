const express = require('express');
const router = express.Router();

// Mock climate data
const mockClimateData = {
  fireRisk: [
    { zone: 'Zone A', risk: 'high', coordinates: [37.7749, -122.4194] },
    { zone: 'Zone B', risk: 'medium', coordinates: [37.7849, -122.4094] },
    { zone: 'Zone C', risk: 'low', coordinates: [37.7649, -122.4294] },
  ],
  weather: {
    temperature: 72,
    humidity: 65,
    windSpeed: 12,
    conditions: 'Partly Cloudy'
  },
  alerts: [
    { type: 'fire', severity: 'high', message: 'High fire risk in Zone A' },
    { type: 'flood', severity: 'medium', message: 'Flood warning for coastal areas' },
  ]
};

router.get('/fire-risk', (req, res) => {
  res.json({
    success: true,
    data: mockClimateData.fireRisk
  });
});

router.get('/weather', (req, res) => {
  res.json({
    success: true,
    data: mockClimateData.weather
  });
});

router.get('/alerts', (req, res) => {
  res.json({
    success: true,
    data: mockClimateData.alerts
  });
});

module.exports = router;
