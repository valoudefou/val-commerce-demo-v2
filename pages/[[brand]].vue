<template>
  <div class="space-y-20">
    <HeroSection />
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
    <FeatureGrid />
    <StoryHighlights />
    <NewsletterBanner />
  </div>
</template>

<script setup lang="ts">
import { slugifyBrand } from '@/utils/brand'

const route = useRoute()
const router = useRouter()

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

const syncingFromRoute = ref(false)

const routeBrandSlug = computed(() => {
  const param = route.params.brand
  if (Array.isArray(param)) {
    return param[0]
  }

  return typeof param === 'string' ? param : undefined
})

const applyBrandFromRoute = async (slug?: string) => {
  const normalizedSlug = slug ? slugifyBrand(slug) : ''

  if (!normalizedSlug) {
    if (selectedBrand.value !== 'All') {
      syncingFromRoute.value = true
      await selectBrand('All')
      syncingFromRoute.value = false
    }
    return
  }

  const matchingBrand = brands.value.find((brand) => slugifyBrand(brand) === normalizedSlug)

  if (matchingBrand && selectedBrand.value !== matchingBrand) {
    syncingFromRoute.value = true
    await selectBrand(matchingBrand)
    syncingFromRoute.value = false
    return
  }

  if (!matchingBrand && selectedBrand.value !== 'All') {
    syncingFromRoute.value = true
    await selectBrand('All')
    syncingFromRoute.value = false
  }
}

await Promise.all([fetchBrands(), fetchProducts()])
await applyBrandFromRoute(routeBrandSlug.value)

watch(
  () => routeBrandSlug.value,
  async (slug) => {
    await applyBrandFromRoute(slug)
  }
)

watch(
  () => selectedBrand.value,
  async (brand) => {
    if (syncingFromRoute.value || !import.meta.client) {
      return
    }

    const slug = brand === 'All' ? null : slugifyBrand(brand)
    const currentSlug = routeBrandSlug.value ?? null

    if (slug === currentSlug) {
      return
    }

    const path = slug ? `/${slug}` : '/'
    await router.push(path)
  }
)

const onSelectBrand = async (brand: string) => {
  await selectBrand(brand)
}

const onSearch = async (query: string) => {
  await searchProducts(query)
}
</script>
