import { useState } from "react";
import { useIntl } from "react-intl";
import { IconButton, Typography } from "@mui/material";

import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

import { CustomPopover } from "@components/bits/Popover";
import EmojiPickerComp from "@components/bits/EmojiPicker";
import { ConvoSectionActionsWrapper } from "./ConvoScreenWrapper";

const Options = [{ label: "edit" }, { label: "delete" }];

export const ConvoSectionActions = (props) => {
    const {
        isMe,
        cnAlign,
        isDeleted,
        hasMessage,
        handleEditClick,
        handleReplyClick,
        handleDeleteClick,
        handleOnReactToMessage,
    } = props;
    const { formatMessage } = useIntl();
    const [openEmoPicker, setOpenEmoPicker] = useState(false);

    const handleClick = (option) => (e) => {
        e.preventDefault();
        if (option.label === "delete") handleDeleteClick();

        if (option.label === "edit") handleEditClick();
    };

    const toggleEmojiBox = () => {
        setOpenEmoPicker((o) => !o);
    };

    const handleEmojiClick = (v) => {
        handleOnReactToMessage(v);
        setTimeout(() => {
            toggleEmojiBox();
        }, 500);
    };

    return (
        <div className={`csw-cs-sm-reply csw-cs-sm-reply-${cnAlign}`}>
            {!isDeleted && (
                <EmojiPickerComp
                    width={100}
                    height={40}
                    skinTonesDisabled={true}
                    allowExpandReactions={false}
                    reactionsDefaultOpen={true}
                    openEmojiBox={openEmoPicker}
                    closeEmojiBox={toggleEmojiBox}
                    handleOnEmojiClick={handleEmojiClick}
                    className={`csw-cs-sm-reply-epc-${cnAlign} csw-cs-sm-reply-epc`}
                />
            )}
            <div
                className={`csw-cs-sm-reply-btns csw-cs-sm-reply-btns-${cnAlign}`}
            >
                {!isDeleted && (
                    <IconButton
                        size="small"
                        onClick={handleReplyClick}
                        className={`csw-cs-sm-reply-btn csw-cs-sm-reply-btn-${cnAlign}`}
                    >
                        <ReplyIcon fontSize="small" />
                    </IconButton>
                )}
                {!isDeleted && (
                    <IconButton
                        size="small"
                        onClick={toggleEmojiBox}
                        className={`csw-cs-sm-reply-btn csw-cs-sm-reply-btn-${cnAlign}`}
                    >
                        <SentimentSatisfiedAltIcon fontSize="small" />
                    </IconButton>
                )}
                <CustomPopover
                    slotProps={{
                        paper: {
                            sx: {
                                width: "100px",
                                padding: "0.35rem",
                                boxShadow:
                                    "0px 2px 5px 0px #0619380F !important",
                            },
                        },
                    }}
                    className={`csw-cs-sm-reply-btn csw-cs-sm-reply-btn-${cnAlign}`}
                    trigger={
                        <IconButton
                            size="small"
                            className={`csw-cs-sm-reply-btns-options`}
                        >
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <ConvoSectionActionsWrapper className="cs-aw">
                        {Options.map((option) => {
                            if (
                                option.label === "edit" &&
                                (!isMe || !hasMessage || isDeleted)
                            )
                                return null;
                            return (
                                <div
                                    key={option.label}
                                    className="cs-aw-item"
                                    onClick={handleClick(option)}
                                >
                                    <Typography variant="caption">
                                        {formatMessage({ id: option.label })}
                                    </Typography>
                                </div>
                            );
                        })}
                    </ConvoSectionActionsWrapper>
                </CustomPopover>
            </div>
        </div>
    );
};
