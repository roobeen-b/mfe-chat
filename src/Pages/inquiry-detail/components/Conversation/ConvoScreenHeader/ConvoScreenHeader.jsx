import { useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router";
import { useSelector } from "react-redux";

import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { MessageListSideBar } from "../../MessageListSideBar";

import { SnackBar } from "@utils/toast";
import { waitMinutes } from "@utils/myFunc";
import { userSelector } from "@store/authSlice/selectors";
import { useConversationSocket } from "../context/ConversationProvider";

export const ConvoScreenHeader = (props) => {
  const { toggleMsgOpt } = props;

  const { formatMessage } = useIntl();

  const { convoUpdate, members } = useConversationSocket();
  const { name, image } = convoUpdate;

  const user = useSelector(userSelector);

  const [isConvoMenuOpen, setIsConvoMenuOpen] = useState(false);
  const [isNotificationMute, setIsNotificationMute] = useState(false);

  const toggleConvoMenu = () => {
    setIsConvoMenuOpen((v) => !v);
  };
  // const toggleSearchOpt = () => {
  //   dispatch(
  //     setConvoDetails({
  //       sideMenuOpt: "search",
  //     })
  //   );
  // };

  const toggleNotificationOpt = async () => {
    setIsNotificationMute((v) => !v);
    await waitMinutes(1000);
    setIsNotificationMute((v) => !v);
    SnackBar(
      {
        message: formatMessage({ id: "error_toggling_notification" }),
        doNotTranslate: true,
      },
      "warning"
    );
  };

  const shCn = isConvoMenuOpen ? "show" : "hide";
  const membersCount = Object.keys(members)?.length || 0;
  const otherMemberMail =
    membersCount > 2
      ? null
      : Object.keys(members).find((x) => x !== user?.email);
  const otherUser = members?.[otherMemberMail || user?.email || ""] || null;

  return (
    <>
      <div className="si-pw-header">
        <div className="si-pw-header-wrapper">
          <IconButton
            color="secondary"
            onClick={toggleConvoMenu}
            className={`si-pw-header-chat`}
          >
            <MenuIcon />
          </IconButton>
          <div className="si-pw-header-info">
            <AvatarComp src={image} alt={name} />
            <div>
              <Typography
                variant="h5"
                component="h1"
                color="textPrimary"
                className="si-pw-header-info-title"
                title={name || formatMessage({ id: "inquiry" })}
              >
                {name || formatMessage({ id: "inquiry" })}
              </Typography>
              {membersCount > 2 && (
                <Typography
                  variant="caption"
                  component="div"
                  color="textSecondary"
                  className="si-pw-header-subtitle"
                >
                  {membersCount}&nbsp;
                  {formatMessage({ id: "members" })}
                </Typography>
              )}
            </div>
          </div>

          <div className="si-pw-header-icons">
            {membersCount > 0 && membersCount < 3 && (
              <IconButton
                size="small"
                target="_blank"
                component={Link}
                to={`/profile/${otherUser?.username}`}
              >
                <PersonIcon htmlColor="#3D4548" />
              </IconButton>
            )}
            <IconButton size="small" onClick={() => toggleMsgOpt("search")}>
              <SearchIcon htmlColor="#3D4548" />
            </IconButton>
            <IconButton size="small" onClick={toggleNotificationOpt}>
              {isNotificationMute ? (
                <NotificationsOffIcon htmlColor="#3D4548" />
              ) : (
                <NotificationsIcon htmlColor="#3D4548" />
              )}
            </IconButton>
            <IconButton size="small" onClick={() => toggleMsgOpt()}>
              <InfoIcon htmlColor="#3D4548" />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={`si-pw-chat si-pw-chat-${shCn}`}>
        <MessageListSideBar
          className="si-pw-chat-left"
          toggleConvoMenu={toggleConvoMenu}
        />
      </div>
      <div onClick={toggleConvoMenu} className={`si-pw-bg si-pw-bg-${shCn}`} />
    </>
  );
};
