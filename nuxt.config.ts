import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-01-18',

  future: {
    compatibilityVersion: 4,
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@nuxt/icon', '@nuxt/ui'],
});
