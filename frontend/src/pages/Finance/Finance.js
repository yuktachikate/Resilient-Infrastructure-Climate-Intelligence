import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function Finance() {
  return (
    <>
      <Helmet>
        <title>Finance - RICI</title>
        <meta name="description" content="Financial analytics and investment tracking" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Finance & Investment
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Capex & Opex tracking, ROI analysis, and funding sources
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Finance Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain financial analytics, budget tracking, ROI analysis, 
            and monitoring of funding sources for resilience projects.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Finance;
