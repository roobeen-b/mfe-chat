import { useIntl } from "react-intl";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setConvoDetails } from "@store/extraSlice";
import { ButtonComp } from "@components/bits/Button";
import { convoRelatedModalSelector } from "@store/extraSlice/selectors";
import { useCallDeleteConvo } from "@api/helpers/inquire/conversation/useCallDeleteConvo";

export const DeleteConversationModal = (props) => {
    const { closeModal } = props;
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const convoModal = useSelector(convoRelatedModalSelector);

    const handleDelSuccess = () => {
        dispatch(setConvoDetails({ fetchConvo: true }));
        closeModal?.();
    };

    const { loading, callDeleteConvo } = useCallDeleteConvo({
        cId: convoModal?.conversationId,
        onSuccess: handleDelSuccess,
    });

    const handleDeleteConvo = () => {
        callDeleteConvo({
            data: { message_id: convoModal?.messageId },
            endpoint: "chat",
        });
    };

    return (
        <div className="cmw-plm cmw-delete-message">
            <Typography
                gutterBottom
                component="div"
                variant="caption"
                textAlign="center"
                color="textSecondary"
                sx={{ margin: "1rem 0" }}
            >
                <b>
                    <i>{formatMessage({ id: "delete_convo_des" })}</i>
                </b>
            </Typography>
            <div className="cmw-plm-btn">
                <ButtonComp
                    fullWidth
                    size="large"
                    type="button"
                    color="error"
                    disableElevation
                    variant="outlined"
                    isLoading={loading}
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
                    isLoading={loading}
                    onClick={handleDeleteConvo}
                >
                    {formatMessage({ id: "delete" })}
                </ButtonComp>
            </div>
        </div>
    );
};
