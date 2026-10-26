import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const previewMerchantDemoEnabled =
    mode === "development" || process.env.VERCEL_ENV === "preview";
  const supabaseUrl =
    process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? env.VITE_SUPABASE_URL ?? env.SUPABASE_URL;
  const supabaseAnonKey =
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    env.VITE_SUPABASE_ANON_KEY ??
    env.SUPABASE_ANON_KEY;

  return {
    plugins: [react(), tailwindcss(), viteSingleFile()],
    define: {
      ...(supabaseUrl ? { "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(supabaseUrl) } : {}),
      ...(supabaseAnonKey
        ? { "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(supabaseAnonKey) }
        : {}),
      "import.meta.env.VITE_ENABLE_PREVIEW_MERCHANT_DEMO": JSON.stringify(previewMerchantDemoEnabled),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
