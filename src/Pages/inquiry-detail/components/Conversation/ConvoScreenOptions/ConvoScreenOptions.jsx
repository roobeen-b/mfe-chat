import { useDispatch, useSelector } from "react-redux";

import { ConvoSearchOptions } from "./ConvoSearchOptions";
import { ConvoScreenOptionsMedia } from "./ConvoScreenOptionsMedia";
import { ConvoScreenOptionsDefault } from "./ConvoScreenOptionsDefault";
import { ConvoScreenOptionsWrapper } from "./ConvoScreenOptionsWrapper";

import { setConvoDetails } from "@store/extraSlice";
import { convoRelatedDetailsSelector } from "@store/extraSlice/selectors";
import { ConvoScreenOptionsMembers } from "./ConvoScreenOptionsMembers";
import { useConversationSocket } from "../context/ConversationProvider";

export const ConvoScreenOptions = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { isActive } = useConversationSocket();

    const hasLeftGroup = !isActive;

    const showOPt = useSelector(convoRelatedDetailsSelector)?.sideMenuOpt;

    const setShowOPt = (v) => {
        dispatch(
            setConvoDetails({
                sideMenuOpt: v,
            })
        );
    };

    return (
        <ConvoScreenOptionsWrapper className={`${className} cs-ow`}>
            {showOPt === "general" && (
                <ConvoScreenOptionsDefault hasLeftGroup={hasLeftGroup} />
            )}
            {showOPt === "media" && (
                <ConvoScreenOptionsMedia setShowOPt={setShowOPt} type="media" />
            )}
            {showOPt === "files" && (
                <ConvoScreenOptionsMedia setShowOPt={setShowOPt} type="files" />
            )}
            {showOPt === "search" && (
                <ConvoSearchOptions setShowOPt={setShowOPt} />
            )}
            {showOPt === "members" && (
                <ConvoScreenOptionsMembers
                    setShowOPt={setShowOPt}
                    hasLeftGroup={hasLeftGroup}
                />
            )}
        </ConvoScreenOptionsWrapper>
    );
};
