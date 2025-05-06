import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Typography,
    Button,
    Paper,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useCreateProduct } from "./useCreateProduct";
import {
    TextField,
    Select,
    TextArea,
} from "../../ui/InputFields";
import ImageUploader from "../../ui/ImageUploader";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateProduct } from "./useUpdateProduct";

export default function CreateProduct() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { isCreating, createProduct } = useCreateProduct();
    const { isUpdating, updateProduct } = useUpdateProduct(); // Assume this hook exists

    const [images, setImages] = useState(Array(6).fill(null));
    const [imageFiles, setImageFiles] = useState(Array(6).fill(null));
    const [categories, setCategories] = useState([]);

    const { state } = useLocation();
    console.log(state);
    const { id: editId, ...editValues } = state?.row || {};

    const isEditSession = Boolean(editId);

    const isWorking = isCreating || isUpdating;

    const {
        register,
        handleSubmit,
        formState: { errors },
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

    // fetching images for update
    useEffect(() => {
        const fetchProductImages = async () => {
            if (!isEditSession) return;

            try {
                const response = await fetch(`/api/productImages/${editId}`);
                const data = await response.json();

                // Fix: Extract URL from each image object
                const fetchedImages = Array(6).fill(null);
                data.data.forEach((imgObj, index) => {
                    if (index < 6 && imgObj.images) {
                        fetchedImages[index] = imgObj.images;
                    }
                });

                setImages(fetchedImages);
            } catch (error) {
                console.error("Error fetching product images:", error);
            }
        };

        fetchProductImages();
    }, [isEditSession, editId]);

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
        // adding attributes
        const attributes = {
            color: data.color,
            brand: data.brand,
        };
        

        // Append as a JSON string
        formData.append("attributes", JSON.stringify(attributes));

        // Append other form fields
        for (const key in data) {
            formData.append(key, data[key]);
        }

        // Append all images under the same key: 'images[]'
        imageFiles.forEach((file) => {
            if (file) {
                formData.append("images[]", file);
            }
        });

        // Append all images under the same key: 'images[]'
        // imageFiles.forEach((file, i) => {
        //     if (file) {
        //         images[`image${i + 1}`] = file;
        //     }
        // });

        if (isEditSession) {
            updateProduct(
                { formData, id: editId },
                {
                    onSuccess: () => {
                        navigate(
                            window.location.pathname.includes("/admin")
                                ? "/admin/products"
                                : "/"
                        );
                    },
                }
            );
        } else {
            createProduct(formData, {
                onSuccess: () => {
                    navigate(
                        window.location.pathname.includes("/admin")
                            ? "/admin/products"
                            : "/"
                    );
                },
            });
        }
    };

    // Prepare options for select components
    const colorOptions = [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
    ];

    // Prepare options for select components
    const brandOptions = [
        { value: "iphone", label: "Iphone" },
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
        <Box sx={{ padding: { lg: 2 }, maxWidth: 1200, margin: "auto" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                {isEditSession ? "Update" : "Create"} Product
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
                                label="Name"
                                register={register}
                                errors={errors}
                                name="name"
                                disabled={isWorking}
                            />

                            {/* Categories */}
                            <Select
                                label="Categories"
                                defaultValue={editValues?.category_id}
                                register={register}
                                name="category_id"
                                errors={errors}
                                options={categoryOptions}
                                disabled={isWorking}
                            />

                            {/* Net Price and Discount */}
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="Net Price"
                                    register={register}
                                    errors={errors}
                                    name="net_price"
                                    type="number"
                                    disabled={isWorking}
                                />
                                <TextField
                                    label="Discount"
                                    register={register}
                                    errors={errors}
                                    name="discount"
                                    type="number"
                                    disabled={isWorking}
                                />
                            </Box>

                            {/* Quantity and Condition */}
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="Quantity"
                                    register={register}
                                    errors={errors}
                                    name="quantity"
                                    type="number"
                                    disabled={isWorking}
                                />
                                <Select
                                    label="Condition"
                                    defaultValue={editValues?.condition}
                                    register={register}
                                    name="condition"
                                    errors={errors}
                                    options={conditionOptions}
                                    disabled={isWorking}
                                />
                            </Box>

                            

                            {/* Description */}
                            <TextArea
                                label="Description"
                                register={register}
                                errors={errors}
                                name="description"
                                disabled={isWorking}
                                rows={4}
                            />
                        </Box>
                    </Paper>
                </Box>

                {/* Right Side - Image Upload Section */}
                <Box sx={{ flex: 1 }}>
                    {/* images */}
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
                                gridTemplateColumns: {
                                    xs: "repeat(2, 1fr)",
                                    sm: "repeat(3, 1fr)",
                                },
                                gap: 2,
                            }}
                        >
                            {images.map((image, index) => (
                                <Box key={index}>
                                    <ImageUploader
                                        image={image}
                                        onAddImage={handleAddImage}
                                        onRemoveImage={handleRemoveImage}
                                        index={index}
                                        size="100%"
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Paper>

                    {/* attributes */}
                    <Paper
                        sx={{
                            my: 3,
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: "background.paper",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            {/* Color */}
                            <Select
                                label="Color"
                                register={register}
                                name="color"
                                errors={errors}
                                options={colorOptions}
                                disabled={isWorking}
                            />

                            {/* Brand */}
                            <Select
                                label="Brand"
                                register={register}
                                name="brand"
                                errors={errors}
                                options={brandOptions}
                                disabled={isWorking}
                            />
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
