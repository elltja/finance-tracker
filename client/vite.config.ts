import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server:
    mode === "development"
      ? {
          host: "0.0.0.0",
          watch: {
            usePolling: true,
          },
        }
      : undefined,
}));
