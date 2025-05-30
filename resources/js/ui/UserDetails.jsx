// src/components/UserDetails/UserDetails.jsx
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
    Button,
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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const UserDetails = ({ user, isEditable = false }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

    if (!user) return <Typography>User not found</Typography>;

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
                // backgroundColor: theme.palette.background.paper,
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant={isSmallScreen ? "h5" : "h4"}
                            component="h1"
                            gutterBottom
                        >
                            {user.name}
                        </Typography>
                        {isEditable && (
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() =>
                                    navigate(`./edit`, {
                                        state: {user},
                                    })
                                }
                            >
                                Edit Profile
                            </Button>
                        )}
                    </Box>

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
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                    ".swiper-button-prev, .swiper-button-next":
                                        {
                                            position: "relative",
                                            top: "auto",
                                            left: "auto",
                                            right: "auto",
                                            marginTop: 0,
                                            "&::after": {
                                                fontSize: "1.5rem",
                                                fontWeight: "bold",
                                            },
                                        },
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Top Rated Products
                                </Typography>
                                {/* Navigation container - will be filled by Swiper */}
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <div className="swiper-button-prev" />
                                    <div className="swiper-button-next" />
                                </Box>
                            </Box>
                            <Box sx={{ mb: 4 }}>
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation={{
                                        nextEl: ".swiper-button-next",
                                        prevEl: ".swiper-button-prev",
                                    }}
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
                                        padding: "16px 8px 40px",
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
                                            theme.palette.grey[400],
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
                                        {`${product.net_price} ${product.currency}`}
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

export default UserDetails;
