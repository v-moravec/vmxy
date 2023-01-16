// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'cloudflare'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  css: [
    '~/assets/css/style.css'
  ],
  runtimeConfig: {
    cloudflareKVApiToken: process.env.CLOUDFLARE_KV_API_TOKEN,
    cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    cloudflareVMXYRedirects: process.env.CLOUDFLARE_VMXY_REDIRECTS,
    public: {
      url: process.env.URL || 'http://localhost:3000',

    }
  },
  // TODO: Documentation says this should be named "head", but with that name it doesn't work.
  app: {
    head: {
      title: 'VMXY',
      // TODO: Add your own fonts (change in assets/css/style.css as well).
      link: [
        { rel: 'icon', href: '/favicon.ico' },
      ]
    },
  },
  googleFonts: {
    families: {
      Poppins: [300, 400, 500, 600, 700]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true
  }
})
