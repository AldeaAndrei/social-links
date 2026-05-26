import type { SiteContent } from "../types/content";

export function absoluteAssetUrl(path: string, siteUrl: string): string {
  if (path.startsWith("http")) return path;
  const base = siteUrl.replace(/\/$/, "");
  const asset = path.startsWith("/") ? path : `/${path}`;
  return `${base}${asset}`;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildShareMetaTags(site: SiteContent["site"]): string {
  const image = absoluteAssetUrl(site.ogImage, site.url);
  const pageUrl = site.url.replace(/\/$/, "") || site.url;
  const title = escapeAttr(site.shareTitle);
  const description = escapeAttr(site.shareDescription);

  return `
    <meta name="description" content="${description}" />
    <meta name="theme-color" content="${escapeAttr(site.themeColor)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeAttr(pageUrl)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${escapeAttr(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${escapeAttr(image)}" />
  `.trim();
}
