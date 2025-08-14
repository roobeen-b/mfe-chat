import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ConvoScreen } from "./Conversation/ConvoScreen";
import { useSocketContext } from "@components/socket/SocketProvider";
import { ConvoModals } from "./Conversation/ConvoModals/ConvoModals";
import { SingleInquiryPageWrapper } from "./SingleInquiryPageWrapper";
import { ConversationProvider } from "./Conversation/context/ConversationProvider";
import { ConvoScreenHeader } from "./Conversation/ConvoScreenHeader/ConvoScreenHeader";
import { ConvoScreenOptions } from "./Conversation/ConvoScreenOptions/ConvoScreenOptions";

import { useIsMounted } from "@utils/index";
import { MessagePerPage } from "./constant";
import { setConvoDetails } from "@store/extraSlice";
import { convoRelatedDetailsSelector } from "@store/extraSlice/selectors";
import { useCallConvoFetch } from "@api/helpers/inquire/conversation/useCallConvoFetch";

export const SingleInquiryPage = (props) => {
    const {
        slug,
        type,
        members,
        convoName,
        convoImage,
        list: fallbackData,
    } = props;

    const dispatch = useDispatch();
    const isMounted = useIsMounted();
    const { socket } = useSocketContext();
    //   const page = useRef(0);

    const [page, setPage] = useState(0);
    const [msgList, setMsgList] = useState([]);

    const isMsgOptOpen = Boolean(
        useSelector(convoRelatedDetailsSelector)?.sideMenuOpt
    );

    useEffect(() => {
        const checkIfMobile = () => {
            if (window.innerWidth <= 992) {
                dispatch(setConvoDetails({ sideMenuOpt: undefined }));
            } else {
                // toggleMsgOpt("general");
            }
        };

        checkIfMobile();
    }, []);

    const handleSuccess = (data) => {
        setMsgList((v) => [...(data?.data?.rows || []), ...v]);
    };
    const {
        count = 0,
        loading,
        isActive,
        isAdmin,
    } = useCallConvoFetch(
        {
            id: slug,
            limit: MessagePerPage,
            offset: page * MessagePerPage,
        },
        handleSuccess,
        fallbackData
    );

    const shCn = isMsgOptOpen ? "show" : "hide";

    const toggleMsgOpt = (v) => {
        dispatch(
            setConvoDetails({
                sideMenuOpt: v ? v : isMsgOptOpen ? undefined : "general",
            })
        );
    };
    if (!isMounted && !socket?.id) return <></>;

    return (
        <SingleInquiryPageWrapper className="si-pw">
            <ConversationProvider
                type={type}
                count={count}
                msgs={msgList}
                members={members}
                conversationId={slug}
                convoName={convoName}
                convoImage={convoImage}
                setMessages={setMsgList}
                isAdmin={isAdmin || false}
                isActive={isActive || false}
            >
                <div className="si-pw-convo">
                    <div
                        className={`si-pw-convo-main si-pw-convo-main-${shCn}`}
                    >
                        <ConvoScreenHeader
                            className="si-pw-convo-header"
                            toggleMsgOpt={toggleMsgOpt}
                        />
                        <ConvoScreen
                            count={count}
                            loading={loading}
                            fetchOldConvo={() => setPage((c) => c + 1)}
                            className={`si-pw-convo-cs si-pw-convo-cs-${shCn}`}
                        />
                    </div>
                    <ConvoScreenOptions
                        className={`si-pw-convo-cso si-pw-convo-cso-${shCn}`}
                    />
                    <div
                        onClick={() => toggleMsgOpt(undefined)}
                        className={`si-pw-convo-cso-bg si-pw-convo-cso-bg-${shCn}`}
                    />
                </div>
                <ConvoModals />
            </ConversationProvider>
        </SingleInquiryPageWrapper>
    );
};
