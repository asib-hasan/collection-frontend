// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt"
  ],

  imports: {
    dirs: ["stores"],
  },

  icon: {
    serverBundle: {
      collections: ["mdi", "lucide", "line-md", "game-icons"],
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "pinia-plugin-persistedstate",
      ],
    },
  },

  srcDir: "app/",
  ssr: true,

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL
    }
  },
});
