import { useState } from "react";
import { useIntl } from "react-intl";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Typography } from "@mui/material";

import { EmptyArea } from "@components/bits/EmptyArea";
import { InputField } from "@components/bits/InputField";
import { ConvoSearchOptionListComp } from "./ConvoSearchOptionListComp";
import { NotificationMessageSkeleton } from "@components/bits/Skeleton/NotificationMessageSkeleton";

import { useDebounce } from "@utils/index";
import { useConversationSocket } from "../context/ConversationProvider";
import { useCallSearchInConvo } from "@api/helpers/inquire/conversation/useCallSearchInConvo";

export const ConvoSearchOptions = (props) => {
    const { setShowOPt } = props;
    const { formatMessage } = useIntl();

    const { conversationId } = useConversationSocket();

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery);

    const {
        list,
        count = 0,
        // mutate,
        loading,
    } = useCallSearchInConvo({
        id: conversationId,
        search_keyword: debouncedSearchQuery,
    });

    return (
        <>
            <Typography gutterBottom className="cs-ow-flex cs-ow-p1">
                <b>{formatMessage({ id: "search_in_convo" })}</b>
                <IconButton
                    size="small"
                    title={formatMessage({ id: "close" })}
                    aria-label="close"
                    onClick={() => setShowOPt("general")}
                >
                    <CloseIcon fontSize="small" htmlColor="#3D4548" />
                </IconButton>
            </Typography>
            <InputField
                fullWidth
                size="small"
                variant="outlined"
                value={searchQuery}
                placeholder={formatMessage({ id: "search_messages" })}
                className="cs-ow-search cs-ow-p1 cs-ow-pt0"
                startAdornment={<SearchIcon fontSize="small" />}
                onChange={(e) => setSearchQuery(e.target?.value)}
            />
            {count === 0 && !loading && (
                <EmptyArea
                    title=""
                    iconWidth="200px"
                    className="cs-ow-p1"
                    subtitle="no_messages_yet_check_later"
                />
            )}
            {loading && (
                <NotificationMessageSkeleton className="cs-ow-p1" length={2} />
            )}
            <ConvoSearchOptionListComp
                list={list}
                className="cs-ow-search-list"
                searchText={debouncedSearchQuery}
            />
        </>
    );
};
