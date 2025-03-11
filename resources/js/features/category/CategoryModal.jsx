import React, { useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    Box,
    CircularProgress,
    Avatar,
    Typography,
    IconButton,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useCreateCategory } from "./useCreateCategory";
import { useUpdateCategory } from "./useUpdateCategory";

const CategoryModal = ({ category = {}, open, handleClose }) => {
    const { isCreating, createCategory } = useCreateCategory();
    const { isUpdating, updateCategory } = useUpdateCategory();
    const { id: editId, ...editValues } = category;
    const isEditSession = Boolean(editId);
    const isWorking = isCreating || isUpdating;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: isEditSession ? editValues : { name: "", image: null },
    });

    const imageFile = watch("image");

    // Handle image preview
    const previewImage =
        imageFile && imageFile[0] && imageFile[0] instanceof File
            ? URL.createObjectURL(imageFile[0]) // For new uploads
            : editValues.image || null; // For existing images

    useEffect(() => {
        if (open && isEditSession) {
            reset(editValues); // Reset form with edit values
        } else if (open) {
            reset({ name: "", image: null }); // Reset form for new category
        }
    }, [open, isEditSession, editValues, reset]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue("image", [file]); // Manually update form state
        }
    };

    const callHandleClose = () => {
        reset();
        handleClose();
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        if (isEditSession) {
            formData.append("id", editId);
            await updateCategory(formData, {
                onSuccess: () => {
                    callHandleClose();
                },
            });
        } else {
            await createCategory(formData, {
                onSuccess: () => {
                    callHandleClose();
                },
            });
        }
    };

    return (
        <Dialog open={open} onClose={callHandleClose} fullWidth maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    pt: 2,
                }}
            >
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                    {isEditSession ? "Edit Category" : "Add New Category"}
                </DialogTitle>
                <IconButton onClick={callHandleClose} sx={{ color: "#555" }}>
                    <Close />
                </IconButton>
            </Box>

            <DialogContent sx={{ px: 3, pb: 4 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mt: 1,
                    }}
                >
                    {/* Left Side: Inputs */}
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="Category Name"
                            fullWidth
                            variant="outlined"
                            {...register("name", {
                                required: "Category name is required",
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isWorking}
                            sx={{
                                px: 4,
                                py: 1.2,
                                fontSize: "1rem",
                                fontWeight: "bold",
                            }}
                        >
                            {isWorking ? (
                                <CircularProgress size={24} />
                            ) : isEditSession ? (
                                "Update"
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </Box>

                    {/* Right Side: Image Upload */}
                    <Box
                        sx={{
                            width: 120,
                            height: 120,
                            border: "2px solid #eee",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            borderRadius: "5px",
                            backgroundColor: "#fafafa",
                            transition: "0.3s",
                            "&:hover": {
                                borderColor: "#1976d2",
                                backgroundColor: "#f0f7ff",
                            },
                            position: "relative",
                        }}
                        onClick={() => document.getElementById("imageUpload").click()}
                    >
                        {previewImage ? (
                            <Avatar
                                src={previewImage}
                                alt="Category"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "5px",
                                }}
                            />
                        ) : (
                            <>
                                <CloudUpload sx={{ fontSize: 40, color: "#888" }} />
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    Upload Image
                                </Typography>
                            </>
                        )}
                    </Box>
                </Box>

                {/* Hidden File Input */}
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange} // Manually handle file change
                />

                {/* Error Message for Image */}
                {errors.image && (
                    <Typography
                        color="error"
                        variant="body2"
                        sx={{ mt: 1, position: "absolute", right: "20px" }}
                    >
                        {errors.image.message}
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CategoryModal;