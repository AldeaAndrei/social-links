/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_URL?: string;
  readonly VITE_VISIT_API_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
