import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function Energy() {
  return (
    <>
      <Helmet>
        <title>Energy - RICI</title>
        <meta name="description" content="Energy generation and sustainability" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Energy & Sustainability
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Generation mix, consumption analysis, and emissions tracking
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Energy Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain energy generation mix analysis, consumption tracking, 
            efficiency improvements, and emissions monitoring.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Energy;
