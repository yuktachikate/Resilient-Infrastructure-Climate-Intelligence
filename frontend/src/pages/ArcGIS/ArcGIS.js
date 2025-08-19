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
  Slider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Map,
  Layers,
  MyLocation,
  ZoomIn,
  ZoomOut,
  Fullscreen,
  Refresh,
  FilterList,
  Info,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

// Mock ArcGIS layers data
const mockLayers = [
  {
    id: 'infrastructure',
    name: 'Infrastructure Assets',
    description: 'Power lines, substations, poles, and water infrastructure',
    category: 'Assets',
    visible: true,
    opacity: 1,
    color: '#1976d2',
    features: 15420,
  },
  {
    id: 'fire-risk',
    name: 'Fire Risk Zones',
    description: 'High-fire-threat districts and historical fire perimeters',
    category: 'Climate',
    visible: true,
    opacity: 0.8,
    color: '#d32f2f',
    features: 45,
  },
  {
    id: 'flood-zones',
    name: 'Flood Zones',
    description: 'Floodplain maps and flood risk areas',
    category: 'Climate',
    visible: false,
    opacity: 0.7,
    color: '#0288d1',
    features: 23,
  },
  {
    id: 'demographics',
    name: 'Demographics',
    description: 'Population density and vulnerable communities',
    category: 'Social',
    visible: false,
    opacity: 0.6,
    color: '#7b1fa2',
    features: 156,
  },
  {
    id: 'weather-stations',
    name: 'Weather Stations',
    description: 'Real-time weather monitoring stations',
    category: 'Climate',
    visible: true,
    opacity: 1,
    color: '#388e3c',
    features: 89,
  },
  {
    id: 'incidents',
    name: 'Active Incidents',
    description: 'Current incidents and emergency responses',
    category: 'Operations',
    visible: true,
    opacity: 1,
    color: '#ed6c02',
    features: 8,
  },
];

const categories = ['All', 'Assets', 'Climate', 'Social', 'Operations'];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`arcgis-tabpanel-${index}`}
      aria-labelledby={`arcgis-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function ArcGIS() {
  const [layers, setLayers] = useState(mockLayers);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLayerToggle = (layerId) => {
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  const handleOpacityChange = (layerId, value) => {
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === layerId ? { ...layer, opacity: value } : layer
      )
    );
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

  const filteredLayers = selectedCategory === 'All' 
    ? layers 
    : layers.filter(layer => layer.category === selectedCategory);

  const visibleLayers = layers.filter(layer => layer.visible);

  return (
    <>
      <Helmet>
        <title>ArcGIS Maps - RICI</title>
        <meta name="description" content="Interactive GIS maps and spatial analytics for infrastructure monitoring" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              ArcGIS Spatial Analytics
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Interactive GIS maps and spatial analysis for infrastructure and climate monitoring
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Refresh data">
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
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="ArcGIS tabs">
            <Tab label="Map View" icon={<Map />} iconPosition="start" />
            <Tab label="Layers" icon={<Layers />} iconPosition="start" />
            <Tab label="Analysis" icon={<Info />} iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* Layer Control Panel */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Layer Controls
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Visible Layers: {visibleLayers.length} of {layers.length}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
                    {filteredLayers.map((layer) => (
                      <Card
                        key={layer.id}
                        sx={{
                          mb: 2,
                          border: layer.visible ? 2 : 1,
                          borderColor: layer.visible ? layer.color : 'divider',
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {layer.name}
                            </Typography>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={layer.visible}
                                  onChange={() => handleLayerToggle(layer.id)}
                                  size="small"
                                />
                              }
                              label=""
                            />
                          </Box>
                          
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                            {layer.description}
                          </Typography>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom>
                              Opacity
                            </Typography>
                            <Slider
                              value={layer.opacity}
                              onChange={(event, value) => handleOpacityChange(layer.id, value)}
                              min={0}
                              max={1}
                              step={0.1}
                              marks
                              valueLabelDisplay="auto"
                              disabled={!layer.visible}
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip 
                              label={layer.category} 
                              size="small" 
                              variant="outlined"
                              sx={{ borderColor: layer.color, color: layer.color }}
                            />
                            <Typography variant="caption" color="textSecondary">
                              {layer.features} features
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Map Viewer */}
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Interactive Map
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Zoom In">
                        <IconButton size="small">
                          <ZoomIn />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Zoom Out">
                        <IconButton size="small">
                          <ZoomOut />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="My Location">
                        <IconButton size="small">
                          <MyLocation />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  {/* ArcGIS Map Placeholder */}
                  <Box
                    sx={{
                      width: '100%',
                      height: fullscreen ? '80vh' : 600,
                      backgroundColor: '#e8f4fd',
                      border: '2px dashed #1976d2',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 2,
                      position: 'relative',
                    }}
                  >
                    <Map sx={{ fontSize: 64, color: 'primary.main' }} />
                    <Typography variant="h6" color="textSecondary">
                      ArcGIS Map Viewer
                    </Typography>
                    <Typography variant="body2" color="textSecondary" textAlign="center">
                      Interactive GIS map with {visibleLayers.length} active layers
                    </Typography>
                    
                    {/* Layer Indicators */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {visibleLayers.map((layer) => (
                        <Chip
                          key={layer.id}
                          label={layer.name}
                          size="small"
                          sx={{
                            backgroundColor: `${layer.color}20`,
                            color: layer.color,
                            border: `1px solid ${layer.color}`,
                          }}
                        />
                      ))}
                    </Box>
                    
                    <Typography variant="caption" color="textSecondary">
                      Center: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip label={`${visibleLayers.length} layers active`} size="small" color="primary" />
                    <Chip label="Real-time data" size="small" color="success" />
                    <Chip label="Spatial analysis enabled" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Layer management and configuration options. Customize layer styles, filters, and symbology.
          </Alert>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Layer Styling
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Customize colors, symbols, and visual properties for each layer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Spatial Filters
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Apply spatial and attribute filters to focus on specific areas or features
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Advanced spatial analysis tools for proximity analysis, overlay operations, and spatial statistics.
          </Alert>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Proximity Analysis
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Calculate distances, buffers, and nearest neighbor analysis
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Overlay Operations
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Intersect, union, and difference operations between layers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Spatial Statistics
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Hot spot analysis, spatial autocorrelation, and clustering
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

export default ArcGIS;
