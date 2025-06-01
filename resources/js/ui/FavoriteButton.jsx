import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useToggleFavorite } from "./useToggleFavorite";
import { useState } from "react";
import { getToken } from "../repositories/AuthRepository";
import { useNavigate } from "react-router-dom";

function FavoriteButton({ id, isFavorited }) {
  const { ToggleFavorite, isLoadingFav } = useToggleFavorite();
  const [isFavorite, setIsFavorite] = useState(isFavorited);
  const navigate = useNavigate(); // ✅ useNavigate at top level
  const token = getToken();       // ✅ ok to keep outside function too

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
        navigate('/login');
      return;
    }
    
    try {
      const data = await ToggleFavorite({ productId: id });
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error("Toggle failed", error);
    }
  };


  return (
    <IconButton
      onClick={handleFavoriteClick}
      disabled={isLoadingFav}
      aria-label={
        isFavorite ? "Remove from favorites" : "Add to favorites"
      }
    >
      {isLoadingFav ? (
        <CircularProgress size={24} />
      ) : isFavorite ? (
        <FavoriteIcon sx={{ color: "red", borderColor:"#fff" }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: "#fff" }} />
      )}
    </IconButton>
  );
}

export default FavoriteButton;