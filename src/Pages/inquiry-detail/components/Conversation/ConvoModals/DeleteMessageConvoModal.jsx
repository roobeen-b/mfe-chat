import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

import { SnackBar } from "@utils/toast";
import { ButtonComp } from "@components/bits/Button";
import { convoRelatedModalSelector } from "@store/extraSlice/selectors";
import { useConversationSocket } from "../context/ConversationProvider";

const Options = [
    {
        value: "all",
        label: "unsend_for_everyone",
        desc: "unsend_for_everyone_description",
    },
    {
        value: "self",
        label: "unsend_for_you",
        desc: "unsend_for_you_description",
    },
];

export const DeleteMessageConvoModal = (props) => {
    const { closeModal } = props;
    const { formatMessage } = useIntl();
    const convoModal = useSelector(convoRelatedModalSelector);
    const { deleteMessage, setSendStatus, sendStatus } =
        useConversationSocket();

    const [value, setValue] = React.useState("");

    useEffect(() => {
        if (
            convoModal?.mType === "delete_message" &&
            sendStatus.status === "success"
        )
            closeModal?.();
    }, [sendStatus]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleUnsend = () => {
        if (convoModal?.messageId && value) {
            deleteMessage({
                message_id: convoModal?.messageId,
                delete_type: value,
            });
            setSendStatus({
                loading: true,
                status: null,
                error: null,
                scroll: false,
            });
        } else
            SnackBar(
                {
                    message: formatMessage({ id: "select_one_options" }),
                    doNotTranslate: true,
                },
                "warning"
            );
    };

    return (
        <div className="cmw-plm cmw-delete-message">
            <RadioGroup
                value={value}
                onChange={handleChange}
                className="cmw-delete-message-radios"
                name="cmw-delete-message-buttons-group"
                aria-labelledby="cmw-delete-message-buttons-group"
            >
                {Options.map((i) => {
                    if (
                        (convoModal?.isDeleted || !convoModal?.isMe) &&
                        i.value === "all"
                    )
                        return null;
                    return (
                        <div
                            key={i.value}
                            className="cmw-delete-message-radios-item"
                        >
                            <FormControlLabel
                                value={i.value}
                                control={<Radio />}
                                label={formatMessage({ id: i.label })}
                                className="cmw-delete-message-radios-item-radio"
                            />
                            <Typography
                                gutterBottom
                                fontSize={"small"}
                                color="textSecondary"
                                className="cmw-delete-message-radios-item-text"
                            >
                                {formatMessage({ id: i.desc })}
                            </Typography>
                        </div>
                    );
                })}
            </RadioGroup>
            <br />
            <div className="cmw-plm-btn">
                <ButtonComp
                    fullWidth
                    size="large"
                    type="button"
                    color="error"
                    disableElevation
                    variant="outlined"
                    isLoading={sendStatus?.loading}
                    onClick={() => closeModal?.()}
                >
                    {formatMessage({ id: "cancel" })}
                </ButtonComp>
                <ButtonComp
                    fullWidth
                    size="large"
                    type="button"
                    color="error"
                    disableElevation
                    variant="contained"
                    onClick={handleUnsend}
                    isLoading={sendStatus?.loading}
                >
                    {formatMessage({ id: "unsend" })}
                </ButtonComp>
            </div>
        </div>
    );
};
