import { useIntl } from "react-intl";
import { Typography } from "@mui/material";

import { useConversationSocket } from "./context/ConversationProvider";

const determineReplyKeyAndValues = (params) => {
    const {
        members,
        cur_user_email,
        replied_to_email = "",
        message_sender_email = "",
    } = params;
    const isYou = (email) => email === cur_user_email;

    const senderIsYou = isYou(message_sender_email);
    const repliedToIsYou = isYou(replied_to_email);
    const senderEqualsRepliedTo = message_sender_email === replied_to_email;

    if (senderIsYou && !repliedToIsYou) {
        return {
            key: "reply_you_to_x",
            values: {
                name: members[replied_to_email]?.name || replied_to_email,
            },
        };
    }

    if (!senderIsYou && repliedToIsYou) {
        return {
            key: "reply_x_to_you",
            values: {
                name:
                    members[message_sender_email]?.name || message_sender_email,
            },
        };
    }

    if (senderIsYou && repliedToIsYou) {
        return {
            values: {},
            key: "reply_you_to_self",
        };
    }

    if (!senderIsYou && senderEqualsRepliedTo) {
        return {
            key: "reply_x_to_self",
            values: {
                name:
                    members[message_sender_email]?.name || message_sender_email,
            },
        };
    }

    if (!senderIsYou && !repliedToIsYou) {
        return {
            key: "reply_x_to_x",
            values: {
                repliedTo: members[replied_to_email]?.name || replied_to_email,
                sender:
                    members[message_sender_email]?.name || message_sender_email,
            },
        };
    }

    return { key: "reply_other", values: {} };
};

export const ConvoSectionSingleMessageReplyMessage = (props) => {
    const { formatMessage } = useIntl();
    const { members } = useConversationSocket();
    const { cur_user_email, message_sender_email } = props;
    const { key, values } = determineReplyKeyAndValues({ ...props, members });

    return (
        <Typography
            id={key}
            component="div"
            variant="caption"
            color="textSecondary"
            className="csw-cs-sm-msg-replyText"
            align={cur_user_email === message_sender_email ? "right" : "left"}
        >
            {formatMessage({ id: key }, values)}
        </Typography>
    );
};
