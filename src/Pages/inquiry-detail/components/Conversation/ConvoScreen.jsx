import { useSelector } from "react-redux";

import { ConvoSection } from "./ConvoSection";
import { SendMessageBtn } from "./SendMessageBtn";
import { ReplyingToSection } from "./ReplyingToSection";
import { ConvoScreenWrapper } from "./ConvoScreenWrapper";
import { ConvoSectionSearch } from "./ConvoSectionSearch";
import { useConversationSocket } from "./context/ConversationProvider";
import { convoRelatedDetailsSelector } from "@store/extraSlice/selectors";

export const ConvoScreen = (props) => {
    const { loading, count, fetchOldConvo, className = "" } = props;

    const { reply, isActive } = useConversationSocket();

    const convoDetails = useSelector(convoRelatedDetailsSelector) || {};
    const { msgOffset, showMessageOverlay } = convoDetails;

    const showOverlay = Number.isInteger(msgOffset) && showMessageOverlay;
    const hasLeftGroup = !isActive;
    return (
        <ConvoScreenWrapper
            className={className + " csw"}
            hasReply={Boolean(reply?.message_id)}
        >
            <ConvoSection
                count={count}
                loading={loading}
                hasLeftGroup={hasLeftGroup}
                fetchOldConvo={fetchOldConvo}
                className={`csw-cs ${showOverlay ? "csw-cs-hide" : ""}`}
            />
            {showOverlay && (
                <ConvoSectionSearch
                    hasLeftGroup={hasLeftGroup}
                    className="csw-cs csw-cs-overlay"
                />
            )}
            <div>
                <ReplyingToSection className="csw-rts" />
                <SendMessageBtn
                    loading={false}
                    className="csw-smb"
                    isDisabled={hasLeftGroup}
                />
            </div>
        </ConvoScreenWrapper>
    );
};
