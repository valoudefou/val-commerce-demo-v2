import { _ as __nuxt_component_0 } from './nuxt-link-CykhVs1W.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { ShoppingBagIcon } from '@heroicons/vue/24/outline';
import { u as useHead, a as useRuntimeConfig } from './server.mjs';
import { u as useCart } from './useCart-T83HG6B3.mjs';
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
import '@heroicons/vue/24/solid';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { items, subtotal } = useCart();
    const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
    useHead({ title: "Your cart \u2013 Val Commerce" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-16 lg:grid-cols-[2fr,1fr]" }, _attrs))}><section><h1 class="text-3xl font-semibold text-slate-900">Your cart</h1><p class="mt-3 text-sm text-slate-600"> Review your selected items before heading to checkout. We offer free shipping on orders over $200. </p>`);
      if (!unref(items).length) {
        _push(`<div class="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">`);
        _push(ssrRenderComponent(unref(ShoppingBagIcon), { class: "mx-auto h-12 w-12 text-slate-300" }, null, _parent));
        _push(`<h2 class="mt-6 text-xl font-semibold text-slate-900">Your cart is empty</h2><p class="mt-3 text-sm text-slate-600">Explore our latest arrivals and add something you love.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "mt-6 inline-flex items-center rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Continue shopping `);
            } else {
              return [
                createTextVNode(" Continue shopping ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<ul class="mt-10 space-y-6"><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(`<li class="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:gap-8"><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="h-32 w-32 rounded-2xl object-cover"><div class="flex-1"><div class="flex flex-wrap items-start justify-between gap-3"><div><h2 class="text-lg font-semibold text-slate-900">${ssrInterpolate(item.name)}</h2><p class="mt-1 text-sm text-slate-500">${ssrInterpolate(item.category)}</p><p class="mt-3 text-sm text-slate-600">${ssrInterpolate(item.description)}</p></div><p class="text-lg font-semibold text-primary-600">${ssrInterpolate(formatCurrency(item.price))}</p></div><div class="mt-4 flex flex-wrap items-center gap-4"><label class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Quantity</label><div class="flex items-center rounded-full border border-slate-200"><button class="px-3 py-1 text-sm">\u2212</button><span class="px-4 text-sm font-medium text-slate-700">${ssrInterpolate(item.quantity)}</span><button class="px-3 py-1 text-sm">+</button></div><button class="text-sm font-semibold text-rose-500">Remove</button></div></div></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`</section><aside class="space-y-6"><div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"><h2 class="text-xl font-semibold text-slate-900">Order summary</h2><dl class="mt-6 space-y-4 text-sm text-slate-600"><div class="flex items-center justify-between"><dt>Subtotal</dt><dd class="font-semibold text-slate-900">${ssrInterpolate(formatCurrency(unref(subtotal)))}</dd></div><div class="flex items-center justify-between"><dt>Shipping</dt><dd>Calculated at checkout</dd></div><div class="flex items-center justify-between"><dt>Estimated tax</dt><dd>\u2014</dd></div></dl><div class="mt-6 flex items-center justify-between border-t border-slate-200 pt-6 text-base font-semibold text-slate-900"><span>Total</span><span>${ssrInterpolate(formatCurrency(unref(subtotal)))}</span></div><button class="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500 disabled:bg-slate-300"${ssrIncludeBooleanAttr(!unref(items).length) ? " disabled" : ""}> Proceed to checkout </button><p class="mt-4 text-xs text-slate-500">Secure payment powered by trusted partners.</p></div><div class="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-100"><h3 class="text-sm font-semibold text-slate-900">Need assistance?</h3><p class="mt-2 text-sm text-slate-600"> Email our team at <a${ssrRenderAttr("href", `mailto:${unref(config).public.supportEmail}`)} class="font-semibold text-primary-600">${ssrInterpolate(unref(config).public.supportEmail)}</a> for tailored recommendations. </p></div></aside></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-g_w76Njl.mjs.map
