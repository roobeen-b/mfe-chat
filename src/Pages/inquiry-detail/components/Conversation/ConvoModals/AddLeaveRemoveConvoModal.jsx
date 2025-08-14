import { Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

import { ButtonComp } from "@components/bits/Button";

import { useConversationSocket } from "../context/ConversationProvider";
import { convoRelatedModalSelector } from "@store/extraSlice/selectors";

const msgs = {
    leave_group: {
        title: "leave_chat_group",
        buttonLabel: "leave_group",
        subtitle: "leave_chat_group_desc",
        successMsg: "group_left_successfully",
    },
    make_admin: {
        title: "make_chat_admin",
        buttonLabel: "make_admin",
        subtitle: "make_chat_admin_desc",
        successMsg: "admin_added_successfully",
    },
    remove_member: {
        title: "remove_member_chat",
        buttonLabel: "remove_member",
        subtitle: "remove_member_chat_desc",
        successMsg: "member_removed_successfully",
    },
    admin_leave_group: {
        buttonLabel: "leave_group",
        title: "admin_leave_chat_group",
        subtitle: "admin_leave_chat_group_desc",
        successMsg: "group_left_successfully",
    },
};

export const AddLeaveRemoveConvoModal = (props) => {
    const { closeModal, mType } = props;

    const { formatMessage } = useIntl();
    const m = msgs[mType || "leave_group"];
    const { convoUpdate, callUpdateConvoEvent } = useConversationSocket();
    const convoModal = useSelector(convoRelatedModalSelector);

    const handleMemberAction = () => {
        const data = {};
        if (mType === "leave_group" || mType === "admin_leave_group") {
            // data.leaveGroup = true;
            data.update_type = "MEMBER_LEFT";
        }
        if (convoModal?.email) {
            if (mType === "make_admin") {
                data.update_type = "MADE_ADMIN";
                data.affected_user_email = convoModal.email;
            }
            if (mType === "remove_member") {
                data.update_type = "MEMBER_REMOVED";
                data.affected_user_email = convoModal.email;
            }
        }

        callUpdateConvoEvent(data);
    };

    return (
        <div className="cmw-plm ">
            <Typography gutterBottom textAlign="center" color="textSecondary">
                {formatMessage({ id: m.subtitle })}
            </Typography>
            <div className="cmw-plm-btn">
                <ButtonComp
                    fullWidth
                    size="large"
                    type="button"
                    color="primary"
                    disableElevation
                    variant="outlined"
                    isLoading={convoUpdate.loading}
                    onClick={() => closeModal?.()}
                >
                    {formatMessage({ id: "cancel" })}
                </ButtonComp>
                <ButtonComp
                    fullWidth
                    size="large"
                    type="button"
                    color="primary"
                    disableElevation
                    variant="contained"
                    isLoading={convoUpdate.loading}
                    onClick={handleMemberAction}
                >
                    {formatMessage({ id: m.buttonLabel })}
                </ButtonComp>
            </div>
        </div>
    );
};
