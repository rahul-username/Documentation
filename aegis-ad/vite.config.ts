import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev server for the interactive Remotion <Player> (scrub + play controls).
export default defineConfig({
  root: "player",
  server: { port: 5173, fs: { allow: [".."] } },
  plugins: [react()],
});
