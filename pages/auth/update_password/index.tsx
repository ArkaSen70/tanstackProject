import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updatePasswordProps } from '@/typescript/auth.interface';
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
import { updatePasswordMutation } from '@/customHooks/query/auth.query.hooks';
import { motion } from 'framer-motion';

const UpdatePassword = () => {
  const { register, handleSubmit, reset, setValue } = useForm<updatePasswordProps>({
    defaultValues: { user_id: "", password: "" }
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { mutate, isPending } = updatePasswordMutation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        try {
          const userObj = JSON.parse(storedUser);
          setValue("user_id", userObj.id || "");
        } catch (error) {
          console.error("Failed to parse user from localStorage", error);
        }
      }
    }
  }, [setValue]);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onSubmit = (formData: updatePasswordProps) => {
    const { user_id, password } = formData;
    const payload = { user_id, password };
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
        p: 2,
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
              Update Password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                fullWidth
                label="User ID"
                variant="filled"
                margin="normal"
                {...register('user_id', { required: 'User ID is required' })}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
                disabled
              />
              <TextField
                fullWidth
                label="New Password"
                variant="filled"
                margin="normal"
                type={passwordVisibility ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
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
                  )
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
                  'Update Password'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default UpdatePassword;
