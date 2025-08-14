import ClearIcon from "@mui/icons-material/Clear";
import { Box, Typography } from "@mui/material";

import { getStringFromUri } from "@utils/regexHelper";
import { ButtonComp } from "@components/bits/Button";

export const ViewFilesText = (props) => {
    const { files, onChange, disabled = false, className } = props;

    const handleRemove = (idx) => () => {
        if (disabled) return;
        const tempList = [...files];
        tempList.splice(idx, 1);
        if (onChange) onChange(tempList);
    };

    return (
        <Box
            className={className}
            component="ul"
            sx={{
                gap: ".2rem",
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            {files?.length > 0 &&
                files?.map((file, index) => {
                    const title =
                        file === "string"
                            ? getStringFromUri(file)
                            : file?.name || file?.name;

                    return (
                        <ButtonComp
                            key={index}
                            size="small"
                            component="li"
                            disabled={disabled}
                            sx={{ whiteSpace: "nowrap", fontSize: "0.75rem" }}
                            endIcon={
                                onChange &&
                                !disabled && (
                                    <ClearIcon
                                        color="error"
                                        fontSize="small"
                                        style={{ fontSize: "0.75rem" }}
                                        onClick={handleRemove(index)}
                                    />
                                )
                            }
                        >
                            <Typography variant="caption" color="textSecondary">
                                &#164;&nbsp;{title}
                            </Typography>
                        </ButtonComp>
                    );
                })}
        </Box>
    );
};
