import { useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Typography } from "@mui/material";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

import { SnackBar } from "@utils/toast";
import { waitMinutes } from "@utils/myFunc";
import { userSelector } from "@store/authSlice/selectors";
import { toggleConvoRelatedModal } from "@store/extraSlice";
import { useConversationSocket } from "../context/ConversationProvider";

export const ConvoScreenOptionsDefaultPrivacy = (props) => {
    const {} = props;

    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const user = useSelector(userSelector);
    const { members } = useConversationSocket();
    const [isNotificationMute, setIsNotificationMute] = useState(false);

    const mmb = Object.values(members);
    const adminEmail = mmb.find((i) => i.role === "admin")?.email;

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

    const handleLeaveGroup = () => {
        dispatch(
            toggleConvoRelatedModal({
                adminEmail,
                email: user?.email,
                mType:
                    user?.email === adminEmail
                        ? "admin_leave_group"
                        : "leave_group",
            })
        );
    };

    return (
        <>
            <Typography gutterBottom className="cs-ow-flex cs-ow-p1 cs-ow-pb0">
                <b>{formatMessage({ id: "privacy_and_support" })}</b>
            </Typography>
            <ul className="cs-ow-privacy">
                <li className="cs-ow-privacy-x" onClick={toggleNotificationOpt}>
                    <IconButton size="small">
                        {isNotificationMute ? (
                            <NotificationsOffIcon htmlColor="#3D4548" />
                        ) : (
                            <NotificationsIcon htmlColor="#3D4548" />
                        )}
                    </IconButton>
                    <div className="cs-ow-privacy-x-labels">
                        <Typography>
                            {formatMessage({
                                id: isNotificationMute
                                    ? "un_mute_notification"
                                    : "mute_notification",
                            })}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            component="div"
                        >
                            {formatMessage({
                                id: isNotificationMute
                                    ? "un_mute_notification_subtitle"
                                    : "mute_notification_subtitle",
                            })}
                        </Typography>
                    </div>
                </li>
                <li className="cs-ow-privacy-x" onClick={handleLeaveGroup}>
                    <IconButton size="small">
                        <ExitToAppIcon htmlColor="#3D4548" />
                    </IconButton>
                    <div className="cs-ow-privacy-x-labels">
                        <Typography>
                            {formatMessage({ id: "leave_group" })}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            component="div"
                        >
                            {formatMessage({ id: "you_can_leave_the_group" })}
                        </Typography>
                    </div>
                </li>
            </ul>
        </>
    );
};
