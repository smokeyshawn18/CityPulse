import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically register the service worker
      includeAssets: ["favicon.ico", "/logo.png"], // Include these assets in the PWA
      manifest: {
        name: "CityPulse - Ultimate Man City results, player stats and more",
        short_name: "CityPulse",
        description: "A Progressive Web App built to server as mo app",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  build: {
    outDir: "dist", // Set the output directory to 'dist'
  },
  server: {
    host: true, // Ensures the server runs on all interfaces
    allowedHosts: [".onrender.com"], // Allows all Render subdomains
    proxy: {
      "/api/matches": {
        target: "https://api.football-data.org/v4/teams/65/matches",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/matches/, ""),
        headers: {
          "X-Auth-Token": "567be25f8bc3458ca94d4023eb091e93",
        },
      },
    },
  },
});
