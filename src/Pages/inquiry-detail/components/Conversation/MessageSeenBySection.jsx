import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { AvatarGroup, Typography } from "@mui/material";

import { toggleConvoRelatedModal } from "@store/extraSlice";
import { AvatarComp } from "@components/bits/FileComp/Avatar";

export const MessageSeenBySection = (props) => {
    const { members } = props;
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();

    let mmb = [...members];
    const memberCount = mmb.length;

    const onSeenByClick = () => {
        dispatch(toggleConvoRelatedModal({ mType: "seen_by", members: mmb }));
    };
    return (
        <div className="csw-cs-sm-seen-by" onClick={onSeenByClick}>
            {memberCount > 1 && (
                <Typography variant="caption" color="textSecondary">
                    {formatMessage(
                        { id: "seen_by_x_members" },
                        { count: memberCount }
                    )}
                </Typography>
            )}
            <AvatarGroup
                color="secondary"
                total={memberCount}
                className="csw-cs-sm-seen-by-grp"
                slotProps={{
                    additionalAvatar: {
                        className: "csw-cs-sm-seen-by-additional",
                    },
                }}
            >
                {mmb.slice(0, 3).map((x, j) => {
                    const alt = x.name || x.username || x.email;
                    const src = x.image || "";
                    return (
                        <AvatarComp
                            alt={alt}
                            src={src}
                            id={alt + `-${j}`}
                            key={alt || `${j}`}
                            sx={{ width: 15, height: 15, marginRight: ".5rem" }}
                            className="csw-cs-sm-seen-by-avatar"
                        />
                    );
                })}
            </AvatarGroup>
        </div>
    );
};
