// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
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
      ],
      script: [
        // <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "1ca3e4198e3e451e8822a3ab9b09e785"}'></script><!-- End Cloudflare Web Analytics -->
        { defer: true, src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "1ca3e4198e3e451e8822a3ab9b09e785"}', tagPosition: 'bodyClose' }
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
