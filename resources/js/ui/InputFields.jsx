import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    TextField as MuiTextField,
    InputAdornment,
    IconButton,
    MenuItem,
    CircularProgress,
    Box,
    Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

export const TextField = ({
    label,
    register,
    errors,
    name,
    type = "text",
    disabled,
}) => {
    return (
        <MuiTextField
            fullWidth
            label={label}
            variant="outlined"
            size="medium"
            type={type}
            {...register(name, { required: `${label} is required` })}
            disabled={disabled}
            error={!!errors[name]}
            helperText={errors[name] ? errors[name].message : ""}
        />
    );
};

export const Select = ({
    label,
    defaultValue,
    register,
    name,
    errors,
    options = [],
    disabled,
    ...rest
}) => {
    return (
        <MuiTextField
            select
            label={label}
            fullWidth
            defaultValue={defaultValue}
            variant="outlined"
            size="medium"
            error={!!errors[name]}
            helperText={errors[name]?.message || ""}
            disabled={disabled}
            {...register(name, {
                required: `${label} is required`,
            })}
            {...rest}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </MuiTextField>
    );
};

export const TextArea = ({
    label,
    register,
    name,
    errors,
    rows = 4,
    ...rest
}) => {
    return (
        <MuiTextField
            label={label}
            multiline
            rows={rows}
            fullWidth
            variant="outlined"
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message}
            {...(register && name ? register(name) : {})}
            {...rest}
        />
    );
};

export const LocationField = ({
    label,
    register,
    errors,
    name,
    type = "text",
    disabled = false,
    showButton = false,
    setValue,
    ...props
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [geolocationError, setGeolocationError] = useState(null);
    const typingTimeoutRef = useRef(null);
    const inputRef = useRef(null);
    const providerRef = useRef(new OpenStreetMapProvider());

    // Handle search input changes with debouncing
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setGeolocationError(null);

        // Clear previous timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set new timeout (500ms delay)
        typingTimeoutRef.current = setTimeout(() => {
            performSearch(value);
        }, 1000);
    };

    const performSearch = async (query) => {
        if (query.length > 2) {
            setIsSearching(true);
            try {
                const language = "en"; // You can dynamically get this from context or user preference
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query
                )}&addressdetails=1&limit=5&countrycodes=af&lang=${language}`;

                const response = await fetch(url);
                const data = await response.json();

                const results = data.map((item) => ({
                    label: item.display_name,
                    x: item.lon,
                    y: item.lat,
                }));

                setSuggestions(results);
            } catch (error) {
                console.error("Search error:", error);
                setSuggestions([]);
            } finally {
                setIsSearching(false);
                if (inputRef.current) inputRef.current.focus();
            }
        } else {
            setSuggestions([]);
        }
    };

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    // Handle location selection
    const handleSelectLocation = (result) => {
        const { x: lng, y: lat } = result;
        const locationText = `${lat}, ${lng}`;
        setSearchQuery(result.label);
        setValue(name, locationText, { shouldValidate: true });
        setSuggestions([]);
        // Restore focus after selection
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Handle geolocation button click
    const handleFindLocation = () => {
        setGeolocationError(null);

        if (navigator.geolocation) {
            setIsSearching(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude: lat, longitude: lng } = position.coords;
                    const locationText = `${lat}, ${lng}`;
                    setSearchQuery("Your current location");
                    setValue(name, locationText, { shouldValidate: true });
                    setIsSearching(false);
                    // Restore focus after geolocation
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setGeolocationError(
                        "Could not get your location. Please try again or search manually."
                    );
                    setIsSearching(false);
                }
            );
        } else {
            setGeolocationError(
                "Geolocation is not supported by your browser."
            );
        }
    };

    return (
        <Box sx={{ position: "relative" }}>
            <MuiTextField
                fullWidth
                label={label}
                variant="outlined"
                size="medium"
                type={type}
                value={searchQuery}
                onChange={handleSearchChange}
                disabled={disabled || isSearching}
                error={!!errors[name] || !!geolocationError}
                helperText={
                    errors[name]?.message ||
                    geolocationError ||
                    (isSearching ? "Searching..." : "")
                }
                inputRef={(el) => {
                    inputRef.current = el;
                    register(name, { required: `${label} is required` }).ref(
                        el
                    );
                }}
                InputProps={{
                    endAdornment: showButton && (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={handleFindLocation}
                                disabled={disabled || isSearching}
                                aria-label={label}
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

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
                <Paper
                    sx={{
                        position: "absolute",
                        zIndex: 1,
                        width: "100%",
                        maxHeight: 200,
                        overflow: "auto",
                        mt: 0.5,
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: 3,
                    }}
                >
                    {suggestions.map((result, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => handleSelectLocation(result)}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                },
                            }}
                        >
                            {result.label}
                        </MenuItem>
                    ))}
                </Paper>
            )}
        </Box>
    );
};
