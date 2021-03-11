import appConfig from "./config/main"
const isDeveloper = process.env.NODE_ENV !== 'production'

export default {
  ssr: appConfig.appSsr,
  head: {
    title: 'auto-parts',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/static/icons/css/fontawesome.css',
    '@/static/icons/css/light.min.css',
    '@/static/icons/css/solid.min.css'
  ],
  plugins: [
    { src: '@/plugins/i18n' },
    { src: '@/plugins/axios' },
    { src: '@/plugins/mixins'},
    { src: '@/plugins/element-ui'},
    { src: '@/plugins/components'}
  ],
  buildModules: [
    ['@nuxtjs/router', {
      path: './router'
    }]
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    'nuxt-i18n'
  ],
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    middleware: ['auth']
  },
  axios: {
    baseURL: appConfig.apiUrl,
    browserBaseURL: '/api',
    proxy: true
  },
  proxy: {
    '/api': {
      target: appConfig.apiUrl,
      secure: false,
      pathRewrite: { '^/api': '' }
    }
  },
  auth: {
    watchLoggedIn: false,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/sign-in', method: 'post', propertyName: 'data.token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: false // { url: '/auth/user-info', method: 'post', propertyName: 'data' }
        },
        tokenName: appConfig.apiHeaderToken,
        tokenRequired: true,
        tokenType: false
        /*token: {
          name: appConfig.apiHeaderToken,
          required: true,
          type: false
        }*/
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: false,
      home: '/dashboard'
    },
    localStorage: false,
    cookie: {
      prefix: 'idev.',
      options: {
        path: '/',
        maxAge: 86400
      }
    }
  },
  i18n: {
    strategy: appConfig.i18nStrategy, // 'prefix_except_default', 'no_prefix'
    defaultLocale: appConfig.defaultLanguage,
    langDir: 'i18n/',
    lazy: true,
    locales: appConfig.i18nLanguageList,
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      cookieKey: 'app_language'
    },
    vueI18n: {
      silentTranslationWarn: true,
      silentFallbackWarn: true,
    }
  },
  server: {
    port: appConfig.appPort
  },
  build: {
    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[id].idev.[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[id].idev.[contenthash].css'
    },
    transpile: [/^element-ui/],
  }
}
