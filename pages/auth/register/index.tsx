import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { registerMutation } from '@/customHooks/query/auth.query.hooks';
import { registerProps } from '@/typescript/auth.interface';
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

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<registerProps>();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { mutate, isPending } = registerMutation();

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onSubmit = (formData: FieldValues) => {
    const { name, email, password } = formData as { name: string; email: string; password: string };
    const payload = { name, email, password };
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
        p: { xs: 2, sm: 3 }
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
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: '0px 6px 16px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                fullWidth
                label="Name"
                variant="filled"
                margin="normal"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
              />
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
                sx={{ mt: 2, py: 1 }}
              >
                {isPending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <CircularProgress size={24} sx={{ color: '#fff' }} />
                  </motion.div>
                ) : (
                  'Register'
                )}
              </Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Already have an account?{' '}
                <Link href="/auth/login" passHref>
                  <Typography
                    component="span"
                    sx={{
                      color: '#FACC15',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Login
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

export default Register;
