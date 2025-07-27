import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { copyFileSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    // Plugin to ensure correct MIME types
    {
      name: "mime-fix",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith(".js") || req.url?.endsWith(".mjs")) {
            res.setHeader("Content-Type", "text/javascript");
          }
          next();
        });
      },
    },
    // Plugin to copy server configuration files to dist
    {
      name: "copy-server-configs",
      writeBundle() {
        try {
          copyFileSync(".htaccess", "dist/.htaccess");
          copyFileSync("web.config", "dist/web.config");
          copyFileSync("_headers", "dist/_headers");
        } catch (error) {
          console.warn(
            "Warning: Could not copy server configuration files:",
            error
          );
        }
      },
    },
  ],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ionic: ["@ionic/react"],
          icons: ["lucide-react"],
        },
      },
    },
    // Copy server configuration files to dist
    copyPublicDir: true,
  },
  publicDir: "public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 5174,
  },
});
