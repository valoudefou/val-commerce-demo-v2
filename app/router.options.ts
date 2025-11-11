import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    // Returning false tells Vue Router to leave the scroll position untouched,
    // preventing Nuxt from forcing the viewport back to the top during navigation.
    return false
  }
}
