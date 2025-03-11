import * as React from "react";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { useForm } from "react-hook-form";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    IconButton,
    Paper,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ErrorText from "../../ui/ErrorText";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateProduct } from "./useCreateProduct";



export default function CreateProduct() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [images, setImages] = useState(Array(6).fill(null));
    const [imageFiles, setImageFiles] = useState(Array(6).fill(null));
    const { isCreating, createProduct } = useCreateProduct();
    const isWorking = isCreating;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // State to store categories
    const [categories, setCategories] = useState([]);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories"); // Replace with your API endpoint
                const data = await response.json();
                setCategories(data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleAddImage = (event, index) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const newImage = URL.createObjectURL(file);
            const newImages = [...images];
            newImages[index] = newImage;
            setImages(newImages);

            const newImageFiles = [...imageFiles];
            newImageFiles[index] = file;
            setImageFiles(newImageFiles);
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);

        const newImageFiles = [...imageFiles];
        newImageFiles[index] = null;
        setImageFiles(newImageFiles);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        imageFiles.forEach((file, index) => {
            if (file) {
                formData.append(`image${index + 1}`, file);
            }
        });

        createProduct(formData);
    };

    return (
        <Box sx={{ padding: { lg: 2 }, maxWidth: 1200, margin: "auto" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Create Product
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: 4,
                }}
            >
                {/* Left Side - Form Fields */}
                <Box sx={{ flex: 1 }}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: "background.paper",
                        }}
                    >
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: "bold", mb: 2 }}
                        >
                            Product Details
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            {/* Name */}
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                size="small"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                disabled={isWorking}
                                error={!!errors.name}
                                helperText={
                                    errors.name ? errors.name.message : ""
                                }
                            />

                            {/* Categories */}
                            <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                                disabled={isWorking}
                                error={!!errors.categories}
                            >
                                <InputLabel>Categories</InputLabel>
                                <Select
                                    label="Categories"
                                    {...register("categories", {
                                        required: "Category is required",
                                    })}
                                >
                                    {categories.map((category) => (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.categories && (
                                    <ErrorText
                                        message={errors.categories.message}
                                    />
                                )}
                            </FormControl>

                            {/* Net Price and Discount */}
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Net Price"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    {...register("netPrice", {
                                        required: "Net Price is required",
                                    })}
                                    disabled={isWorking}
                                    error={!!errors.netPrice}
                                    helperText={
                                        errors.netPrice
                                            ? errors.netPrice.message
                                            : ""
                                    }
                                />
                                <TextField
                                    fullWidth
                                    label="Discount"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    {...register("discount", {
                                        required: "Discount is required",
                                    })}
                                    disabled={isWorking}
                                    error={!!errors.discount}
                                    helperText={
                                        errors.discount
                                            ? errors.discount.message
                                            : ""
                                    }
                                />
                            </Box>

                            {/* Color */}
                            <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                                disabled={isWorking}
                                error={!!errors.color}
                            >
                                <InputLabel>Color</InputLabel>
                                <Select
                                    label="Color"
                                    {...register("color", {
                                        required: "Color is required",
                                    })}
                                >
                                    <MenuItem value="red">Red</MenuItem>
                                    <MenuItem value="blue">Blue</MenuItem>
                                    <MenuItem value="green">Green</MenuItem>
                                </Select>
                                {errors.color && (
                                    <ErrorText message={errors.color.message} />
                                )}
                            </FormControl>

                            {/* Quantity and Condition */}
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    {...register("quantity", {
                                        required: "Quantity is required",
                                    })}
                                    disabled={isWorking}
                                    error={!!errors.quantity}
                                    helperText={
                                        errors.quantity
                                            ? errors.quantity.message
                                            : ""
                                    }
                                />
                                <FormControl
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    disabled={isWorking}
                                    error={!!errors.condition}
                                >
                                    <InputLabel>Condition</InputLabel>
                                    <Select
                                        label="Condition"
                                        {...register("condition", {
                                            required: "Condition is required",
                                        })}
                                    >
                                        <MenuItem value="new">New</MenuItem>
                                        <MenuItem value="used">Used</MenuItem>
                                        <MenuItem value="refurbished">
                                            Refurbished
                                        </MenuItem>
                                    </Select>
                                    {errors.condition && (
                                        <ErrorText
                                            message={errors.condition.message}
                                        />
                                    )}
                                </FormControl>
                            </Box>

                            {/* Use by Location */}
                            <TextField
                                fullWidth
                                label="Use by Location"
                                variant="outlined"
                                size="small"
                                {...register("useByLocation", {
                                    required: "Use by Location is required",
                                })}
                                disabled={isWorking}
                                error={!!errors.useByLocation}
                                helperText={
                                    errors.useByLocation
                                        ? errors.useByLocation.message
                                        : ""
                                }
                            />

                            {/* Description */}
                            <TextField
                                fullWidth
                                label="Description"
                                multiline
                                rows={4}
                                variant="outlined"
                                size="small"
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                disabled={isWorking}
                                error={!!errors.description}
                                helperText={
                                    errors.description
                                        ? errors.description.message
                                        : ""
                                }
                            />
                        </Box>
                    </Paper>
                </Box>

                {/* Right Side - Image Upload Section */}
                <Box sx={{ flex: 1 }}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: "background.paper",
                        }}
                    >
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ fontWeight: "bold", mb: 2 }}
                        >
                            Product Images
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: isMobile
                                    ? "repeat(2, 1fr)"
                                    : "repeat(3, 1fr)",
                                gap: 2,
                            }}
                        >
                            {images.map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        paddingTop: "100%",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        backgroundColor: image
                                            ? "transparent"
                                            : "action.hover",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition:
                                            "transform 0.2s, box-shadow 0.2s",
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
                                                    backgroundColor:
                                                        "rgba(255, 255, 255, 0.1)",
                                                },
                                            }}
                                        >
                                            <AddPhotoAlternateIcon
                                                sx={{ color: "text.secondary" }}
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={(event) =>
                                                    handleAddImage(event, index)
                                                }
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
                                                    backgroundPosition:
                                                        "center",
                                                }}
                                            />
                                            <IconButton
                                                sx={{
                                                    position: "absolute",
                                                    top: 4,
                                                    right: 4,
                                                    color: "white",
                                                    backgroundColor:
                                                        "rgba(0, 0, 0, 0.5)",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "rgba(0, 0, 0, 0.7)",
                                                    },
                                                }}
                                                onClick={() =>
                                                    handleRemoveImage(index)
                                                }
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Box>
            </Box>

            {/* Submit Button */}
            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isWorking}
                    sx={{
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: "bold",
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Save Product
                </Button>
            </Box>
        </Box>
    );
}

//! you need to make components for input fields and make less complicated the code