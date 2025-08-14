import { Box, Tooltip } from "@mui/material";

import { FileTypeIcons } from "./FileTypeIcons";
import { AvatarComp } from "@components/bits/FileComp/Avatar";

import { parseFileDetails } from "@utils/fileUtils";
import { breakpoint } from "@styles/mui/theme";

export const ViewSquareFilesIconText = (props) => {
    const { className, attachments = [] } = props;

    const sx = {};
    return (
        <Box
            component="ul"
            className={"vf-it " + className}
            sx={{ display: "flex", ...sx }}
        >
            <Box
                className={`vf-it-list vf-it-list-${attachments?.length}`}
                sx={{
                    gap: "0rem",
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {attachments?.length > 0 &&
                    attachments?.map((file, index) => {
                        const { url, type, title } = parseFileDetails(file);

                        return (
                            <ItemComp
                                src={url}
                                type={type}
                                title={title}
                                index={index + 1}
                                key={`files-${index + 1}`}
                            />
                        );
                    })}
            </Box>
        </Box>
    );
};

const ItemComp = (props) => {
    const { src, type, index, title } = props;

    const IconComponent = FileTypeIcons[type] || FileTypeIcons["other"];

    return (
        <Tooltip title={title}>
            <Box
                component="li"
                className={`vf-it-list-item vf-it-list-item-${index}`}
                sx={{
                    gap: "0",
                    display: "flex",
                    padding: "0.25rem",
                    position: "relative",
                    borderRadius: "0.5rem",
                }}
            >
                {type === "image" ? (
                    <AvatarComp
                        noTitle
                        src={src}
                        alt={title}
                        variant="rounded"
                        sx={{
                            width: 100,
                            height: 100,
                            [breakpoint("sm")]: { width: 60, height: 60 },
                        }}
                        className={`vf-it-list-item-avatar vf-it-list-item-avatar-${index}`}
                    />
                ) : (
                    <IconComponent
                        color="primary"
                        sx={{
                            width: 50,
                            height: 50,
                            padding: "0.25rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "secondary.light",
                        }}
                        className={`vf-it-list-item-icon vf-it-list-item-icon-${index}`}
                    />
                )}
            </Box>
        </Tooltip>
    );
};
