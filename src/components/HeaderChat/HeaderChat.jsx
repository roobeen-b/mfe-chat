import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge, IconButton } from "@mui/material";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

import { HeaderChatContent } from "./HeaderChatContent";
import { CustomPopover } from "@components/bits/Popover";

import { convoRelatedDetailsSelector } from "@store/extraSlice/selectors";
import { useCallGetMessageNotificationCount } from "@api/helpers/inquire/conversation/useCallGetMessageNotificationCount";

export const HeaderChat = () => {
    const { count, mutate } = useCallGetMessageNotificationCount();
    const convoDetails = useSelector(convoRelatedDetailsSelector);

    useEffect(() => {
        if (convoDetails?.fetchConvo) {
            mutate();
        }
    }, [convoDetails?.fetchConvo]);

    return (
        <div className="hw-right-notification">
            <CustomPopover
                trigger={
                    <Badge
                        color="secondary"
                        badgeContent={count}
                        className="hw-right-notification-trigger hw-right-notification-badge"
                    >
                        <IconButton color="secondary" size="small">
                            <SpeakerNotesIcon fontSize="small" />
                        </IconButton>
                    </Badge>
                }
            >
                <HeaderChatContent />
            </CustomPopover>
        </div>
    );
};
