import build from "@hono/vite-build/cloudflare-workers";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: {
            "./src/client.tsx": "static/client.js",
            "/src/style.css": "static/assets/[name].[ext]",
          },
        },
      },
    };
  } else {
    return {
      ssr: {
        external: ["react", "react-dom"],
      },
      plugins: [
        TanStackRouterVite(),
        build({
          outputDir: "server-build",
        }),
        devServer({
          adapter,
          entry: "src/index.tsx",
        }),
      ],
    };
  }
});
