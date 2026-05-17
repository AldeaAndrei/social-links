import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getPlatformStyle, PlatformIcon } from "@/lib/platforms";
import type { Platform } from "@/types/content";

interface LinkCardProps {
  platform: Platform;
  label: string;
  url: string;
  index: number;
}

export function LinkCard({ platform, label, url, index }: LinkCardProps) {
  const reduceMotion = useReducedMotion();
  const style = getPlatformStyle(platform);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.06 }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
      >
        <Card className="flex items-center gap-4 border-border/80 p-4 transition-transform hover:scale-[1.02] active:scale-[0.99]">
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${style.bg}`}
            aria-hidden
          >
            <PlatformIcon platform={platform} />
          </span>
          <span className="flex-1 text-left font-medium">{label}</span>
          <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        </Card>
      </a>
    </motion.div>
  );
}
