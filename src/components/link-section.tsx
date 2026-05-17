import { LinkCard } from "@/components/link-card";
import type { ResolvedContent } from "@/types/content";

interface LinkSectionProps {
  section: ResolvedContent["sections"][number];
  startIndex: number;
}

export function LinkSection({ section, startIndex }: LinkSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="px-1 text-sm font-semibold tracking-wide text-foreground/90">{section.title}</h2>
      <div className="flex flex-col gap-3">
        {section.links.map((link, i) => (
          <LinkCard
            key={link.id}
            platform={link.platform}
            label={link.label}
            url={link.url}
            index={startIndex + i}
          />
        ))}
      </div>
    </section>
  );
}
