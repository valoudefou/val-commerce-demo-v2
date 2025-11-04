import { c as useState, e as useNotifications } from "../server.mjs";
import { computed } from "vue";
const useCart = () => {
  const state = useState("cart", () => ({ items: [] }));
  const notifications = useNotifications();
  const totalItems = computed(() => state.value.items.reduce((count, item) => count + item.quantity, 0));
  const subtotal = computed(
    () => state.value.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  );
  const addItem = (product, quantity = 1) => {
    const existingItem = state.value.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      state.value.items.push({ ...product, quantity });
    }
    notifications.show({
      title: "Added to cart",
      message: `${product.name} has been added to your cart.`,
      type: "cart"
    });
  };
  const removeItem = (productId) => {
    state.value.items = state.value.items.filter((item) => item.id !== productId);
  };
  const updateQuantity = (productId, quantity) => {
    const item = state.value.items.find((product) => product.id === productId);
    if (!item) return;
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    item.quantity = quantity;
  };
  const clear = () => {
    state.value.items = [];
  };
  return {
    state,
    items: computed(() => state.value.items),
    totalItems,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clear
  };
};
export {
  useCart as u
};
//# sourceMappingURL=useCart-T83HG6B3.js.map
