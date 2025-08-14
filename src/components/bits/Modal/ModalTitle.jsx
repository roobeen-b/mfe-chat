import React from "react";

import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import StorageIcon from "@mui/icons-material/Storage";
import WarningIcon from "@mui/icons-material/Warning";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ICONS = {
    info: <InfoIcon />,
    error: <ErrorIcon />,
    like: <FavoriteIcon />,
    warning: <WarningIcon />,
    storage: <StorageIcon />,
    success: <CheckCircleIcon />,
    delete: <DeleteForeverIcon />,
};

export const ModalTitle = ({
    children,
    noIcon = false,
    colorTitle = true,
    centerTitle = false,
    modalType = "default",
}) => {
    const theme = useTheme();

    // Determine color based on modal type from the theme's palette
    const COLORS = {
        info: theme.palette.info.main,
        like: theme.palette.error.main,
        error: theme.palette.error.main,
        storage: theme.palette.info.main,
        delete: theme.palette.error.main,
        default: theme.palette.text.primary,
        warning: theme.palette.warning.main,
        success: theme.palette.success.main,
    };

    const icon = ICONS[modalType];
    const color = COLORS[modalType] || COLORS.default;

    return (
        <Box
            sx={{
                mb: 1,
                pb: 1,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #E0E0E0",
                justifyContent: centerTitle ? "center" : "",
            }}
        >
            {/* Render icon if noIcon is false */}
            {!noIcon &&
                icon &&
                React.cloneElement(icon, { sx: { color, mr: 1 } })}
            <Typography
                // variant="h6"
                component="h2"
                sx={{
                    fontWeight: 550,
                    fontSize: "1.3rem",
                    color: colorTitle ? color : "#1C1C1C",
                }}
            >
                {children}
            </Typography>
        </Box>
    );
};
