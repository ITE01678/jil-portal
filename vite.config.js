import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // VITE_BASE_PATH is set in GitHub Actions to "/repo-name/"
  // Leave unset for local dev (defaults to "/")
  base: process.env.VITE_BASE_PATH ?? "/",
});
