import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { AvatarGroup, Typography } from "@mui/material";

import { ButtonComp } from "@components/bits/Button";
import { AvatarComp } from "@components/bits/FileComp/Avatar";

import { setConvoDetails } from "@store/extraSlice";
import { useConversationSocket } from "../context/ConversationProvider";

export const ConvoScreenOptionsDefaultMembers = (props) => {
    const {} = props;

    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const { members, type } = useConversationSocket();

    const mmb = Object.values(members);

    const setShowOPt = (v) => {
        dispatch(setConvoDetails({ sideMenuOpt: v }));
    };

    return (
        <>
            <Typography className="cs-ow-flex cs-ow-p1 cs-ow-pb0">
                <b>{formatMessage({ id: "members" })}</b>
                {type === "group" && (
                    <ButtonComp
                        size="small"
                        color="primary"
                        onClick={() => setShowOPt("members")}
                    >
                        {formatMessage({ id: "see_all" })}
                    </ButtonComp>
                )}
            </Typography>
            <div className="cs-ow-body-members cs-ow-py">
                <AvatarGroup
                    color="primary"
                    total={mmb.length}
                    className="cs-ow-body-members-grp"
                    slotProps={{
                        additionalAvatar: {
                            className: "cs-ow-body-members-grp-additional",
                        },
                    }}
                >
                    {mmb?.slice(0, 6)?.map((i, j) => {
                        const name =
                            i.name || i.username || i?.email?.split?.("@")?.[0];
                        return (
                            <AvatarComp
                                alt={name}
                                src={i?.image}
                                color="primary"
                                variant="circular"
                                key={i.email + `-${j}`}
                                sx={{ width: 40, height: 40 }}
                                className="cs-ow-body-members-grp-avatar"
                            />
                        );
                    })}
                </AvatarGroup>
            </div>
        </>
    );
};
