import * as React from "react";
import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
} from "../../ui/InputFields";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateUser } from "./useCreateUser";
import { useUpdateUser } from "./useUpdateUser";
import { useTranslation } from "react-i18next";

// Main Form Component
export default function CreateUser() {
    const { t } = useTranslation();

    const theme = useTheme();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const { state } = useLocation();
    const { id: editId, ...editValues } = state?.user || {};
    // In CreateUser component, add this state:
    const [editingField, setEditingField] = useState(null);

    const isEditSession = Boolean(editId);
    const [image, setImage] = useState(editValues?.user_image || null);
    const [imageFile, setImageFile] = useState(null);
    const { isCreating, createUser } = useCreateUser();
    const { isUpdating, updateUser } = useUpdateUser();
    const isWorking = isCreating || isUpdating;

    const { register, control, handleSubmit, setValue, reset } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    // const userLocation = useWatch({
    //     control,
    //     name: "userLocation",
    // });

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

    const onSubmit = (data) => {
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

        if (isEditSession) {
            updateUser(
                { formData, id: editId },
                {
                    onSuccess: () => {
                        navigate(
                            window.location.pathname.includes("/admin")
                                ? "/admin/users"
                                : "/"
                        );
                    },
                }
            );
        } else {
            createUser(formData, {
                onSuccess: () => {
                    navigate(
                        window.location.pathname.includes("/admin")
                            ? "/admin/users"
                            : "/"
                    );
                },
            });
        }
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
                    backgroundColor: "background.paper",
                    boxShadow: "none",
                    borderColor: "divider",
                }}
            >
                <Stack spacing={isSmallScreen ? 2 : 3}>
                    {/* Header Section */}
                    <Box>
                        <Typography
                            variant={
                                isSmallScreen
                                    ? "h6"
                                    : isMediumScreen
                                    ? "h5"
                                    : "h4"
                            }
                            sx={{
                                fontWeight: 700,
                                color: "text.primary",
                                mb: 1,
                            }}
                        >
                            {isEditSession ? t("AdminUser.EditTitle") : t("AdminUser.CreateTitle")}
                        </Typography>
                       <Typography
    variant={isSmallScreen ? "body2" : "body1"}
    color="text.secondary"
>
    {isEditSession
        ? t("AdminUser.EditDescription")
        : t("AdminUser.CreateDescription")}
</Typography>
                    </Box>

                    <Divider />

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
                                   {isEditSession ? t("AdminUser.EditDescription") : t("AdminUser.CreateDescription")}
                                </Typography>
                                <Grid
                                    container
                                    rowSpacing={2}
                                    // columnSpacing={isSmallScreen ? 0 : 0}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{ pr: isSmallScreen ? 0 : 2 }}
                                    >
                                        <TextField
                                            label={t("Form.FullName")}
                                            name="name"
                                            control={control}
                                            disabled={isWorking}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                           label={t("Form.Email")}
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
                                    // columnSpacing={isSmallScreen ? 1 : 2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        sx={{ pr: isSmallScreen ? 0 : 2 }}
                                    >
                                        <TextField
                                           label={t("Form.Phone")}
                                            name="phone"
                                            control={control}
                                            type="tel"
                                            disabled={isWorking}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select
                                            label={t("Form.Role")}
                                            name="role"
                                            control={control}
                                            options={[
                                                 { value: "admin", label: t("Form.Admin") },
    { value: "user", label: t("Form.User") },
                                            ]}
                                            disabled={isWorking}
                                            {...register("role", {
                                        required: "Role is required",
                                    })}
                                        />
                                    </Grid>
                                </Grid>

                                {/* // Then modify the fields section: */}
                                {isEditSession ? (
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                           {t("AdminUser.UpdateSensitiveInfo")}
                                        </Typography>

                                        {editingField === "password" ? (
                                            <PasswordField
                                               label={t("Form.Password")}
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
                                                label={t("Form.Location")}
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
                                                    label={t("Form.NewPassword")}
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
                                                    label={t("Form.Location")}
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
                                            label={t("Form.Password")}
                                            name="password"
                                            control={control}
                                            type="password"
                                            disabled={isWorking}
                                        />
                                        <LocationField
                                            label={t("Form.Location")}
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
                                       {t("Form.About")}
                                    </Typography>
                                    <TextArea
                                        label={t("Form.Description")}
                                        name="description"
                                        control={control}
                                        rows={isSmallScreen ? 3 : 5}
                                        disabled={isWorking}
                                    />
                                </Box>
                            </Stack>
                        </Grid>

                        {/* Right Column - Profile Picture */}
                        <Grid item xs={12} md={5}>
                            <Stack spacing={isSmallScreen ? 1.5 : 3}>
                                <Typography
                                    variant={isSmallScreen ? "subtitle1" : "h6"}
                                    sx={{
                                        fontWeight: 600,
                                        textAlign: "center",
                                    }}
                                >
                                    {t("Form.ProfilePicture")}
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
                                                ? 150
                                                : isMediumScreen
                                                ? 200
                                                : 280,
                                            height: isSmallScreen
                                                ? 150
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
                                                    {t("Form.UploadPhoto")}
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
                                        {t("Form.ImageNote")}
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
                            onClick={() => navigate(-1)}
                            sx={{
                                px: isSmallScreen ? 2 : 4,
                                borderRadius: 1,
                                fontWeight: 600,
                                width: isSmallScreen ? "100%" : "auto",
                            }}
                        >
                           {t("Admin.Common.Cancel")}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size={isSmallScreen ? "small" : "medium"}
                            disabled={isWorking}
                            onClick={handleSubmit(onSubmit)}
                            sx={{
                                px: isSmallScreen ? 2 : 4,
                                borderRadius: 1,
                                fontWeight: 600,
                                width: isSmallScreen ? "100%" : "auto",
                            }}
                        >

                                 {isWorking ? t("Common.Processing") : isEditSession ? t("Common.SaveChanges") : t("Form.CreateUser")}
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}
