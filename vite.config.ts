import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: "client", // Define a raiz como client
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@/hooks": path.resolve(__dirname, "client", "src", "hooks"), // <-- ADICIONE ESTA LINHA
      "@/components": path.resolve(__dirname, "client", "src", "components"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: "../dist/public", // Relativo à pasta client
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: false,
      allow: [".."]
    },
  },
});