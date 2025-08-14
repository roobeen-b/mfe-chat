import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";

import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { ConvoScreenOptionsMembersOptions } from "./ConvoScreenOptionsMembersOptions";

import { userSelector } from "@store/authSlice/selectors";
import { useConversationSocket } from "../context/ConversationProvider";

export const ConvoScreenOptionsMembersList = (props) => {
    const { handleAction } = props;

    const { formatMessage } = useIntl();
    const { members } = useConversationSocket();
    const mmb = Object.values(members);
    const user = useSelector(userSelector);
    const isAdmin = user?.email
        ? members?.[user.email]?.role === "admin"
        : false;

    return (
        <ul className="cs-ow-members-list">
            {mmb?.map((i, j) => {
                const name =
                    i.name || i.username || i?.email?.split?.("@")?.[0];
                return (
                    <li
                        key={i.email + `-${j}`}
                        className="cs-ow-members-list-li"
                    >
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
                                className="cs-ow-members-list-li-detail-name"
                            >
                                {i?.role === "admin" && (
                                    <Typography
                                        fontSize={"small"}
                                        variant="caption"
                                        fontWeight={"bold"}
                                        color="textSecondary"
                                    >
                                        [<i>{formatMessage({ id: "admin" })}</i>
                                        ]
                                    </Typography>
                                )}
                                &nbsp;{name}
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
        </ul>
    );
};
