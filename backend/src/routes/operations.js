const express = require('express');
const router = express.Router();

// Mock operations data
const mockOperationsData = {
  crews: [
    { id: 1, name: 'Crew Alpha', location: { lat: 37.7749, lng: -122.4194 }, status: 'active', tasks: 3 },
    { id: 2, name: 'Crew Beta', location: { lat: 37.7849, lng: -122.4094 }, status: 'maintenance', tasks: 1 },
    { id: 3, name: 'Crew Gamma', location: { lat: 37.7649, lng: -122.4294 }, status: 'standby', tasks: 0 },
  ],
  workOrders: [
    { id: 1, title: 'Power Line Repair', priority: 'high', status: 'in-progress', crew: 'Crew Alpha' },
    { id: 2, title: 'Substation Maintenance', priority: 'medium', status: 'scheduled', crew: 'Crew Beta' },
    { id: 3, title: 'Pole Inspection', priority: 'low', status: 'pending', crew: null },
  ]
};

router.get('/crews', (req, res) => {
  res.json({
    success: true,
    data: mockOperationsData.crews
  });
});

router.get('/work-orders', (req, res) => {
  res.json({
    success: true,
    data: mockOperationsData.workOrders
  });
});

module.exports = router;
