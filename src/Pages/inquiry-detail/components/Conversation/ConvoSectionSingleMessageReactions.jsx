import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

import { toggleConvoRelatedModal } from "@store/extraSlice";
import { calculateSpecificReactionCount } from "./convoUtils";

export const ConvoSectionSingleMessageReactions = (props) => {
    const { reactions, className } = props;
    const dispatch = useDispatch();

    const reactionCount = calculateSpecificReactionCount(reactions);

    const onReactionsClick = () => {
        dispatch(
            toggleConvoRelatedModal({
                mType: "reactions",
                reactions: reactions,
            })
        );
    };

    return (
        <ul className={className} onClick={onReactionsClick}>
            {Object.entries(reactionCount).map(([emoji, count]) => (
                <li key={emoji} className="csw-cs-sm-msg-reactions-li">
                    <span className="csw-cs-sm-msg-reactions-li-emoji">
                        {emoji}
                    </span>
                    {count > 1 && (
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            className="csw-cs-sm-msg-reactions-li-count"
                        >
                            {count}
                        </Typography>
                    )}
                </li>
            ))}
        </ul>
    );
};
