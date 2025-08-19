import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function LandStewardship() {
  return (
    <>
      <Helmet>
        <title>Land Stewardship - RICI</title>
        <meta name="description" content="Land use and environmental stewardship" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Land & Environmental Stewardship
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Land-use mapping, conservation areas, and water resources
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Land Stewardship Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain land-use zoning overlays, protected areas mapping, 
            biodiversity hotspots, and water resource management.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default LandStewardship;
