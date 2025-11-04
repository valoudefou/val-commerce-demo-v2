import { findProductBySlug } from '@/server/utils/products'

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const product = await findProductBySlug(slug)

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return product
})
