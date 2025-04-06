import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/Evangadi-Forum",
  plugins: [react()],
   build: {
    chunkSizeWarningLimit: 1000,  // Set the limit to 1000 kB (default is 500 kB)
  },
});

