import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "chat",
      filename: "remoteEntry.js",
      exposes: {
        // "./Chat": "./src/App.jsx",
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
    }),
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
      "@components": path.join(__dirname, "./src/components"),
      "@store": path.join(__dirname, "./src/store"),
      "@api": path.join(__dirname, "./src/api"),
      "@utils": path.join(__dirname, "./src/utils"),
      "@translations": path.join(__dirname, "./src/translations"),
      "@config": path.join(__dirname, "./src/config"),
      "@styles": path.join(__dirname, "./src/styles"),
    },
  },
  server: {
    port: 3000,
  },
});
