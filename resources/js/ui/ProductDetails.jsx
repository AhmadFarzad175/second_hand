// components/ProductDetails.jsx

import {
    Box,
    Stack,
    Typography,
    Divider,
    IconButton,
    Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function ProductDetails({
    product,
    showBuyNowButton = true,
    showFavoriteIcon = true,
    customActions = null,
}) {
    const {
        name = "Product Name",
        description = "Product details and description go here. Highlight the key features and specs of the product.",
        net_price = 299.99,
        location = "City, State",
        discount = 50,
        distance = "10 km away",
        images = [
            "/images/img-1.jpg",
            "/images/img-2.jpg",
            "/images/img-3.jpg",
        ],
        attributes = {
            color: "Red",
            brand: "Nike",
            size: "M",
        },
    } = product || {};

    return (
        <Box sx={{ width: "100%" }}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 0, md: 2 }}
                sx={{
                    alignItems: { xs: "center", md: "flex-start" },
                    textAlign: { xs: "center", md: "left" },
                    width: "100%",
                }}
            >
                {/* Carousel Section */}
                <Box
                    sx={{
                        flex: 1,
                        width: "100%",
                        maxWidth: { xs: "100%", md: "50%" },
                    }}
                >
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
                                        width: "100%",
                                        height: { xs: "auto", md: "500px" },
                                        borderRadius: 2,
                                        objectFit: "cover",
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
                        width: "100%",
                        maxWidth: { xs: "100%", md: "50%" },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Top Section: Name + Favorite */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
                        >
                            {name}
                        </Typography>

                        {showFavoriteIcon && (
                            <IconButton>
                                <FavoriteBorderIcon color="primary" />
                            </IconButton>
                        )}
                    </Box>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, mb: 2 }}
                    >
                        {description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Price Section */}
                    <Box sx={{ mb: 2, display: 'flex', alignItems:"center" }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}
                        >
                            Price:  
                        </Typography>{" "}
                        {parseFloat(discount) > 0 ? (
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                {/* Original Price with Line-Through */}
                                <Typography
                                    variant="body1"
                                    color="error"
                                    sx={{
                                        textDecoration: "line-through",
                                        fontSize: { xs: "1rem", md: "1.25rem" },
                                    }}
                                >
                                    ${parseFloat(net_price).toFixed(2)}
                                </Typography>

                                {/* Discounted Price in Bold */}
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.25rem",
                                            md: "1.5rem",
                                        },
                                    }}
                                >
                                    $
                                    {parseFloat(net_price - discount).toFixed(
                                        2
                                    )}
                                </Typography>
                            </Stack>
                        ) : (
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                                }}
                            >
                                ${parseFloat(net_price).toFixed(2)}
                            </Typography>
                        )}
                    </Box>

                    {/* Location & Distance */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}
                    >
                        Location: {location}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" }, mb: 2 }}
                    >
                        {distance}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Attributes Section */}
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ mb: 1 }}
                        >
                            Attributes
                        </Typography>

                        {attributes && Object.keys(attributes).length > 0 ? (
                            Object.entries(attributes).map(([key, value]) => (
                                <Box
                                    key={key}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        {key}:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                    >
                                        {value}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No attributes available
                            </Typography>
                        )}
                    </Box>

                    {/* Actions Section */}
                    {customActions ? (
                        <Box sx={{ mt: 3 }}>{customActions}</Box>
                    ) : (
                        showBuyNowButton && (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    fontSize: { xs: "0.875rem", md: "1rem" },
                                    padding: { xs: 1, md: 2 },
                                }}
                            >
                                Buy Now
                            </Button>
                        )
                    )}
                </Box>
            </Stack>
        </Box>
    );
}

export default ProductDetails;
