import React from "react";
import {
    Slide,
    Dialog,
    styled,
    IconButton,
    DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledDialog = styled(Dialog)(() => ({
    "& .MuiPaper-root": {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const FullscreenDialog = ({
    children,
    onDialogClose,
    enableBackdropClose = true,
    ...dialogProps
}) => {
    const handleClose = (e) => {
        e.stopPropagation();
        onDialogClose?.();
    };

    const handleOnClose = (_, reason) => {
        if (reason === "backdropClick" && enableBackdropClose) return;
        onDialogClose?.();
    };

    return (
        <StyledDialog
            fullScreen
            onClose={handleOnClose}
            slots={{ transition: Transition }}
            {...dialogProps}
        >
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    top: 16,
                    zIndex: 2,
                    right: 16,
                    color: "white",
                    position: "absolute",
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>{children}</DialogContent>
        </StyledDialog>
    );
};
