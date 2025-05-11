import React, { useState, useRef } from "react";
import {
    TextField as MuiTextField,
    InputAdornment,
    IconButton,
    MenuItem,
    CircularProgress,
    Box,
    Paper,
    Typography,
    Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "leaflet-geosearch/dist/geosearch.css";
import { useEffect } from "react";
import { useController } from "react-hook-form";

// Custom TextField Component
export const TextField = React.memo(
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
export const Select = React.memo(
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
export const TextArea = React.memo(
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

export const LocationField = React.memo(
    ({
        label,
        name,
        control,
        disabled = false,
        showButton = false,
        isEditMode = false,
        ...props
    }) => {
        const { field, fieldState } = useController({
            name,
            control,
            defaultValue: "",
        });

        const [isEditing, setIsEditing] = useState(false);
        const [searchQuery, setSearchQuery] = useState("");
        const [suggestions, setSuggestions] = useState([]);
        const [isSearching, setIsSearching] = useState(false);
        const typingTimeoutRef = useRef(null);

        useEffect(() => {
            setSearchQuery(field.value ? "Selected location" : "");
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

        const performSearch = async (query) => {
            if (query.length > 2) {
                setIsSearching(true);
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                            query
                        )}&addressdetails=1&limit=5`
                    );
                    const data = await response.json();
                    setSuggestions(
                        data.map((item) => ({
                            label: item.display_name,
                            x: item.lon,
                            y: item.lat,
                        }))
                    );
                } catch (error) {
                    console.error("Search error:", error);
                    setSuggestions([]);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSuggestions([]);
            }
        };

        const handleSearchChange = (e) => {
            const value = e.target.value;
            setSearchQuery(value);
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(
                () => performSearch(value),
                500
            );
        };

        const handleSelectLocation = (result) => {
            const locationText = `${result.y},${result.x}`;
            setSearchQuery(result.label);
            field.onChange(locationText);
            setSuggestions([]);
            if (isEditMode) setIsEditing(false);
        };

        const handleFindLocation = () => {
            if (navigator.geolocation) {
                setIsSearching(true);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const locationText = `${position.coords.latitude},${position.coords.longitude}`;
                        setSearchQuery("Your current location");
                        field.onChange(locationText);
                        setIsSearching(false);
                        if (isEditMode) setIsEditing(false);
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                        setIsSearching(false);
                    }
                );
            }
        };

        // Render edit mode button if not currently editing
        if (isEditMode && !isEditing) {
            return (
                <Box>
                    <Typography sx={{ mb: 1 }}>
                        Location can be updated
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<LocationOnIcon />}
                        onClick={() => setIsEditing(true)}
                        disabled={disabled}
                    >
                        Change Location
                    </Button>
                </Box>
            );
        }

        // Main component render
        return (
            <Box sx={{ position: "relative" }}>
                <MuiTextField
                    fullWidth
                    label={label}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    disabled={disabled || isSearching}
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

                {suggestions.length > 0 && (
                    <Paper
                        sx={{
                            position: "absolute",
                            zIndex: 1,
                            width: "100%",
                            maxHeight: 200,
                            overflow: "auto",
                            mt: 0.5,
                        }}
                    >
                        {suggestions.map((result, index) => (
                            <MenuItem
                                key={`${result.label}-${index}`}
                                onClick={() => handleSelectLocation(result)}
                            >
                                {result.label}
                            </MenuItem>
                        ))}
                    </Paper>
                )}
            </Box>
        );
    }
);
