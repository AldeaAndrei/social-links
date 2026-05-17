/** Resolve public asset paths for GitHub Pages base URL (e.g. /social-links/). */
export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
