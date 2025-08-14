import React from "react";
import { Box, Skeleton } from "@mui/material";

// const arr = Array.from({ length: 5 });
export const NotificationMessageSkeleton = (props) => {
    const { length = 5, className = "" } = props;
    return (
        <Box
            sx={{
                gap: "0.5rem",
                width: "100%",
                display: "flex",
                padding: "1rem 0",
                alignItems: "center",
                flexDirection: "column",
            }}
            className={className}
        >
            {Array.from({ length }).map((_, j) => (
                <Box
                    key={j}
                    sx={{
                        gap: "0.5rem",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Skeleton
                        width={40}
                        height={40}
                        animation="wave"
                        variant="circular"
                    />
                    <Box sx={{ flex: 1 }}>
                        <Skeleton animation="wave" height={20} width="60%" />
                        <Skeleton
                            height={20}
                            width="90%"
                            animation="wave"
                            style={{ marginBottom: 6 }}
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    );
};
