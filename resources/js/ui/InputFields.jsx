import { useState, useRef, memo } from "react";
import {
    TextField as MuiTextField,
    InputAdornment,
    IconButton,
    MenuItem,
    CircularProgress,
    Box,
    Paper,
    // Typography,
    Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "leaflet-geosearch/dist/geosearch.css";
import { useEffect } from "react";
import { useController } from "react-hook-form";

// Custom TextField Component
export const TextField = memo(
    ({ label, name, control, errors, type = "text", disabled, ...rest }) => {
        const { field, fieldState } = useController({
            name,
            control,
            rules: { required: `${label} is required` },
            defaultValue: "",
        });

        return (
            <MuiTextField
                fullWidth
                label={label}
                variant="outlined"
                size="medium"
                type={type}
                error={!!fieldState.error}
                helperText={fieldState.error?.message || ""}
                disabled={disabled}
                {...field}
                {...rest}
            />
        );
    }
);

// Custom Select Component
export const Select = memo(
    ({ label, name, control, errors, options, disabled, ...rest }) => {
        const { field, fieldState } = useController({
            name,
            control,
            defaultValue: "",
        });

        return (
            <MuiTextField
                select
                fullWidth
                label={label}
                variant="outlined"
                size="medium"
                error={!!fieldState.error}
                helperText={fieldState.error?.message || ""}
                disabled={disabled}
                {...field}
                {...rest}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiTextField>
        );
    }
);

// Custom TextArea Component
export const TextArea = memo(
    ({ label, name, control, errors, rows = 4, disabled, ...rest }) => {
        const { field, fieldState } = useController({
            name,
            control,
            defaultValue: "",
        });

        return (
            <MuiTextField
                fullWidth
                multiline
                rows={rows}
                label={label}
                variant="outlined"
                size="medium"
                error={!!fieldState.error}
                helperText={fieldState.error?.message || ""}
                disabled={disabled}
                {...field}
                {...rest}
            />
        );
    }
);

export const LocationField = memo(
    ({
        label,
        name,
        control,
        disabled = false,
        isEditMode = false,
        onEditToggle,
        isEditing: isEditingProp,
        showButton = false,
        ...props
    }) => {
        const { field, fieldState } = useController({
            name,
            control,
            defaultValue: "",
        });

        const [isSearching, setIsSearching] = useState(false);
        const [locationName, setLocationName] = useState("");

        useEffect(() => {
            // Set initial display value if there's a value
            if (field.value) {
                setLocationName("Your current location");
            }
        }, [field.value]);

        if (!control) {
            console.error("LocationField: 'control' prop is required");
            return (
                <MuiTextField
                    label={label}
                    error
                    helperText="Form control not available"
                    disabled
                    {...props}
                />
            );
        }

        const handleFindLocation = () => {
            if (navigator.geolocation) {
                setIsSearching(true);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const locationText = `${position.coords.latitude},${position.coords.longitude}`;
                        setLocationName("Your current location");
                        field.onChange(locationText);
                        setIsSearching(false);
                        onEditToggle && onEditToggle(false);
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                        setIsSearching(false);
                    }
                );
            }
        };

        // Edit mode view when not editing
        if (isEditMode && !isEditingProp) {
            return (
                <Button
                    variant="outlined"
                    startIcon={<LocationOnIcon />}
                    onClick={() => onEditToggle(true)}
                    disabled={disabled}
                    sx={{ flexShrink: 0 }}
                >
                    Change Location
                </Button>
            );
        }

        // Main component render
        return (
            <Box sx={{ position: "relative" }}>
                <MuiTextField
                    fullWidth
                    label={label}
                    value={locationName}
                    disabled={true} // Always disabled since we're not allowing manual input
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                        endAdornment: showButton && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleFindLocation}
                                    disabled={disabled || isSearching}
                                    edge="end"
                                >
                                    {isSearching ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        <LocationOnIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    {...props}
                />
            </Box>
        );
    }
);

export const PasswordField = memo(
    ({
        label,
        name,
        control,
        disabled = false,
        isEditMode = false,
        onEditToggle,
        isEditing,
        ...props
    }) => {
        const { field, fieldState } = useController({
            name,
            control,
            defaultValue: "",
        });
        const [password, setPassword] = useState("");

        const handleSavePassword = () => {
            field.onChange(password);
            setPassword("");
            onEditToggle && onEditToggle(false);
        };

        const handleCancel = () => {
            setPassword("");
            onEditToggle && onEditToggle(false);
        };

        // Button mode
        if (isEditMode && !isEditing) {
            return (
                <Button
                    variant="outlined"
                    onClick={() => onEditToggle(true)}
                    disabled={disabled}
                    sx={{ flexShrink: 0 }}
                >
                    Change Password
                </Button>
            );
        }

        // Editing mode
        return (
            <Box sx={{ width: "100%" }}>
                <MuiTextField
                    fullWidth
                    label={label}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={disabled}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    {...props}
                />
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        mt: 1,
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        disabled={disabled}
                        size="small"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSavePassword}
                        disabled={disabled || !password}
                        size="small"
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        );
    }
);
