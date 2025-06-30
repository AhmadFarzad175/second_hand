import { Card, CardContent, CardMedia, Typography, Box, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

function ProductCard({ product }) {
    return (
        <Card
            component={Link}
            to={`/product/${product.id}`}
            sx={{
                height: "100%",
                position: "relative",
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                    boxShadow: 6,
                },
            }}
        >
            {/* Discount Badge */}
            {product.has_discount && (
                <Chip
                    label={product.discount}
                    color="error"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        zIndex: 1,
                        fontWeight: 'bold',
                    }}
                />
            )}

            <Box
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                }}
            >
                <FavoriteButton
                    id={product.id}
                    isFavorited={product.isFavorite}
                />
            </Box>

            <CardMedia
                component="img"
                sx={{
                    height: 300,
                    width: "100%",
                    aspectRatio: "1",
                    objectFit: "cover",
                }}
                image={product.images}
                alt={product.name}
            />

            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {product.name}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                        flexWrap: 'wrap',
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        {product.final_price}
                    </Typography>
                    
                    {product.has_discount && (
                        <Typography 
                            variant="body2" 
                            sx={{
                                textDecoration: 'line-through',
                                color: 'text.secondary'
                            }}
                        >
                            {product.original_price}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    {product.howFar && (
                        <Typography variant="body2" color="text.secondary">
                            {product.howFar} away
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                        {product.posted}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ProductCard;