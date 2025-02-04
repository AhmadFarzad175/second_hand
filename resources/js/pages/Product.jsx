import React from 'react';
import { Box, Typography, Button, IconButton, Stack, Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const images = [
    '/public/img-1.jpg',
    '/public/img-2.jpg',
    '/public/img-3.jpg',
    '/public/img-4.jpg',
    '/public/img-5.jpg',
    '/public/img-6.jpg',
];

const ProductPage = () => {
    return (
        <Box sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                sx={{
                    alignItems: { xs: 'center', md: 'flex-start' },
                    textAlign: { xs: 'center', md: 'left' },
                }}
            >
                {/* Carousel Section */}
                <Box sx={{ flex: 1, width: '100%', maxWidth: { xs: '100%', md: '50%' } }}>
                    <Swiper
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    component="img"
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    sx={{
                                        width: '100%',
                                        height: { xs: 'auto', md: 300 },
                                        borderRadius: 2,
                                        objectFit: 'cover',
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>

                {/* Product Details Section */}
                <Box
                    sx={{
                        flex: 1,
                        padding: 2,
                        width: '100%',
                        maxWidth: { xs: '100%', md: '50%' },
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                            Product Name
                        </Typography>
                        <IconButton>
                            <FavoriteBorderIcon color="primary" />
                        </IconButton>
                    </Box>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 1, fontSize: { xs: '0.9rem', md: '1rem' } }}
                    >
                        Product details and description go here. Highlight the key features and specs of the product.
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                    >
                        $299.99
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                    >
                        Location: City, State
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                    >
                        10 km away
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, fontSize: { xs: '0.875rem', md: '1rem' }, padding: { xs: 1, md: 2 } }}
                    >
                        Buy Now
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default ProductPage;
