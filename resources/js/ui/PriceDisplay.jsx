import React from "react";
import {
    Box,
    TextField as MuiTextField,
    InputAdornment,
    Button,
    Paper,
    Typography,
    Stack,
    Divider,
    Chip,
} from "@mui/material";

const PriceDisplay = ({
    control,
    register,
    errors,
    setValue,
    getValues,
    watch,
}) => {
    // Get current values
    const price = parseFloat(watch("price")) || 0;
    const discount = parseFloat(watch("discount")) || 0;
    const discountType = watch("discount_type");
    const currency = watch("currency");

    // Calculate final price
    const calculateFinalPrice = () => {
        if (discountType === "%") {
            const discountAmount = price * (discount / 100);
            return {
                original: price,
                discount: discountAmount,
                final: price - discountAmount,
            };
        } else {
            return {
                original: price,
                discount: discount,
                final: price - discount,
            };
        }
    };

    const { original, discount: discountAmount, final } = calculateFinalPrice();

    return (
        <Box>
            {/* Input Section */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                    mb: 3,
                }}
            >
                {/* Price Input */}
                <Box sx={{ flex: 1 }}>
                    <MuiTextField
                        fullWidth
                        label="Price"
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            min: {
                                value: 0,
                                message: "Price must be positive",
                            },
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        size="small"
                                        onClick={() =>
                                            setValue(
                                                "currency",
                                                currency === "USD" ? "AFN" : "USD"
                                            )
                                        }
                                        sx={{
                                            minWidth: 60,
                                            height: "100%",
                                            borderLeft: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 0,
                                            backgroundColor: "background.paper",
                                        }}
                                    >
                                        {currency === "AFN" ? "؋" : "$"}
                                    </Button>
                                </InputAdornment>
                            ),
                            inputProps: { min: "0" },
                        }}
                    />
                </Box>

                {/* Discount Input */}
                <Box sx={{ flex: 1 }}>
                    <MuiTextField
                        fullWidth
                        label="Discount"
                        type="number"
                        {...register("discount", {
                            min: {
                                value: 0,
                                message: "Discount must be positive",
                            },
                            max:
                                discountType === "%"
                                    ? {
                                          value: 100,
                                          message:
                                              "Discount cannot exceed 100%",
                                      }
                                    : undefined,
                        })}
                        error={!!errors.discount}
                        helperText={errors.discount?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        size="small"
                                        onClick={() =>
                                            setValue(
                                                "discount_type",
                                                discountType === "%"
                                                    ? "fixed"
                                                    : "%"
                                            )
                                        }
                                        sx={{
                                            minWidth: 60,
                                            height: "100%",
                                            borderLeft: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 0,
                                            backgroundColor: "background.paper",
                                        }}
                                    >
                                        {discountType === "fixed"
                                            ? "Fixed"
                                            : "%"}
                                    </Button>
                                </InputAdornment>
                            ),
                            inputProps: {
                                min: "0",
                                max: discountType === "%" ? "100" : undefined,
                            },
                        }}
                    />
                </Box>
            </Box>

            {/* Results Section */}
            {price > 0 && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Price Breakdown
                    </Typography>

                    <Stack spacing={1}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Original Price:</Typography>
                            <Typography>
                                {currency === "AFN" ? "؋" : "$"}
                                {original.toFixed(2)}
                            </Typography>
                        </Box>

                        {discount > 0 && (
                            <>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Typography>
                                        Discount (
                                        {discountType === "%"
                                            ? `${discount}%`
                                            : "Fixed"}
                                        ):
                                    </Typography>
                                    <Typography color="error.main">
                                        -{currency === "AFN" ? "؋" : "$"}
                                        {discountAmount.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Typography fontWeight="bold">
                                        You Pay:
                                    </Typography>
                                    <Typography
                                        fontWeight="bold"
                                        color="success.main"
                                    >
                                        {currency === "AFN" ? "؋" : "$"}
                                        {Math.max(0, final).toFixed(2)}
                                    </Typography>
                                </Box>

                                {discountType === "%" && (
                                    <Chip
                                        label={`${discount}% OFF`}
                                        color="success"
                                        size="small"
                                        sx={{ mt: 1, alignSelf: "flex-start" }}
                                    />
                                )}
                            </>
                        )}

                        {discount <= 0 && (
                            <Typography
                                color="text.secondary"
                                fontStyle="italic"
                            >
                                No discount applied
                            </Typography>
                        )}
                    </Stack>
                </Paper>
            )}
        </Box>
    );
};

export default PriceDisplay;
