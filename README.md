# Micro-frontend chat app

Module Federation is a specific method of enabling what are commonly called “micro frontend” in JavaScript applications using Webpack 5. Module federation is only available on the version 5 of webpack.

This project is a remote/micro-frontend chat app for using [Modular Federation with React and vite](https://www.npmjs.com/package/@module-federation/vite). This app exposes the required modules which is later used by the host app.

## Getting Started

1. Clone & Install
   ```shell
   git clone https://github.com/roobeen-b/mfe-chat
   cd mfe-chat
   npm install
   ```
2. Build & Preview
   ```shell
   npm run build
   npm run preview
   ```
   This exposes the remoteEntry.js at http://localhost:3001/assets/remoteEntry.js

## Configuration Overview

```js
federation({
  name: "chat",
  filename: "remoteEntry.js",
  exposes: {
    "./InquiryPage": "./src/Pages/inquiry/index.jsx",
    "./InquiryDetailPage": "./src/Pages/inquiry-detail/index.jsx",
    "./SocketProvider": "./src/components/socket/SocketProvider",
  },
  shared: {
    react: {
      requiredVersion: "^19.1.1",
      singleton: true,
    },
    "react-dom": {
      requiredVersion: "^19.1.1",
      singleton: true,
    },
    "@reduxjs/toolkit": {
      requiredVersion: "^2.8.2",
      singleton: true,
    },
    "react-redux": {
      requiredVersion: "^9.2.0",
      singleton: true,
    },
    "react-router": {
      requiredVersion: "^7.8.0",
      singleton: true,
    },
    "@emotion/react": {
      singleton: true,
      requiredVersion: "^11.14.0",
    },
  },
});
```

| Property  | Description                                                                  |
| :-------- | :--------------------------------------------------------------------------- |
| name      | Unique identifier for the remote module                                      |
| filename  | Manifest file for exposed modules                                            |
| exposes   | Components or context to be consumed by host                                 |
| shared    | Dependencies to deduplicate across host and remote                           |
| singleton | Ensures only one instance of shared lib (critical for context/state sharing) |

## Exposed Modules

| Module Path         | Description                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------- |
| ./InquiryPage       | Reusable inquiry page component                                                            |
| ./InquiryDetailPage | Reusable inquiry detail page component                                                     |
| ./SocketProvider    | Wrapper component containing states and hooks for using websocket. Uses React Context API. |

## References

- [Solving micro-frontend challenges with Module Federation - LogRocket](https://blog.logrocket.com/solving-micro-frontend-challenges-module-federation/)
- [Micro-frontend with Vite + React - DEV](https://dev.to/kevin-uehara/micro-frontend-with-module-federations-part-1-vite-33nd)
