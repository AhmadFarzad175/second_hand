import React from "react";
import {
    Box,
    Typography,
    Avatar,
    Divider,
    Chip,
    Rating,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Email,
    Phone,
    LocationOn,
    Description,
    ShoppingBasket,
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const UserProfile = ({ user }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

    // Get top 5 rated products (assuming products have a 'rating' property)
    const topRatedProducts = user.products
        ? [...user.products]
              .sort((a, b) => (b.rating || 0) - (a.rating || 0))
              .slice(0, 5)
        : [];

    const showTopProducts =
        user.products &&
        user.products.length >= 6 &&
        topRatedProducts.length > 0;

    return (
        <Box
            sx={{
                maxWidth: 1200,
                margin: "0 auto",
                p: isSmallScreen ? 1 : 3,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
            }}
        >
            {/* Main flex container */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    gap: 3,
                }}
            >
                {/* Left column - profile image */}
                <Box
                    sx={{
                        width: isSmallScreen ? "100%" : "30%",
                        maxWidth: isSmallScreen ? "none" : 240,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        src={user.user_image}
                        alt={user.name}
                        sx={{
                            width: isSmallScreen ? 120 : 160,
                            height: isSmallScreen ? 120 : 160,
                            mb: 2,
                        }}
                    />
                    <Rating
                        value={user.rating}
                        precision={0.5}
                        readOnly
                        size={isSmallScreen ? "small" : "medium"}
                    />
                    <Chip
                        label={`${user.total_products} Products`}
                        icon={<ShoppingBasket fontSize="small" />}
                        variant="outlined"
                        sx={{ mt: 1 }}
                        size={isSmallScreen ? "small" : "medium"}
                    />
                </Box>

                {/* Right column - profile details */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0, // Prevent overflow
                    }}
                >
                    <Typography
                        variant={isSmallScreen ? "h5" : "h4"}
                        component="h1"
                        gutterBottom
                    >
                        {user.name}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Contact info row */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: isSmallScreen ? "column" : "row",
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Email color="primary" sx={{ mr: 1 }} />
                                <Typography variant="body1">
                                    {user.email}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Phone color="primary" sx={{ mr: 1 }} />
                                <Typography variant="body1">
                                    {user.phone || "Not provided"}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <LocationOn color="primary" sx={{ mr: 1 }} />
                                <Typography variant="body1">
                                    {user.user_location ||
                                        "Location not specified"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Description */}
                    {user.description && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Description
                                    color="primary"
                                    sx={{ mr: 1, mt: 0.5 }}
                                />
                                <Typography variant="body1" paragraph>
                                    {user.description}
                                </Typography>
                            </Box>
                        </>
                    )}

                    {/* Top Rated Products Slider */}
                    {showTopProducts && (
                        <>
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="h6" gutterBottom>
                                Top Rated Products
                            </Typography>
                            <Box sx={{ mb: 4 }}>
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation
                                    pagination={{ clickable: true }}
                                    spaceBetween={20}
                                    slidesPerView={
                                        isSmallScreen
                                            ? 1
                                            : isMediumScreen
                                            ? 2
                                            : 3
                                    }
                                    style={{
                                        padding: "16px 8px 40px", // Extra bottom padding for pagination
                                        "--swiper-navigation-color":
                                            theme.palette.primary.main,
                                        "--swiper-pagination-color":
                                            theme.palette.primary.main,
                                    }}
                                >
                                    {topRatedProducts.map((product) => (
                                        <SwiperSlide key={`top-${product.id}`}>
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            theme.palette.action
                                                                .hover,
                                                    },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        height: 160,
                                                        backgroundImage:
                                                            product.image
                                                                ? `url(${product.image})`
                                                                : "none",
                                                        backgroundSize: "cover",
                                                        backgroundPosition:
                                                            "center",
                                                        backgroundColor:
                                                            theme.palette
                                                                .grey[200],
                                                        mb: 1,
                                                        borderRadius: 1,
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                >
                                                    {product.name}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        color="primary"
                                                    >
                                                        ${product.price}
                                                    </Typography>
                                                    <Rating
                                                        value={product.rating}
                                                        precision={0.1}
                                                        readOnly
                                                        size="small"
                                                    />
                                                </Box>
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
            {/* All Products */}
            {/* All Products */}
            {user.products && user.products.length > 0 && (
                <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" gutterBottom>
                        {showTopProducts ? "All Products" : "Products"}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        {user.products.map((product) => (
                            <Box
                                key={product.id}
                                sx={{
                                    flex: {
                                        xs: "0 0 100%",
                                        sm: "0 0 48%",
                                        lg: "0 0 31%",
                                        xl: "0 0 23%",
                                    },
                                    boxSizing: "border-box",
                                    p: 1,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.action.hover,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 180,
                                        backgroundImage: product.image
                                            ? `url(${product.image})`
                                            : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor:
                                            theme.palette.grey[200],
                                        mb: 1,
                                        borderRadius: 1,
                                    }}
                                />
                                <Typography variant="body2" noWrap>
                                    {product.name}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        color="primary"
                                    >
                                        ${product.price}
                                    </Typography>
                                    {product.rating && (
                                        <Rating
                                            value={product.rating}
                                            precision={0.1}
                                            readOnly
                                            size="small"
                                        />
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

// Updated sample user data with ratings
const sampleUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    user_location: "New York, USA",
    description:
        "Passionate about creating high-quality products and providing excellent customer service. With over 5 years of experience in the industry.",
    user_image: "https://example.com/path/to/image.jpg",
    rating: 4.5,
    total_products: 12,
    products: [
        {
            id: 1,
            name: "Handcrafted Wooden Chair",
            price: 149.99,
            image: "https://example.com/chair.jpg",
            rating: 4.8,
        },
        {
            id: 2,
            name: "Vintage Table Lamp",
            price: 79.99,
            image: "https://example.com/lamp.jpg",
            rating: 4.5,
        },
        {
            id: 3,
            name: "Organic Cotton Tote Bag",
            price: 24.99,
            image: "https://example.com/tote.jpg",
            rating: 4.2,
        },
        {
            id: 4,
            name: "Ceramic Coffee Mug Set",
            price: 35.99,
            image: "https://example.com/mugs.jpg",
            rating: 4.7,
        },
        {
            id: 5,
            name: "Leather Notebook Cover",
            price: 42.99,
            image: "https://example.com/notebook.jpg",
            rating: 4.6,
        },
        {
            id: 6,
            name: "Stainless Steel Water Bottle",
            price: 29.99,
            image: "https://example.com/bottle.jpg",
            rating: 4.4,
        },
        {
            id: 7,
            name: "Wool Winter Scarf",
            price: 39.99,
            image: "https://example.com/scarf.jpg",
            rating: 4.1,
        },
        {
            id: 8,
            name: "Bamboo Cutting Board",
            price: 49.99,
            image: "https://example.com/board.jpg",
            rating: 4.3,
        },
    ],
};

const App = () => {
    return <UserProfile user={sampleUser} />;
};

export default App;
