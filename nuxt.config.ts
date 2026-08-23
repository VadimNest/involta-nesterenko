import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-svgo', '@nuxt/ui'],

  svgo: {
    customComponent: 'AtomsAppIcon',
  },

  css: ['@/assets/styles/index.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  postcss: {
    plugins: {
      'postcss-pxtorem': {
        propList: [
          '*',
          '!border-left',
          '!border-right',
          '!border-top',
          '!border-bottom',
          '!border',
          '!outline',
        ],
      },
    },
  },
});
