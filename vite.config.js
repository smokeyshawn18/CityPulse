import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(),
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
    outDir: "build", // Set the output directory to 'dist'
  },
});
