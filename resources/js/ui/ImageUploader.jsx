import { Box, Button, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

const ImageUploader = ({
    image,
    onAddImage,
    onRemoveImage,
    size = "100%",
    index,
}) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                paddingTop: size,
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: image ? "transparent" : "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 3,
                },
            }}
        >
            {!image && (
                <Button
                    component="label"
                    variant="outlined"
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                    }}
                >
                    <AddPhotoAlternateIcon sx={{ color: "text.secondary" }} />
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) => onAddImage(event, index)}
                    />
                </Button>
            )}
            {image && (
                <>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                            },
                        }}
                        onClick={() => onRemoveImage(index)}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            )}
        </Box>
    );
};

export default ImageUploader;