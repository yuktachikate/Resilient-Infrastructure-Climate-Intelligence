import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function ClimateRisk() {
  return (
    <>
      <Helmet>
        <title>Climate & Risk - RICI</title>
        <meta name="description" content="Climate risk analysis and hazard monitoring" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Climate & Hazard Risk
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Wildfire monitoring, flood zones, weather alerts, and vulnerability assessment
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Climate Risk Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain wildfire risk monitoring, flood zone mapping, 
            weather alerts, and vulnerability assessment tools.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ClimateRisk;
