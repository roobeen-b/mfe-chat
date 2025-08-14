// Checkbox.tsx
import MUICheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export const Checkbox = ({
    label = "",
    className = "",
    labelPlacement = "end",
    ...props
}) => {
    return (
        <FormControlLabel
            label={label}
            className={className}
            labelPlacement={labelPlacement}
            control={<MUICheckbox {...props} />}
        />
    );
};
