import { useIntl } from "react-intl";
import { Typography } from "@mui/material";

import { useConversationSocket } from "./context/ConversationProvider";

export const ConvoSectionSingleMessageSystemMessage = (props) => {
    const {
        detail: { id, update_type, message_sender, affected_user_email },
    } = props;
    const { formatMessage } = useIntl();

    const { members } = useConversationSocket();

    const sender = message_sender
        ? members[message_sender]?.name || message_sender
        : formatMessage({ id: "admin" });

    const affected =
        affected_user_email && typeof affected_user_email === "string"
            ? members[affected_user_email]?.name || affected_user_email
            : "";

    return (
        <Typography
            id={id}
            align="center"
            variant="caption"
            color="textSecondary"
            className="csw-cs-sm-msg-system"
        >
            {update_type === "GROUP_NAME_CHANGED" &&
                formatMessage({ id: "chat_name_changed" }, { by: sender })}
            {update_type === "GROUP_IMAGE_CHANGED" &&
                formatMessage({ id: "chat_image_changed" }, { by: sender })}
            {update_type === "MEMBER_REMOVED" &&
                formatMessage(
                    { id: "member_removed" },
                    { by: sender, affected }
                )}
            {update_type === "MEMBER_LEFT" &&
                formatMessage({ id: "member_left" }, { by: sender })}
            {update_type === "MADE_ADMIN" &&
                formatMessage({ id: "made_admin" }, { by: sender, affected })}
            {update_type === "MEMBER_ADDED" &&
                formatMessage({ id: "member_added" }, { by: sender, affected })}
        </Typography>
    );
};
