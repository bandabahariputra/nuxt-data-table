// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: 'NuxtDataTable',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Nuxt data table built with Nuxt.js',
        },
      ],
    },
  },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt'],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/main.css'],
});
