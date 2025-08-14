import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({
    open,
    onClose,
    title,
    children,
    actions,
    maxWidth = "lg", // Changed from "sm" to "lg" for larger default size
    fullWidth = true,
    dividers = false,
    closeButton = true,
    contentStyles = {}, // Added for custom content styling
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            sx={{
                "& .MuiDialog-paper": {
                    minHeight: "60vh", // Set minimum height
                    maxHeight: "90vh", // Set maximum height
                },
            }}
        >
            {title && (
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        backgroundColor: "#f5f5f5", // Optional: light gray background
                        borderBottom: "1px solid #e0e0e0", // Optional: subtle border
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                    >
                        {title}
                    </Typography>
                    {closeButton && (
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </DialogTitle>
            )}

            <DialogContent
                dividers={dividers}
                sx={{
                    padding: 3,
                    overflowY: "auto",
                    ...contentStyles,
                }}
            >
                {children}
            </DialogContent>

            {actions && (
                <DialogActions
                    sx={{
                        padding: 2,
                        backgroundColor: "#f5f5f5", // Match header
                        borderTop: "1px solid #e0e0e0", // Optional: subtle border
                    }}
                >
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CustomModal;
