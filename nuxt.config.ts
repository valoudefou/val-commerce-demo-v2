// https://nuxt.com/docs/api/configuration/nuxt-config
const env =
  ((globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env) ||
  {}

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Val Commerce',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Modern e-commerce demo built with Nuxt 3 showcasing a responsive storefront, product detail pages, and a shopping cart experience.'
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
        }
      ]
    }
  },
  css: ['@/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    flagship: {
      envId: env.NUXT_FLAGSHIP_ENV_ID || '',
      apiKey: env.NUXT_FLAGSHIP_API_KEY || ''
    },
    recommendations: {
      apiKey:
        env.NUXT_RECOMMENDATIONS_API_KEY
        || env.NUXT_ABTASTY_API_KEY
        || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlX2lkIjoxMDMxLCJpYXQiOjE3NDYyMDIyNjAsImp0aSI6ImxELWlKVmtaVnZlOVVkYk5tVzZfcXJXN3ExaUpQM3pPRzZYNjRJcGRWNTgifQ.7IfQu2cuGktA82hElpDvJXbwnOnwGqqh-BLdmzBGPb8',
      endpoint:
        env.NUXT_RECOMMENDATIONS_ENDPOINT
        || 'https://uc-info.eu.abtasty.com/v1/reco/1031/recos/8d1ea373-571f-4d08-a9bf-04dda16383c2?fields=%5B%22price%22%2C%22name%22%2C%22img_link%22%2C%22absolute_link%22%5D',
      categoryEndpoint:
        env.NUXT_RECOMMENDATIONS_CATEGORY_ENDPOINT
        || 'https://uc-info.eu.abtasty.com/v1/reco/1031/recos/85d0d2f8-2d66-4d1d-a376-80b4e6d5692c?fields=%5B%22price%22%2C%22name%22%2C%22img_link%22%2C%22absolute_link%22%5D',
      cartEndpoint:
        env.NUXT_RECOMMENDATIONS_CART_ENDPOINT
        || 'https://uc-info.eu.abtasty.com/v1/reco/1031/recos/4fcf5e25-ea4e-4fea-90de-31860d544b00?fields=%5B%22price%22%2C%22name%22%2C%22img_link%22%2C%22absolute_link%22%5D',
      siteUrl: env.NUXT_RECOMMENDATIONS_SITE_URL || env.NUXT_PUBLIC_SITE_URL || 'https://val-commerce-demo.vercel.app'
    },
    public: {
      companyName: 'Commerce Demo',
      supportEmail: 'hello@valcommerce.demo',
      flagship: {
        envId: env.NUXT_FLAGSHIP_ENV_ID || '',
        apiKey: env.NUXT_FLAGSHIP_API_KEY || ''
      },
      siteUrl: env.NUXT_PUBLIC_SITE_URL || 'https://val-commerce-demo.vercel.app'
    }
  },
  nitro: {
    compatibilityDate: '2025-11-04'
  },
  typescript: {
    typeCheck: true
  }
})
