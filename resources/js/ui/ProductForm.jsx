import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Typography,
    Button,
    Paper,
    Stack,
    CircularProgress,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { TextField, Select, TextArea } from "../ui/InputFields";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import AxiosSetup from "../repositories/AxiosSetup";
import PriceDisplay from "./PriceDisplay";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ProductForm({
    onSubmit,
    isWorking = false,
    isEditSession = false,
    editValues = {},
    navigateBackPath = "/",
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    // const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const [images, setImages] = useState(Array(6).fill(null));
    const [imageFiles, setImageFiles] = useState(Array(6).fill(null));
    const [existingImageIds, setExistingImageIds] = useState(
        Array(6).fill(null)
    );
    const [categories, setCategories] = useState([]);
    const [categoryAttributes, setCategoryAttributes] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAttributes, setIsLoadingAttributes] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        watch,
        getValues,
        clearErrors,
        setValue,
        setError,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            currency: "USD", // Default value for new products
            discount_type: "%", // Default value for new products
            discount: 0, // Default value for new products
            price: "", // Default value for new products
            ...(isEditSession ? editValues : {}), // Spread editValues when in edit mode
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        console.log("Edit values received:", editValues);
    }, [editValues]);

    // Watch category changes
    const watchedCategory = watch("category_id");

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await AxiosSetup.get(
                    "/categoriesWithoutImage"
                );
                setCategories(response.data.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([]);
                throw new Error(
                    error.response?.data?.message ||
                        "Failed to fetch categories"
                );
            }
        };

        fetchCategories();
    }, []);

    // Fetch attributes when category changes
    useEffect(() => {
        if (!watchedCategory) {
            setCategoryAttributes([]);
            return;
        }

        const fetchAttributes = async () => {
            setIsLoadingAttributes(true);
            try {
                const response = await AxiosSetup.get(
                    `/categories/${watchedCategory}/attributes`
                );
                const { data } = response.data;

                if (Array.isArray(data)) {
                    setCategoryAttributes(data);

                    const currentValues = getValues();
                    let existingAttributes = {};
                    if (isEditSession && currentValues.attributes) {
                        try {
                            existingAttributes = JSON.parse(
                                currentValues.attributes
                            );
                        } catch (e) {
                            console.error("Error parsing attributes:", e);
                        }
                    }

                    const resetValues = {};
                    data.forEach((attr) => {
                        resetValues[attr.name] =
                            existingAttributes[attr.name] ||
                            (attr.type === "select" ? "" : "");
                    });

                    reset({
                        ...currentValues,
                        ...resetValues,
                    });
                }
            } catch (error) {
                console.error("Error fetching attributes:", error);
                setCategoryAttributes([]);
                throw new Error(
                    error.response?.data?.message ||
                        "Failed to fetch attributes"
                );
            } finally {
                setIsLoadingAttributes(false);
            }
        };

        fetchAttributes();
    }, [watchedCategory, reset, getValues, isEditSession]);

    // Initialize form with edit values and fetch images if in edit mode
    useEffect(() => {
        if (!isEditSession) return;
        // setIsLoading(true);

        const fetchProductImages = async () => {
            try {
                const response = await AxiosSetup.get(
                    `/productImages/${editValues.id}`
                );
                const images = response.data.data;
                console.log(images);

                const fetchedImages = Array(6).fill(null);
                const fetchedImageIds = Array(6).fill(null);
                images.forEach((imgObj, index) => {
                    if (index < 6 && imgObj.images) {
                        fetchedImages[index] = imgObj.images;
                        fetchedImageIds[index] = imgObj.id;
                    }
                });

                setImages(fetchedImages);
                setExistingImageIds(fetchedImageIds);

                let parsedAttributes = {};
                try {
                    parsedAttributes = JSON.parse(editValues.attributes);
                } catch (e) {
                    console.error("Error parsing attributes:", e);
                }

                reset({
                    ...editValues,
                    ...parsedAttributes,
                });
            } catch (error) {
                console.error("Error fetching product images:", error);
                throw new Error(
                    error.response?.data?.message ||
                        "Failed to fetch product images"
                );
            } finally {
                // setIsLoading(false);
            }
        };

        fetchProductImages();
    }, [isEditSession, editValues, reset]);

    // const handleAddImage = (event, index) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const file = event.target.files[0];
    //         const newImage = URL.createObjectURL(file);
    //         const newImages = [...images];
    //         newImages[index] = newImage;
    //         setImages(newImages);

    //         const newImageFiles = [...imageFiles];
    //         newImageFiles[index] = file;
    //         setImageFiles(newImageFiles);
    //     }
    // };

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

            // Clear error when an image is added
            clearErrors("images");
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);

        const newImageFiles = [...imageFiles];
        newImageFiles[index] = null;
        setImageFiles(newImageFiles);

        // Add validation check when removing images
        if (!newImages.some((img) => img !== null)) {
            setError("images", {
                type: "manual",
                message: "At least one product image is required",
            });
        } else {
            clearErrors("images");
        }
    };

    const onFormSubmit = (data) => {
        const formData = new FormData();

        // Build attributes object
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

        console.log("outside");
        if (!images.some((img) => img !== null)) {
            console.log("inside");
            setError("images", {
                type: "manual",
                message: "At least one product image is required",
            });
            return;
        }

        // Handle images differently for edit mode
        if (isEditSession) {
            const imageUpdates = [];

            images.forEach((image, index) => {
                if (image === null) {
                    if (existingImageIds[index]) {
                        imageUpdates.push({
                            id: existingImageIds[index],
                            action: "delete",
                        });
                    }
                } else if (imageFiles[index]) {
                    formData.append("images[]", imageFiles[index]);
                    imageUpdates.push({
                        position: index,
                        action: "add",
                    });
                } else if (existingImageIds[index]) {
                    imageUpdates.push({
                        id: existingImageIds[index],
                        position: index,
                        action: "keep",
                    });
                }
            });

            formData.append("image_updates", JSON.stringify(imageUpdates));
        } else {
            imageFiles.forEach((file) => {
                if (file) {
                    formData.append("images[]", file);
                }
            });
        }

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
                            {...register(attribute.name, {
                                required: `${attribute.name} is required`,
                            })}
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

    const categoryOptions =
        categories?.map((category) => ({
            value: category.id,
            label: category.name,
        })) || [];

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
                // p: { xs: 1, sm: 2 },
            }}
        >
            <Stack spacing={{ xs: 2, md: 3 }}>
                {/* Main content container */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 2, md: 3 },
                    }}
                >
                    {/* Left Column - Product Details */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Paper
                            sx={{
                                p: { xs: 2, md: 3 },
                                borderRadius: 2,
                                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                                border: "1px solid",
                                borderColor: "divider",
                                height: "100%",
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
                                    name="category_id"
                                    label="Category"
                                    control={control}
                                    options={categoryOptions}
                                    errors={errors}
                                    disabled={isWorking}
                                    {...register("category_id", {
                                        required: "Category is required",
                                    })}
                                />

                                <PriceDisplay
                                    control={control}
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    getValues={getValues}
                                    watch={watch}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        flexDirection: {
                                            xs: "column",
                                            sm: "row",
                                        },
                                    }}
                                >
                                    <Box sx={{ flex: 1 }}>
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
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Select
                                            label="Condition"
                                            defaultValue={editValues?.condition}
                                            control={control}
                                            register={register}
                                            name="condition"
                                            errors={errors}
                                            options={conditionOptions}
                                            disabled={isWorking}
                                            {...register("condition", {
                                                required:
                                                    "Condition is required",
                                            })}
                                            fullWidth
                                            required
                                        />
                                    </Box>
                                </Box>

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
                                        rows={isMobile ? 4 : 6}
                                        {...register("description", {
                                            required: "Description is required",
                                        })}
                                        fullWidth
                                    />
                                </Box>
                            </Stack>
                        </Paper>
                    </Box>

                    {/* Right Column - Images and Attributes */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack spacing={3}>
                            {/* Image Upload Section */}
                            <Paper
                                sx={{
                                    p: { xs: 2, md: 3 },
                                    borderRadius: 2,
                                    boxShadow:
                                        "0px 2px 8px rgba(0, 0, 0, 0.05)",
                                    border: "1px solid",
                                    borderColor: errors.images
                                        ? "error.main"
                                        : "divider", // Add this line
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

                                    {/* Add error message display */}
                                    {errors.images && (
                                        <Typography
                                            color="error.main"
                                            variant="body2"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                fontWeight: 500,
                                                mt: -1, // Adjust spacing
                                                mb: 1, // Adjust spacing
                                            }}
                                        >
                                            <ErrorOutlineIcon fontSize="small" />
                                            {errors.images.message}
                                        </Typography>
                                    )}

                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(2, 1fr)",
                                            gap: 1,
                                            [theme.breakpoints.up("sm")]: {
                                                gridTemplateColumns:
                                                    "repeat(3, 1fr)",
                                            },
                                        }}
                                    >
                                        {images.map((image, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    position: "relative",
                                                    height: isMobile
                                                        ? 100
                                                        : 120,
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
                                                            sx={{
                                                                fontSize:
                                                                    isMobile
                                                                        ? "0.65rem"
                                                                        : "0.75rem",
                                                                textAlign:
                                                                    "center",
                                                            }}
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
                                        ))}
                                    </Box>
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
                    </Box>
                </Box>

                {/* Form Actions */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        pt: 2,
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: { xs: "stretch", sm: "center" },
                    }}
                >
                    <Button
                        variant="outlined"
                        color="inherit"
                        size={isMobile ? "medium" : "large"}
                        onClick={() => navigate(navigateBackPath)}
                        sx={{
                            px: 4,
                            borderRadius: 1,
                            fontWeight: 500,
                            width: { xs: "100%", sm: "auto" },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size={isMobile ? "medium" : "large"}
                        disabled={isWorking}
                        onClick={handleSubmit(onFormSubmit)}
                        sx={{
                            px: 4,
                            borderRadius: 1,
                            fontWeight: 500,
                            minWidth: { xs: "100%", sm: 180 },
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
