import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: import.meta.env.DEV
      ? {
          "/api": {
            target: "http://localhost:8000",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        }
      : undefined,
  },
  define: {
    "process.env": process.env,
  },
});
