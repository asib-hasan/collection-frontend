import { _ as __nuxt_component_1, a as _imports_0 } from './MobileHeader-1jqlfrZB.mjs';
import { _ as __nuxt_component_0$1 } from './server.mjs';
import { useSSRContext, ref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'pinia';
import 'vue-router';
import '@vue/shared';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';

const _imports_1 = publicAssetsURL("/images/sslcommarz.png");
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const collections = [
      {
        name: "Prom Dresses",
        subcategories: ["Mermaid", "Ball Gown", "A-Line", "Two-Piece"]
      },
      {
        name: "Wedding",
        subcategories: ["Bridal Gowns", "Bridesmaids", "Mother of the Bride"]
      },
      {
        name: "Evening & Gala",
        subcategories: ["Long Sleeve", "Off-Shoulder", "Sequins", "Velvet"]
      },
      {
        name: "Quinceañera",
        subcategories: ["Sweet 16", "Ruffled", "Corset Back"]
      }
    ];
    const announcements = [
      "FREE STANDARD SHIPPING ON U.S. ORDERS OVER $200",
      "NEW ARRIVALS JUST DROPPED - SHOP NOW",
      "GET 10% OFF YOUR FIRST ORDER WITH CODE: WELCOME10"
    ];
    const currentAnnouncementIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MobileHeader = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cc-layout" }, _attrs))} data-v-797ea2b9>`);
      _push(ssrRenderComponent(_component_MobileHeader, { class: "mobile-header-root" }, null, _parent));
      _push(`<header class="cc-header" data-v-797ea2b9><div class="cc-topbar" data-v-797ea2b9><div class="topbar-left" data-v-797ea2b9><span data-v-797ea2b9>📍 123 Fashion Blvd, NY 10001</span></div><div class="topbar-center announcement-wrapper" data-v-797ea2b9><span class="announcement-text" data-v-797ea2b9>${ssrInterpolate(announcements[currentAnnouncementIndex.value])}</span></div><div class="topbar-right" data-v-797ea2b9><a href="#" aria-label="Facebook" data-v-797ea2b9><svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" data-v-797ea2b9><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" data-v-797ea2b9></path></svg></a><a href="#" aria-label="Instagram" data-v-797ea2b9><svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" data-v-797ea2b9><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" data-v-797ea2b9></path></svg></a></div></div><nav class="cc-nav" data-v-797ea2b9><div class="cc-logo" data-v-797ea2b9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "no-border"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="CCollection" data-v-797ea2b9${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "CCollection"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="cc-nav-left" data-v-797ea2b9><div class="nav-item has-dropdown" data-v-797ea2b9>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`ALL COLLECTION`);
          } else {
            return [
              createTextVNode("ALL COLLECTION")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="dropdown-mega" data-v-797ea2b9><div class="mega-row" data-v-797ea2b9><!--[-->`);
      ssrRenderList(collections, (col) => {
        _push(`<div class="mega-col" data-v-797ea2b9><h4 data-v-797ea2b9>${ssrInterpolate(col.name)}</h4><!--[-->`);
        ssrRenderList(col.subcategories, (sub) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: sub,
            to: "/"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(sub)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(sub), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`PROM`);
          } else {
            return [
              createTextVNode("PROM")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`HOMECOMING`);
          } else {
            return [
              createTextVNode("HOMECOMING")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`WEDDING`);
          } else {
            return [
              createTextVNode("WEDDING")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="cc-nav-right" data-v-797ea2b9><div class="nav-search-bar" data-v-797ea2b9><input type="text" placeholder="Search dresses..." data-v-797ea2b9><button aria-label="Search" data-v-797ea2b9><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" data-v-797ea2b9><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" data-v-797ea2b9></path></svg></button></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`LOGIN`);
          } else {
            return [
              createTextVNode("LOGIN")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`BAG (0)`);
          } else {
            return [
              createTextVNode("BAG (0)")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav></header><main class="cc-main" data-v-797ea2b9>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="cc-footer" data-v-797ea2b9><div class="footer-top" data-v-797ea2b9><div class="cc-footer-col" data-v-797ea2b9><img${ssrRenderAttr("src", _imports_0)} alt="CCollection" class="footer-logo" style="${ssrRenderStyle({ "mix-blend-mode": "multiply" })}" data-v-797ea2b9><p class="mt-4" data-v-797ea2b9>Your premier destination for luxury dresses and unforgettable styles.</p></div><div class="cc-footer-col" data-v-797ea2b9><h4 data-v-797ea2b9>SHOP</h4>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Prom Dresses`);
          } else {
            return [
              createTextVNode("Prom Dresses")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Homecoming`);
          } else {
            return [
              createTextVNode("Homecoming")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Evening Gowns`);
          } else {
            return [
              createTextVNode("Evening Gowns")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Wedding Dresses`);
          } else {
            return [
              createTextVNode("Wedding Dresses")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="cc-footer-col" data-v-797ea2b9><h4 data-v-797ea2b9>ABOUT</h4>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Our Story`);
          } else {
            return [
              createTextVNode("Our Story")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Store Locator`);
          } else {
            return [
              createTextVNode("Store Locator")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Careers`);
          } else {
            return [
              createTextVNode("Careers")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="cc-footer-col" data-v-797ea2b9><h4 data-v-797ea2b9>SUPPORT</h4>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact Us`);
          } else {
            return [
              createTextVNode("Contact Us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Shipping &amp; Returns`);
          } else {
            return [
              createTextVNode("Shipping & Returns")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`FAQ`);
          } else {
            return [
              createTextVNode("FAQ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Size Guide`);
          } else {
            return [
              createTextVNode("Size Guide")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="cc-footer-col brand-col" data-v-797ea2b9><h4 data-v-797ea2b9>STAY CONNECTED</h4><p data-v-797ea2b9>Sign up to receive updates on new arrivals, exclusive promotions, and style inspiration.</p><div class="cc-newsletter" data-v-797ea2b9><input type="email" placeholder="Enter your email" data-v-797ea2b9><button data-v-797ea2b9>SUBSCRIBE</button></div></div></div><div class="footer-bottom" data-v-797ea2b9><p data-v-797ea2b9>© 2026 CCollection. All rights reserved.</p><img${ssrRenderAttr("src", _imports_1)} alt="Payments" class="payments-img" data-v-797ea2b9></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-797ea2b9"]]);

export { _default as default };
//# sourceMappingURL=default-CktlkY-y.mjs.map
