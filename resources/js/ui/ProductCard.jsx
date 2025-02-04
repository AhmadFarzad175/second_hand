import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Heart icon

/* eslint-disable react/prop-types */
function ProductCard({ product }) {
    return (
        <Card
            key={product.id}
            sx={{
                height: "100%",
                position: "relative", // Ensure that the heart icon is positioned correctly
                "&:hover": {
                    boxShadow: 6, // Adds box shadow on hover
                },
            }}
        >
            {/* Heart Icon in the top-right corner */}
            <IconButton
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                }}
            >
                <FavoriteBorderIcon sx={{ color: "#010101" }} />
            </IconButton>

            <CardMedia
                component="img"
                sx={{
                    height: 300, // Adjust this value to the desired size
                    width: "100%",
                    aspectRatio: "1", // Ensures the image is square
                    objectFit: "cover", // Ensures the image fits well
                }}
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Location: {product.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Posted: {product.posted}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.distance}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProductCard;
