// InputField.tsx
import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

export const InputField = ({
    InputLabelProps,
    startAdornment,
    endAdornment,
    InputProps,
    inputProps,
    slotProps,
    ...props
}) => {
    const ip = slotProps?.input || InputProps;
    return (
        <TextField
            {...props}
            slotProps={{
                htmlInput: { ...(slotProps?.htmlInput || inputProps) },
                inputLabel: { ...(slotProps?.inputLabel || InputLabelProps) },
                input: {
                    ...ip,
                    startAdornment: startAdornment ? (
                        <InputAdornment position="start">
                            {startAdornment}
                        </InputAdornment>
                    ) : (
                        ip?.startAdornment
                    ),
                    endAdornment: endAdornment ? (
                        <InputAdornment position="end">
                            {endAdornment}
                        </InputAdornment>
                    ) : (
                        ip?.endAdornment
                    ),
                },
            }}
        />
    );
};
