import React from "react";
import {
    TextField as MuiTextField,
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
} from "@mui/material";
import ErrorText from "../../ui/ErrorText";

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
    register,
    errors,
    name,
    options,
    disabled,
}) => {
    return (
        <FormControl
            fullWidth
            variant="outlined"
            size="medium"
            disabled={disabled}
            error={!!errors[name]}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                {...register(name, { required: `${label} is required` })}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
            {errors[name] && <ErrorText message={errors[name].message} />}
        </FormControl>
    );
};
