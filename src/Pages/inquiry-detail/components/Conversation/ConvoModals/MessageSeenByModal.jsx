import { Link } from "react-router";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { RelativeDateComp } from "@components/bits/RelativeDateComp";
import { convoRelatedModalSelector } from "@store/extraSlice/selectors";

export const MessageSeenByModal = (props) => {
  const {} = props;
  const members = useSelector(convoRelatedModalSelector)?.members || [];

  return (
    <ul className="cmw-plm cmw-seen-by">
      {members.map((x, j) => {
        const alt = x.name || x.username || x.email;
        const src = x.image || "";
        return (
          <li key={j}>
            <Link className="cmw-seen-by-item" to={`/profile/${x.username}`}>
              <>
                <AvatarComp
                  alt={alt}
                  src={src}
                  id={alt + `-${j}`}
                  key={alt || `${j}`}
                  className="cmw-seen-by-item-avatar"
                />
                <div className="cmw-seen-by-item-div">
                  <Typography>{alt}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    <RelativeDateComp timestamp={x.seen_at || ""} />
                  </Typography>
                </div>
              </>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
