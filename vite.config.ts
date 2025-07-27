import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    // Plugin to ensure correct MIME types
    {
      name: 'mime-fix',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith('.js') || req.url?.endsWith('.mjs')) {
            res.setHeader('Content-Type', 'text/javascript');
          }
          next();
        });
      }
    }
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
