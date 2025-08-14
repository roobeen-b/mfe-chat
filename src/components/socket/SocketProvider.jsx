import {
    useState,
    useEffect,
    useContext,
    createContext,
    // useCallback,
} from "react";

import { useIntl } from "react-intl";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

import { SnackBar } from "@utils/toast";
import { getEndPoint } from "@api/endpoint";
import { extractFromCookies } from "@utils/stringHelpers";
import RegisterServiceWorker from "./RegisterServiceWorker";
import { ListenMessageRelatedSocket } from "./ListenMessageRelatedSocket";
import { userSelector, userTokenSelector } from "@store/authSlice/selectors";

const socketOpt = {
    // reconnection: false,
    // Whether reconnection is enabled or not. If set to false, you need to manually reconnect
    reconnectionAttempts: 10,
    // The number of reconnection attempts before giving up.
    reconnectionDelay: 3000,
    // The initial delay before reconnection in milliseconds
    timeout: 5000, // 5 seconds
    // autoConnect: false,
    // Whether to automatically connect upon creation.
    // If set to false, you need to manually connect socket.connect(); or  socket.io.open();
};

const SocketContext = createContext(null);

const chatSocketUrl = getEndPoint("chat", {
    apiPrefix: undefined,
    apiVersion: undefined,
});

export const SocketProvider = ({ children }) => {
    // const token = useSelector(userTokenSelector);
    const authToken = extractFromCookies("chat_token");
    const { formatMessage } = useIntl();
    const user = useSelector(userSelector);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!authToken) return;
        const initSocket = () => {
            console.info("initSocket in SocketProvider");
            // const authToken = extractFromCookies("token");
            const extraHeaders = { Authorization: `Bearer ${authToken}` };
            // const extraHeaders = { Authorization: authToken?.access_token };
            const skt = io(chatSocketUrl, { ...socketOpt, extraHeaders });

            // When connected to the server
            skt.on("connect", () => {
                console.info(`SocketProvider: ${skt?.id} connected`);
                setSocket(skt);
                console.info({ skt, chatSocketUrl });
                callNotify("socket_connection_success", "success");
            });

            // When there is an error while connecting
            skt.on("connect_error", (error) => {
                console.info("Connection error:", error.message);
                callNotify("socket_connection_error", "error", {
                    error: error.message,
                });
            });

            // When the connection attempt times out
            skt.on("connect_timeout", (timeout) => {
                console.info("Connection timeout:", timeout);
                callNotify("socket_timeout", "error");
            });

            // When the client gets disconnected
            skt.on("disconnect", (reason) => {
                console.info("Disconnected from the server, reason:", reason);
                callNotify("socket_disconnected", "warning", { reason });
            });

            // When the client successfully reconnects after being disconnected
            skt.on("reconnect", (n) => {
                console.info(`Reconnected to the server after ${n} attempt(s)`);
                callNotify("socket_reconnected", "success", { attempts: n });
            });

            // When a reconnection attempt is made
            skt.on("reconnect_attempt", (attemptNumber) => {
                console.info("Reconnection attempt #", attemptNumber);
                callNotify("socket_reconnect_attempt", "info", {
                    attemptNumber,
                });
            });

            // When there is an error during reconnection
            skt.on("reconnect_error", (error) => {
                console.info("Reconnection error:", error.message);
                callNotify("socket_reconnect_error", "error", {
                    error: error.message,
                });
            });

            // When all reconnection attempts fail
            skt.on("reconnect_failed", () => {
                console.info("Failed to reconnect after multiple attempts");
                callNotify("socket_reconnect_failed", "error");
            });

            // Internal heartbeat events
            skt.on("ping", () => {
                console.info("Ping event received");
                callNotify("socket_ping", "info");
            });

            skt.on("pong", () => {
                console.info("Pong event received");
                callNotify("socket_pong", "info");
            });

            skt.on("pong", () => {
                console.info("Pong event received");
                callNotify("socket_pong", "info");
            });

            socket?.on(`error`, onSocketError);
        };
        initSocket();
        return () => {
            const exitSocket = () => {
                // Clean up listeners when the component unmounts
                socket?.off("connect");
                socket?.off(
                    `message-notification-${user?.email}`,
                    onMessageNotification
                );
                socket?.off(`error`);
                socket?.off("disconnect");
                socket?.off("reconnect");
                socket?.off("connect_error");
                socket?.off("connect_timeout");
                socket?.off("reconnect_error");
                socket?.off("reconnect_failed");
                socket?.off("reconnect_attempt");
                socket?.off("ping");
                socket?.off("pong");
                socket?.disconnect();
                setSocket(null);
            };
            exitSocket();
        };
    }, [authToken]);
    // Ensure socket connection only if token exists, and reconnect on token change.

    const onSocketError = (code, message) => {
        callNotify("socket_connection_error", "error", {
            error: message,
        });
        if (code === "REFRESH_TOKEN_ERROR") {
            const authToken = extractFromCookies("token");

            socket?.emit("event:refresh_token", {
                refresh_token: authToken?.refresH_token,
            });
        }
    };

    const callNotify = (msg, type = "warning", params = {}) => {
        const message = formatMessage({ id: msg }, params);
        SnackBar({ message, doNotTranslate: true }, type);
    };

    const onMessageNotification = () => {};

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
            <RegisterServiceWorker />
            <ListenMessageRelatedSocket />
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error(
            "useSocketContext must be used within a SocketProvider"
        );
    }
    return context;
};
