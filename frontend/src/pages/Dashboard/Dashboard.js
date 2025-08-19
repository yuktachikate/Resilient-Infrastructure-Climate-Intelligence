import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Error,
  Info,
  Refresh,
  Visibility,
} from '@mui/icons-material';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Helmet } from 'react-helmet-async';

// Mock data for demonstration
const mockData = {
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
  assetTypes: [
    { name: 'Power Lines', value: 45, color: '#1976d2' },
    { name: 'Substations', value: 25, color: '#dc004e' },
    { name: 'Poles', value: 20, color: '#ed6c02' },
    { name: 'Water Pipes', value: 10, color: '#2e7d32' },
  ],
  alerts: [
    { id: 1, type: 'warning', message: 'High fire risk detected in Zone A', time: '2 min ago' },
    { id: 2, type: 'error', message: 'Substation #12 experiencing voltage fluctuations', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Scheduled maintenance completed for Line 7B', time: '1 hour ago' },
    { id: 4, type: 'success', message: 'Weather alert cleared for Northern region', time: '2 hours ago' },
  ]
};

const MetricCard = ({ title, value, change, icon, color, subtitle }) => (
  <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 700, color }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            borderRadius: 2,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
      
      {change && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {change > 0 ? (
            <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
          ) : (
            <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
          )}
          <Typography
            variant="body2"
            color={change > 0 ? 'success.main' : 'error.main'}
            sx={{ fontWeight: 500 }}
          >
            {Math.abs(change)}% from last month
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const AlertCard = ({ alert }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <Warning sx={{ color: 'warning.main' }} />;
      case 'error': return <Error sx={{ color: 'error.main' }} />;
      case 'success': return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'info': return <Info sx={{ color: 'info.main' }} />;
      default: return <Info sx={{ color: 'info.main' }} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
      {getAlertIcon(alert.type)}
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {alert.message}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {alert.time}
        </Typography>
      </Box>
    </Box>
  );
};

function Dashboard() {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - RICI</title>
        <meta name="description" content="RICI Dashboard - Overview of infrastructure health, climate risks, and operational metrics" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              Dashboard Overview
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Real-time monitoring of infrastructure health, climate risks, and operational efficiency
            </Typography>
          </Box>
          <Tooltip title="Refresh data">
            <IconButton onClick={handleRefresh} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Assets"
              value={data.overview.totalAssets.toLocaleString()}
              change={2.3}
              icon={<Visibility sx={{ color: '#1976d2' }} />}
              color="#1976d2"
              subtitle="Infrastructure components"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Assets at Risk"
              value={data.overview.assetsAtRisk}
              change={-5.2}
              icon={<Warning sx={{ color: '#ed6c02' }} />}
              color="#ed6c02"
              subtitle="Requiring attention"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Active Incidents"
              value={data.overview.activeIncidents}
              change={-12.5}
              icon={<Error sx={{ color: '#d32f2f' }} />}
              color="#d32f2f"
              subtitle="Currently being addressed"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Crew Deployed"
              value={data.overview.crewDeployed}
              change={8.7}
              icon={<CheckCircle sx={{ color: '#2e7d32' }} />}
              color="#2e7d32"
              subtitle="Field operations"
            />
          </Grid>
        </Grid>

        {/* System Health and Alerts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  System Performance Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="incidents" stroke="#d32f2f" strokeWidth={2} />
                    <Line type="monotone" dataKey="assets" stroke="#1976d2" strokeWidth={2} />
                    <Line type="monotone" dataKey="demand" stroke="#2e7d32" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Asset Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.assetTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.assetTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Progress Indicators and Alerts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  System Health Indicators
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">System Health</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {data.overview.systemHealth}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={data.overview.systemHealth} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Energy Demand</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {data.overview.energyDemand}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={data.overview.energyDemand} 
                    color="warning"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Budget Utilization</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {data.overview.budgetUtilization}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={data.overview.budgetUtilization} 
                    color="info"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Recent Alerts
                  </Typography>
                  <Chip label={`${data.alerts.length} new`} size="small" color="primary" />
                </Box>
                
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {data.alerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
