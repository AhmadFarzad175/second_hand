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
    const [categoryAttributes, setCategoryAttributes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAttributes, setIsLoadingAttributes] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        watch,
        getValues, // Add this
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    // Watch category changes
    const watchedCategory = watch("category_id");

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

    // Fetch attributes when category changes
    // Fetch attributes when category changes
    useEffect(() => {
        if (!watchedCategory) {
            setCategoryAttributes([]);
            return;
        }

        const fetchAttributes = async () => {
            setIsLoadingAttributes(true);
            try {
                const response = await fetch(
                    `/api/categories/${watchedCategory}/attributes`
                );
                const { data } = await response.json();

                if (Array.isArray(data)) {
                    setCategoryAttributes(data);

                    // Reset only attribute values when category changes
                    const resetValues = {};
                    data.forEach((attr) => {
                        resetValues[attr.name] =
                            attr.type === "select" ? "" : "";
                    });

                    // Preserve the current form values while resetting attributes
                    reset({
                        ...getValues(), // Keep all current form values
                        ...resetValues, // Override just the attributes
                    });
                }
            } catch (error) {
                console.error("Error fetching attributes:", error);
                setCategoryAttributes([]);
            } finally {
                setIsLoadingAttributes(false);
            }
        };

        fetchAttributes();
    }, [watchedCategory, reset, getValues]); // Add getValues to dependencies

    // Initialize form with edit values and fetch images if in edit mode
    useEffect(() => {
        if (!isEditSession) return;
        setIsLoading(true);

        const fetchProductImages = async () => {
            try {
                const response = await fetch(
                    `/api/productImages/${editValues.id}`
                );
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
        formData.append("currency", "AFN");

        // Build attributes object dynamically
        const attributes = {};
        categoryAttributes.forEach((attr) => {
            if (data[attr.name] !== undefined && data[attr.name] !== "") {
                attributes[attr.name] = data[attr.name];
            }
        });

        formData.append("attributes", JSON.stringify(attributes));

        // Append other form data
        for (const key in data) {
            if (!categoryAttributes.some((attr) => attr.name === key)) {
                formData.append(key, data[key]);
            }
        }

        // Append images
        imageFiles.forEach((file) => {
            if (file) {
                formData.append("images[]", file);
            }
        });

        onSubmit(formData);
    };

    const renderAttributeFields = () => {
        return categoryAttributes.map((attribute) => {
            const commonProps = {
                label: attribute.name,
                control: control,
                name: attribute.name,
                errors: errors,
                disabled: isWorking,
                fullWidth: true,
                register: register,
            };

            switch (attribute.type) {
                case "select":
                    return (
                        <Select
                            key={attribute.id}
                            {...commonProps}
                            options={attribute.options.map((option) => ({
                                value: option,
                                label: option,
                            }))}
                        />
                    );
                case "text":
                default:
                    return <TextField key={attribute.id} {...commonProps} />;
            }
        });
    };

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
                                    control={control}
                                    register={register}
                                    name="category_id"
                                    errors={errors}
                                    options={categoryOptions}
                                    disabled={isWorking || isLoading}
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
                                        Upload high-quality product images (max
                                        6)
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

                                    {isLoadingAttributes ? (
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                        >
                                            <CircularProgress size={24} />
                                        </Box>
                                    ) : categoryAttributes.length > 0 ? (
                                        renderAttributeFields()
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {watchedCategory
                                                ? "No attributes defined for this category"
                                                : "Select a category to see available attributes"}
                                        </Typography>
                                    )}
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
                        sx={{ px: 4, borderRadius: 1, fontWeight: 500 }}
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
