import { createError, useRuntimeConfig } from '#imports'
import { getQuery, readBody } from 'h3'
import type { H3Event } from 'h3'

import type { Product } from '@/types/product'
import { fetchProducts } from '@/server/utils/products'

type RawRecommendation = {
  id?: string | number
  sku?: string | number
  name?: string
  price?: string | number
  img_link?: string
  absolute_link?: string
  description?: string
  brand?: string
}

export type RecommendationProduct = {
  id: string
  product: Product
  detailUrl?: string
  externalUrl?: string
}

export type RecommendationResponse = {
  title: string
  items: RecommendationProduct[]
}

const PLACEHOLDER_IMAGE = 'https://assets-manager.abtasty.com/placeholder.png'

type RecommendationFilter = {
  field: 'brand' | 'category' | 'cart_products'
  value?: string | number[]
  categoriesInCart?: string[]
  addedToCartProductId?: number | null
}

const buildRecommendationUrl = (baseEndpoint: string, filter?: RecommendationFilter) => {
  try {
    const url = new URL(baseEndpoint)
    const variables: Record<string, string | number[] | string[] | undefined> = {}
    if (filter?.field === 'cart_products') {
      const ids = Array.isArray(filter.value) ? filter.value : []
      if (ids.length > 0) {
        variables.cart_products = ids
      }
      const categories = filter.categoriesInCart?.map((category) => category.trim()).filter(Boolean) ?? []
      if (categories.length > 0) {
        variables['added_to_cart_product.category_id'] = categories
      }
      if (typeof filter.addedToCartProductId === 'number') {
        variables.added_to_cart_product = [filter.addedToCartProductId]
      }
    } else {
      const rawValue = typeof filter?.value === 'string' ? filter.value : ''
      const normalizedValue = rawValue.trim()

      if (normalizedValue && normalizedValue.toLowerCase() !== 'all') {
        if (filter?.field === 'category') {
          variables.category_id = normalizedValue
        } else {
          variables.brand = normalizedValue
        }
      }
    }

    url.searchParams.set('variables', JSON.stringify(variables))
    return url.toString()
  } catch {
    return baseEndpoint
  }
}

const slugify = (value: string, fallback: string) => {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return normalized.length > 0 ? normalized : fallback
}

const normalizePrice = (value: RawRecommendation['price']) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return 0
}

const ensureAbsoluteLink = (link: string | undefined, siteUrl?: string) => {
  if (!link) return undefined

  const trimmed = link.trim()
  if (!trimmed) return undefined

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  if (trimmed.startsWith('/')) {
    const base = siteUrl?.replace(/\/+$/, '')
    return base ? `${base}${trimmed}` : undefined
  }

  return undefined
}

const normalizeItem = (
  item: RawRecommendation,
  index: number,
  catalog: Product[],
  fallbackIdSeed: () => number,
  siteUrl?: string
): RecommendationProduct => {
  const name = item.name?.trim() || `Recommended product ${index + 1}`
  const normalizedName = name.toLowerCase()
  const absoluteLink = ensureAbsoluteLink(item.absolute_link, siteUrl)
  const matchingProduct =
    catalog.find((product) => product.name.toLowerCase() === normalizedName) ?? null

  if (matchingProduct) {
    const remotePrice = normalizePrice(item.price)
    const productForCarousel =
      remotePrice > 0 && remotePrice !== matchingProduct.price
        ? { ...matchingProduct, price: remotePrice }
        : matchingProduct

    return {
      id: String(item.id ?? matchingProduct.slug),
      product: productForCarousel,
      detailUrl: `/products/${matchingProduct.slug}`,
      externalUrl: absoluteLink
    }
  }

  const slug = slugify(name, `recommended-${index + 1}`)
  const fallbackId = fallbackIdSeed()

  const fallbackProduct: Product = {
    id: fallbackId,
    slug: `${slug}-${fallbackId}`,
    name,
    description: item.description?.trim() || 'Hand-picked for you by Val Commerce.',
    price: normalizePrice(item.price),
    category: 'Recommendations',
    image: item.img_link?.trim() || PLACEHOLDER_IMAGE,
    rating: 4.8,
    highlights: ['Exclusive pick curated for you'],
    inStock: true,
    colors: [],
    sizes: ['One Size'],
    brand: item.brand?.trim() || undefined,
    stock: undefined,
    discountPercentage: undefined,
    availabilityStatus: 'In stock',
    returnPolicy: undefined,
    link: absoluteLink
  }

  return {
    id: String(item.id ?? fallbackProduct.slug),
    product: fallbackProduct,
    externalUrl: absoluteLink
  }
}

export const fetchRecommendations = async (
  filter?: RecommendationFilter
): Promise<RecommendationResponse> => {
  const config = useRuntimeConfig()
  const apiKey = config.recommendations?.apiKey
  const endpoint = config.recommendations?.endpoint
  const categoryEndpoint = config.recommendations?.categoryEndpoint
  const cartEndpoint = config.recommendations?.cartEndpoint
  const siteUrl = config.recommendations?.siteUrl

  let baseEndpoint = endpoint
  if (filter?.field === 'category') {
    baseEndpoint = categoryEndpoint || endpoint
  } else if (filter?.field === 'cart_products') {
    baseEndpoint = cartEndpoint || endpoint
  }

  if (!apiKey || !baseEndpoint) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'Recommendation credentials are missing. Please configure runtimeConfig.recommendations.'
    })
  }

  let lastRequestUrl: string | null = null

  const performFetch = async (activeFilter?: RecommendationFilter) => {
    const requestUrl = buildRecommendationUrl(baseEndpoint, activeFilter)
    lastRequestUrl = requestUrl
    console.log('[Recommendations] Fetching AB Tasty feed', {
      endpoint: requestUrl,
      field: activeFilter?.field ?? filter?.field ?? 'brand',
      value: activeFilter?.value ?? filter?.value,
      categories: activeFilter?.categoriesInCart ?? filter?.categoriesInCart
    })

    const response = await $fetch<{ name?: string; items?: RawRecommendation[] }>(requestUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json'
      }
    })

    if (!response?.items || !Array.isArray(response.items)) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Recommendations payload is invalid.'
      })
    }

    const catalog = await fetchProducts()
    let fallbackSeed = 900000
    const fallbackIdSeed = () => fallbackSeed++

    const normalizedItems = response.items
      .map((item, index) => normalizeItem(item, index, catalog, fallbackIdSeed, siteUrl))
      .filter(
        (item, index, self) => self.findIndex((candidate) => candidate.id === item.id) === index
      )

    return {
      title: response.name?.trim() || 'Recommended for you',
      items: normalizedItems
    }
  }

  try {
    return await performFetch(filter)
  } catch (error) {
    const statusCode = (error as { statusCode?: number })?.statusCode

    const shouldRetryWithoutCartContext =
      filter?.field === 'cart_products'
      && statusCode
      && statusCode >= 400
      && ((filter.categoriesInCart?.length ?? 0) > 0 || typeof filter.addedToCartProductId === 'number')

    if (shouldRetryWithoutCartContext) {
      console.warn('Cart recommendation request failed, retrying without cart context')

      return await performFetch({
        ...filter,
        categoriesInCart: undefined,
        addedToCartProductId: undefined
      })
    }

    if (statusCode) {
      if (filter?.field === 'cart_products') {
        console.error('Cart recommendations unavailable, returning empty set', error)
        return {
          title: 'Recommended for you',
          items: []
        }
      }
      throw error
    }

    console.error('Failed to load recommendations, returning empty set', error)
    return {
      title: 'Recommended for you',
      items: []
    }
  }
}

const normalizeFilterFromSource = (
  sourceField: unknown,
  sourceValue: unknown,
  categories?: unknown,
  addedToCartProduct?: unknown
): RecommendationFilter => {
  let field: RecommendationFilter['field'] = 'brand'
  if (sourceField === 'category') {
    field = 'category'
  } else if (sourceField === 'cart_products') {
    field = 'cart_products'
  }

  let value: RecommendationFilter['value']
  if (field === 'cart_products') {
    if (Array.isArray(sourceValue)) {
      value = sourceValue.filter((id) => Number.isFinite(Number(id))).map((id) => Number(id))
    } else if (typeof sourceValue === 'string') {
      value = sourceValue
        .split(',')
        .map((id) => Number(id.trim()))
        .filter((id) => Number.isFinite(id))
    }
  } else if (typeof sourceValue === 'string') {
    value = sourceValue
  }

  let categoriesInCart: string[] | undefined
  if (field === 'cart_products' && categories) {
    const arr = Array.isArray(categories) ? categories : typeof categories === 'string' ? [categories] : []
    const normalized = arr
      .map((category) => (typeof category === 'string' ? category.trim() : ''))
      .filter((category) => category.length > 0)
    if (normalized.length > 0) {
      categoriesInCart = normalized
    }
  }

  let addedToCartProductId: number | undefined
  if (field === 'cart_products' && addedToCartProduct !== undefined) {
    const parsed = Number(addedToCartProduct)
    if (Number.isFinite(parsed)) {
      addedToCartProductId = parsed
    }
  }

  return { field, value, categoriesInCart, addedToCartProductId }
}

export const handleRecommendationsRequest = async (event: H3Event, method: 'GET' | 'POST') => {
  if (method === 'GET') {
    const query = getQuery(event)
    return await fetchRecommendations(
      normalizeFilterFromSource(
        query.filterField,
        query.filterValue,
        query.categoriesInCart,
        query.addedToCartProductId
      )
    )
  }

  const body = await readBody<{
    filterField?: string
    filterValue?: string | number[] | number | null
    categoriesInCart?: string[] | string | null
    addedToCartProductId?: number | string | null
  }>(event)

  return await fetchRecommendations(
    normalizeFilterFromSource(
      body?.filterField,
      body?.filterValue,
      body?.categoriesInCart ?? undefined,
      body?.addedToCartProductId ?? undefined
    )
  )
}
