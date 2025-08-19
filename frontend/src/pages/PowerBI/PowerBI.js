import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Refresh,
  Fullscreen,
  Download,
  Share,
  Assessment,
  TrendingUp,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

// Mock Power BI reports data
const mockReports = [
  {
    id: 'climate-risk-report',
    name: 'Climate Risk Analysis',
    description: 'Comprehensive analysis of climate risks and their impact on infrastructure',
    category: 'Climate',
    lastUpdated: '2024-01-15T10:30:00Z',
    status: 'active',
    embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiMjQ5NzI5NzQtNzM5Ny00NzM5LWEyNzAtNzM5NzM5NzM5NzM5IiwidCI6IjI0OTcyOTc0LTczOTctNDczOS1hMjcwLTczOTczOTczOTczOSIsImMiOjh9',
  },
  {
    id: 'infrastructure-health',
    name: 'Infrastructure Health Dashboard',
    description: 'Real-time monitoring of infrastructure health and predictive maintenance',
    category: 'Infrastructure',
    lastUpdated: '2024-01-14T15:45:00Z',
    status: 'active',
    embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiMjQ5NzI5NzQtNzM5Ny00NzM5LWEyNzAtNzM5NzM5NzM5NzM5IiwidCI6IjI0OTcyOTc0LTczOTctNDczOS1hMjcwLTczOTczOTczOTczOSIsImMiOjh9',
  },
  {
    id: 'operations-efficiency',
    name: 'Operations Efficiency Report',
    description: 'Analysis of operational efficiency and workforce productivity',
    category: 'Operations',
    lastUpdated: '2024-01-13T09:20:00Z',
    status: 'active',
    embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiMjQ5NzI5NzQtNzM5Ny00NzM5LWEyNzAtNzM5NzM5NzM5NzM5IiwidCI6IjI0OTcyOTc0LTczOTctNDczOS1hMjcwLTczOTczOTczOTczOSIsImMiOjh9',
  },
  {
    id: 'financial-analytics',
    name: 'Financial Analytics Dashboard',
    description: 'Financial performance, budget tracking, and investment analysis',
    category: 'Finance',
    lastUpdated: '2024-01-12T14:15:00Z',
    status: 'active',
    embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiMjQ5NzI5NzQtNzM5Ny00NzM5LWEyNzAtNzM5NzM5NzM5NzM5IiwidCI6IjI0OTcyOTc0LTczOTctNDczOS1hMjcwLTczOTczOTczOTczOSIsImMiOjh9',
  },
];

const categories = ['All', 'Climate', 'Infrastructure', 'Operations', 'Finance', 'Energy', 'Safety'];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`powerbi-tabpanel-${index}`}
      aria-labelledby={`powerbi-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function PowerBI() {
  const [selectedReport, setSelectedReport] = useState(mockReports[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleReportSelect = (report) => {
    setSelectedReport(report);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const filteredReports = selectedCategory === 'All' 
    ? mockReports 
    : mockReports.filter(report => report.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Power BI Reports - RICI</title>
        <meta name="description" content="Power BI integration for advanced analytics and reporting" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              Power BI Analytics
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Advanced analytics and reporting for comprehensive infrastructure insights
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Refresh reports">
              <IconButton onClick={handleRefresh} disabled={loading}>
                <Refresh />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Fullscreen">
              <IconButton onClick={handleFullscreen}>
                <Fullscreen />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Category Filter */}
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="Power BI tabs">
            <Tab label="Reports" icon={<Assessment />} iconPosition="start" />
            <Tab label="Analytics" icon={<TrendingUp />} iconPosition="start" />
            <Tab label="Insights" icon={<CheckCircle />} iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* Report List */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Available Reports
                  </Typography>
                  
                  <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
                    {filteredReports.map((report) => (
                      <Card
                        key={report.id}
                        sx={{
                          mb: 2,
                          cursor: 'pointer',
                          border: selectedReport.id === report.id ? 2 : 1,
                          borderColor: selectedReport.id === report.id ? 'primary.main' : 'divider',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'action.hover',
                          },
                        }}
                        onClick={() => handleReportSelect(report)}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {report.name}
                            </Typography>
                            <Chip 
                              label={report.status} 
                              size="small" 
                              color={report.status === 'active' ? 'success' : 'warning'}
                            />
                          </Box>
                          
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            {report.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip label={report.category} size="small" variant="outlined" />
                            <Typography variant="caption" color="textSecondary">
                              {new Date(report.lastUpdated).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Report Viewer */}
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {selectedReport.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Download Report">
                        <IconButton size="small">
                          <Download />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Share Report">
                        <IconButton size="small">
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                    {selectedReport.description}
                  </Typography>

                  {/* Power BI Embed Placeholder */}
                  <Box
                    sx={{
                      width: '100%',
                      height: fullscreen ? '80vh' : 500,
                      backgroundColor: '#f5f5f5',
                      border: '2px dashed #ccc',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <Assessment sx={{ fontSize: 64, color: 'primary.main' }} />
                    <Typography variant="h6" color="textSecondary">
                      Power BI Report Viewer
                    </Typography>
                    <Typography variant="body2" color="textSecondary" textAlign="center">
                      This would embed the Power BI report: {selectedReport.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Embed URL: {selectedReport.embedUrl}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip label={`Category: ${selectedReport.category}`} size="small" />
                    <Chip label={`Status: ${selectedReport.status}`} size="small" color="success" />
                    <Chip 
                      label={`Last Updated: ${new Date(selectedReport.lastUpdated).toLocaleString()}`} 
                      size="small" 
                      variant="outlined" 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Advanced analytics features are being developed. This will include custom DAX measures, 
            real-time data connections, and predictive analytics capabilities.
          </Alert>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Key Performance Indicators
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Custom DAX measures and KPIs for infrastructure monitoring
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Predictive Analytics
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Machine learning models for asset failure prediction
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Alert severity="success" sx={{ mb: 3 }}>
            AI-powered insights and recommendations based on your data patterns and trends.
          </Alert>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Smart Insights
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Automated insights and recommendations will appear here based on your data analysis.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
}

export default PowerBI;
