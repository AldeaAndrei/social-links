import { useEffect } from "react";

import content from "@/content/content.json";
import { LinkSection } from "@/components/link-section";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteMeta } from "@/components/site-meta";
import { LanguageProvider, useLanguage } from "@/context/language-context";
import { trackPageView } from "@/lib/analytics";
import type { SiteContent } from "@/types/content";

const siteData = content as SiteContent;

function Page() {
  const { content } = useLanguage();
  let linkIndex = 0;

  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <>
      <SiteMeta content={content} />
      <div className="min-h-svh">
        <Navbar />
        <main className="mx-auto w-full max-w-md px-4 pb-6">
          <PageHeader profile={content.profile} />

          <div className="mt-6 space-y-8">
            {content.sections.map((section) => {
              const startIndex = linkIndex;
              linkIndex += section.links.length;
              return <LinkSection key={section.id} section={section} startIndex={startIndex} />;
            })}
          </div>

          <SiteFooter footer={content.footer} />
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider data={siteData}>
      <Page />
    </LanguageProvider>
  );
}

export default App;
