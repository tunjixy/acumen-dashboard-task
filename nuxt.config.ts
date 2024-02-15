// https://www.npmjs.com/package/vite-svg-loader
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'en',
      },
      viewport: 'width=device-width, initial-scale=1',
      title: 'Robin',
      meta: [
        {
          name: 'description',
          content: '',
        },
        { name: 'msapplication-TileColor', content: '#021c3e' },
        { name: 'theme-color', content: '#021c3e' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com" crossorigin' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: [
    // https://nuxt.com/modules/eslint
    '@nuxtjs/eslint-module',

    // https://tailwindcss.nuxtjs.org/getting-started/setup
    '@nuxtjs/tailwindcss',

    // https://vueuse.org/guide/
    '@vueuse/nuxt',
  ],

  devtools: { enabled: true },

  typescript: {
    shim: false,
  },

  experimental: {
    typedPages: true,
  },

  vite: {
    plugins: [
      svgLoader({
        svgo: true,
        svgoConfig: {
          plugins: [],
        },
      }),
    ],
  },

  runtimeConfig: {
    public: {
      BASE_URL: 'https://sfe-m3if.onrender.com/api/v1/',
    },
  },
})
