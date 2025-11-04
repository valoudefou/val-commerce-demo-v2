import { c as createError } from '../nitro/nitro.mjs';

const PRODUCT_SOURCE_URL = "https://live-server1.vercel.app/products";
const CACHE_TTL = 1e3 * 60 * 5;
let cachedProducts = null;
let lastFetch = 0;
const parseNumber = (value) => {
  if (value === null || value === void 0) {
    return 0;
  }
  const numeric = typeof value === "string" ? Number.parseFloat(value) : value;
  return Number.isFinite(numeric) ? Number(numeric) : 0;
};
const slugify = (value, fallback) => {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized.length > 0 ? normalized : fallback;
};
const toProduct = (raw) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const id = parseNumber(raw.id);
  const price = Math.max(parseNumber((_a = raw.price) != null ? _a : raw.price_before_discount), 0);
  const rating = Math.min(Math.max(parseNumber(raw.rating), 0), 5);
  const stock = Math.max(parseNumber(raw.stock), 0);
  const discount = parseNumber(raw.discountPercentage);
  const availability = (_c = (_b = raw.availabilityStatus) == null ? void 0 : _b.trim()) != null ? _c : "";
  const highlightItems = [
    raw.brand ? `Brand: ${raw.brand}` : null,
    discount > 0 ? `Save ${discount.toFixed(0)}% today` : null,
    raw.returnPolicy ? `Returns: ${raw.returnPolicy}` : null,
    availability ? `Availability: ${availability}` : null
  ].filter((item) => Boolean(item));
  if (highlightItems.length === 0) {
    highlightItems.push("Curated selection from Val Commerce partners.");
  }
  const tagSet = /* @__PURE__ */ new Set();
  if (raw.category) tagSet.add(raw.category);
  if (raw.brand) tagSet.add(raw.brand);
  if (raw.tag) tagSet.add(raw.tag);
  const tags = Array.from(tagSet);
  const slugBase = slugify((_d = raw.title) != null ? _d : `product-${id}`, `product-${id}`);
  const slug = `${slugBase}-${id}`;
  return {
    id,
    slug,
    name: (_e = raw.title) != null ? _e : `Product ${id}`,
    description: (_f = raw.description) != null ? _f : "",
    price,
    category: (_g = raw.category) != null ? _g : "General",
    image: (_h = raw.thumbnail) != null ? _h : "",
    rating,
    highlights: highlightItems,
    inStock: availability.toLowerCase() === "in stock" || stock > 0,
    colors: tags,
    sizes: ["One Size"],
    brand: (_i = raw.brand) != null ? _i : void 0,
    stock,
    discountPercentage: discount,
    availabilityStatus: availability || void 0,
    returnPolicy: (_j = raw.returnPolicy) != null ? _j : void 0,
    link: (_k = raw.link) != null ? _k : void 0
  };
};
const fetchProducts = async () => {
  const now = Date.now();
  if (cachedProducts && now - lastFetch < CACHE_TTL) {
    return cachedProducts;
  }
  try {
    const { products } = await $fetch(PRODUCT_SOURCE_URL);
    const mapped = products.map(toProduct);
    cachedProducts = mapped;
    lastFetch = now;
    return mapped;
  } catch (error) {
    console.error("Failed to load products from remote source", error);
    throw createError({
      statusCode: 502,
      statusMessage: "Unable to load product catalog right now."
    });
  }
};
const findProductBySlug = async (slug) => {
  const products = await fetchProducts();
  return products.find((product) => product.slug === slug);
};

export { fetchProducts as a, findProductBySlug as f };
//# sourceMappingURL=products.mjs.map
