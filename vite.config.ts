import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({ server: { entry: "server" } }),
    ...(command === "build"
      ? [
          nitro({
            preset: "node-server",
            routeRules: {
              "/**": {
                headers: {
                  "x-content-type-options": "nosniff",
                  "referrer-policy": "strict-origin-when-cross-origin",
                  "x-frame-options": "SAMEORIGIN",
                },
              },
            },
          }),
        ]
      : []),
    react(),
    tailwindcss(),
  ],
}));
