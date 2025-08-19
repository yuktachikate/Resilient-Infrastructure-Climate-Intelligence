import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function DataQuality() {
  return (
    <>
      <Helmet>
        <title>Data Quality - RICI</title>
        <meta name="description" content="Data quality and communication monitoring" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Data Quality & Communication
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Data completeness, communication monitoring, and quality assurance
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Data Quality Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain data completeness analysis, communication monitoring, 
            quality assurance metrics, and system performance indicators.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default DataQuality;
