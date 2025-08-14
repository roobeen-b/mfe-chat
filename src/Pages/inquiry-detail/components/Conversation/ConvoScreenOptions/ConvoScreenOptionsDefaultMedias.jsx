import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

import { ButtonComp } from "@components/bits/Button";
import { ImgComp } from "@components/bits/FileComp/ImgComp";

import { setConvoDetails } from "@store/extraSlice";
import { parseFileDetails } from "@utils/fileUtils";

import { useConversationSocket } from "../context/ConversationProvider";
import { FileTypeIcons } from "@components/bits/ChooseFileComp/ViewFiles/FileTypeIcons";
import { useCallConvoFetchInfinite } from "@api/helpers/inquire/conversation/useCallConvoFetchInfinite";

export const ConvoScreenOptionsDefaultMedias = (props) => {
    const { type } = props;

    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const { conversationId } = useConversationSocket();

    const { list } = useCallConvoFetchInfinite({
        limit: 4,
        filter: type,
        id: conversationId,
    });

    const setShowOPt = (v) => {
        dispatch(setConvoDetails({ sideMenuOpt: v }));
    };

    const files = list
        ?.map((i) => (!i?.is_deleted ? i?.file_details || i?.files || [] : []))
        ?.flat()
        ?.slice(0, 4);

    return (
        <>
            <Typography className="cs-ow-flex cs-ow-p1 cs-ow-pb0">
                <b>
                    {formatMessage({
                        id: type === "files" ? "shared_files" : "shared_medias",
                    })}
                </b>
                {files?.length > 0 && (
                    <ButtonComp
                        size="small"
                        color="primary"
                        onClick={() => setShowOPt(type)}
                    >
                        {formatMessage({ id: "see_all" })}
                    </ButtonComp>
                )}
            </Typography>
            <ul className="cs-ow-body-medias cs-ow-py">
                {files?.length === 0 && (
                    <Typography color="textSecondary" variant="body2">
                        {formatMessage({
                            id: type === "files" ? "no_files" : "no_media",
                        })}
                    </Typography>
                )}

                {files?.map((file, l) => {
                    const { url, type, title } = parseFileDetails(file);

                    const IconComponent =
                        FileTypeIcons[type] || FileTypeIcons["other"];

                    return (
                        <li
                            key={`${l}`}
                            title={title}
                            data-index={l}
                            className="cs-ow-body-medias-li"
                        >
                            {type === "image" ? (
                                <ImgComp
                                    src={url}
                                    width={60}
                                    type="comp"
                                    height={60}
                                    alt={title}
                                    // objectFit="contain"
                                />
                            ) : (
                                <IconComponent
                                    color="primary"
                                    sx={{ fontSize: 60 }}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
