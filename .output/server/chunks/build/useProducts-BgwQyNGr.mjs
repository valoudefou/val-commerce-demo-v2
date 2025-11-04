import { c as useState, d as createError } from './server.mjs';
import { ref } from 'vue';

const useProducts = () => {
  const products = useState("products", () => []);
  const loading = ref(false);
  const error = ref(null);
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch("/api/products");
      products.value = response;
    } catch (err) {
      error.value = "We were unable to load products. Please try again later.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  const findBySlug = async (slug) => {
    try {
      return await $fetch(`/api/products/${slug}`);
    } catch (err) {
      throw createError({ statusCode: 404, statusMessage: "Product not found" });
    }
  };
  return {
    products,
    loading,
    error,
    fetchProducts,
    findBySlug
  };
};

export { useProducts as u };
//# sourceMappingURL=useProducts-BgwQyNGr.mjs.map
