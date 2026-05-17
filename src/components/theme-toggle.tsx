import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-card shadow-sm"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      disabled={!mounted}
    >
      <Sun className={`size-4 transition-all ${isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"}`} />
      <Moon
        className={`absolute size-4 transition-all ${isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      />
    </Button>
  );
}
