import { fetchProducts } from '@/server/utils/products'

export default defineEventHandler(async () => {
  return await fetchProducts()
})
