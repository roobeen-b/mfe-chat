"use client";

import { Box, Skeleton } from "@mui/material";

const formArr = (v) => Array.from({ length: v });

export const MessageLoaderSkeleton = (props) => {
    const { length = 4, className } = props;
    return (
        <Box
            className={className}
            id="MessageLoaderSkeleton"
            sx={{ gap: "1rem", display: "flex", flexDirection: "column" }}
        >
            {formArr(length).map((_, j) => {
                const isEven = (j + 1) % 2 === 0;
                return (
                    <Box
                        key={`loader-${j}`}
                        sx={{
                            gap: "0.5rem",
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Skeleton
                            width={50}
                            height={50}
                            animation="wave"
                            variant="circular"
                        />
                        <Box sx={{ flex: 1, order: isEven ? 1 : -1 }}>
                            <Skeleton
                                height={50}
                                width="70%"
                                animation="wave"
                                variant="rectangular"
                                sx={{
                                    borderRadius: "0.5rem",
                                    marginLeft: isEven ? 0 : "auto",
                                    borderTopLeftRadius: isEven ? 0 : "auto",
                                    borderTopRightRadius: isEven ? "auto" : 0,
                                }}
                            />
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};
