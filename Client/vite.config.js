import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        // to connect to docker api image inside docker virtual enviroment
        // use same name as server name as used in compose.yml file instead localhost to
        // connect inside docker enviroment
        target: "http://api:8000",
        secure: false,
      },
    },
  },
});
