const express = require('express');
const router = express.Router();

// Mock Power BI data
const mockPowerBIData = {
  reports: [
    { id: 'climate-risk', name: 'Climate Risk Analysis', status: 'active', lastUpdated: '2024-01-15T10:30:00Z' },
    { id: 'infrastructure-health', name: 'Infrastructure Health Dashboard', status: 'active', lastUpdated: '2024-01-14T15:45:00Z' },
    { id: 'operations-efficiency', name: 'Operations Efficiency Report', status: 'active', lastUpdated: '2024-01-13T09:20:00Z' },
    { id: 'financial-analytics', name: 'Financial Analytics Dashboard', status: 'active', lastUpdated: '2024-01-12T14:15:00Z' },
  ],
  datasets: [
    { id: 'dataset-1', name: 'Infrastructure Data', refreshStatus: 'success', lastRefresh: '2024-01-15T08:00:00Z' },
    { id: 'dataset-2', name: 'Climate Data', refreshStatus: 'success', lastRefresh: '2024-01-15T08:00:00Z' },
    { id: 'dataset-3', name: 'Operations Data', refreshStatus: 'pending', lastRefresh: '2024-01-14T08:00:00Z' },
  ]
};

router.get('/reports', (req, res) => {
  res.json({
    success: true,
    data: mockPowerBIData.reports
  });
});

router.get('/datasets', (req, res) => {
  res.json({
    success: true,
    data: mockPowerBIData.datasets
  });
});

router.get('/embed-url/:reportId', (req, res) => {
  const report = mockPowerBIData.reports.find(r => r.id === req.params.reportId);
  if (report) {
    res.json({
      success: true,
      data: {
        embedUrl: `https://app.powerbi.com/view?r=eyJrIjoi${report.id}`,
        reportId: report.id,
        reportName: report.name
      }
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Report not found'
    });
  }
});

module.exports = router;
