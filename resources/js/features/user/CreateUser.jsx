import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Select, TextArea } from "../../ui/InputFields"; // Import reusable components
import { useCreateUser } from "./useCreateUser";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateUser() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { state } = useLocation();
    const user = state?.user || null;

    const [image, setImage] = useState(user?.image || null);
    const [imageFile, setImageFile] = useState(null);
    const { isCreating, createUser } = useCreateUser(); // Assume this hook exists
    const isWorking = isCreating;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            location: user?.location,
            description: user?.description,
        },
    });

    const handleAddImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const newImage = URL.createObjectURL(file);
            setImage(newImage);
            setImageFile(file);
        }
    };

    // heel

    const handleRemoveImage = () => {
        setImage(null);
        setImageFile(null);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (imageFile) {
            formData.append("image", imageFile);
        }
        if (user) {
        }
        createUser(formData, {
            onSuccess: () => {
                navigate(
                    window.location.pathname.includes("/admin")
                        ? "/admin/users"
                        : "/"
                );
            },
        });
    };

    return (
        <Box sx={{ padding: { lg: 2 }, maxWidth: 1200, margin: "auto" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                {user ? "Edit User" : "Create User"}
            </Typography>
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
                    User Details
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr",
                        gap: 4,
                    }}
                >
                    {/* Left Side - Name, Password, Email, Province, Phone, Role */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Name"
                            register={register}
                            errors={errors}
                            name="name"
                            disabled={isWorking}
                        />
                        {!user && (
                            <TextField
                                label="Password"
                                register={register}
                                errors={errors}
                                name="password"
                                type="password"
                                disabled={isWorking}
                            />
                        )}
                        <TextField
                            label="Email"
                            register={register}
                            errors={errors}
                            name="email"
                            type="email"
                            disabled={isWorking}
                        />
                        <TextField
                            label="Location"
                            register={register}
                            errors={errors}
                            name="location"
                            disabled={isWorking}
                        />
                        <TextField
                            label="Phone"
                            register={register}
                            errors={errors}
                            name="phone"
                            type="tel"
                            disabled={isWorking}
                        />
                        <Select
                            label="Role"
                            register={register}
                            errors={errors}
                            name="role"
                            defaultValue={user.role}
                            options={[
                                { value: "admin", label: "Admin" },
                                { value: "user", label: "User" },
                            ]}
                            disabled={isWorking}
                            // No defaultValue here - let the form handle it
                        />
                    </Box>

                    {/* Right Side - Image Upload */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            order: { xs: -1, sm: 1 }, // This makes it appear first on mobile (xs) and in original order on sm and up
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            User Image
                        </Typography>
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                maxWidth: 300,
                                height: "300px",
                                borderRadius: 2,
                                overflow: "hidden",
                                backgroundColor: image
                                    ? "transparent"
                                    : "action.hover",
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
                                        onChange={handleAddImage}
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
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.5)",
                                            "&:hover": {
                                                backgroundColor:
                                                    "rgba(0, 0, 0, 0.7)",
                                            },
                                        }}
                                        onClick={handleRemoveImage}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Description Text Area - Full width */}
                <Box sx={{ mt: 4 }}>
                    <TextArea
                        label="Description"
                        name="description"
                        register={register}
                        errors={errors}
                        rows={6}
                        disabled={isWorking}
                    />
                </Box>

                {/* Submit Button */}
                <Box sx={{ mt: 4 }}>
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
                        {user ? "Save" : "Create"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
