import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { createProductMutation } from '@/customHooks/query/cms.query.hooks';
import { createProps } from '@/typescript/cms.interface';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  CircularProgress 
} from '@mui/material';
import { motion } from 'framer-motion';

const CreateProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<createProps>();
  const { mutate, isPending } = createProductMutation();

  const onSubmit = (formData: FieldValues) => {
    const { name, price, description, category } = formData as { name: string; price: number; description: string; category: string };
    const formdata = { name, price, description, category };
    mutate(formdata, {});
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
            maxWidth: 500,
            width: { xs: '90%', sm: 500 },
            p: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Increased transparency
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.8)', // Enhanced shadow effect
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Create Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                fullWidth
                label="Product Name"
                variant="filled"
                margin="normal"
                {...register('name', { required: 'Product name is required' })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
              />
              <TextField
                fullWidth
                label="Price"
                variant="filled"
                margin="normal"
                {...register('price', { required: 'Price is required' })}
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ''}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
              />
              <TextField
                fullWidth
                label="Description"
                variant="filled"
                margin="normal"
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
                multiline
                rows={4}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
              />
              <TextField
                fullWidth
                label="Category"
                variant="filled"
                margin="normal"
                {...register('category', { required: 'Category is required' })}
                error={!!errors.category}
                helperText={errors.category ? errors.category.message : ''}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#fff' } }}
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isPending}
                >
                  {isPending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                      <CircularProgress size={24} sx={{ color: '#fff' }} />
                    </motion.div>
                  ) : (
                    'Create Product'
                  )}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default CreateProduct;
