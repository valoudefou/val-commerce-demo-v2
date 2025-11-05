import type { Product } from '@/types/product'

const shuffleProducts = (items: Product[]) => {
  const array = [...items]

  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[array[index], array[swapIndex]] = [array[swapIndex], array[index]]
  }

  return array
}

export const useProducts = () => {
  const products = useState<Product[]>('products', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<Product[]>('/api/products')
      products.value = shuffleProducts(response)
    } catch (err) {
      error.value = 'We were unable to load products. Please try again later.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const findBySlug = async (slug: string) => {
    try {
      return await $fetch<Product>(`/api/products/${slug}`)
    } catch (err) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    findBySlug
  }
}
