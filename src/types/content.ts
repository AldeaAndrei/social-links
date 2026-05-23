export type Platform = "facebook" | "instagram" | "youtube" | "tiktok";
export type Locale = "en" | "ro";

export interface LocalizedStrings {
  site: {
    title: string;
    description: string;
  };
  profile: {
    name: string;
    tagline: string;
  };
  sections: {
    id: string;
    title: string;
    links: {
      id: string;
      platform: Platform;
      label: string;
      url: string;
    }[];
  }[];
  footer: {
    name: string;
    copyright: string;
  };
}

export interface SiteContent {
  site: {
    ogImage: string;
    shareTitle: string;
    shareDescription: string;
    themeColor: string;
    url: string;
  };
  profile: {
    avatar: string;
    bannerLight: string;
    bannerDark: string;
  };
  footer: {
    year: number;
  };
  i18n: Record<Locale, LocalizedStrings>;
}

export interface ResolvedContent {
  site: LocalizedStrings["site"] &
    Pick<SiteContent["site"], "ogImage" | "shareTitle" | "shareDescription" | "themeColor" | "url">;
  profile: LocalizedStrings["profile"] & Pick<SiteContent["profile"], "avatar" | "bannerLight" | "bannerDark">;
  sections: LocalizedStrings["sections"];
  footer: LocalizedStrings["footer"] & Pick<SiteContent["footer"], "year">;
}
