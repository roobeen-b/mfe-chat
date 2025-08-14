import React, { useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";

export const CustomPopover = ({
    trigger,
    disabled,
    children,
    preventDefault,
    closeOnClick = true,
    anchorOrigin = { vertical: "bottom", horizontal: "left" },
    transformOrigin = { vertical: "top", horizontal: "left" },
    ...popoverProps
}) => {
    const timeoutIdRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        return () => clearTimeout(timeoutIdRef.current);
    }, []);

    const handleClick = (event) => {
        if (preventDefault) event.preventDefault();
        if (disabled) return;
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (event) => {
        if (preventDefault) event.preventDefault();

        if (closeOnClick) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = setTimeout(() => handleClose(), 1000);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? "custom-popover" : undefined;

    return (
        <div className="CustomPopover">
            <div
                onClick={handleClick}
                aria-describedby={id}
                className="CustomPopover-trigger"
            >
                {trigger}
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                className="CustomPopover-Popover"
                {...popoverProps}
            >
                <div
                    onClick={handleOptionClick}
                    className="CustomPopover-Popover-children"
                >
                    {children}
                </div>
            </Popover>
        </div>
    );
};
