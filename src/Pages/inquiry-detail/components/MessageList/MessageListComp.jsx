import { useIntl } from "react-intl";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import { IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { encodeToBase64 } from "@utils/encodeDecode";
import { userSelector } from "@store/authSlice/selectors";
import { toggleConvoRelatedModal } from "@store/extraSlice";
import { convoNameFromMembers, getAllParticipants } from "@utils/convoUtils";

import { CustomPopover } from "@components/bits/Popover";
import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { RelativeTimeComp } from "@components/bits/RelativeTimeComp";
import { MessageListCompActionsWrapper } from "../MessageListSideBarWrapper";

const Options = [{ label: "delete_chat" }, { label: "leave_group" }];

export const MessageListComp = (props) => {
  const { list } = props;
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const pathname = window.location.pathname;

  const user = useSelector(userSelector) || undefined;

  const handleClick = (option, detail) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    const admin = detail.other_participants_details?.filter(
      (x) => x.role === "admin"
    )?.[0];
    let adminEmail = admin?.email || user?.email;

    let mType =
      option.label === "delete_chat"
        ? "delete_convo"
        : admin
        ? "admin_leave_group"
        : "leave_group";

    dispatch(
      toggleConvoRelatedModal({
        mType,
        adminEmail,
        from: "list",
        email: user?.email,
        messageId: detail.last_message_id,
        conversationId: detail.conversation_id,
      })
    );
  };

  return (
    <div className="ms-mw-body-list">
      {list?.map((i, j) => {
        const eName = i?.conversation_name
          ? `&n=${encodeToBase64(i?.conversation_name)}`
          : "";
        const grpName =
          i?.conversation_name ||
          convoNameFromMembers(
            getAllParticipants(i?.other_participants_details, user)
          );
        const isGroup = i?.other_participants_details?.length > 1;
        const sender = isGroup
          ? i?.last_message_sender === "you"
            ? formatMessage({ id: "you" })
            : i?.other_participants_details?.filter(
                (x) => x.email === i?.last_message_sender
              )?.[0]?.name || ""
          : "";
        const hasUnreadMessages = i?.unread_message_count !== "0";
        const isActive = pathname.split("/").at(-1) === `${i?.conversation_id}`;

        return (
          <Link
            key={i?.conversation_id + `-${j}`}
            href={`/inquiry/${i?.conversation_id}?c=g${eName}`}
          >
            <div
              className={`ms-mw-body-list-item ms-mw-body-list-item${
                isActive ? "-active" : ""
              }`}
            >
              <div className="ms-mw-body-list-item-icon">
                <AvatarComp
                  alt={grpName}
                  variant="circular"
                  sx={{ width: 36, height: 36 }}
                  id={i?.conversation_id + `-${j}`}
                  className="ms-mw-body-list-item-icon-one"
                  src={
                    isGroup
                      ? i?.conversation_image
                      : i?.conversation_image ||
                        i?.other_participants_details[0]?.image
                  }
                />
              </div>
              <div className="ms-mw-body-list-item-detail">
                <Typography
                  component="div"
                  className="ms-mw-body-list-item-detail-line"
                >
                  <b
                    title={grpName}
                    className="ms-mw-body-list-item-detail-line-one"
                  >
                    {grpName}
                  </b>
                  <Typography
                    component="div"
                    variant="caption"
                    textAlign="right"
                    color={hasUnreadMessages ? "primary" : "inherit"}
                    className="ms-mw-body-list-item-detail-line-two"
                  >
                    {i?.last_message_timestamp ? (
                      <RelativeTimeComp
                        timestamp={i?.last_message_timestamp}
                        options={{
                          numeric: "always",
                          style: "narrow",
                        }}
                      />
                    ) : (
                      "-"
                    )}
                  </Typography>
                </Typography>
                <Typography
                  component="div"
                  className="ms-mw-body-list-item-detail-line"
                >
                  <Typography
                    component="div"
                    fontSize="small"
                    title={i?.last_message || "-"}
                    className="ms-mw-body-list-item-detail-line-one"
                  >
                    {sender
                      ? `${sender}: ${i?.last_message || "-"}`
                      : i?.last_message || "-"}
                  </Typography>
                  <Typography
                    component="div"
                    variant="caption"
                    className="ms-mw-body-list-item-detail-line-two"
                    textAlign={hasUnreadMessages ? "center" : "right"}
                  >
                    {hasUnreadMessages && !isActive ? (
                      <AvatarComp
                        allText
                        color="primary"
                        sx={{
                          width: "1.2rem",
                          height: "1.2rem",
                          fontSize: "0.65rem",
                          backgroundColor: "primary.main",
                        }}
                        alt={
                          (i?.unread_message_count || 0) > 99
                            ? "99+"
                            : i?.unread_message_count
                        }
                      />
                    ) : (
                      <DoneAllIcon className="ms-mw-body-list-item-detail-line-two-icon" />
                    )}
                    <CustomPopover
                      preventDefault
                      slotProps={{
                        paper: {
                          sx: {
                            width: "100px",
                            padding: "0.35rem",
                            boxShadow: "0px 2px 5px 0px #0619380F !important",
                          },
                        },
                      }}
                      className="ms-mw-body-list-item-detail-line-two-more"
                      trigger={
                        <IconButton
                          size="small"
                          className="ms-mw-body-list-item-detail-line-two-more"
                        >
                          <MoreVertIcon
                            fontSize="small"
                            sx={{
                              fontSize: "0.8rem",
                            }}
                          />
                        </IconButton>
                      }
                    >
                      <MessageListCompActionsWrapper className="mlc-aw">
                        {Options.map((option) => {
                          return (
                            <div
                              key={option.label}
                              className="mlc-aw-item"
                              onClick={handleClick(option, i)}
                            >
                              <Typography variant="caption">
                                {formatMessage({
                                  id: option.label,
                                })}
                              </Typography>
                            </div>
                          );
                        })}
                      </MessageListCompActionsWrapper>
                    </CustomPopover>
                  </Typography>
                </Typography>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
