import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #0F172A, #1E293B)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 4,
              backgroundColor: 'rgba(255,255,255,0.1)', // Glass effect
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                color: '#FACC15',
                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              Shopping Mart
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                color: '#fff',
              }}
            >
              Experience the Future of Shopping
            </Typography>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link href="/cms/list" passHref>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 4,
                    backgroundColor: '#FACC15',
                    color: '#000',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#FFD700' },
                  }}
                >
                  Shop Now
                </Button>
              </Link>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
