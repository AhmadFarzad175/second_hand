// src/components/UserForm/UserForm.jsx
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Paper,
    Grid,
    Avatar,
    Stack,
    Divider,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    TextField,
    Select,
    TextArea,
    LocationField,
    PasswordField,
} from "../ui/InputFields";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

export default function UserForm({
    isEditSession = false,
    editValues = {},
    onSubmit,
    isWorking = false,
    onCancel,
    adminMode = false,
}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
    
    const [editingField, setEditingField] = useState(null);
    const [image, setImage] = useState(editValues?.user_image || null);
    const [imageFile, setImageFile] = useState(null);

    const { control, handleSubmit, setValue, reset } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const handleAddImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const newImage = URL.createObjectURL(file);
            setImage(newImage);
            setImageFile(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImageFile(null);
        setValue("user_image", null);
    };

    const handleFormSubmit = (data) => {
        const formData = new FormData();

        // Handle location
        if (typeof data.userLocation === "string") {
            const [latitude, longitude] = data.userLocation.split(",");
            formData.append(
                "location",
                JSON.stringify({ latitude, longitude })
            );
        } else {
            formData.append("location", data.user_location);
        }

        // Append other fields
        for (const key in data) {
            if (
                key !== "userLocation" &&
                data[key] !== undefined &&
                data[key] !== null
            ) {
                formData.append(key, data[key]);
            }
        }

        // Handle image
        if (imageFile) {
            formData.append("image", imageFile);
        } else if (isEditSession && editValues?.user_image && !imageFile) {
            formData.append("image", editValues.user_image);
        }

        onSubmit(formData);
    };

    // Initialize form only once when editValues changes
    useEffect(() => {
        if (isEditSession && editValues) {
            reset(editValues);
            if (editValues.location) {
                setValue(
                    "userLocation",
                    `${editValues.location.latitude},${editValues.location.longitude}`
                );
            }
        }
    }, [editValues?.id]); // Only depend on ID

    return (
        <Box
            sx={{
                padding: { xs: 1, sm: 2, md: 4 },
                maxWidth: "1200px",
                margin: "0 auto",
                minHeight: "100vh",
            }}
        >
            <Paper
                sx={{
                    p: { xs: 1.5, sm: 3, md: 4 },
                    borderRadius: { xs: 2, md: 4 },
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    borderColor: "divider",
                }}
            >
                <Stack spacing={isSmallScreen ? 2 : 3}>
                    <Grid
                        container
                        rowSpacing={isSmallScreen ? 1 : isMediumScreen ? 2 : 4}
                        columnSpacing={
                            isSmallScreen ? 1 : isMediumScreen ? 2 : 4
                        }
                    >
                        {/* Left Column - Form Fields */}
                        <Grid item xs={12} md={7}>
                            <Stack spacing={isSmallScreen ? 1.5 : 3}>
                                <Typography
                                    variant={isSmallScreen ? "subtitle1" : "h6"}
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "center",
                                    }}
                                >
                                    Basic Information
                                </Typography>
                                <Grid
                                    container
                                    rowSpacing={2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{ pr: isSmallScreen ? 0 : 2 }}
                                    >
                                        <TextField
                                            label="Full Name"
                                            name="name"
                                            control={control}
                                            disabled={isWorking}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            control={control}
                                            type="email"
                                            disabled={isWorking}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    rowSpacing={2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{ pr: isSmallScreen ? 0 : 2 }}
                                    >
                                        <TextField
                                            label="Phone"
                                            name="phone"
                                            control={control}
                                            type="tel"
                                            disabled={isWorking}
                                        />
                                    </Grid>
                                    {adminMode && (
                                        <Grid item xs={12} sm={6}>
                                            <Select
                                                label="Role"
                                                name="role"
                                                control={control}
                                                options={[
                                                    {
                                                        value: "admin",
                                                        label: "Admin",
                                                    },
                                                    {
                                                        value: "user",
                                                        label: "User",
                                                    },
                                                ]}
                                                disabled={isWorking}
                                            />
                                        </Grid>
                                    )}
                                </Grid>

                                {isEditSession ? (
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            Update sensitive information
                                        </Typography>

                                        {editingField === "password" ? (
                                            <PasswordField
                                                label="New Password"
                                                name="password"
                                                control={control}
                                                disabled={isWorking}
                                                isEditMode={true}
                                                isEditing={true}
                                                onEditToggle={(edit) =>
                                                    setEditingField(
                                                        edit ? "password" : null
                                                    )
                                                }
                                            />
                                        ) : editingField === "location" ? (
                                            <LocationField
                                                label="Location"
                                                name="userLocation"
                                                control={control}
                                                disabled={isWorking}
                                                showButton={true}
                                                isEditMode={true}
                                                isEditing={true}
                                                onEditToggle={(edit) =>
                                                    setEditingField(
                                                        edit ? "location" : null
                                                    )
                                                }
                                            />
                                        ) : (
                                            <Box
                                                sx={{ display: "flex", gap: 2 }}
                                            >
                                                <PasswordField
                                                    label="New Password"
                                                    name="password"
                                                    control={control}
                                                    disabled={isWorking}
                                                    isEditMode={true}
                                                    isEditing={false}
                                                    onEditToggle={(edit) =>
                                                        setEditingField(
                                                            edit
                                                                ? "password"
                                                                : null
                                                        )
                                                    }
                                                />
                                                <LocationField
                                                    label="Location"
                                                    name="userLocation"
                                                    control={control}
                                                    disabled={isWorking}
                                                    showButton={true}
                                                    isEditMode={true}
                                                    isEditing={false}
                                                    onEditToggle={(edit) =>
                                                        setEditingField(
                                                            edit
                                                                ? "location"
                                                                : null
                                                        )
                                                    }
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                ) : (
                                    <>
                                        <TextField
                                            label="Password"
                                            name="password"
                                            control={control}
                                            type="password"
                                            disabled={isWorking}
                                        />
                                        <LocationField
                                            label="Location"
                                            name="userLocation"
                                            control={control}
                                            disabled={isWorking}
                                            showButton={true}
                                        />
                                    </>
                                )}

                                <Box>
                                    <Typography
                                        variant={
                                            isSmallScreen ? "subtitle1" : "h6"
                                        }
                                        sx={{ fontWeight: 600, mb: 1 }}
                                    >
                                        About
                                    </Typography>
                                    <TextArea
                                        label="Description"
                                        name="description"
                                        control={control}
                                        rows={isSmallScreen ? 3 : 5}
                                        disabled={isWorking}
                                    />
                                </Box>
                            </Stack>
                        </Grid>

                        {/* Right Column - Profile Picture */}
                        <Grid item xs={12} md={5} sx={{ mt:{xs:10,md:0 }}}>
                            <Stack spacing={isSmallScreen ? 1.5 : 3}>
                                <Typography
                                    variant={isSmallScreen ? "subtitle1" : "h6"}
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "center",
                                    }}
                                >
                                    Profile Photo
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: "100%",
                                            maxWidth: isSmallScreen
                                                ? 250
                                                : isMediumScreen
                                                ? 200
                                                : 280,
                                            height: isSmallScreen
                                                ? 250
                                                : isMediumScreen
                                                ? 200
                                                : 280,
                                            borderRadius: "50%",
                                            overflow: "hidden",
                                            backgroundColor: image
                                                ? "transparent"
                                                : "action.hover",
                                            border: "2px dashed",
                                            borderColor: "divider",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                        }}
                                        component="label"
                                    >
                                        {!image && (
                                            <Stack
                                                spacing={0.5}
                                                alignItems="center"
                                                sx={{
                                                    p: 2,
                                                    textAlign: "center",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                <AddPhotoAlternateIcon
                                                    fontSize={
                                                        isSmallScreen
                                                            ? "medium"
                                                            : "large"
                                                    }
                                                />
                                                <Typography
                                                    variant={
                                                        isSmallScreen
                                                            ? "caption"
                                                            : "body2"
                                                    }
                                                >
                                                    Upload photo
                                                </Typography>
                                            </Stack>
                                        )}
                                        {image && (
                                            <>
                                                <Avatar
                                                    src={image}
                                                    alt="Profile preview"
                                                    sx={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <IconButton
                                                    sx={{
                                                        position: "absolute",
                                                        top: 4,
                                                        right: 4,
                                                        color: "common.white",
                                                        backgroundColor:
                                                            "error.main",
                                                        p: 0.5,
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "error.dark",
                                                        },
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveImage();
                                                    }}
                                                >
                                                    <CloseIcon
                                                        fontSize={
                                                            isSmallScreen
                                                                ? "small"
                                                                : "medium"
                                                        }
                                                    />
                                                </IconButton>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={handleAddImage}
                                        />
                                    </Box>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        align="center"
                                    >
                                        JPG, PNG (Max. 5MB)
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: isSmallScreen ? "column" : "row",
                            justifyContent: "flex-end",
                            gap: isSmallScreen ? 1 : 2,
                            pt: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="inherit"
                            size={isSmallScreen ? "small" : "medium"}
                            onClick={onCancel}
                            sx={{
                                px: isSmallScreen ? 2 : 4,
                                borderRadius: 1,
                                fontWeight: 600,
                                width: isSmallScreen ? "100%" : "auto",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size={isSmallScreen ? "small" : "medium"}
                            disabled={isWorking}
                            onClick={handleSubmit(handleFormSubmit)}
                            sx={{
                                px: isSmallScreen ? 2 : 4,
                                borderRadius: 1,
                                fontWeight: 600,
                                width: isSmallScreen ? "100%" : "auto",
                            }}
                        >
                            {isWorking
                                ? "Processing..."
                                : isEditSession
                                ? "Save Changes"
                                : "Register"}
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}