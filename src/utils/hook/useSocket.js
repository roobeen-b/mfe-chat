// "use client";
// import { useEffect } from "react";
// import { getSocket } from "@utils/socket";

// // Define the valid event names as a union type
// type SocketEvent =
//   | "connect"
//   | "disconnect"
//   | "message"
//   | "update"
//   | "error"
//   | string;

// // Define the callback type: it receives data of any type
// type Callback<T = any> = (data: T) => void;

// /**
//  * Custom hook to listen to WebSocket events.
//  * @param event - The name of the WebSocket event.
//  * @param callback - Function to call when the event occurs.
//  */
// const useSocket = <T = any>(event: SocketEvent, callback: Callback<T>) => {
//   useEffect(() => {
//     const socket = getSocket();

//     if (!socket) {
//       console.error("Socket connection not available.");
//       return;
//     }

//     // Attach the listener with the event name and callback
//     socket.on(event, callback);

//     // Clean up the listener when the component unmounts
//     return () => {
//       socket.off(event, callback);
//     };
//   }, [event, callback]);
// };

// export default useSocket;
