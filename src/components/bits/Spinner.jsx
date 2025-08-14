// Spinner.tsx
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const Spinner = ({
    size = 24,
    absolute = true,
    color = "primary",
    style,
}) => {
    const st = absolute
        ? {
              top: "50%",
              left: "50%",
              position: "absolute",
              marginTop: `-${size / 2}px`,
              marginLeft: `-${size / 2}px`,
          }
        : {};
    return (
        <CircularProgress
            size={size}
            color={color}
            style={{ ...st, ...style }}
        />
    );
};
