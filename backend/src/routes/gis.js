const express = require('express');
const router = express.Router();

// Mock GIS data
const mockGISData = {
  layers: [
    { id: 'infrastructure', name: 'Infrastructure Assets', type: 'vector', visible: true },
    { id: 'fire-risk', name: 'Fire Risk Zones', type: 'raster', visible: true },
    { id: 'flood-zones', name: 'Flood Zones', type: 'vector', visible: false },
    { id: 'demographics', name: 'Demographics', type: 'vector', visible: false },
  ],
  features: [
    { id: 1, type: 'Point', coordinates: [37.7749, -122.4194], properties: { name: 'Asset A', type: 'substation' } },
    { id: 2, type: 'LineString', coordinates: [[37.7749, -122.4194], [37.7849, -122.4094]], properties: { name: 'Power Line B', type: 'transmission' } },
    { id: 3, type: 'Polygon', coordinates: [[[37.7649, -122.4294], [37.7749, -122.4294], [37.7749, -122.4194], [37.7649, -122.4194], [37.7649, -122.4294]]], properties: { name: 'Risk Zone C', type: 'fire-risk' } },
  ]
};

router.get('/layers', (req, res) => {
  res.json({
    success: true,
    data: mockGISData.layers
  });
});

router.get('/features', (req, res) => {
  res.json({
    success: true,
    data: mockGISData.features
  });
});

module.exports = router;
