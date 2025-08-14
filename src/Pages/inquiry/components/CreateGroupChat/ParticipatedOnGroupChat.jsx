import { useIntl } from "react-intl";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { Spinner } from "@components/bits/Spinner";
import { AvatarComp } from "@components/bits/FileComp/Avatar";

import { convoNameFromMembers } from "@utils/convoUtils";
import { userSelector } from "@store/authSlice/selectors";

export const ParticipatedOnGroupChat = (props) => {
  const { loading, groupChats = [], onClose } = props;
  const timerRef = useRef(null);
  const { formatMessage } = useIntl();
  const user = useSelector(userSelector);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onGroupClick = () => {
    timerRef.current = setTimeout(() => {
      onClose?.();
    }, 1000);
  };
  return (
    <>
      <Typography gutterBottom color="primary">
        {formatMessage({ id: "chat" })}
      </Typography>
      <Paper className="cgc-mw-pgc">
        <ul className="cgc-mw-pgc-ul">
          {groupChats?.map((i, j) => {
            const p = i?.member_details?.filter((x) => x.email !== user?.email);
            const isGroup = p?.length > 1;
            const s = p?.[0];
            const image = i?.conversation_image || s?.image;
            const alt = isGroup
              ? i?.conversation_name || convoNameFromMembers(p)
              : s?.name || s?.username || s?.email?.split?.("@")?.[0];
            return (
              <li className="cgc-mw-pgc-li" key={i.conversation_id + `-${j}`}>
                <Link
                  onClick={onGroupClick}
                  to={`/inquiry/${i?.conversation_id}`}
                >
                  <div className="cgc-mw-pgc-li-detail-one">
                    <AvatarComp
                      alt={alt}
                      src={image}
                      variant="circular"
                      sx={{ width: 36, height: 36 }}
                    />
                    <div className="cgc-mw-pgc-li-detail-one-detail">
                      <b>{alt}</b>
                      <Typography variant="caption" color="textSecondary">
                        {isGroup ? (
                          <>
                            {p?.length + 1}&nbsp;
                            {formatMessage({
                              id: "members",
                            })}
                          </>
                        ) : (
                          s?.email
                        )}
                      </Typography>
                    </div>
                    <IconButton color="secondary">
                      <ArrowRightAltIcon />
                    </IconButton>
                  </div>
                </Link>
              </li>
            );
          })}
          {loading && <Spinner size={24} style={{ left: "90%" }} />}
          {groupChats.length === 0 && (
            <Typography
              component={"li"}
              color="textSecondary"
              sx={{ padding: "0.8rem 0.5rem" }}
            >
              {formatMessage({ id: "no_chat_yet" })}
            </Typography>
          )}
        </ul>
      </Paper>
    </>
  );
};
