import { useIntl } from "react-intl";
import { useEffect, useRef, useState } from "react";

import { Fab, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { ButtonComp } from "@components/bits/Button";
import { SingleMessage } from "./ConvoSectionSingleMessage";
import { MessageLoaderSkeleton } from "@components/bits/Skeleton/MessageLoaderSkeleton";

import { useLoading } from "@utils/index";
import { MessagePerPage } from "../constant";
import { setConvoDetails } from "@store/extraSlice";
import { useConversationSocket } from "./context/ConversationProvider";
import { convoRelatedDetailsSelector } from "@store/extraSlice/selectors";
import { useCallConvoFetch } from "@api/helpers/inquire/conversation/useCallConvoFetch";

const calcTopBottomPageFromOffset = (offset) => {
    const page = {
        page: offset,
        hasReachEnd: offset === 0,
        top: offset + MessagePerPage,
        bottom: offset - MessagePerPage,
    };
    return page;
};
const DefScrollIntoViewOptions = {
    block: "start",
    inline: "nearest",
    behavior: "smooth",
};

export const ConvoSectionSearch = (props) => {
    const { className, hasLeftGroup } = props;

    const dispatch = useDispatch();
    const { formatMessage } = useIntl();

    const { isLoading, startLoading } = useLoading();
    const { conversationId } = useConversationSocket();
    const convoRelatedDetails = useSelector(convoRelatedDetailsSelector) || {};

    const lastRef = useRef(null);
    const timerRef = useRef(null);
    const itemRefs = useRef(new Map());

    const [msgList, setMsgList] = useState([]);
    const [page, setPage] = useState(
        calcTopBottomPageFromOffset(convoRelatedDetails?.msgOffset || 0)
    );

    useEffect(() => {
        if (convoRelatedDetails?.msgOffset !== undefined) {
            setPage(
                calcTopBottomPageFromOffset(convoRelatedDetails?.msgOffset)
            );

            startLoading(500);
        }
    }, [convoRelatedDetails?.msgOffset]);

    const handleSuccess = (data) => {
        const l = data?.data?.rows || [];
        setMsgList((v) => {
            if (page.fetch === "top") return [...l, ...v];
            if (page.fetch === "bottom") return [...v, ...l];
            return l;
        });
        setPage((v) => ({ ...v, fetch: undefined }));

        if (timerRef?.current) clearTimeout(timerRef.current);
        const len = l?.length;

        const targetId =
            page.fetch === "top"
                ? l[len < MessagePerPage ? len : MessagePerPage]?.message_id
                : page.fetch === "bottom"
                ? l[len - 1]?.message_id
                : convoRelatedDetails?.selectedSearchMsgId;

        if (targetId) {
            timerRef.current = setTimeout(() => {
                itemRefs.current.get(`${targetId}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 500);
        }
    };

    const { count = 0, loading: l } = useCallConvoFetch(
        {
            offset: page?.page,
            id: conversationId,
            limit: page.limit || MessagePerPage,
        },
        handleSuccess
    );

    const loading = isLoading || l;

    const resetOverlay = () => {
        dispatch(
            setConvoDetails({
                msgOffset: undefined,
                showMessageOverlay: false,
                selectedSearchMsgId: undefined,
            })
        );
        scrollToLast();
    };

    const handleFetchOld = () => {
        setPage((v) => ({
            ...v,
            page: v.top,
            fetch: "top",
            limit: undefined,
            top: v.top + MessagePerPage,
        }));
    };

    const handleFetchNew = () => {
        setPage((v) => ({
            ...v,
            fetch: "bottom",
            page: v.bottom < 0 ? 0 : v.bottom,
            hasReachEnd: v.bottom < 0 ? true : false,
            limit: v.bottom < 0 ? v.bottom + MessagePerPage : undefined,
            bottom: v.bottom - MessagePerPage,
        }));
    };
    const scrollToLast = (args = DefScrollIntoViewOptions) => {
        lastRef.current?.scrollIntoView(args);
    };

    return (
        <div className={`csw-cs ${className || ""}`} key="csw-cs">
            {!loading && page.top + 1 >= count && (
                <Typography
                    align="center"
                    component="div"
                    variant="caption"
                    color="textSecondary"
                    className="csw-cs-start"
                >
                    {formatMessage({ id: "start_of_conversation" })}
                </Typography>
            )}
            {!loading && page.top + 1 < count && (
                <ButtonComp
                    size="small"
                    color="secondary"
                    onClick={handleFetchOld}
                    className="csw-cs-fetch-old"
                    startIcon={<AddCircleOutlineIcon fontSize="small" />}
                >
                    {formatMessage({ id: "fetch_old_conversation" })}
                </ButtonComp>
            )}
            {loading && (!page.fetch || page.fetch === "top") && (
                <MessageLoaderSkeleton
                    key="loading"
                    length={2}
                    className="csw-cs-loader"
                />
            )}

            <ul className="csw-cs-ul">
                <>
                    {msgList?.map((i, j) => {
                        const id = `${i?.message_id}`;

                        return (
                            <SingleMessage
                                idx={j}
                                detail={i}
                                key={`${id}-${j}`}
                                hasLeftGroup={hasLeftGroup}
                                searchedMessageId={
                                    convoRelatedDetails?.selectedSearchMsgId
                                }
                                ref={(el) => {
                                    if (el) itemRefs.current.set(id, el);
                                    // Save the reference
                                    else itemRefs.current.delete(id); // Clean up when unmounted
                                }}
                            />
                        );
                    })}
                </>
                {loading && page.fetch === "bottom" && (
                    <MessageLoaderSkeleton
                        key="loading"
                        length={2}
                        className="csw-cs-loader"
                    />
                )}
                {!loading && !page.hasReachEnd && (
                    <ButtonComp
                        size="small"
                        color="secondary"
                        onClick={handleFetchNew}
                        className="csw-cs-fetch-old"
                        startIcon={<AddCircleOutlineIcon fontSize="small" />}
                    >
                        {formatMessage({ id: "fetch_new_conversation" })}
                    </ButtonComp>
                )}
                <div ref={lastRef} />
                {!page.hasReachEnd && (
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="recent"
                        className="csw-cs-ul-down"
                        onClick={() => resetOverlay()}
                    >
                        <ArrowDownwardIcon />
                    </Fab>
                )}
            </ul>
        </div>
    );
};
