import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Locale, ResolvedContent, SiteContent } from "@/types/content";

const STORAGE_KEY = "social-links-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: ResolvedContent;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveContent(data: SiteContent, locale: Locale): ResolvedContent {
  const strings = data.i18n[locale];
  return {
    site: { ...data.site, ...strings.site },
    profile: { ...data.profile, ...strings.profile },
    sections: strings.sections,
    footer: { year: data.footer.year, location: data.footer.location, ...strings.footer },
  };
}

interface LanguageProviderProps {
  data: SiteContent;
  children: ReactNode;
}

export function LanguageProvider({ data, children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "ro" || stored === "en" ? stored : "en";
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const content = useMemo(() => resolveContent(data, locale), [data, locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, content }),
    [locale, setLocale, content],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
