import Button from "@mui/material/Button";
import { Spinner } from "./Spinner";

export const ButtonComp = ({
    isLoading = false,
    disabled,
    children,
    sx = {},
    ...props
}) => {
    const isDisabled = disabled || isLoading;

    return (
        <Button
            {...props}
            disabled={isDisabled}
            sx={{ position: "relative", ...sx }}
        >
            {isLoading && (
                <Spinner size={16} color="inherit" style={{ marginRight: 8 }} />
            )}
            {children}
        </Button>
    );
};
