import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";

import { EditMessageHistory } from "./EditMessageHistory";
import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { MessageSeenBySection } from "./MessageSeenBySection";
import { RelativeTimeComp } from "@components/bits/RelativeTimeComp";
import { RelativeDateComp } from "@components/bits/RelativeDateComp";
import { ConvoSectionSingleMessageReactions } from "./ConvoSectionSingleMessageReactions";
import { ConvoSectionSingleMessageAttachments } from "./ConvoSectionSingleMessageAttachments";
import InfoGeneratedFromLinkCard from "@components/bits/InfoGeneratedFromLinkCard/InfoGeneratedFromLinkCard";

import {
    dateDifferenceInDays,
    dateDifferenceInMinutes,
} from "@utils/parseDate";
import { isEmojiOnly } from "@utils/stringHelpers";
import { userSelector } from "@store/authSlice/selectors";
import { toggleConvoRelatedModal } from "@store/extraSlice";
import { ConvoSectionActions } from "./ConvoSectionActions";
import { useConversationSocket } from "./context/ConversationProvider";
import { ConvoSectionSingleMessageReplyMessage } from "./ConvoSectionSingleMessageReplyMessage";
import { ConvoSectionSingleMessageSystemMessage } from "./ConvoSectionSingleMessageSystemMessage";

const getReplyMessage = (reply, msgs, hasAttachmentsText, isDeletedText) => {
    if (!reply?.message_id) return "";
    if (reply?.is_deleted) return isDeletedText;

    // If there's a direct message, return it
    if (reply?.message) return reply.message;

    // Check if reply has attachments
    if (reply?.hasAttachments) return hasAttachmentsText;

    // Search for a matching message in msgs
    const foundMessage = msgs?.find((x) => x.message_id === reply?.message_id);
    const { message, files, urls } = foundMessage || {};
    const attachments = [...(files || []), ...(urls || [])];

    // Return found message, or check if it has attachments
    return message || (attachments.length > 0 ? hasAttachmentsText : "...");
};

const weekDays = 7;
const timeDiffInMin = 60;
const timeDiffInMinSmall = 10;
// Forwarding refs to allow parent components to access DOM nodes
export const SingleMessage = React.forwardRef(
    ({ detail, idx, hasLeftGroup, scrollToBottom, searchedMessageId }, ref) => {
        const dispatch = useDispatch();
        const { formatMessage } = useIntl();
        const user = useSelector(userSelector);

        const {
            msgs,
            members,
            setReply,
            setSendStatus,
            onReactToMessage,
            conversationId,
        } = useConversationSocket();

        // Destructure detail object early
        const {
            urls,
            files,
            message_id,
            url_details,
            file_details,
            message_sender,
            replied_message_details,
        } = detail;

        // Check if the current user is the sender
        const isMe = user?.email === message_sender;
        const ud = members?.[message_sender] || {};
        const cnAlign = isMe ? "left" : "right";
        const fs = file_details || files || [];
        const us = url_details || urls || [];
        const attachments = [...(fs || []), ...(us || [])];

        // Use useMemo to memoize calculations
        const replyMessage = useMemo(
            () =>
                getReplyMessage(
                    replied_message_details,
                    msgs,
                    formatMessage({ id: "attachments" }),
                    formatMessage({ id: "message_removed" })
                ),
            [replied_message_details?.message_id, msgs]
        );
        const isSeenBy = useMemo(
            () =>
                Object.values(members)?.filter(
                    (x) =>
                        x?.seen_message_id === message_id &&
                        x?.email !== user?.email
                ),
            [members, message_id]
        );

        const handleReplyClick = () => setReply({ ...detail, type: "reply" });
        const handleEditClick = () => setReply({ ...detail, type: "edit" });
        const handleDeleteClick = () => {
            setSendStatus({
                loading: false,
                status: null,
                error: null,
                scroll: false,
            });
            dispatch(
                toggleConvoRelatedModal({
                    isMe,
                    email: user?.email,
                    messageId: message_id,
                    mType: "delete_message",
                    isDeleted: detail.is_deleted === true,
                })
            );
        };

        const handleOnReactToMessage = (reaction) => {
            if (!reaction) return;

            const userReactions = detail?.reactions || [];
            const existingReaction = userReactions.find(
                (x) => x.user_email === user?.email
            );
            const reaction_type = existingReaction
                ? existingReaction.reaction === reaction
                    ? "delete"
                    : "update"
                : "add";

            onReactToMessage({ message_id, reaction, reaction_type });
        };

        const prevMessage = msgs?.[idx - 1];
        const nextMessage = msgs?.[idx + 1];
        const hasPrevMessage = prevMessage?.message_sender === message_sender;
        const hasNextMessage = nextMessage?.message_sender === message_sender;

        const timeDiff = prevMessage
            ? dateDifferenceInMinutes(detail.timestamp, prevMessage?.timestamp)
            : timeDiffInMin; // 1 hrs
        const timeDiffNext = nextMessage
            ? dateDifferenceInMinutes(detail.timestamp, nextMessage?.timestamp)
            : 0;

        const dayDIff = dateDifferenceInDays(undefined, detail.timestamp);

        const onlyEmoji = isEmojiOnly(detail.message);
        const isOnlyEmojiCn = onlyEmoji ? "only-emoji" : "only-emoji-no";
        const hasReaction = (detail.reactions || []).length > 0;
        const hasReactionCn = hasReaction
            ? "has-reactions"
            : "has-reactions-no";

        const isSearchedMessageCn =
            searchedMessageId === message_id ? "searched-message" : "";
        if (
            (detail.message_type === "system" && detail.update_type) ||
            detail.message_type !== "system"
        )
            return (
                <React.Fragment>
                    {timeDiff >= timeDiffInMin && (
                        <Typography
                            gutterBottom
                            align="center"
                            variant="caption"
                            color="textSecondary"
                            className={`csw-cs-timestamp`}
                        >
                            <RelativeDateComp timestamp={detail?.timestamp} />
                        </Typography>
                    )}

                    {detail.message_type !== "system" && (
                        <div
                            ref={ref}
                            id={`message-${message_id}`}
                            data-id={`${message_id}-${idx}`}
                            className={`csw-cs-sm csw-cs-sm-${cnAlign}`}
                        >
                            {!hasPrevMessage || timeDiff > timeDiffInMin ? (
                                <AvatarComp
                                    variant="circular"
                                    src={ud.image || ""}
                                    sx={{ width: 30, height: 30 }}
                                    alt={
                                        ud.name || ud.username || message_sender
                                    }
                                    className={`csw-cs-sm-avatar csw-cs-sm-avatar-${cnAlign}`}
                                />
                            ) : (
                                <Box
                                    sx={{ width: 30, height: 30, minWidth: 30 }}
                                    className={`csw-cs-sm-avatar csw-cs-sm-avatar-${cnAlign}`}
                                />
                            )}

                            <div
                                className={`csw-cs-sm-content csw-cs-sm-content-${cnAlign}`}
                            >
                                {replied_message_details?.message_id && (
                                    <ConvoSectionSingleMessageReplyMessage
                                        cur_user_email={user?.email}
                                        message_sender_email={
                                            detail?.message_sender
                                        }
                                        replied_to_email={
                                            replied_message_details?.replied_to
                                        }
                                    />
                                )}
                                {detail.is_deleted !== true &&
                                    detail.is_edited && (
                                        <EditMessageHistory
                                            id={message_id}
                                            cId={conversationId}
                                            className={`csw-cs-sm-isEdited csw-cs-sm-isEdited-${cnAlign}`}
                                        />
                                    )}
                                {replied_message_details?.message_id && (
                                    <a
                                        href={`#message-${replied_message_details?.message_id}`}
                                        className={`csw-cs-sm-msg-reply csw-cs-sm-msg-reply-${cnAlign}`}
                                    >
                                        <div className="csw-cs-sm-msg-reply-msg">
                                            {replyMessage}
                                        </div>
                                    </a>
                                )}
                                <Tooltip
                                    title={
                                        <RelativeDateComp
                                            timestamp={detail?.timestamp}
                                        />
                                    }
                                >
                                    <div className="csw-cs-sm-msg-wrapper">
                                        {detail.is_deleted === true &&
                                        detail.delete_type != "self" ? (
                                            <Typography
                                                component={"div"}
                                                variant="caption"
                                                color="textSecondary"
                                                className={`csw-cs-sm-msg csw-cs-sm-msg-${cnAlign}`}
                                            >
                                                {formatMessage({
                                                    id: "this_message_was_deleted",
                                                })}
                                            </Typography>
                                        ) : (
                                            detail.message && (
                                                <div
                                                    className={`csw-cs-sm-msg csw-cs-sm-msg-${cnAlign} csw-cs-sm-msg-${isOnlyEmojiCn}  csw-cs-sm-msg-${hasReactionCn} csw-cs-sm-msg-${isSearchedMessageCn}`}
                                                >
                                                    {detail.message}
                                                    <InfoGeneratedFromLinkCard
                                                        size="small"
                                                        data={detail.message}
                                                        onDataLoaded={
                                                            scrollToBottom
                                                        }
                                                    />
                                                    {detail?.reactions &&
                                                        detail.is_deleted !==
                                                            true &&
                                                        attachments.length ===
                                                            0 &&
                                                        (
                                                            detail?.reactions ||
                                                            []
                                                        )?.length > 0 && (
                                                            <ConvoSectionSingleMessageReactions
                                                                reactions={
                                                                    detail.reactions
                                                                }
                                                                className={`csw-cs-sm-msg-reactions csw-cs-sm-msg-reactions-${cnAlign}`}
                                                            />
                                                        )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Tooltip>
                                {detail.is_deleted !== true &&
                                    attachments.length > 0 && (
                                        <ConvoSectionSingleMessageAttachments
                                            attachments={attachments}
                                            reactions={detail?.reactions || []}
                                            className={`csw-cs-sm-attachments csw-cs-sm-attachments-${cnAlign}`}
                                        />
                                    )}
                                {detail.is_deleted !== true &&
                                    (!hasNextMessage ||
                                        timeDiffNext > timeDiffInMinSmall) && (
                                        <div
                                            className={`csw-cs-sm-time csw-cs-sm-time-${cnAlign}`}
                                        >
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                {!isMe && (
                                                    <span>
                                                        {ud.name ||
                                                            ud.username ||
                                                            message_sender}
                                                        &nbsp;。
                                                    </span>
                                                )}
                                                &nbsp;
                                                {detail?.timestamp ? (
                                                    dayDIff < weekDays ? (
                                                        <RelativeTimeComp
                                                            timestamp={
                                                                detail?.timestamp
                                                            }
                                                        />
                                                    ) : (
                                                        <RelativeDateComp
                                                            timestamp={
                                                                detail?.timestamp
                                                            }
                                                            options={{
                                                                onlyTime: true,
                                                            }}
                                                        />
                                                    )
                                                ) : (
                                                    "-"
                                                )}
                                                &emsp;
                                            </Typography>
                                        </div>
                                    )}
                            </div>
                            {message_id && !hasLeftGroup && (
                                <ConvoSectionActions
                                    isMe={isMe}
                                    cnAlign={cnAlign}
                                    handleEditClick={handleEditClick}
                                    handleReplyClick={handleReplyClick}
                                    hasMessage={Boolean(detail.message)}
                                    handleDeleteClick={handleDeleteClick}
                                    isDeleted={detail.is_deleted === true}
                                    handleOnReactToMessage={
                                        handleOnReactToMessage
                                    }
                                />
                            )}
                        </div>
                    )}
                    {detail.message_type === "system" && detail.update_type && (
                        <ConvoSectionSingleMessageSystemMessage
                            detail={{
                                id: `message-${message_id}`,
                                update_type: detail.update_type,
                                message_sender: detail.message_sender,
                                affected_user_email: detail.affected_user_email,
                            }}
                        />
                    )}
                    {isSeenBy?.length > 0 && (
                        <MessageSeenBySection
                            members={isSeenBy}
                            className="csw-cs-sm-seen-by"
                        />
                    )}
                </React.Fragment>
            );
        else return null;
    }
);
// Add displayName to the component
SingleMessage.displayName = "SingleMessage";
