// import { siteQuery } from './queries'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql', '@nuxtjs/device'],

  app: {
    layoutTransition: {
      name: 'layout',
      mode: 'out-in' // default
    }
  },

  css: [
    '~/assets/scss/main.scss',
  ],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
    app: {
      KIRBY_BASE_URL: process.env.KIRBY_BASE_URL,
      KIRBY_API_TOKEN: process.env.KIRBY_API_TOKEN,
      KIRBY_API_USERNAME: process.env.KIRBY_API_USERNAME,
      KIRBY_API_PASSWORD: process.env.KIRBY_API_PASSWORD,
    },
  },

  // DISABLED: KQL PREFETCH
  // kql: {
  //   auth: 'bearer',
  //   prefetch: {
  //     // Currently only used to infer the type of the `site` query
  //     kirbySite: siteQuery,
  //   },
  //   // Optionally, cache the queries on the server for an hour
  //   server: {
  //     // cache: true,
  //     // maxAge: 60 * 60,
  //   },
  // },

  nitro: {
    prerender: {
      // Prerender the index page
      // routes: ['/'],
    },
  },

  // DISABLED: TYPESCRIPT CHECK AND COMPILE ACTIONS
  // typescript: {
  //   // Recommended: type check in dev and on build
  //   typeCheck: true,
  //   shim: false,
  //   tsConfig: {
  //     compilerOptions: {
  //       moduleResolution: 'bundler',
  //     },
  //   },
  // },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_1-variables.scss" as *;',
        },
      },
    },
  },

  // DISABLED: SERVER SIDE RENDERING
  ssr: true,

  // ENABLED: REPLACE NUXT DEFAULT LOADING SCREEN WITH EMPTY SCREEN
  spaLoadingTemplate: 'loading.html',
})
