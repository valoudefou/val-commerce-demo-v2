# Val Commerce Demo

<img src="https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMDUwNGZlYTYtOWIxNy00N2IyLTg1YjUtNmY5YTZjZWU5OTJiLzI1NjhmYjk4LTQwM2ItNGI2OC05NmJiLTE5YTg1MzU3ZjRlMS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6NjI3LCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=" alt="AB Tasty logo" width="350"/>

A modern ecommerce experience built with [Nuxt 3](https://nuxt.com) and [Vue 3](https://vuejs.org). The demo showcases a high-end apparel brand with product listings, detailed product pages, a persistent cart, editorial storytelling, and marketing capture moments. The project is configured to deploy easily to [Vercel](https://vercel.com/).

## Features

- ⚡️ Nuxt 3 with server routes that expose product data for the storefront
- 🎨 Responsive Tailwind CSS design with reusable Vue components
- 🛒 Persistent cart composable with add, update, and remove capabilities
- 📚 Editorial storytelling and marketing sections to show brand narrative
- ☁️ Ready-to-deploy configuration for Vercel hosting
- 🧪 Feature flagging with Flagship, pre-rendered on the server and revalidated client-side without UI flicker

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview the production build locally:

   ```bash
   npm run preview
   ```

## Environment variables

Make sure to create a local `.env` file before running the project. The file is ignored by Git and should contain at least the Flagship credentials:

```
NUXT_FLAGSHIP_ENV_ID=your-flagship-environment-id
NUXT_FLAGSHIP_API_KEY=your-flagship-api-key
```

## Nuxt 3 architecture

This project uses Nuxt 3’s hybrid rendering model:

- **File-based routing** powers both pages and server APIs (`pages/` and `server/api/`).
- **Nitro server** handles server-side rendering, API routes, and deployment portability (Vercel ready).
- **Composables** under `composables/` provide reusable logic (cart management, products fetching, etc.).
- **TypeScript-first** configuration with full type checking (`vue-tsc`) ensures editor support and safe refactors.

Key Nuxt configuration highlights (`nuxt.config.ts`):

- Tailwind CSS integration via the official Nuxt module.
- Runtime configuration (`runtimeConfig`) to expose private and public Flagship credentials.
- SSR enabled by default, allowing server routes to run during page rendering.

## Flagship feature flag integration

Flagship drives the “Apple Pay” quick checkout button on product pages. The integration has two layers to guarantee a fast, flicker-free experience:

1. **Server-side evaluation (SSR)**  
   - When a product page is rendered, Nuxt calls `GET /api/features/apple-pay`.  
   - This endpoint uses the server-side Flagship SDK (`server/utils/flagship/index.ts`) to:
     - Resolve the visitor ID (with cookie persistence).
     - Fetch the `paymentFeature1Click` flag.
     - Return `{ enabled: boolean }` to the page.
   - The Nuxt page consumes that flag via `useFetch` in setup, so the button is already shown/hidden in the HTML streamed to the browser. No flash of incorrect UI occurs.

2. **Client-side confirmation**  
   - On mount, the product page calls `initializeFlagship` from `utils/flagship/index.ts` (a browser-safe wrapper around Flagship’s JS SDK).
   - It re-fetches flags for the same visitor and updates the reactive state if anything changes.  
   - Because the initial state is consistent with the server output, the user never sees a mismatch, and updates happen instantly if the flag’s targeting changes mid-session.

Logging and sanitisation:

- Custom log manager redacts sensitive data before storing messages.
- Structured logs (visitor ID, flag value, SDK status) are emitted in development for observability.

## Deployment on Vercel

The project includes a `vercel.json` file and Nuxt Nitro configuration to target the Vercel runtime. To deploy:

1. Push the repository to GitHub (or your preferred Git provider).
2. Import the project into Vercel and select the repository.
3. Use the default build command (`npm run build`) and install command (`npm install`).
4. Vercel will detect the Nuxt framework, build the application, and provision serverless functions automatically.

## Project structure

```
├── app.vue
├── assets/
├── components/
├── composables/
├── data/
├── layouts/
├── pages/
├── public/
├── server/
├── types/
├── nuxt.config.ts
└── vercel.json
```

Feel free to adapt the content, styling, and data model to suit your own brand.
