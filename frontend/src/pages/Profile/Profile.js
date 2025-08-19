import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function Profile() {
  return (
    <>
      <Helmet>
        <title>Profile - RICI</title>
        <meta name="description" content="User profile and settings" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          User Profile
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your account settings and preferences
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Profile Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain user profile management, account settings, 
            and preference configuration.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Profile;
