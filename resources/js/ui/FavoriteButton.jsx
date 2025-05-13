import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useToggleFavorite } from "./useToggleFavorite"; // Update the path
import { useState } from "react";

function FavoriteButton({ id, isFavorited }) {
    const { ToggleFavorite, isLoadingFav } = useToggleFavorite();
    const [isFavorite, setIsFavorite] = useState(isFavorited);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        ToggleFavorite(
            { productId: id },
            {
                onSuccess: (data) => {
                    // Set state based on backend response
                    console.log("data responce");
                    console.log(data.isFavorite);
                    setIsFavorite(data.isFavorite);
                },
                onError: (error) => {
                    console.error("Toggle failed", error);
                },
            }
        );
    };

    return (
        <IconButton
            sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
            }}
            onClick={handleFavoriteClick}
            disabled={isLoadingFav}
            aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
            }
        >
            {isFavorite ? (
                <FavoriteIcon sx={{ color: "red" }} />
            ) : (
                <FavoriteBorderIcon sx={{ color: "#010101" }} />
            )}
        </IconButton>
    );
}

export default FavoriteButton;
