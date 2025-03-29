import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { verify_emailMutation } from '@/customHooks/query/auth.query.hooks';
import { otpProps } from '@/typescript/auth.interface';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<otpProps>();

  const { mutate, isPending } = verify_emailMutation();

  const onSubmit = (formData: FieldValues) => {
    const { email, otp } = formData as { email: string, otp: number };
    const payload = { email, otp };
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
              Verify Email
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
                label="OTP"
                variant="filled"
                margin="normal"
                {...register('otp', { required: 'OTP is required' })}
                error={!!errors.otp}
                helperText={errors.otp ? errors.otp.message : ''}
                InputProps={{ style: { color: '#fff' } }}
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
                  'Verify'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default VerifyEmail;
