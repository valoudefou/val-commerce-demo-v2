import { _ as __nuxt_component_0 } from './nuxt-link-CykhVs1W.mjs';
import { defineComponent, useSSRContext, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { u as useCart } from './useCart-T83HG6B3.mjs';
import { a as useRuntimeConfig } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NavigationBar",
  __ssrInlineRender: true,
  setup(__props) {
    const { totalItems } = useCart();
    const navigation = [
      { label: "Home", href: "/" },
      { label: "Products", href: "#products" },
      { label: "About", href: "#about" },
      { label: "Journal", href: "#stories" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur" }, _attrs))}><nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 text-xl font-semibold text-primary-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingBagIcon), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</span> Commerce Demo `);
          } else {
            return [
              createVNode("span", { class: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600" }, [
                createVNode(unref(ShoppingBagIcon), { class: "h-6 w-6" })
              ]),
              createTextVNode(" Commerce Demo ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.href,
          to: item.href,
          class: "hover:text-primary-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cart",
        class: "relative inline-flex items-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ShoppingCartIcon), { class: "mr-2 h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` Cart `);
            if (unref(totalItems)) {
              _push2(`<span class="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-primary-600"${_scopeId}>${ssrInterpolate(unref(totalItems))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(ShoppingCartIcon), { class: "mr-2 h-5 w-5" }),
              createTextVNode(" Cart "),
              unref(totalItems) ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-primary-600"
              }, toDisplayString(unref(totalItems)), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavigationBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SiteFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({
        id: "about",
        class: "border-t border-slate-200 bg-white"
      }, _attrs))}><div class="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8"><div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 text-lg font-semibold text-primary-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingBagIcon), { class: "h-6 w-6" }, null, _parent2, _scopeId));
            _push2(`</span> Val Commerce `);
          } else {
            return [
              createVNode("span", { class: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600" }, [
                createVNode(unref(ShoppingBagIcon), { class: "h-6 w-6" })
              ]),
              createTextVNode(" Val Commerce ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="mt-4 text-sm leading-6 text-slate-600"> We design considered essentials for modern explorers. Built to move effortlessly between city streets and remote escapes. </p></div><div class="grid grid-cols-2 gap-8 text-sm text-slate-500"><div><h3 class="font-semibold uppercase tracking-wide text-slate-900">Shop</h3><ul class="mt-4 space-y-3"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "#products",
        class: "hover:text-primary-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`New arrivals`);
          } else {
            return [
              createTextVNode("New arrivals")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><a href="#stories" class="hover:text-primary-600">Stories</a></li><li><a href="#about" class="hover:text-primary-600">Sustainability</a></li></ul></div><div><h3 class="font-semibold uppercase tracking-wide text-slate-900">Support</h3><ul class="mt-4 space-y-3"><li><a href="mailto:hello@valcommerce.demo" class="hover:text-primary-600">Contact</a></li><li><a href="#" class="hover:text-primary-600">Shipping &amp; Returns</a></li><li><a href="#" class="hover:text-primary-600">FAQ</a></li></ul></div></div><div><h3 class="text-base font-semibold text-slate-900">Join our newsletter</h3><p class="mt-2 text-sm text-slate-500"> Be first to hear about limited drops, journal entries, and exclusive events. </p><form class="mt-4 flex gap-3"><input type="email" name="email" placeholder="you@example.com" class="w-full rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"><button type="submit" class="inline-flex items-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"> Join </button></form></div></div><div class="border-t border-slate-200 py-6 text-center text-xs text-slate-500"> \xA9 ${ssrInterpolate(unref(currentYear))} ${ssrInterpolate(unref(config).public.companyName)}. All rights reserved. </div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NavigationBar = _sfc_main$2;
  const _component_SiteFooter = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_NavigationBar, null, null, _parent));
  _push(`<main class="mx-auto min-h-screen max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_SiteFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CyONSKWq.mjs.map
