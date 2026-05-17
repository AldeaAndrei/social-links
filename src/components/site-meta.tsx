import { useEffect } from "react";

import { assetUrl } from "@/lib/assets";
import type { ResolvedContent } from "@/types/content";

function absoluteUrl(path: string, siteUrl: string) {
  if (path.startsWith("http")) return path;
  const base = siteUrl.replace(/\/$/, "");
  const asset = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${asset}`;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

interface SiteMetaProps {
  content: ResolvedContent;
}

export function SiteMeta({ content }: SiteMetaProps) {
  const { site } = content;

  useEffect(() => {
    const ogImage = absoluteUrl(assetUrl(site.ogImage), site.url);

    document.title = site.title;
    setMeta("name", "description", site.description);
    setMeta("name", "theme-color", site.themeColor);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", site.title);
    setMeta("property", "og:description", site.description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:url", site.url);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", site.title);
    setMeta("name", "twitter:description", site.description);
    setMeta("name", "twitter:image", ogImage);
  }, [site]);

  return null;
}
