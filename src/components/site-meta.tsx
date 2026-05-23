import { useEffect } from "react";

import { absoluteAssetUrl } from "@/lib/share-meta";
import type { ResolvedContent } from "@/types/content";

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
    document.title = site.title;
    setMeta("name", "description", site.description);

    const ogImage = absoluteAssetUrl(site.ogImage, site.url);
    const pageUrl = site.url.replace(/\/$/, "") || site.url;

    setMeta("name", "theme-color", site.themeColor);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:title", site.shareTitle);
    setMeta("property", "og:description", site.shareDescription);
    setMeta("property", "og:image", ogImage);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", site.shareTitle);
    setMeta("name", "twitter:description", site.shareDescription);
    setMeta("name", "twitter:image", ogImage);
  }, [site]);

  return null;
}
