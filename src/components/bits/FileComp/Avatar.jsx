import React from "react";
import { Avatar } from "@mui/material";

export const AvatarComp = ({
    src,
    alt = "",
    allText = false,
    noTitle = false,
    ...props
}) => {
    // Compute avatarText based on the alt prop
    const avatarText = allText ? alt : alt?.slice(0, 1)?.toUpperCase();

    return (
        <Avatar
            alt={alt}
            src={src}
            {...props}
            title={noTitle ? undefined : alt}
        >
            {!src && avatarText}
        </Avatar>
    );
};
