import { FormattedMessage } from "react-intl";
import { Typography } from "@mui/material";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import StorageIcon from "@mui/icons-material/Storage";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const ICON = {
    file: <NoteAddIcon />,
    audio: <AudioFileIcon />,
    video: <VideoFileIcon />,
    storage: <StorageIcon />,
    all: <AddPhotoAlternateIcon />,
    image: <AddPhotoAlternateIcon />,
};

export const SelectFileComp1 = (props) => {
    const { type, label, className, onClick, sx = {} } = props;
    // const {formatMessage} = useIntl();;
    return (
        <Typography
            color="secondary"
            onClick={() => onClick?.()}
            className={`${className} select-file-comp`}
            sx={{
                gap: "1rem",
                display: "flex",
                padding: "1rem",
                cursor: "pointer",
                borderRadius: "4px",
                alignItems: "center",
                backgroundColor: "#ececec",
                border: "1px dashed lightgray",
                ...sx,
            }}
        >
            {ICON[type]}
            <span>
                <FormattedMessage id={`${label}`} />
            </span>
        </Typography>
    );
};
