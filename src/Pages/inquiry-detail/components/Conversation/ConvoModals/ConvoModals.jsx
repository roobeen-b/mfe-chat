import { useDispatch, useSelector } from "react-redux";

import { useIntl } from "react-intl";

import { ModalComp } from "@components/bits/Modal/Modal";
import { ConvoModalsWrapper } from "./ConvoModalsWrapper";
import { EditConvoNameModal } from "./EditConvoNameModal";
import { MessageSeenByModal } from "./MessageSeenByModal";
import { AddMemberToConvoModal } from "./AddMemberToConvoModal";
import { AddLeaveRemoveConvoModal } from "./AddLeaveRemoveConvoModal";

import { useIsMounted } from "@utils/index";
import { toggleConvoRelatedModal } from "@store/extraSlice";
import { MessageReactionsModal } from "./MessageReactionsModal";
import { DeleteMessageConvoModal } from "./DeleteMessageConvoModal";
import { DeleteConversationModal } from "./DeleteConversationModal";
import { convoRelatedModalSelector } from "@store/extraSlice/selectors";

const ModalType = {
    add: "info",
    edit: "info",
    seen_by: "info",
    reactions: "info",
    make_admin: "info",
    leave_group: "delete",
    delete_convo: "delete",
    remove_member: "delete",
    delete_message: "delete",
    admin_leave_group: "delete",
};
export const ConvoModals = () => {
    const dispatch = useDispatch();
    const isMounted = useIsMounted();
    const { formatMessage } = useIntl();

    const convoModal = useSelector(convoRelatedModalSelector);
    const cModalType = convoModal?.mType;

    const closeModal = () => {
        dispatch(toggleConvoRelatedModal(null));
    };

    const Title = {
        add: formatMessage({ id: "add_people" }),
        reactions: formatMessage({ id: "reactions" }),
        edit: formatMessage({ id: "change_chat_name" }),
        seen_by: formatMessage({ id: "message_seen_by" }),
        make_admin: formatMessage({ id: "make_chat_admin" }),
        leave_group: formatMessage({ id: "leave_chat_group" }),
        delete_convo: formatMessage({ id: "delete_conversation" }),
        remove_member: formatMessage({ id: "remove_member_chat" }),
        delete_message: formatMessage({ id: "unsend_this_message_for" }),
        admin_leave_group: formatMessage({ id: "admin_leave_chat_group" }),
    };

    if (!isMounted) return null;
    const title = cModalType ? Title[cModalType] : undefined;
    const modalType = cModalType ? ModalType[cModalType] : undefined;

    return (
        <ModalComp
            closeIcon
            title={title}
            noIcon={false}
            onClose={closeModal}
            modalType={modalType}
            open={Boolean(cModalType)}
            actions={<></>}
        >
            <ConvoModalsWrapper className="cmw">
                {cModalType === "edit" && (
                    <EditConvoNameModal
                        className="cmw-plm"
                        closeModal={closeModal}
                    />
                )}

                {cModalType === "add" && (
                    <AddMemberToConvoModal
                        className="cmw-plm"
                        closeModal={closeModal}
                    />
                )}
                {cModalType &&
                    [
                        "leave_group",
                        "make_admin",
                        "remove_member",
                        "admin_leave_group",
                    ].includes(cModalType) && (
                        <AddLeaveRemoveConvoModal
                            className="cmw-plm"
                            mType={cModalType}
                            closeModal={closeModal}
                        />
                    )}
                {cModalType === "delete_message" && (
                    <DeleteMessageConvoModal
                        className="cmw-plm"
                        closeModal={closeModal}
                    />
                )}
                {cModalType === "delete_convo" && (
                    <DeleteConversationModal
                        className="cmw-plm"
                        closeModal={closeModal}
                    />
                )}
                {cModalType === "seen_by" && (
                    <MessageSeenByModal
                        className="cmw-plm"
                        closeModal={closeModal}
                    />
                )}
                {cModalType === "reactions" && (
                    <MessageReactionsModal
                        className="cmw-plm"
                        closeModal={closeModal}
                    />
                )}
            </ConvoModalsWrapper>
        </ModalComp>
    );
};
