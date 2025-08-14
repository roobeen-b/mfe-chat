// SelectField.tsx
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";

export const SelectField = ({
    startAdornment,
    endAdornment,
    label,
    options,
    fullWidth = false,
    ...props
}) => {
    return (
        <FormControl variant="outlined" fullWidth={fullWidth}>
            {label && <InputLabel>{label}</InputLabel>}
            <Select
                {...props}
                label={label}
                startAdornment={
                    startAdornment && (
                        <InputAdornment position="start">
                            {startAdornment}
                        </InputAdornment>
                    )
                }
                endAdornment={
                    endAdornment && (
                        <InputAdornment position="end">
                            {endAdornment}
                        </InputAdornment>
                    )
                }
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
