import type { Product } from '@/types/product'

const deriveCategories = (collection: Product[]) => {
  const unique = new Set<string>()
  for (const item of collection) {
    if (item.category) {
      unique.add(item.category)
    }
  }
  return Array.from(unique).sort((a, b) => a.localeCompare(b))
}

const filterByCategory = (collection: Product[], category: string) => {
  if (category === 'All') {
    return collection
  }

  const target = category.toLowerCase()
  return collection.filter((product) => product.category?.toLowerCase() === target)
}

export const useCategoryProducts = () => {
  const products = useState<Product[]>('category-products', () => [])
  const allProducts = useState<Product[]>('category-all-products', () => [])
  const categories = useState<string[]>('product-categories', () => [])
  const selectedCategory = useState<string>('selected-category', () => 'All')
  const searchQuery = useState<string>('category-search-query', () => '')
  const searchResults = useState<Product[]>('category-search-results', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasFetched = useState<boolean>('category-has-fetched', () => false)

  const fetchProducts = async () => {
    if (hasFetched.value) {
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await $fetch<Product[]>('/api/products')
      allProducts.value = response
      products.value = response
      categories.value = deriveCategories(response)
      selectedCategory.value = 'All'
      searchQuery.value = ''
      searchResults.value = []
      hasFetched.value = true
    } catch (err) {
      console.error('Failed to load products for categories view', err)
      error.value = 'We were unable to load products. Please try again later.'
    } finally {
      loading.value = false
    }
  }

  const selectCategory = (category: string) => {
    selectedCategory.value = category
    error.value = null

    const baseCollection = searchQuery.value ? searchResults.value : allProducts.value
    const filtered = filterByCategory(baseCollection, category)
    products.value = filtered

    if (filtered.length === 0) {
      error.value =
        category === 'All'
          ? 'No products available for the current search.'
          : `No products found in the "${category}" category.`
    }
  }

  const searchProducts = async (query: string) => {
    const trimmed = query.trim()
    searchQuery.value = trimmed
    error.value = null

    if (!trimmed) {
      searchResults.value = []
      selectCategory(selectedCategory.value)
      return
    }

    loading.value = true

    try {
      const response = await $fetch<{ products: Product[] }>('/api/products/search', {
        params: { q: trimmed }
      })

      searchResults.value = response.products
      const filtered = filterByCategory(response.products, selectedCategory.value)
      products.value = filtered

      if (filtered.length === 0) {
        error.value =
          selectedCategory.value === 'All'
            ? `No products found for "${trimmed}".`
            : `No "${selectedCategory.value}" products match "${trimmed}".`
      }
    } catch (err) {
      console.error('Failed to search products for categories view', err)
      error.value = 'We were unable to search products right now.'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    categories,
    selectedCategory,
    searchQuery,
    loading,
    error,
    fetchProducts,
    selectCategory,
    searchProducts
  }
}
