import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Modal, IconButton } from "@mui/material";

import { ModalTitle } from "./ModalTitle";
import { ModalContent } from "./ModalContent";
import { ModalActions } from "./ModalActions";
import { ModalWrapper } from "./ModalWrapper";

export const ModalComp = ({
    open,
    title,
    onClose,
    actions,
    children,
    noIcon = false,
    colorTitle = true,
    centerTitle = false,
    modalType = "default",
    enableBackdropClose = true,
    closeIcon = true, // Default is true for showing the close icon
    maxWidth = 500, // Default width of the modal (can be controlled externally)
    ...props
}) => {
    const handleClose = () => {
        onClose?.({}, "escapeKeyDown");
    };

    const handleOnClose = (event, reason) => {
        if (reason === "backdropClick" && enableBackdropClose) return;
        onClose?.(event, reason);
    };

    return (
        <Modal open={open} onClose={handleOnClose} {...props}>
            <ModalWrapper maxWidth={maxWidth} className="mw">
                {closeIcon && (
                    <IconButton onClick={handleClose} className="mw-close">
                        <CloseIcon />
                    </IconButton>
                )}
                {title && title !== "" && (
                    <ModalTitle
                        noIcon={noIcon}
                        modalType={modalType}
                        colorTitle={colorTitle}
                        centerTitle={centerTitle}
                    >
                        {title}
                    </ModalTitle>
                )}
                <ModalContent>{children}</ModalContent>
                <ModalActions onClose={handleClose}>{actions}</ModalActions>
            </ModalWrapper>
        </Modal>
    );
};
