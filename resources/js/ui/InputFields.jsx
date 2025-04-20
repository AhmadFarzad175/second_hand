import React from "react";
import {
    TextField as MuiTextField,
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
} from "@mui/material";

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
            variant="outlined"
            size="medium"
            error={!!errors[name]}
            helperText={errors[name]?.message || ''}
            disabled={disabled}
            {...register(name, { 
                required: `${label} is required`,
            })}
            {...rest}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value} >
                    {option.label}
                </MenuItem>
            ))}
        </MuiTextField>
    );
};


export const TextArea = ({ label, register, name, errors, rows = 4, ...rest }) => {
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