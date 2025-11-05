# Nuxt 3 Commerce Demo

<img src="https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMDUwNGZlYTYtOWIxNy00N2IyLTg1YjUtNmY5YTZjZWU5OTJiLzI1NjhmYjk4LTQwM2ItNGI2OC05NmJiLTE5YTg1MzU3ZjRlMS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6NjI3LCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=" alt="AB Tasty logo" width="350"/>

A modern ecommerce experience built with [Nuxt 3](https://nuxt.com) and [Vue 3](https://vuejs.org). The demo showcases a high-end apparel brand with product listings, detailed product pages, a persistent cart, editorial storytelling, and marketing capture moments.

## Features

- ⚡️ Nuxt 3 with server routes that expose product data for the storefront
- 🎨 Responsive Tailwind CSS design with reusable Vue components
- 🛒 Persistent cart composable with add, update, and remove capabilities
- 📚 Editorial storytelling and marketing sections to show brand narrative
- 🌍 Server-rendered architecture ready for Node, serverless, or edge runtimes
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
- **Nitro server** handles server-side rendering, API routes, and deployment portability across Node, serverless, or edge platforms.
- **Composables** under `composables/` provide reusable logic (cart management, products fetching, etc.).
- **TypeScript-first** configuration with full type checking (`vue-tsc`) ensures editor support and safe refactors.

Key Nuxt configuration highlights (`nuxt.config.ts`):

- Tailwind CSS integration via the official Nuxt module.
- Runtime configuration (`runtimeConfig`) to expose private and public Flagship credentials.
- SSR enabled by default, allowing server routes to run during page rendering.

## Flagship feature flag integration

Flagship drives the “Apple Pay” quick checkout button on product pages. The integration has two layers to guarantee a fast, flicker-free experience while keeping the SSR response and hydrated client in sync:

1. **Server-side evaluation (SSR)**  
   - Nuxt renders the page by calling `GET /api/features/apple-pay`.
   - The endpoint boots the shared Flagship SDK (`server/utils/flagship/index.ts`), derives a visitor ID from cookies (creating one if needed), and fetches the `paymentFeature1Click` flag.
   - It returns `{ enabled: boolean }`, and the page reads that value through `useFetch` during setup. Because this happens before the response leaves the server, the HTML already reflects the correct Apple Pay state—no flash of incorrect UI.
   - The server also logs the evaluated value (with sensitive data scrubbed) so you can trace decisions when debugging.

2. **Client-side confirmation**  
   - After hydration, the page optionally revalidates via `initializeFlagship` in `utils/flagship/index.ts`, a browser-safe helper that reads the public runtime config.
   - The helper starts the client SDK once, reuses the same visitor context, and fetches the latest flags.
   - The reactive state updates only if a value changes mid-session; otherwise the server-supplied state persists without any perceptible update.

### How the helper bridges SSR and the client

- `server/utils/flagship/index.ts` exposes `initializeFlagship` for server code. It caches the SDK instance, handles credential lookup (private runtime config first, public fallback), and fetches flags.
- `utils/flagship/index.ts` mirrors the API for the browser. It guards against SSR usage, boots the client SDK once, and shares the same visitor/context signature so values stay aligned.
- `pages/products/[slug].vue` calls the server endpoint inside `useFetch` during setup, then invokes the browser helper inside `onMounted`. The Apple Pay button simply reacts to a `ref`, so both phases share the same codepath.
- Because the button state is derived from a single source of truth, the UI remains stable and any flag flip propagates immediately without reloads.

Logging and sanitisation:

- Custom log manager redacts sensitive data before storing messages.
- Structured logs (visitor ID, flag value, SDK status) are emitted in development for observability.

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
└── nuxt.config.ts
```

Feel free to adapt the content, styling, and data model to suit your own brand.
