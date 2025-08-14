import { useEffect } from "react";
import { useSocketContext } from "./SocketProvider";

export default function RegisterServiceWorker() {
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket?.id) return;

        // Register service worker
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.info("Service Worker registered:", registration);
                    // Request notification permission
                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            console.info("Notification permission granted");
                        }
                    });
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error);
                });
        }

        return () => {};
    }, [socket]);

    return null;
}
