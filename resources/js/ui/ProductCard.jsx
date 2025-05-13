import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";
// import { useToggleFavorite } from "./useToggleFavorite";
import FavoriteButton from "./FavoriteButton";

function ProductCard({ product }) {
    // const { ToggleFavorite, isLoadingFav } = useToggleFavorite();

    // const handleToggleFavorite = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation(); // Prevent event bubbling
    //     ToggleFavorite({ productId: product.id });
    // };

    return (
        <Card
            component={Link}
            to={`/product/${product.id}`}
            sx={{
                height: "100%",
                position: "relative",
                textDecoration: "none", // remove underline from link
                color: "inherit", // inherit text color
                "&:hover": {
                    boxShadow: 6,
                },
            }}
        >
            <Box sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
            }}>

            <FavoriteButton id={product.id} isFavorited={product.isFavorite} />
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
                    }}
                >
                    <Typography variant="body1" fontWeight="bold">
                        ${product.net_price}
                    </Typography>
                    {product.discount > 0 && (
                        <Typography variant="body2" color="error">
                            {product.discount}% off
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
