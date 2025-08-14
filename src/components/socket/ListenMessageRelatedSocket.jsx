import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getEndPoint } from "@api/endpoint";
import { playSound } from "@utils/playSound";
import { useSocketContext } from "./SocketProvider";
import { setConvoDetails } from "@store/extraSlice";
import { getLang } from "@translations/utils/getLang";
import { userSelector } from "@store/authSlice/selectors";
import { useIntl } from "react-intl";
import { checkIsLocal } from "@utils/myFunc";

const WinUrl = getEndPoint("fe", { isLocal: checkIsLocal });
const ListenMessageRelatedSocket = () => {
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const { socket } = useSocketContext();

    const user = useSelector(userSelector);

    useEffect(() => {
        if (!socket?.id) return;

        const initSocket = () => {
            console.info(
                `initSocket iListenMessageRelatedSocket => ${socket?.id}`
            );

            socket?.on(
                `message-notification-${user?.email}`,
                onMessageNotification
            );
        };

        initSocket();

        return () => {
            const exitSocket = () => {
                socket?.off(
                    `message-notification-${user?.email}`,
                    onMessageNotification
                );
            };
            exitSocket();
        };
    }, [socket?.id]);

    //   {
    //     "conversation_id": "18",
    //     "sender_email": "appel@mailinator.com",
    //     "message": "hio ra",
    //     "hasAttachments": false,
    //     "timestamp": "2025-03-28T12:57:13.330Z",
    //     "topic": "private-18"
    // }

    const onMessageNotification = async (data) => {
        console.log({ onMessageNotificationSocket: data });
        const url = `${WinUrl}/inquiry/${data.conversation_id}`;

        if (Notification.permission === "granted") {
            playSound();
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(
                    formatMessage({ id: "site_name" }),
                    {
                        body: data.sender_email + ":" + data.message,
                        data: { url },
                    }
                );
            });
        }

        dispatch(setConvoDetails({ fetchConvo: true }));
    };
    return null;
};

export { ListenMessageRelatedSocket };
