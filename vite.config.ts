// vite.config.js or vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ghPages from "vite-plugin-gh-pages";

export default defineConfig({
  plugins: [react(), ghPages()],
  base: "/pokequiz/", // Replace 'my-repo' with your repository name
});
