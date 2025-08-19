import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function Operations() {
  return (
    <>
      <Helmet>
        <title>Operations - RICI</title>
        <meta name="description" content="Operations and workforce efficiency" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Operations & Workforce
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Crew deployment, efficiency metrics, and safety monitoring
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Operations Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain crew deployment tracking, work-order management, 
            efficiency metrics, and safety monitoring systems.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Operations;
