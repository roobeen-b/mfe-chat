import { useIntl } from "react-intl";
import { useRef, useState } from "react";

import { ButtonComp } from "@components/bits/Button";
import { ModalComp } from "@components/bits/Modal/Modal";
import { SearchUser } from "@components/SearchUser/SearchUser";
import { CreateGroupChatModalWrapper } from "./CreateGroupChatModalWrapper";

import { SnackBar } from "@utils/toast";
import { ParticipatedOnGroupChat } from "./ParticipatedOnGroupChat";
import { useCallCreateConvo } from "@api/helpers/inquire/conversation/useCallCreateConvo";
import { useCallGetParticipatedChat } from "@api/helpers/inquire/conversation/useCallGetParticipatedChat";
import { useNavigate } from "react-router";

export const CreateGroupChatModal = (props) => {
  const { open, type, onClose } = props;
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const toastRef = useRef(null);
  const [users, setUsers] = useState([]);

  const closeToast = () => {
    if (toastRef.current)
      SnackBar({ message: "" }, "dismiss", toastRef.current);
  };
  const handleOnSuccess = (v) => {
    const {
      data: { conversation_id, conversation_type },
    } = v;
    navigate(`/inquiry/${conversation_id}?type=${conversation_type}`);
    closeToast();
    onClose();
  };
  const { loading: loadingCreateConvo, callCreateConvo } = useCallCreateConvo({
    onError: closeToast,
    onSuccess: handleOnSuccess,
  });

  const {
    data: groupChats,
    loading: loadingParticipatedChats,
    callGetParticipatedChat,
  } = useCallGetParticipatedChat();

  const handleUserSelect = async (v) => {
    if (!v) return;
    const val = v;

    if (type === "private") {
      const data = {
        conversation_type: type,
        users: [v?.email],
      };
      callCreateConvo({ data, endpoint: "chat" });
      toastRef.current = SnackBar({ message: "loading" }, "loading");
      return;
    }

    setUsers(val);
    callGetParticipatedChat({
      data: { user_emails: val.map((i) => i.email) },
      endpoint: "chat",
    });
  };

  const onCreateGroupChatClick = () => {
    const data = {
      conversation_type: type,
      users: users?.map((i) => i.email),
    };

    // const formData = await parseObjToFormData(data);
    callCreateConvo({ data, endpoint: "chat" });
    toastRef.current = SnackBar({ message: "loading" }, "loading");
  };

  const handleClose = () => {
    setUsers([]);
    onClose();
  };

  return (
    <ModalComp
      closeIcon
      open={open}
      noIcon={false}
      modalType={"info"}
      onClose={handleClose}
      title={formatMessage({ id: "create_new_chat" })}
      actions={
        <>
          <ButtonComp
            color="secondary"
            variant="outlined"
            onClick={handleClose}
            sx={{ width: type === "group" ? "150px" : "100%" }}
          >
            {formatMessage({ id: "close" })}
          </ButtonComp>
          {type === "group" && (
            <ButtonComp
              fullWidth
              color="primary"
              disableElevation
              variant="contained"
              isLoading={loadingCreateConvo}
              onClick={onCreateGroupChatClick}
            >
              {formatMessage({ id: "create" })}
            </ButtonComp>
          )}
        </>
      }
    >
      <CreateGroupChatModalWrapper className="cgc-mw" type={type}>
        <SearchUser
          isOpen
          checkbox
          redirect={false}
          onSelect={handleUserSelect}
          className="ipw-search-user"
          label="search_users_to_message"
          allowMultiple={type === "group"}
          show={type === "group" ? "user" : undefined}
          // actionItems={
          //   <IconButton
          //     color="primary"
          //     title={formatMessage({id: "inquiry"})}
          //     aria-label={formatMessage({id: "inquiry"})}
          //     disabled={loadingCreateConvo}
          //   >
          //     <TelegramIcon fontSize="small" />
          //     {loadingCreateConvo && <Spinner color="secondary" />}
          //   </IconButton>
          // }
        />
        {type === "group" && (
          <ParticipatedOnGroupChat
            className="cgc-mw-pgc"
            onClose={handleClose}
            loading={loadingParticipatedChats}
            groupChats={users.length > 0 ? groupChats : []}
          />
        )}
      </CreateGroupChatModalWrapper>
    </ModalComp>
  );
};
