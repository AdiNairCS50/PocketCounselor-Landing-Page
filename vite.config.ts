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
          copyFileSync(".nojekyll", "dist/.nojekyll");
        } catch (error) {
          // Silently handle missing server config files
        }
      },
    },
    // Plugin to ensure module script types
    {
      name: "module-script-fix",
      transformIndexHtml(html) {
        // Add meta tag for proper module loading and ensure absolute paths
        const metaTag = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n    <meta name="js-mime-type" content="application/javascript">';
        return html
          .replace('<head>', `<head>\n    ${metaTag}`)
          .replace(/src="\/assets\//g, 'src="./assets/');
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
        // Ensure JS files have proper extensions
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
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
