import { useIntl } from "react-intl";
import { Link } from "react-router";
import { useSelector } from "react-redux";

import { formatDate } from "@utils/parseDate";
import { encodeToBase64 } from "@utils/encodeDecode";
import { userSelector } from "@store/authSlice/selectors";
import { convoNameFromMembers, getAllParticipants } from "@utils/convoUtils";

import { AvatarComp } from "@components/bits/FileComp/Avatar";

const TABLE_KEYS = ["name", "subject", "message", "date"];

export const InquireList = (props) => {
  const { list, loading } = props;
  const { formatMessage } = useIntl();
  const user = useSelector(userSelector) || undefined;
  return (
    <div className="ipw-list">
      <div className="ipw-list-item">
        {TABLE_KEYS.map((i) => (
          <div key={i} className={"ipw-list-item-x ipw-list-item-" + i}>
            <b>{formatMessage({ id: i })}</b>
          </div>
        ))}
      </div>

      {!loading &&
        list?.map((i) => {
          const participants = getAllParticipants(
            i?.other_participants_details,
            user
          );

          const eName = i?.conversation_name
            ? `&n=${encodeToBase64(i?.conversation_name)}`
            : "";

          const [participant] = participants;
          const { image = "", name, username, email } = participant;
          const grpName =
            i?.conversation_name || convoNameFromMembers(participants);
          const isGroup = participants.length > 1;
          const alt = isGroup ? grpName : name || username;
          const src = isGroup
            ? i?.conversation_image
            : i?.conversation_image || image;

          return (
            <Link
              key={i?.conversation_id}
              className="ipw-list-item"
              to={`/inquiry/${i?.conversation_id}?c=g${eName}`}
            >
              <div className="ipw-list-item-x ipw-list-item-name">
                <div className="ipw-list-item-name-detail-one">
                  <AvatarComp
                    alt={alt}
                    src={src}
                    variant="circular"
                    sx={{ width: 36, height: 36 }}
                    className="ipw-list-item-name-detail-one-icon"
                  />
                  <div className="ipw-list-item-name-detail-one-detail">
                    <b>{alt}</b>
                    <i>
                      {isGroup ? (
                        <>
                          {participants.length}&nbsp;
                          {formatMessage({
                            id: "members",
                          })}
                        </>
                      ) : (
                        email
                      )}
                    </i>
                  </div>
                </div>
              </div>
              <div className="ipw-list-item-x ipw-list-item-subject">
                {i?.last_message_subject}
              </div>
              <div
                title={i?.last_message || "-"}
                className="ipw-list-item-x ipw-list-item-message"
              >
                {i?.last_message_timestamp
                  ? i?.last_message || formatMessage({ id: "attachments" })
                  : "-"}
              </div>
              <div className="ipw-list-item-x ipw-list-item-date">
                {i?.last_message_timestamp
                  ? formatDate(i?.last_message_timestamp, "ddd, MMM DD, hh:mm")
                  : "-"}
              </div>
            </Link>
          );
        })}
    </div>
  );
};
