import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { loginMutation } from '@/customHooks/query/auth.query.hooks';
import { loginProps } from '@/typescript/auth.interface';
import {
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<loginProps>();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { mutate, isPending } = loginMutation();

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onSubmit = (formData: FieldValues) => {
    const { email, password } = formData as { email: string; password: string };
    const payload = { email, password };
    mutate(payload, {});
    reset();
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, rgba(30,45,70,0.95), rgba(40,55,80,0.95))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: '#fff',
            width: { xs: '90%', sm: 400 },
            p: 3,
            borderRadius: 2,
            boxShadow: '0px 6px 16px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                fullWidth
                label="Email"
                variant="filled"
                margin="normal"
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="filled"
                margin="normal"
                type={passwordVisibility ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                InputProps={{
                  style: { color: '#fff' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handlePasswordVisibility}
                        edge="end"
                        sx={{ color: '#fff' }}
                      >
                        {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ style: { color: '#fff' } }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isPending}
                sx={{ mt: 2 }}
              >
                {isPending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <CircularProgress size={24} sx={{ color: '#fff' }} />
                  </motion.div>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Don't have an account?{' '}
                <Link href="/auth/register" passHref>
                  <Typography
                    component="span"
                    sx={{
                      color: '#FACC15',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Register
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
