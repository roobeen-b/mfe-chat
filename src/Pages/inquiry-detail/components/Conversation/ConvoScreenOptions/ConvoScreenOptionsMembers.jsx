import { useRef } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { ConvoScreenOptionsMembersOptions } from "./ConvoScreenOptionsMembersOptions";

import { userSelector } from "@store/authSlice/selectors";
import { toggleConvoRelatedModal } from "@store/extraSlice";

import { SnackBar } from "@utils/toast";
import { useConversationSocket } from "../context/ConversationProvider";
import { useCallCreateConvo } from "@api/helpers/inquire/conversation/useCallCreateConvo";
import { useNavigate } from "react-router";

export const ConvoScreenOptionsMembers = (props) => {
  const { setShowOPt, hasLeftGroup } = props;
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const user = useSelector(userSelector);

  const { members } = useConversationSocket();
  const toastRef = useRef(null);

  const mmb = Object.values(members);
  const isAdmin = user?.email ? members?.[user.email]?.role === "admin" : false;
  const adminEmail = mmb.find((i) => i.role === "admin")?.email;

  const handleAddClick = () => {
    if (!adminEmail) {
      SnackBar(
        {
          message: formatMessage({ id: "only_admin_can_add" }),
          doNotTranslate: true,
        },
        "error"
      );
      return;
    }
    dispatch(toggleConvoRelatedModal({ mType: "add", adminEmail }));
  };

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
  };

  const { callCreateConvo } = useCallCreateConvo({
    onError: closeToast,
    onSuccess: handleOnSuccess,
  });

  const handleAction = (email) => (label) => {
    switch (label) {
      case "message":
        callCreateConvo({ data: { users: [email] }, endpoint: "chat" });
        toastRef.current = SnackBar({ message: "loading" }, "loading");
        break;
      case "view_profile":
        console.info(`Navigate to profile of member ${email}`);
        break;
      case "make_admin":
      case "remove_member":
      case "leave_group":
        dispatch(
          toggleConvoRelatedModal({
            email,
            adminEmail,
            mType:
              label === "leave_group" && email === adminEmail
                ? "admin_leave_group"
                : label,
          })
        );

        break;
      default:
        console.warn(`Unhandled action: ${label}`);
    }
  };

  return (
    <>
      <Typography className="cs-ow-flex cs-ow-p1">
        <b>{formatMessage({ id: "members" })}</b>
        <IconButton
          size="small"
          title={formatMessage({ id: "close" })}
          aria-label="close"
          onClick={() => setShowOPt("general")}
        >
          <CloseIcon fontSize="small" htmlColor="#3D4548" />
        </IconButton>
      </Typography>
      <ul className="cs-ow-members-list">
        {mmb?.map((i, j) => {
          const name = i.name || i.username || i?.email?.split?.("@")?.[0];
          return (
            <li key={i.email + `-${j}`} className="cs-ow-members-list-li">
              <AvatarComp
                alt={name}
                src={i?.image}
                sx={{ width: 35, height: 35 }}
                className="cs-ow-members-list-li-avatar"
              />
              <div className="cs-ow-members-list-li-detail">
                <Typography
                  title={name}
                  variant="body2"
                  fontWeight={"bold"}
                  className="cs-ow-members-list-li-detail-name"
                >
                  {name}
                  {i?.role === "admin" && (
                    <Typography fontSize={"small"} variant="caption">
                      &nbsp;(
                      {formatMessage({ id: "admin" })})
                    </Typography>
                  )}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  className="cs-ow-members-list-li-detail-email"
                >
                  {i.email}
                </Typography>
              </div>
              <ConvoScreenOptionsMembersOptions
                isAdmin={isAdmin}
                isSelf={i.email === user?.email}
                onAction={handleAction(i?.email)}
                isMemberAdmin={i.role === "admin"}
                className="cs-ow-members-list-li-options"
              />
            </li>
          );
        })}
        {!hasLeftGroup && (
          <li className="cs-ow-members-list-li" onClick={handleAddClick}>
            <AccountCircleIcon
              htmlColor="#3D4548"
              sx={{ width: 35, height: 35 }}
            />
            <Typography
              variant="body2"
              fontWeight={"bold"}
              className="cs-ow-members-list-li-detail-add"
            >
              {formatMessage({ id: "add_new_member" })}
            </Typography>
          </li>
        )}
      </ul>
    </>
  );
};
