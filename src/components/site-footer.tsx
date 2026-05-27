import type { ResolvedContent } from "@/types/content";

interface SiteFooterProps {
  footer: ResolvedContent["footer"];
}

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="space-y-2 py-8 text-center text-sm text-muted-foreground">
      <p>{footer.location}</p>
      <p>
        {footer.copyright} © {footer.year} {footer.name}
      </p>
    </footer>
  );
}
