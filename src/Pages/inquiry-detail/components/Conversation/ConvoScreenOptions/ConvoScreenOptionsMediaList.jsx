import { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "@mui/material";

import { ButtonComp } from "@components/bits/Button";
import { EmptyArea } from "@components/bits/EmptyArea";
import { ImgComp } from "@components/bits/FileComp/ImgComp";
import { FilesSkeleton } from "@components/bits/Skeleton/FilesSkeleton";
import { FileTypeIcons } from "@components/bits/ChooseFileComp/ViewFiles/FileTypeIcons";
import { ViewLargeFilesSliderDialog } from "@components/bits/ChooseFileComp/ViewFiles/ViewLargeFilesSliderModal";

import { TableConfig } from "@config/config";
import { parseFileDetails } from "@utils/fileUtils";

import { useConversationSocket } from "../context/ConversationProvider";
import { useCallConvoFetchInfinite } from "@api/helpers/inquire/conversation/useCallConvoFetchInfinite";

export const ConvoScreenOptionsMediaList = (props) => {
    const { type } = props;

    const { formatMessage } = useIntl();
    const { conversationId } = useConversationSocket();

    const { list, count, setSize, isReachingEnd, loading } =
        useCallConvoFetchInfinite({
            filter: type,
            id: conversationId,
            limit: TableConfig.defaultPerPage * 2,
        });

    return (
        <div className="cs-ow-media-list">
            {count === 0 && !loading && (
                <EmptyArea
                    title=""
                    iconWidth="200px"
                    subtitle="no_medias_shared_yet"
                    className="cs-ow-media-empty-area cs-ow-p1"
                />
            )}

            {loading && <FilesSkeleton length={20} size={70} />}
            <ConvoScreenOptionsMediaLists list={list} />
            {isReachingEnd && count > 20 && (
                <EmptyArea
                    title=""
                    iconWidth="50px"
                    className="cs-ow-media-empty-area cs-ow-p1"
                    subtitle={
                        list.length === 0
                            ? undefined
                            : "you_have_reached_the_end"
                    }
                />
            )}

            {!isReachingEnd && !loading && (
                <div className="cs-ow-p1">
                    <ButtonComp fullWidth onClick={() => setSize()}>
                        {formatMessage({ id: "load_more" })}
                    </ButtonComp>
                </div>
            )}
        </div>
    );
};

const ConvoScreenOptionsMediaLists = (props) => {
    const { list } = props;
    const [slideIndex, setSlideIndex] = useState(null);

    // const files = list?.map((i) => i?.files || [])?.flat();
    const files = list
        ?.map((i) => (!i?.is_deleted ? i?.file_details || i?.files || [] : []))
        ?.flat();
    const handleCloseDialog = () => setSlideIndex(null);
    return (
        <>
            <ul className="cs-ow-media-list-ul">
                {files?.map((file, l) => {
                    const { url, type, name, title } = parseFileDetails(file);

                    const IconComponent =
                        FileTypeIcons[type] || FileTypeIcons["other"];

                    return (
                        <li
                            key={`${l}`}
                            title={name}
                            data-index={l}
                            onClick={() => setSlideIndex(l)}
                            className="cs-ow-media-list-ul-li"
                        >
                            {type === "image" ? (
                                <ImgComp
                                    type="comp"
                                    src={url}
                                    width={89}
                                    height={89}
                                    alt="Image"
                                    className={"cs-ow-media-list-ul-li-image"}
                                />
                            ) : (
                                <div className={"cs-ow-media-list-ul-li-doc"}>
                                    <IconComponent
                                        color="primary"
                                        className={
                                            "cs-ow-media-list-ul-li-doc-icon"
                                        }
                                    />
                                    <Typography
                                        variant="caption"
                                        className={
                                            "cs-ow-media-list-ul-li-doc-name"
                                        }
                                    >
                                        {title}
                                    </Typography>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <ViewLargeFilesSliderDialog
                files={files}
                index={slideIndex}
                closeDialog={handleCloseDialog}
            />
        </>
    );
};
