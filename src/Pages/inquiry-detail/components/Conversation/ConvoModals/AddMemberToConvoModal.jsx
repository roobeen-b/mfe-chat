import { useState } from "react";
import { useIntl } from "react-intl";

import { ButtonComp } from "@components/bits/Button";
import { SearchUser } from "../../../../../components/SearchUser/SearchUser";

import { useConversationSocket } from "../context/ConversationProvider";

export const AddMemberToConvoModal = (props) => {
    const { closeModal } = props;
    const { formatMessage } = useIntl();
    const { convoUpdate, members, callUpdateConvoEvent } =
        useConversationSocket();

    const [users, setUsers] = useState([]);

    const handleUserSelect = async (v) => {
        if (!v) return;
        const val = v;
        setUsers(val);
    };

    const handleAddPeople = () => {
        callUpdateConvoEvent({
            new_members: users,
            update_type: "MEMBER_ADDED",
            affected_user_email: users?.map((i) => i.email),
        });
    };

    return (
        <div className="cmw-plm cmw-addMember">
            <SearchUser
                isOpen
                checkbox
                allowMultiple
                show={"user"}
                label="search"
                redirect={false}
                onSelect={handleUserSelect}
                className="ipw-search-user"
                hideUsers={Object.keys(members)}
            />

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
                    onClick={handleAddPeople}
                    isLoading={convoUpdate.loading}
                >
                    {formatMessage({ id: "add_people" })}
                </ButtonComp>
            </div>
        </div>
    );
};
