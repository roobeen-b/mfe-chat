import { Box, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { parseFileDetails, revokeObjectURLSrc } from "@utils/fileUtils";
import { FileTypeIcons } from "./FileTypeIcons";

export const ViewFilesIconText = (props) => {
    const {
        className,
        urls = [],
        files = [],
        onChangeUrls,
        onChangeFiles,
        disabled = false,
        insideInput = false,
    } = props;

    const handleRemove = (idx, src) => {
        if (disabled) return;
        const tempList = [...files];
        tempList.splice(idx, 1);
        if (onChangeFiles) onChangeFiles(tempList);
        if (src) revokeObjectURLSrc(src);
    };

    const handleRemove2 = (idx) => {
        if (disabled) return;
        const tempList = [...urls];
        tempList.splice(idx, 1);
        if (onChangeUrls) onChangeUrls(tempList);
    };

    const sx = insideInput
        ? {
              overflowX: "auto",
              maxHeight: "62px",
              flexWrap: "nowrap",
              overflowY: "hidden",
              alignItems: "center",
              padding: "0.4rem .5rem",

              top: 0,
              width: "100%",
              position: "absolute",
          }
        : {};
    return (
        <Box
            component="ul"
            className={"vf-it " + className}
            sx={{ display: "flex", ...sx }}
        >
            <Box
                className={"vf-it-list"}
                sx={{
                    width: "100%",
                    display: "flex",
                    gap: insideInput ? "0.2rem" : "0.3rem",
                    flexWrap: insideInput ? "nowrap" : "wrap",
                    // justifyContent: insideInput ? "flex-start" : "center",
                }}
            >
                {files?.length > 0 &&
                    files?.map((file, index) => {
                        const { url, type, name, title } =
                            parseFileDetails(file);
                        return (
                            <ItemComp
                                src={url}
                                type={type}
                                name={name}
                                title={title}
                                disabled={disabled}
                                key={`files-${index}`}
                                handleRemove={() => handleRemove(index, url)}
                            />
                        );
                    })}
                {urls?.length > 0 &&
                    [...urls]?.map((file, index) => {
                        const { url, type, name, title } =
                            parseFileDetails(file);
                        return (
                            <ItemComp
                                src={url}
                                type={type}
                                name={name}
                                title={title}
                                disabled={disabled}
                                key={`urls-${index}`}
                                handleRemove={() => handleRemove2(index)}
                            />
                        );
                    })}
            </Box>
        </Box>
    );
};

const ItemComp = (props) => {
    const {
        src,
        name,
        title,
        handleRemove,
        type = "other",
        disabled = false,
    } = props;

    const IconComponent = FileTypeIcons[type];

    const handleCancelClick = () => {
        if (handleRemove) handleRemove();
    };
    return (
        <Box
            title={name}
            component="li"
            className={"vf-it-list-item"}
            sx={{
                gap: "0.2rem",
                width: "100px",
                display: "flex",
                minWidth: "100px",
                padding: "0.5rem",
                alignItems: "center",
                position: "relative",
                borderRadius: "0.5rem",
                backgroundColor: "secondary.light",
            }}
        >
            {type === "image" ? (
                <AvatarComp
                    src={src}
                    alt={title}
                    variant="rounded"
                    sx={{ width: 30, height: 30 }}
                    className={"vf-it-list-item-avatar"}
                />
            ) : (
                <IconComponent
                    color="primary"
                    className={"vf-it-list-item-icon"}
                />
            )}
            <Typography
                align="center"
                variant="caption"
                color="textSecondary"
                className={"vf-it-list-item-text"}
                sx={{
                    flex: 1,
                    lineHeight: 1.25,
                    overflow: "hidden",
                    wordBreak: "break-all",
                }}
            >
                {title}
            </Typography>
            {!disabled && (
                <CancelIcon
                    fontSize="small"
                    onClick={handleCancelClick}
                    className={"vf-it-list-item-cancel"}
                    sx={{
                        top: -4,
                        right: -4,
                        cursor: "pointer",
                        position: "absolute",
                        color: "secondary.dark",
                    }}
                />
            )}
        </Box>
    );
};
