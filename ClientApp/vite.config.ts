import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import paths from "vite-tsconfig-paths";
import https from "node:https";

// https://vitejs.dev/config/
export default defineConfig({
  /* This is the dev server */
  server: {
    https: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "https://localhost:5001",
        changeOrigin: true,
        secure: true,
        agent: new https.Agent({
          /* Does not reject self signed certificate when this is false */
          rejectUnauthorized: false,
        }),
      },
    },
  },
  esbuild: {
    jsx: "automatic",
  },
  plugins: [react(), mkcert(), paths()],
});
