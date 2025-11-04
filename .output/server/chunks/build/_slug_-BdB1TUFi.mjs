import { _ as __nuxt_component_0 } from './nuxt-link-CykhVs1W.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { CheckCircleIcon, ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { b as useRoute, u as useHead } from './server.mjs';
import { u as useCart } from './useCart-T83HG6B3.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useCart();
    const { findBySlug } = useProducts();
    const product = ([__temp, __restore] = withAsyncContext(() => findBySlug(route.params.slug)), __temp = await __temp, __restore(), __temp);
    const selectedSize = ref(product.sizes[0]);
    const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
    useHead({ title: `${product.name} \u2013 Val Commerce` });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-16 lg:grid-cols-[1.2fr,1fr]" }, _attrs))}><div><div class="overflow-hidden rounded-3xl bg-white shadow-xl"><img${ssrRenderAttr("src", unref(product).image)}${ssrRenderAttr("alt", unref(product).name)} class="h-[32rem] w-full object-cover"></div><section class="mt-12"><h2 class="text-2xl font-semibold text-slate-900">Product details</h2><p class="mt-4 text-sm leading-7 text-slate-600">${ssrInterpolate(unref(product).description)}</p><div class="mt-8 grid gap-6 sm:grid-cols-2"><div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"><h3 class="text-sm font-semibold text-slate-900">Highlights</h3><ul class="mt-4 space-y-3 text-sm text-slate-600"><!--[-->`);
      ssrRenderList(unref(product).highlights, (highlight) => {
        _push(`<li class="flex items-start gap-2">`);
        _push(ssrRenderComponent(unref(CheckCircleIcon), { class: "mt-1 h-5 w-5 flex-shrink-0 text-primary-500" }, null, _parent));
        _push(`<span>${ssrInterpolate(highlight)}</span></li>`);
      });
      _push(`<!--]--></ul></div><div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"><h3 class="text-sm font-semibold text-slate-900">Care</h3><ul class="mt-4 space-y-3 text-sm text-slate-600"><li>Machine wash cold with like colors.</li><li>Tumble dry low or hang dry for longevity.</li><li>Do not bleach. Warm iron if needed.</li></ul></div></div></section></div><aside class="space-y-8"><div class="sticky top-24 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center text-sm font-semibold text-primary-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeftIcon), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Back to catalog `);
          } else {
            return [
              createVNode(unref(ArrowLeftIcon), { class: "mr-2 h-4 w-4" }),
              createTextVNode(" Back to catalog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="mt-6 text-3xl font-semibold text-slate-900">${ssrInterpolate(unref(product).name)}</h1><p class="mt-3 text-lg font-semibold text-primary-600">${ssrInterpolate(formatCurrency(unref(product).price))}</p><p class="mt-4 text-sm leading-6 text-slate-600"> Crafted for movement and comfort. All materials sourced from certified sustainable mills. </p><div class="mt-6 flex flex-wrap gap-3"><!--[-->`);
      ssrRenderList(unref(product).colors, (color) => {
        _push(`<span class="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">${ssrInterpolate(color)}</span>`);
      });
      _push(`<!--]--></div><div class="mt-6"><label class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Size</label><div class="mt-3 flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(product).sizes, (size) => {
        _push(`<button class="${ssrRenderClass([
          "rounded-full border px-4 py-2 text-sm font-medium transition",
          unref(selectedSize) === size ? "border-primary-500 bg-primary-50 text-primary-600" : "border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-600"
        ])}">${ssrInterpolate(size)}</button>`);
      });
      _push(`<!--]--></div></div><button class="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-slate-300"${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(unref(ShoppingCartIcon), { class: "mr-3 h-5 w-5" }, null, _parent));
      _push(` ${ssrInterpolate(unref(product).inStock ? "Add to cart" : "Sold out")}</button>`);
      if (!unref(product).inStock) {
        _push(`<p class="mt-4 text-sm text-slate-500">Join the waitlist to be notified once this item returns.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100"><h2 class="text-base font-semibold text-slate-900">Shipping &amp; returns</h2><ul class="mt-4 space-y-3 text-sm leading-6 text-slate-600"><li>Complimentary carbon-neutral shipping on orders over $200.</li><li>Free returns within 30 days for unused products.</li><li>Lifetime repairs covered through our care program.</li></ul></div></aside></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-BdB1TUFi.mjs.map
