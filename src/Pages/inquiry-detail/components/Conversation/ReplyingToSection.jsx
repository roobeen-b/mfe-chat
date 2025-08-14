import { useIntl } from "react-intl";

import { IconButton, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useConversationSocket } from "./context/ConversationProvider";

export const ReplyingToSection = (props) => {
    const {} = props;
    const { formatMessage } = useIntl();
    const { members, reply, setReply } = useConversationSocket();
    if (!reply?.message_id) return null;

    const ud = members?.[reply.message_sender] || {};
    const name = ud.name || ud.username || reply.message_sender;
    const attachments = [...(reply?.files || []), ...(reply?.urls || [])];

    return (
        <div className="csw-rts">
            <Typography
                component="a"
                className="csw-rts-msg"
                href={`#message-${reply?.message_id}`}
            >
                {reply.type === "reply" ? (
                    <>
                        <Typography
                            variant="body2"
                            component="span"
                            className="csw-rts-msg-reply"
                        >
                            <b>
                                {formatMessage({ id: "replying_to" }, { name })}
                            </b>
                        </Typography>
                        <Typography
                            variant="body2"
                            component="span"
                            color="textSecondary"
                            className="csw-rts-msg-content"
                        >
                            {reply?.message?.slice(0, 40)}
                            {(reply?.message?.length ?? 0) > 40 ? "..." : ""}
                            {!reply?.message && attachments.length > 0
                                ? formatMessage({ id: "attachments" })
                                : ""}
                        </Typography>
                    </>
                ) : (
                    <Typography
                        variant="body2"
                        component="span"
                        color="secondary"
                        className="csw-rts-msg-reply"
                    >
                        <b>{formatMessage({ id: "edit_message" })}</b>
                    </Typography>
                )}
            </Typography>
            <IconButton className="csw-rts-btn" size="small">
                <HighlightOffIcon
                    fontSize="small"
                    className="csw-rts-btn-icn"
                    onClick={() => setReply(null)}
                />
            </IconButton>
        </div>
    );
};
