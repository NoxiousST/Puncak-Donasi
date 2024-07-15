/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_MAPBOX_KEY: string;
    readonly VITE_APP_SERVER: string;
    readonly VITE_APP_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
