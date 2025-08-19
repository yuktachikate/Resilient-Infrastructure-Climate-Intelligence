import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function Settings() {
  return (
    <>
      <Helmet>
        <title>Settings - RICI</title>
        <meta name="description" content="Application settings and configuration" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Configure application settings and preferences
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Settings Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain application settings, notification preferences, 
            display options, and system configuration.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Settings;
