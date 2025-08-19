const express = require('express');
const router = express.Router();

// Mock assets data
const mockAssets = [
  { id: 1, name: 'Power Line A-1', type: 'Power Line', status: 'operational', risk: 'low', location: { lat: 37.7749, lng: -122.4194 } },
  { id: 2, name: 'Substation B-2', type: 'Substation', status: 'maintenance', risk: 'medium', location: { lat: 37.7849, lng: -122.4094 } },
  { id: 3, name: 'Pole C-3', type: 'Pole', status: 'operational', risk: 'low', location: { lat: 37.7649, lng: -122.4294 } },
];

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockAssets
  });
});

router.get('/:id', (req, res) => {
  const asset = mockAssets.find(a => a.id === parseInt(req.params.id));
  if (asset) {
    res.json({
      success: true,
      data: asset
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Asset not found'
    });
  }
});

module.exports = router;
