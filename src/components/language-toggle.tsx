import { useLanguage } from "@/context/language-context";
import type { Locale } from "@/types/content";
import { cn } from "@/lib/utils";

const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ro", label: "RO" },
];

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="flex rounded-full border border-border bg-card p-0.5 shadow-sm"
      role="group"
      aria-label="Select language"
    >
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            "min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            locale === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
