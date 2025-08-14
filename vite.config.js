import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
