import React from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useCategoryProducts } from './useCategoryProducts';

const CategoryProductsCarousel = ({ categoryId }) => {
  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useCategoryProducts(categoryId);

  // Extract the products array from the response data
  const products = responseData?.data || [];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', py: 2 }}>
        {error.message}
      </Typography>
    );
  }

  if (!products.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
        No similar products found in this category
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Similar Products
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={product.images}
                alt={product.name}
                sx={{ height: 140, objectFit: 'contain', p: 1 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="subtitle1" component="h3">
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" color="primary">
                    {product.final_price}
                  </Typography>
                  {product.has_discount && (
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      {product.original_price}
                    </Typography>
                  )}
                  {product.discount && (
                    <Typography variant="body2" color="error">
                      {product.discount}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {product.posted}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" fullWidth>
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryProductsCarousel;
