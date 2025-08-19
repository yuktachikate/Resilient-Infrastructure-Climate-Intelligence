import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function Infrastructure() {
  return (
    <>
      <Helmet>
        <title>Infrastructure - RICI</title>
        <meta name="description" content="Infrastructure health and asset management" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Infrastructure Health
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Asset registry, predictive maintenance, and infrastructure monitoring
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Infrastructure Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain infrastructure health monitoring, asset registry, 
            predictive maintenance schedules, and capacity & demand analysis.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Infrastructure;
