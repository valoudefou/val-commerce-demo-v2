import { _ as __nuxt_component_0 } from './nuxt-link-CykhVs1W.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, createVNode, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderVNode, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { CheckCircleIcon, ArrowRightIcon, StarIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { u as useCart } from './useCart-T83HG6B3.mjs';
import { BeakerIcon, GlobeAltIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/vue/24/outline';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useProducts } from './useProducts-BgwQyNGr.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-sky-500 px-8 py-20 text-white shadow-xl" }, _attrs))}><div class="grid gap-12 lg:grid-cols-[2fr,1fr]"><div><p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary-100">New Collection</p><h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"> Elevated essentials for adventurous lives </h1><p class="mt-6 max-w-xl text-lg text-primary-50"> Discover performance-crafted apparel and accessories designed to transition seamlessly from morning commutes to weekend escapes. </p><div class="mt-8 flex flex-wrap gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "#products",
        class: "inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-slate-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Explore products `);
          } else {
            return [
              createTextVNode(" Explore products ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "#stories",
        class: "inline-flex items-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Read journal `);
          } else {
            return [
              createTextVNode(" Read journal ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="relative hidden lg:block"><div class="absolute inset-0 rounded-3xl bg-white/10 blur-3xl"></div><div class="relative rounded-3xl border border-white/20 bg-white/10 p-8 text-sm leading-6 text-primary-50 shadow-2xl"><h3 class="text-base font-semibold text-white">Designed for motion</h3><p class="mt-4"> We obsess over technical fabrics and precise tailoring to create pieces that breathe, move, and layer effortlessly. </p><ul class="mt-6 space-y-3"><li class="flex items-start gap-3">`);
      _push(ssrRenderComponent(unref(CheckCircleIcon), { class: "mt-1 h-5 w-5 flex-shrink-0 text-emerald-300" }, null, _parent));
      _push(`<span>Climate-ready protection and insulation options</span></li><li class="flex items-start gap-3">`);
      _push(ssrRenderComponent(unref(CheckCircleIcon), { class: "mt-1 h-5 w-5 flex-shrink-0 text-emerald-300" }, null, _parent));
      _push(`<span>Fair-wage production partners across the globe</span></li><li class="flex items-start gap-3">`);
      _push(ssrRenderComponent(unref(CheckCircleIcon), { class: "mt-1 h-5 w-5 flex-shrink-0 text-emerald-300" }, null, _parent));
      _push(`<span>Lifetime repairs and recycling program</span></li></ul></div></div></div></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    useCart();
    const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.product.slug}`,
        class: "relative block overflow-hidden rounded-2xl bg-slate-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.product.image)}${ssrRenderAttr("alt", __props.product.name)} class="h-64 w-full object-cover transition duration-500 group-hover:scale-105"${_scopeId}>`);
            if (!__props.product.inStock) {
              _push2(`<div class="absolute inset-0 flex items-center justify-center bg-black/40"${_scopeId}><span class="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-900"${_scopeId}>Sold out</span></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("img", {
                src: __props.product.image,
                alt: __props.product.name,
                class: "h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              }, null, 8, ["src", "alt"]),
              !__props.product.inStock ? (openBlock(), createBlock("div", {
                key: 0,
                class: "absolute inset-0 flex items-center justify-center bg-black/40"
              }, [
                createVNode("span", { class: "rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-900" }, "Sold out")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-6 flex flex-1 flex-col"><div class="flex items-start justify-between gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.product.slug}`,
        class: "text-lg font-semibold text-slate-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.product.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.product.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-lg font-semibold text-primary-600">${ssrInterpolate(formatCurrency(__props.product.price))}</p></div><p class="mt-3 text-sm leading-6 text-slate-600">${ssrInterpolate(__props.product.description)}</p><div class="mt-4 flex items-center gap-2 text-xs font-medium text-amber-500"><!--[-->`);
      ssrRenderList(5, (index) => {
        _push(ssrRenderComponent(unref(StarIcon), {
          key: index,
          class: [index <= Math.round(__props.product.rating) ? "fill-amber-400" : "fill-slate-200", "h-4 w-4"]
        }, null, _parent));
      });
      _push(`<!--]--><span class="text-slate-500">(${ssrInterpolate(__props.product.rating.toFixed(1))})</span></div><div class="mt-6 flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(__props.product.colors, (color) => {
        _push(`<span class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">${ssrInterpolate(color)}</span>`);
      });
      _push(`<!--]--></div><button class="mt-8 inline-flex items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-slate-300"${ssrIncludeBooleanAttr(!__props.product.inStock) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(unref(ShoppingCartIcon), { class: "mr-2 h-5 w-5" }, null, _parent));
      _push(` ${ssrInterpolate(__props.product.inStock ? "Add to cart" : "Notify me")}</button></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProductGrid",
  __ssrInlineRender: true,
  props: {
    products: {},
    loading: { type: Boolean },
    error: {}
  },
  setup(__props) {
    const filters = ["All", "Outerwear", "Accessories", "Best sellers"];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "products",
        class: "mt-20 space-y-8"
      }, _attrs))}><div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><h2 class="section-title">Featured products</h2><p class="section-subtitle"> Hand-curated essentials crafted with precision detail and premium sustainable fabrics. </p></div><div class="flex gap-3 text-sm"><!--[-->`);
      ssrRenderList(filters, (filter) => {
        _push(`<button type="button" class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-primary-400 hover:text-primary-600">${ssrInterpolate(filter)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (__props.loading) {
        _push(`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        ssrRenderList(3, (n) => {
          _push(`<div class="h-96 animate-pulse rounded-3xl bg-slate-100"></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        ssrRenderList(__props.products, (product) => {
          _push(ssrRenderComponent(_sfc_main$5, {
            key: product.id,
            product
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (__props.error) {
        _push(`<p class="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600">${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductGrid.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FeatureGrid",
  __ssrInlineRender: true,
  setup(__props) {
    const features = [
      {
        title: "Performance fabrics",
        description: "Temperature regulating and moisture-wicking textiles keep you in your comfort zone all day long.",
        icon: BeakerIcon
      },
      {
        title: "Global craftsmanship",
        description: "Produced in small batches with manufacturing partners certified for ethical practices.",
        icon: GlobeAltIcon
      },
      {
        title: "Lifetime care",
        description: "Complimentary repairs and recycling program ensure every piece lives many lives.",
        icon: ShieldCheckIcon
      },
      {
        title: "Limited releases",
        description: "Seasonal drops and collaborations offer distinctive silhouettes you will not find elsewhere.",
        icon: SparklesIcon
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "mt-24",
        id: "stories"
      }, _attrs))}><div class="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100"><div class="grid gap-10 lg:grid-cols-3"><div><h2 class="section-title">What sets us apart</h2><p class="section-subtitle"> Every piece is engineered to keep you comfortable during the moments that matter most. </p></div><dl class="grid gap-8 sm:grid-cols-2 lg:col-span-2"><!--[-->`);
      ssrRenderList(features, (feature) => {
        _push(`<div class="rounded-2xl border border-slate-200 p-6 transition hover:border-primary-200 hover:shadow-md"><dt class="flex items-center gap-3 text-sm font-semibold text-slate-900">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(feature.icon), { class: "h-6 w-6 text-primary-500" }, null), _parent);
        _push(` ${ssrInterpolate(feature.title)}</dt><dd class="mt-3 text-sm leading-6 text-slate-600">${ssrInterpolate(feature.description)}</dd></div>`);
      });
      _push(`<!--]--></dl></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FeatureGrid.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StoryHighlights",
  __ssrInlineRender: true,
  setup(__props) {
    const stories = [
      {
        title: "Designing a modular layering system for unpredictable climates",
        excerpt: "Our design director unpacks how we built the Skyline system to perform in both alpine and urban conditions.",
        category: "Design"
      },
      {
        title: "Tracking a week-long trail run through Patagonia",
        excerpt: "Athlete-in-residence Mason Kho shares the gear that handled everything from sudden rain to high-altitude winds.",
        category: "Field notes"
      },
      {
        title: "How we source regenerative merino wool",
        excerpt: "A look inside our partnership with family-run farms pioneering regenerative agriculture in New Zealand.",
        category: "Sustainability"
      }
    ];
    const stylingTips = [
      "Layer lightweight knits under structured outerwear for versatility across changing temperatures.",
      "Anchor bright accessories with monochrome basics to create a balanced, modern palette."
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mt-24" }, _attrs))}><div class="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-start"><div class="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg"><h2 class="section-title">Inside the journal</h2><p class="section-subtitle"> Field notes from expeditions, design studios, and the people who inspire how we move through the world. </p><div class="mt-10 space-y-8"><!--[-->`);
      ssrRenderList(stories, (story) => {
        _push(`<article class="flex flex-col gap-3"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">${ssrInterpolate(story.category)}</p><h3 class="text-xl font-semibold text-slate-900">${ssrInterpolate(story.title)}</h3><p class="text-sm leading-6 text-slate-600">${ssrInterpolate(story.excerpt)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "#",
          class: "inline-flex items-center text-sm font-semibold text-primary-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Read story `);
              _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "ml-2 h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(" Read story "),
                createVNode(unref(ArrowRightIcon), { class: "ml-2 h-4 w-4" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div></div><div class="space-y-6"><!--[-->`);
      ssrRenderList(stylingTips, (tip, index) => {
        _push(`<div class="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100"><p class="text-xs font-semibold uppercase tracking-[0.25em] text-primary-400">Style tip ${ssrInterpolate(index + 1)}</p><p class="mt-3 text-sm leading-6 text-slate-600">${ssrInterpolate(tip)}</p></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StoryHighlights.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "mt-24" }, _attrs))}><div class="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-10 py-16 text-white shadow-2xl"><div class="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center"><div><p class="text-sm uppercase tracking-[0.25em] text-primary-300">Member exclusive</p><h2 class="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Unlock early access drops</h2><p class="mt-4 max-w-xl text-sm leading-6 text-slate-200"> Join our private community to receive first looks at product collaborations, city pop-up invites, and styling workshops hosted by our team. </p></div><form class="flex flex-col gap-4 lg:flex-row"><input type="email" required placeholder="Enter your email" class="w-full rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-slate-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40"><button type="submit" class="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-400"> Join waitlist </button></form></div></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NewsletterBanner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { products, loading, error, fetchProducts } = useProducts();
    [__temp, __restore] = withAsyncContext(() => fetchProducts()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroSection = _sfc_main$6;
      const _component_ProductGrid = _sfc_main$4;
      const _component_FeatureGrid = _sfc_main$3;
      const _component_StoryHighlights = _sfc_main$2;
      const _component_NewsletterBanner = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-20" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ProductGrid, {
        products: unref(products),
        loading: unref(loading),
        error: unref(error)
      }, null, _parent));
      _push(ssrRenderComponent(_component_FeatureGrid, null, null, _parent));
      _push(ssrRenderComponent(_component_StoryHighlights, null, null, _parent));
      _push(ssrRenderComponent(_component_NewsletterBanner, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-KvPAzM8g.mjs.map
