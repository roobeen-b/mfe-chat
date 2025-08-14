import { useIntl } from "react-intl";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";

import { ConvoScreenOptionsMediaList } from "./ConvoScreenOptionsMediaList";

export const ConvoScreenOptionsMedia = (props) => {
    const { setShowOPt, type } = props;
    const { formatMessage } = useIntl();
    return (
        <>
            <Typography className="cs-ow-flex cs-ow-p1">
                <b>
                    {formatMessage({
                        id: type === "files" ? "shared_files" : "shared_medias",
                    })}
                </b>
                <IconButton
                    size="small"
                    title={formatMessage({ id: "close" })}
                    aria-label="close"
                    onClick={() => setShowOPt("general")}
                >
                    <CloseIcon fontSize="small" htmlColor="#3D4548" />
                </IconButton>
            </Typography>
            {/* <Divider className="cs-ow-divider" /> */}
            <ConvoScreenOptionsMediaList type={type} />
        </>
    );
};
