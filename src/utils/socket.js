// "use client";
// import { io, Socket } from "socket.io-client";

// import { getEndPoint } from "@api/endpoint";
// import { extractFromCookies } from "@utils/stringHelpers";

// let socket: Socket | null = null;

// const socketOpt = {
//   // reconnection: false,
//   // Whether reconnection is enabled or not. If set to false, you need to manually reconnect
//   reconnectionAttempts: 10,
//   // The number of reconnection attempts before giving up.
//   reconnectionDelay: 3000,
//   // The initial delay before reconnection in milliseconds
//   timeout: 5000, // 5 seconds
//   // autoConnect: false,
//   // Whether to automatically connect upon creation.
//   // If set to false, you need to manually connect socket.connect(); or  socket.io.open();
// };
// const chatSocketUrl = getEndPoint("chat", {
//   apiPrefix: undefined,
//   apiVersion: undefined,
// });

// const updateSocketAuth = () => {
//   // update socket on access token update after expiry
//   const authToken = extractFromCookies("token");
//   if (socket) {
//     socket.io.opts.extraHeaders = { Authorization: authToken?.access_token };
//     socket.disconnect();
//     socket.connect();
//     console.log("Socket authorization updated");
//   }
// };

// const getSocket = (): Socket => {
//   const authToken = extractFromCookies("token");

//   if (!socket) {
//     const token = {
//       extraHeaders: { Authorization: authToken?.access_token },
//     };
//     socket = io(chatSocketUrl, { ...socketOpt, ...token });
//     console.log("Socket initialized");
//   }
//   return socket;
// };

// const emitSocketEvent = <T = any>(event: string, data: T) => {
//   const socket = getSocket();

//   if (socket) {
//     socket.emit(event, data);
//     console.log(`Event "${event}" emitted with data:`, data);
//   } else {
//     console.error("Cannot emit event, socket is not connected.");
//   }
// };

// export { getSocket, updateSocketAuth, emitSocketEvent };
