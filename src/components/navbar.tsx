import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-end gap-2 px-4 py-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}
