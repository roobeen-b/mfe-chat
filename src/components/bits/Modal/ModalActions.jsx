// components/ModalActions.tsx
import React from "react";
import { useIntl } from "react-intl";
import { Box, Button } from "@mui/material";

export const ModalActions = ({ children, onClose }) => {
    const intl = useIntl();

    return (
        <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
            {children || (
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    {intl.formatMessage({ id: "close" })}
                </Button>
            )}
        </Box>
    );
};
