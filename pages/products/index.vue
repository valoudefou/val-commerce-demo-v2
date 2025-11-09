<template>
  <div class="space-y-16">
    <section class="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100">
      <div class="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-primary-500">Our Collection</p>
          <h1 class="mt-4 text-4xl font-semibold text-slate-900">Discover every product</h1>
          <p class="mt-4 text-base leading-7 text-slate-600">
            Filter by brand, search for specific styles, and explore the entire assortment without scrolling through the landing page.
          </p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
          <p class="font-semibold text-slate-900">How filtering works</p>
          <p class="mt-2">
            Selecting a brand updates the product list instantly. Use the search box for fabrics, colors, or product names to narrow things even faster.
          </p>
        </div>
      </div>
    </section>
    <ProductGrid
      :products="products"
      :loading="loading"
      :error="error"
      :brands="brands"
      :selected-brand="selectedBrand"
      :search-query="searchQuery"
      @select-brand="onSelectBrand"
      @search="onSearch"
    />
    <NewsletterBanner />
  </div>
</template>

<script setup lang="ts">
import NewsletterBanner from '@/components/NewsletterBanner.vue'
import ProductGrid from '@/components/ProductGrid.vue'

const {
  products,
  brands,
  selectedBrand,
  searchQuery,
  loading,
  error,
  fetchProducts,
  fetchBrands,
  selectBrand,
  searchProducts
} = useProducts()

await Promise.all([fetchBrands(), fetchProducts()])

const onSelectBrand = async (brand: string) => {
  await selectBrand(brand)
}

const onSearch = async (query: string) => {
  await searchProducts(query)
}
</script>
