import { Link } from "react-router";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { convoRelatedModalSelector } from "@store/extraSlice/selectors";
import { useConversationSocket } from "../context/ConversationProvider";

export const MessageReactionsModal = (props) => {
  const {} = props;
  const reactions = useSelector(convoRelatedModalSelector)?.reactions || [];
  const { members } = useConversationSocket();

  return (
    <ul className="cmw-plm cmw-reactions">
      {reactions?.map((i, j) => {
        const x = members?.[i.user_email] || {};
        const src = x.image || "";
        const alt = x.name || x.username || x.email || i.user_email;

        return (
          <li key={j}>
            <Link
              className="cmw-reactions-item"
              href={`/profile/${x.username}`}
            >
              <>
                <AvatarComp
                  alt={alt}
                  src={src}
                  id={alt + `-${j}`}
                  key={alt || `${j}`}
                  className="cmw-reactions-item-avatar"
                />
                <div className="cmw-reactions-item-div">
                  <Typography>{alt}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {x.email}
                  </Typography>
                </div>
                <div className="cmw-reactions-item-reaction">{i.reaction}</div>
              </>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
