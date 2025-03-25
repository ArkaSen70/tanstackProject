import React from 'react';
import { profileQuery } from '@/customHooks/query/auth.query.hooks';
import { motion } from 'framer-motion';
import { Card, CardContent, Avatar, Typography, CircularProgress, Box } from '@mui/material';

const Profile = () => {
  const { data: user, isPending, isError } = profileQuery();

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Typography variant="h6" color="error" align="center">Error loading profile.</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'url(/path-to-your-background.jpg) no-repeat center center fixed',
        backgroundSize: 'cover',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            maxWidth: 400,
            mx: 'auto',
            mt: 4,
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Avatar
              alt="Profile Picture"
              src="/profile.jpeg" // Ensure you have this image in your public folder.
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h6" sx={{ color: '#fff' }}>
              {user?.data.name || 'No Name'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ddd' }}>
              {user?.data.email || 'No Email'}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Profile;
