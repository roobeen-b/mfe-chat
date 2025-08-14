import { useDispatch } from "react-redux";
import { Divider, Typography } from "@mui/material";

import { MessagePerPage } from "../../constant";
import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { useConversationSocket } from "../context/ConversationProvider";

import { setConvoDetails } from "@store/extraSlice";
import { getSpecificString } from "@utils/stringHelpers";
import { RelativeTimeComp } from "@components/bits/RelativeTimeComp";

const highlightText = (text, searchText) => {
    if (!searchText || !text) return text;

    // Create a regex to match the search term (case-insensitive)
    const regex = new RegExp(`(${searchText})`, "gi");

    return text.split(regex).map((part, index) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
            <Typography
                key={index}
                component={"span"}
                sx={{ color: "primary.main", fontWeight: "600" }}
            >
                {part}
            </Typography>
        ) : (
            part
        )
    );
};

export const ConvoSearchOptionListComp = (props) => {
    const { list, searchText } = props;
    const dispatch = useDispatch();
    const { members } = useConversationSocket();

    const handleOnMessageClick = (num, id) => () => {
        const offset = parseInt(num);
        const halfMsgPerPage = (MessagePerPage / 2) | 0;
        const cusOffSet = offset < halfMsgPerPage ? 0 : offset - halfMsgPerPage;

        dispatch(
            setConvoDetails({
                msgOffset: cusOffSet,
                sideMenuOpt: "search",
                selectedSearchMsgId: id,
                showMessageOverlay: true,
            })
        );
    };

    return (
        <div className="cs-ow-search-list">
            <ul className="cs-ow-search-list-ul">
                {list?.map((i, j) => {
                    const usr = members?.[i?.sender_email];
                    const alt =
                        usr?.name || usr?.username || usr?.email.split("@")[0];

                    return (
                        <li
                            key={i?.message_id + `-${j}`}
                            onClick={handleOnMessageClick(
                                i?.row_number,
                                i?.message_id
                            )}
                        >
                            <div className="cs-ow-search-list-ul-li">
                                <AvatarComp
                                    alt={alt}
                                    src={usr?.image}
                                    variant="circular"
                                    sx={{ width: 36, height: 36 }}
                                    className="cs-ow-search-list-ul-li-icon"
                                />
                                <div className="cs-ow-search-list-ul-li-body">
                                    <div className="cs-ow-search-list-ul-li-name">
                                        <Typography component="div">
                                            <b>{alt}</b>
                                        </Typography>
                                        {i?.created_at && (
                                            <Typography
                                                component="div"
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                <RelativeTimeComp
                                                    timestamp={i.created_at}
                                                    options={{
                                                        numeric: "always",
                                                        style: "narrow",
                                                    }}
                                                />
                                            </Typography>
                                        )}
                                    </div>
                                    <Typography
                                        component="div"
                                        color="textSecondary"
                                        className="cs-ow-search-list-ul-li-message"
                                    >
                                        {highlightText(
                                            getSpecificString(
                                                i?.message,
                                                searchText || ""
                                            ) || undefined,
                                            searchText
                                        )}
                                    </Typography>
                                </div>
                            </div>
                            <Divider className="cs-ow-search-list-ul-li-divider" />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
