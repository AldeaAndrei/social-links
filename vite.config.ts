import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import content from "./src/content/content.json" with { type: "json" };
import { buildShareMetaTags } from "./src/lib/share-meta.ts";
import type { SiteContent } from "./src/types/content.ts";

const site = (content as SiteContent).site;

export default defineConfig({
  base: "/social-links/",
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "inject-share-meta",
      transformIndexHtml(html) {
        const shareMeta = buildShareMetaTags(site);
        const title = site.shareTitle;

        return html
          .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
          .replace(
            /<link rel="icon"[^>]*>/,
            '<link rel="icon" type="image/x-icon" href="favicon.ico" />',
          )
          .replace("</head>", `    ${shareMeta}\n  </head>`);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
});
