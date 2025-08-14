import React from "react";
import { useSelector } from "react-redux";

import DoneAllIcon from "@mui/icons-material/DoneAll";

import { encodeToBase64 } from "@utils/encodeDecode";
import { userSelector } from "@store/authSlice/selectors";
import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { RelativeTimeComp } from "@components/bits/RelativeTimeComp";
import { convoNameFromMembers, getAllParticipants } from "@utils/convoUtils";

export const HeaderChatList = (props) => {
    const { list } = props;
    const user = useSelector(userSelector) || undefined;
    const pathname = window.location.pathname;

    return (
        <div className="hc-pw-list">
            {list?.map((i, j) => {
                const eName = i?.conversation_name
                    ? `&n=${encodeToBase64(i?.conversation_name)}`
                    : "";

                const allParticipants = getAllParticipants(
                    i?.other_participants_details,
                    user
                );
                const grpName =
                    i?.conversation_name ||
                    convoNameFromMembers(allParticipants);
                const isGroup = i?.other_participants_details?.length > 1;

                const hasUnreadMessages = i?.unread_message_count !== "0";
                const isActive =
                    pathname.split("/").at(-1) === `${i?.conversation_id}`;

                return (
                    <a
                        key={i?.conversation_id + `-${j}`}
                        href={`/inquiry/${i?.conversation_id}?c=g${eName}`}
                    >
                        <div className="hc-pw-list-item">
                            <div className="hc-pw-list-item-icon">
                                <AvatarComp
                                    alt={grpName}
                                    color="secondary"
                                    variant="circular"
                                    sx={{ width: 36, height: 36 }}
                                    id={i?.conversation_id + `-${j}`}
                                    className="hc-pw-list-item-icon-one"
                                    src={
                                        isGroup
                                            ? i?.conversation_image
                                            : i?.conversation_image ||
                                              i?.other_participants_details[0]
                                                  ?.image
                                    }
                                />
                            </div>
                            <div className="hc-pw-list-item-detail">
                                <div
                                    title={grpName}
                                    className="hc-pw-list-item-detail-x hc-pw-list-item-detail-grpName"
                                >
                                    <b>{grpName}</b>
                                </div>
                                <div
                                    title={i?.last_message || "-"}
                                    className="hc-pw-list-item-detail-x hc-pw-list-item-detail-message"
                                >
                                    {i?.last_message || "-"}
                                </div>
                                <div className="hc-pw-list-item-detail-x hc-pw-list-item-detail-action">
                                    <div className="hc-pw-list-item-detail-date">
                                        {i?.last_message_timestamp ? (
                                            <RelativeTimeComp
                                                timestamp={
                                                    i?.last_message_timestamp
                                                }
                                                options={{
                                                    numeric: "always",
                                                    style: "narrow",
                                                }}
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </div>

                                    {hasUnreadMessages && !isActive ? (
                                        <AvatarComp
                                            allText
                                            color="primary"
                                            className="hc-pw-list-item-detail-avatar"
                                            alt={
                                                (i?.unread_message_count || 0) >
                                                99
                                                    ? "99+"
                                                    : i?.unread_message_count
                                            }
                                        />
                                    ) : (
                                        <DoneAllIcon className="hc-pw-list-item-detail-icon" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
};

// type TParticipantAvatars = {
//   className?: string;
//   participants: TSingleInquire["other_participants_details"];
// };
// const ParticipantAvatars = ({ participants }: TParticipantAvatars) => {
//   const [participant] = participants;
//   const { image = "", name, username } = participant;
//   const alt = name || username;

//   return (
//     <>
//       <AvatarComp
//         alt={alt}
//         src={image}
//         variant="circular"
//         sx={{ width: 36, height: 36 }}
//         className="hc-pw-list-item-icon-one"
//       />

//       {participants.length > 1 && (
//         <AvatarComp
//           allText
//           src={""}
//           variant="circular"
//           sx={{ width: 30, height: 30 }}
//           alt={`+${participants.length - 1}`}
//           className="hc-pw-list-item-icon-many"
//         />
//       )}
//     </>
//   );
// };
