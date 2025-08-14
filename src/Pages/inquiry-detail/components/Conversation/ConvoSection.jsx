import { useIntl } from "react-intl";
import { useEffect, useRef } from "react";
import { Typography } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { ButtonComp } from "@components/bits/Button";
import { EmptyArea } from "@components/bits/EmptyArea";
import { SingleMessage } from "./ConvoSectionSingleMessage";
import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { MessageLoaderSkeleton } from "@components/bits/Skeleton/MessageLoaderSkeleton";

import { useLoading } from "@utils/index";
import { MessagePerPage } from "../constant";
import { useConversationSocket } from "./context/ConversationProvider";

const DefScrollIntoViewOptions = {
    block: "nearest",
    inline: "nearest",
    behavior: "smooth",
};

export const ConvoSection = (props) => {
    const { loading: l, count, fetchOldConvo, hasLeftGroup } = props;

    const {
        sendStatus,
        msgs: messageList,
        convoUpdate,
    } = useConversationSocket();
    const { isLoading, startLoading } = useLoading();

    const { name, image } = convoUpdate;

    const loading = isLoading || l;
    const { formatMessage } = useIntl();
    const hasNoMsgs = messageList.length === 0 && count === 0;

    const lastRef = useRef(null);
    const itemRefs = useRef(new Map());

    useEffect(() => {
        const handleFinish = () => {
            scrollToLast({ behavior: "instant" });
        };
        startLoading(700, handleFinish);
    }, []);

    useEffect(() => {
        if (!sendStatus.scroll) return;
        // Scroll to the last message if the total messages are less or equal to MessagePerPage
        if (messageList.length <= MessagePerPage) {
            scrollToLast({ behavior: "instant" });
        } else {
            const scrollMessageRef = itemRefs.current.get(
                `${messageList[MessagePerPage]?.message_id}`
            );
            scrollMessageRef?.scrollIntoView({ behavior: "instant" });
        }
    }, [messageList.length, sendStatus.scroll]);

    useEffect(() => {
        if (
            !sendStatus.loading &&
            sendStatus.status === "success" &&
            sendStatus.scroll
        ) {
            scrollToLast();
        }

        return () => {};
    }, [sendStatus.loading, sendStatus.scroll, sendStatus.status]);

    const scrollToLast = (args = DefScrollIntoViewOptions) => {
        lastRef.current?.scrollIntoView(args);
    };

    const handleFetchOld = () => {
        if (!fetchOldConvo) return;
        fetchOldConvo();
    };

    const handleScrollToBottom = () => {
        if (messageList.length <= MessagePerPage) {
            scrollToLast();
        }
    };

    return (
        <div className={`csw-cs ${props.className || ""}`} key="csw-cs">
            {!loading && messageList.length >= count && (
                <div className="csw-cs-convo-start">
                    <AvatarComp
                        src={image}
                        alt={name}
                        sx={{ width: 60, height: 60 }}
                    />
                    <Typography align="center" fontWeight="bold">
                        {name}
                    </Typography>
                    <Typography
                        gutterBottom
                        align="center"
                        component="div"
                        variant="caption"
                        color="textSecondary"
                    >
                        {formatMessage({ id: "start_of_conversation" })}
                    </Typography>
                </div>
            )}
            {!loading && messageList.length < count && (
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

            {loading && (
                <MessageLoaderSkeleton
                    key="loading"
                    length={2}
                    className="csw-cs-loader"
                />
            )}
            {!loading && hasNoMsgs ? (
                <EmptyArea
                    title=""
                    iconWidth="200px"
                    subtitle="no_messages_yet_check_later"
                />
            ) : (
                ""
            )}
            <ul className="csw-cs-ul">
                {true ? (
                    <>
                        {messageList?.map((i, j) => {
                            const id = `${i?.message_id}`;
                            return (
                                <SingleMessage
                                    idx={j}
                                    key={`${id}-${j}`}
                                    hasLeftGroup={hasLeftGroup}
                                    scrollToBottom={handleScrollToBottom}
                                    ref={(el) => {
                                        if (el) {
                                            itemRefs.current.set(id, el); // Save the reference
                                        } else {
                                            itemRefs.current.delete(id); // Clean up when unmounted
                                        }
                                    }}
                                    detail={i}
                                />
                            );
                        })}
                    </>
                ) : (
                    ""
                )}
                {hasLeftGroup && (
                    <Typography
                        variant="caption"
                        align="center"
                        color="textSecondary"
                    >
                        {formatMessage({
                            id: "have_left_chat_cant_interact_anymore",
                        })}
                    </Typography>
                )}
                <div className="csw-cs-last" ref={lastRef} />
            </ul>
        </div>
    );
};
