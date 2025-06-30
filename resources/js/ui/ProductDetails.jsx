// components/ProductDetails.jsx

import {
    Box,
    Stack,
    Typography,
    Divider,
    IconButton,
    Button,
    Chip,
    Snackbar,
    Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import MessageIcon from "@mui/icons-material/Message";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDeleteProduct } from "../features/product/useDeleteProduct";
import FavoriteButton from "./FavoriteButton";

function ProductDetails({ dashboard = false }) {
    const { id } = useParams(); // 👈 get the ID from the URL
    const [product, setProduct] = useState(null);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const { isDeleting, deletePro } = useDeleteProduct();

    // Fix for default icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    const handleCopy = async (phoneNumber) => {
        try {
            await navigator.clipboard.writeText(phoneNumber);
            setCopied(true);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    useEffect(() => {
        if (id) {
            fetch(`/api/productDetails/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data) => setProduct(data.data))
                .catch((err) => console.error("Failed to fetch product:", err));
        }
    }, [id]);

    //delete the product
    const handleDelete = async (event) => {
        event.stopPropagation(); // Prevent row selection when clicking delete
        deletePro(id);
        navigate("/admin/products");
    };

    // Optional fallback for loading state
    if (!product) {
        return <Typography>Loading...</Typography>;
    } else {
    }

    let coordinates = product.location ? JSON.parse(product.location) : null;
    console.log(coordinates);

    return (
        <Box sx={{ width: "100%" }}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 0, md: 2 }}
                alignItems="flex-start" // important
                sx={{
                    width: "100%",
                    mb: 10,
                }}
            >
                {/* Carousel Section */}
                <Box
                    sx={{
                        flex: 1,
                        width: "100%",
                        maxWidth: { xs: "100%", md: "50%" },
                        position: "sticky",
                        top: 106, // or your preferred spacing from top
                        alignSelf: "flex-start",
                        zIndex: 1,
                        transition: "top 0.3s ease",
                    }}
                >
                    {product?.images?.length > 0 && (
                        <>
                            <Swiper
                                spaceBetween={10}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                style={{ borderRadius: 8 }}
                            >
                                {product.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <Box
                                            component="img"
                                            src={image}
                                            alt={`Slide ${index + 1}`}
                                            sx={{
                                                width: "100%",
                                                height: {
                                                    xs: "auto",
                                                    md: "500px",
                                                },
                                                borderRadius: 2,
                                                objectFit: "cover",
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* actions below the carousel */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 1,
                                    px: 2,
                                    py: 1,
                                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                                    borderRadius: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <>
                                        <FavoriteButton
                                            id={product.id}
                                            isFavorited={product.isFavorite}
                                        />

                                        <Typography variant="body2">
                                            123
                                        </Typography>
                                    </>
                                    <Tooltip title="Share">
                                        <IconButton disabled={dashboard}>
                                            <ShareIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Message">
                                        <IconButton>
                                            <MessageIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                                {!dashboard && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <Typography variant="body2">
                                            {product.user.phone}
                                        </Typography>
                                        <Tooltip title="Copy phone number">
                                            <IconButton
                                                sx={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    handleCopy(
                                                        product.user.phone
                                                    )
                                                }
                                            >
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                            </Box>

                            {/* Snackbar for copy success */}
                            <Snackbar
                                open={copied}
                                autoHideDuration={2000}
                                onClose={() => setCopied(false)}
                                message="Phone number copied!"
                            />
                        </>
                    )}

                    {/* User Info Section Below Swiper */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 2,
                            px: 2,
                            py: 1,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: 2,
                            boxShadow: 1,
                        }}
                    >
                        {/* User Image */}
                        <Box
                            component="img"
                            src={product.user?.image || "/motorcycle.jpg"}
                            alt={product.user?.name}
                            sx={{
                                width: 160,
                                height: 160,
                                borderRadius: "50%",
                                objectFit: "cover",
                                mr: 2,
                            }}
                        />

                        {/* User Info */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {product.user?.name}
                            </Typography>

                            {/* Rating and Total Products */}
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                {/* Rating as stars */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Box
                                            key={i}
                                            component="span"
                                            sx={{
                                                color:
                                                    i <
                                                    Math.round(
                                                        product.user?.rating ||
                                                            0
                                                    )
                                                        ? "#ffb400"
                                                        : "#ccc",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            ★
                                        </Box>
                                    ))}
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {/* ({product.user?.rating ?? 0}) */}|
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ ml: 1 }}
                                >
                                    {product.user?.total_products ?? 0} products
                                </Typography>
                            </Stack>

                            <Typography variant="subtitle1">
                                {product.user?.description}
                            </Typography>
                        </Box>
                    </Box>
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
                            {product.name}
                        </Typography>
                        <Chip
                            label={product.category.name}
                            size="small"
                            variant="outlined"
                        />
                    </Box>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, mb: 2 }}
                    >
                        {product.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Price Section */}
                    <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}
                        >
                            Price:
                        </Typography>{" "}
                        {parseFloat(product.discount) > 0 ? (
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
                                    ${parseFloat(product.price).toFixed(2)}
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
                                    {parseFloat(
                                        product.price - product.discount
                                    ).toFixed(2)}
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
                                ${parseFloat(product.price).toFixed(2)}
                            </Typography>
                        )}
                    </Box>

                    {/* Location & Distance */}
                    {/* <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" } }}
                    >
                        Location: {product.location}
                    </Typography> */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.8rem", md: "0.9rem" }, mb: 2 }}
                    >
                        {/* {product.distance ?? 'insert '} */}
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

                        {product.attributes &&
                        Object.keys(product.attributes).length > 0 ? (
                            Object.entries(product.attributes).map(
                                ([key, value]) => (
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
                                )
                            )
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No attributes available
                            </Typography>
                        )}
                    </Box>

                    {/* Actions Section */}
                    {dashboard ?? (
                        <Box sx={{ mt: 3 }}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        navigate(
                                            `/admin/edit-product/${product.id}`,
                                            {
                                                state: { product }, // Pass the entire user object
                                            }
                                        );
                                    }}
                                >
                                    Edit Product
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                >
                                    Delete Product
                                </Button>
                            </Stack>
                        </Box>
                        // ) : (
                        // <Button
                        //     variant="contained"
                        //     color="primary"
                        //     fullWidth
                        //     sx={{
                        //         mt: 3,
                        //         fontSize: { xs: "0.875rem", md: "1rem" },
                        //         padding: { xs: 1, md: 2 },
                        //     }}
                        // >
                        //     Buy Now
                        // </Button>
                    )}
                </Box>
            </Stack>

            {/* map */}
            {coordinates && (
                <Box
                    sx={{
                        height: { xs: 400, lg: 600 },
                        width: "100%",
                        mt: 1,
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                >
                    <MapContainer
                        center={[coordinates.latitude, coordinates.longitude]}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={[
                                coordinates.latitude,
                                coordinates.longitude,
                            ]}
                        >
                            <Popup>Product Location</Popup>
                        </Marker>
                    </MapContainer>
                </Box>
            )}
        </Box>
    );
}

export default ProductDetails;
