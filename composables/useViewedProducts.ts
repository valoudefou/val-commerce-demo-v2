import { computed, watch } from 'vue'

type ViewedProductsState = {
  items: number[]
}

export const useViewedProducts = () => {
  const STORAGE_KEY = 'val-commerce-viewed-products'
  const state = useState<ViewedProductsState>('viewed-products', () => ({ items: [] }))
  const hydrated = useState<boolean>('viewed-products-hydrated', () => false)

  if (import.meta.client && !hydrated.value) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          state.value.items = parsed
            .map((value) => Number(value))
            .filter((value) => Number.isFinite(value))
        }
      }
    } catch (error) {
      console.warn('Failed to hydrate viewed products from storage', error)
    } finally {
      hydrated.value = true
    }
  }

  if (import.meta.client) {
    watch(
      () => state.value.items,
      (items) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        } catch (error) {
          console.warn('Failed to persist viewed products', error)
        }
      },
      { deep: true }
    )
  }

  const addViewedProduct = (id: number) => {
    if (!Number.isFinite(id)) return

    const next = state.value.items.filter((item) => item !== id)
    next.push(id)

    const MAX_ITEMS = 20
    state.value.items = next.slice(-MAX_ITEMS)
  }

  const clearViewedProducts = () => {
    state.value.items = []
  }

  return {
    viewedProducts: computed(() => state.value.items),
    addViewedProduct,
    clearViewedProducts
  }
}
