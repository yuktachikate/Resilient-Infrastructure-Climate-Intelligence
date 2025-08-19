import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet-async';

function PublicSafety() {
  return (
    <>
      <Helmet>
        <title>Public Safety - RICI</title>
        <meta name="description" content="Public safety and community outreach" />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Public Safety & Community
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Incident response, emergency management, and community outreach
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Public Safety Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This page will contain incident response tracking, emergency management, 
            community outreach programs, and public safety communications.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default PublicSafety;
