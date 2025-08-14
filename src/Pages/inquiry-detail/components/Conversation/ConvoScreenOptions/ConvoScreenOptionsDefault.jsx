import { Divider } from "@mui/material";

import { ConvoScreenOptionsDefaultHead } from "./ConvoScreenOptionsDefaultHead";
import { ConvoScreenOptionsDefaultMedias } from "./ConvoScreenOptionsDefaultMedias";
import { ConvoScreenOptionsDefaultPrivacy } from "./ConvoScreenOptionsDefaultPrivacy";
import { ConvoScreenOptionsDefaultMembers } from "./ConvoScreenOptionsDefaultMembers";

export const ConvoScreenOptionsDefault = (props) => {
    const { hasLeftGroup } = props;

    return (
        <>
            <ConvoScreenOptionsDefaultHead />
            <Divider className="cs-ow-divider" />
            <ConvoScreenOptionsDefaultMembers className="cs-ow-body-members" />
            <ConvoScreenOptionsDefaultMedias
                type="media"
                className="cs-ow-body-medias"
            />
            <ConvoScreenOptionsDefaultMedias
                type="files"
                className="cs-ow-body-medias"
            />
            {!hasLeftGroup && (
                <ConvoScreenOptionsDefaultPrivacy className="cs-ow-body-privacy" />
            )}
        </>
    );
};
