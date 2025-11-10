<template>
  <div class="space-y-16">
    <section class="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100">
      <div class="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-primary-500">Shop by category</p>
          <h1 class="mt-4 text-4xl font-semibold text-slate-900">Explore collections by mood and use-case</h1>
          <p class="mt-4 text-base leading-7 text-slate-600">
            Scroll through the same grid experience as the Brands page, but filter by product categories to zero-in on what you need faster.
          </p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
          <p class="font-semibold text-slate-900">Category tips</p>
          <p class="mt-2">
            Use search to layer queries like “merino” or “travel” on top of the category filter to find the perfect kit.
          </p>
        </div>
      </div>
    </section>
    <ProductGrid
      :products="products"
      :loading="loading"
      :error="error"
      :brands="categories"
      :selected-brand="selectedCategory"
      :search-query="searchQuery"
      recommendation-filter-field="category"
      @select-brand="onSelectCategory"
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
  categories,
  selectedCategory,
  searchQuery,
  loading,
  error,
  fetchProducts,
  selectCategory,
  searchProducts
} = useCategoryProducts()

await fetchProducts()

const onSelectCategory = (category: string) => {
  selectCategory(category)
}

const onSearch = async (query: string) => {
  await searchProducts(query)
}
</script>
