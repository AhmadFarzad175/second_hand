import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Stack,
    CircularProgress,
    IconButton,
} from "@mui/material";
import { TextField, Select, TextArea } from "../ui/InputFields";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";

export default function ProductForm({
    onSubmit,
    isWorking = false,
    isEditSession = false,
    editValues = {},
    navigateBackPath = "/",
}) {
    const [images, setImages] = useState(Array(6).fill(null));
    const [imageFiles, setImageFiles] = useState(Array(6).fill(null));
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json();
                setCategories(data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Initialize form with edit values and fetch images if in edit mode
    useEffect(() => {
        if (!isEditSession) return;
        setIsLoading(true);

        const fetchProductImages = async () => {
            try {
                const response = await fetch(`/api/productImages/${editValues.id}`);
                const data = await response.json();

                const fetchedImages = Array(6).fill(null);
                data.data.forEach((imgObj, index) => {
                    if (index < 6 && imgObj.images) {
                        fetchedImages[index] = imgObj.images;
                    }
                });

                setImages(fetchedImages);
                reset(editValues);
            } catch (error) {
                console.error("Error fetching product images:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductImages();
    }, [isEditSession, editValues, reset]);

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

    const onFormSubmit = (data) => {
        const formData = new FormData();
        formData.append('currency_id', '1')
        const attributes = {
            color: data.color,
            brand: data.brand,
        };

        formData.append("attributes", JSON.stringify(attributes));

        for (const key in data) {
            if (key !== "color" && key !== "brand") {
                formData.append(key, data[key]);
            }
        }

        imageFiles.forEach((file) => {
            if (file) {
                formData.append("images[]", file);
            }
        });

        onSubmit(formData);
    };

    // Options for select components
    const colorOptions = [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
    ];

    const brandOptions = [
        { value: "iphone", label: "iPhone" },
        { value: "galaxy", label: "Galaxy" },
        { value: "nokia", label: "Nokia" },
        { value: "huawei", label: "Huawei" },
    ];

    const conditionOptions = [
        { value: "0", label: "New" },
        { value: "1", label: "Used" },
    ];

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    return (
        <Box
            sx={{
                padding: { xs: 2, md: 4 },
                maxWidth: "1400px",
                margin: "0 auto",
            }}
        >
            <Stack spacing={4}>
                {/* Header Section */}
                <Grid container spacing={4}>
                    {/* Left Column - Product Details */}
                    <Grid item xs={12} md={7}>
                        <Paper
                            sx={{
                                p: { xs: 2, md: 3 },
                                borderRadius: 2,
                                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Stack spacing={3}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    Product Information
                                </Typography>

                                <TextField
                                    label="Product Name"
                                    register={register}
                                    control={control}
                                    errors={errors}
                                    name="name"
                                    disabled={isWorking}
                                    fullWidth
                                    required
                                />

                                <Select
                                    label="Category"
                                    defaultValue={editValues?.category_id}
                                    control={control}
                                    register={register}
                                    name="category_id"
                                    errors={errors}
                                    options={categoryOptions}
                                    disabled={isWorking}
                                    fullWidth
                                    required
                                />

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Net Price ($)"
                                            register={register}
                                            control={control}
                                            errors={errors}
                                            name="net_price"
                                            type="number"
                                            disabled={isWorking}
                                            fullWidth
                                            required
                                            inputProps={{
                                                step: "0.01",
                                                min: "0",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Discount (%)"
                                            register={register}
                                            control={control}
                                            errors={errors}
                                            name="discount"
                                            type="number"
                                            disabled={isWorking}
                                            fullWidth
                                            inputProps={{
                                                min: "0",
                                                max: "100",
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Stock Quantity"
                                            register={register}
                                            control={control}
                                            errors={errors}
                                            name="quantity"
                                            type="number"
                                            disabled={isWorking}
                                            fullWidth
                                            required
                                            inputProps={{ min: "0" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select
                                            label="Condition"
                                            defaultValue={editValues?.condition}
                                            control={control}
                                            register={register}
                                            name="condition"
                                            errors={errors}
                                            options={conditionOptions}
                                            disabled={isWorking}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 500, mb: 1 }}
                                    >
                                        Product Description
                                    </Typography>
                                    <TextArea
                                        label="Detailed product description"
                                        register={register}
                                        control={control}
                                        errors={errors}
                                        name="description"
                                        disabled={isWorking}
                                        rows={6}
                                        fullWidth
                                    />
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Right Column - Images and Attributes */}
                    <Grid item xs={12} md={5}>
                        <Stack spacing={3}>
                            {/* Image Upload Section */}
                            <Paper
                                sx={{
                                    p: { xs: 2, md: 3 },
                                    borderRadius: 2,
                                    boxShadow:
                                        "0px 2px 8px rgba(0, 0, 0, 0.05)",
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <Stack spacing={2}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Product Images
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Upload high-quality product images (max 6)
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {images.map((image, index) => (
                                            <Grid
                                                item
                                                xs={6}
                                                sm={4}
                                                key={index}
                                            >
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                        height: 120,
                                                        borderRadius: 1,
                                                        overflow: "hidden",
                                                        border: "1px dashed",
                                                        borderColor: image
                                                            ? "transparent"
                                                            : "divider",
                                                        backgroundColor: image
                                                            ? "transparent"
                                                            : "action.hover",
                                                    }}
                                                >
                                                    {image ? (
                                                        <>
                                                            <Box
                                                                component="img"
                                                                src={image}
                                                                alt={`Product preview ${
                                                                    index + 1
                                                                }`}
                                                                sx={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit:
                                                                        "cover",
                                                                }}
                                                            />
                                                            <IconButton
                                                                size="small"
                                                                onClick={() =>
                                                                    handleRemoveImage(
                                                                        index
                                                                    )
                                                                }
                                                                sx={{
                                                                    position:
                                                                        "absolute",
                                                                    top: 4,
                                                                    right: 4,
                                                                    backgroundColor:
                                                                        "error.main",
                                                                    color: "common.white",
                                                                    "&:hover": {
                                                                        backgroundColor:
                                                                            "error.dark",
                                                                    },
                                                                }}
                                                            >
                                                                <DeleteOutlineIcon fontSize="small" />
                                                            </IconButton>
                                                        </>
                                                    ) : (
                                                        <Button
                                                            component="label"
                                                            fullWidth
                                                            sx={{
                                                                height: "100%",
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                                color: "text.secondary",
                                                            }}
                                                        >
                                                            <CloudUploadIcon fontSize="small" />
                                                            <Typography
                                                                variant="caption"
                                                                display="block"
                                                            >
                                                                Add Image
                                                            </Typography>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                hidden
                                                                onChange={(e) =>
                                                                    handleAddImage(
                                                                        e,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </Button>
                                                    )}
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Stack>
                            </Paper>

                            {/* Attributes Section */}
                            <Paper
                                sx={{
                                    p: { xs: 2, md: 3 },
                                    borderRadius: 2,
                                    boxShadow:
                                        "0px 2px 8px rgba(0, 0, 0, 0.05)",
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <Stack spacing={2}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Product Attributes
                                    </Typography>

                                    <Select
                                        label="Brand"
                                        register={register}
                                        control={control}
                                        name="brand"
                                        errors={errors}
                                        options={brandOptions}
                                        disabled={isWorking}
                                        fullWidth
                                    />

                                    <Select
                                        label="Color"
                                        register={register}
                                        control={control}
                                        name="color"
                                        errors={errors}
                                        options={colorOptions}
                                        disabled={isWorking}
                                        fullWidth
                                    />
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Form Actions */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        pt: 3,
                    }}
                >
                    <Button
                        variant="outlined"
                        color="inherit"
                        size="large"
                        onClick={() => navigate(navigateBackPath)}
                        sx={{
                            px: 4,
                            borderRadius: 1,
                            fontWeight: 500,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isWorking}
                        onClick={handleSubmit(onFormSubmit)}
                        sx={{
                            px: 4,
                            borderRadius: 1,
                            fontWeight: 500,
                            minWidth: 180,
                        }}
                        startIcon={
                            isWorking ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : null
                        }
                    >
                        {isWorking
                            ? "Processing..."
                            : isEditSession
                            ? "Save Changes"
                            : "Create Product"}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}