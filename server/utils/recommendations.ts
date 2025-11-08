import type { Product } from '@/types/product'
import { createError, useRuntimeConfig } from '#imports'

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

export const fetchRecommendations = async (): Promise<RecommendationResponse> => {
  const config = useRuntimeConfig()
  const apiKey = config.recommendations?.apiKey
  const endpoint = config.recommendations?.endpoint
  const siteUrl = config.recommendations?.siteUrl

  if (!apiKey || !endpoint) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'Recommendation credentials are missing. Please configure runtimeConfig.recommendations.'
    })
  }

  try {
    const response = await $fetch<{ name?: string; items?: RawRecommendation[] }>(endpoint, {
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
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    console.error('Failed to load recommendations', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to load recommendations right now.'
    })
  }
}
