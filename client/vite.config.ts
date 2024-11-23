import build from "@hono/vite-build/cloudflare-workers";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: {
            client: "./src/client.tsx",
            style: "./src/style.css",
          },
          output: {
            entryFileNames: "[name].js", // クライアント側スクリプト
            assetFileNames: "assets/[name].[ext]", // CSS や他のアセット
            format: "es",
            dir: "dist/static",
          },
        },
      },
      css: {
        postcss: {
          plugins: [tailwindcss()],
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
