// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: { strict: true },
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    'nuxt-time',
    "shadcn-nuxt",
  ],
  shadcn: {
  /**
   * Prefix for all the imported component
   */
  prefix: '',
  /**
   * Directory that the component lives in.
   * @default "./components/ui"
   */
  componentDir: './components/ui'
},
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  devtools: { enabled: false }, //true
  css: ['~/assets/css/tailwind.css', '~/assets/css/global.css'],
  //{ src: '~/utils/vue3-datepicker.ts', mode: 'client' },
  // ],
});