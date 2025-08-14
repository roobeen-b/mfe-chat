import { useIntl } from "react-intl";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { AvatarComp } from "../FileComp/Avatar";
import { SelectedUsersWrapper } from "./SelectedUsersWrapper";

export const SelectedUsers = (props) => {
    const { users, removeOption } = props;
    const { formatMessage } = useIntl("Shared");
    return (
        <SelectedUsersWrapper className="suw">
            {users?.length > 0 ? (
                <div className="suw-list">
                    {[...users]?.map((i, j) => {
                        const alt =
                            i.name || i.username || i?.email?.split?.("@")?.[0];
                        const src = i.image || "";
                        return (
                            <div
                                key={i.email + `-${j}`}
                                className="suw-list-item"
                            >
                                <AvatarComp
                                    alt={alt}
                                    src={src}
                                    sx={{ width: 20, height: 20 }}
                                    className="suw-list-item-avatar"
                                />
                                <Typography
                                    title={alt}
                                    variant="caption"
                                    className="suw-list-item-name"
                                >
                                    <b>{alt}</b>
                                </Typography>
                                <CloseIcon
                                    fontSize="small"
                                    onClick={() => removeOption(i.email)}
                                    className="suw-list-item-close"
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <Typography
                    variant="caption"
                    color="textSecondary"
                    className="suw-no"
                >
                    {formatMessage({ id: "no_users_selected" })}
                </Typography>
            )}
        </SelectedUsersWrapper>
    );
};
