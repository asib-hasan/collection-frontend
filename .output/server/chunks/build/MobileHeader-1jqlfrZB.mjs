import { _ as __nuxt_component_0$1 } from './server.mjs';
import { ref, mergeProps, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _imports_0 = publicAssetsURL("/images/logo.PNG");
const _sfc_main = {
  __name: "MobileHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const isDrawerOpen = ref(false);
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
    const mainLinks = [
      { name: "HOME", to: "/" },
      { name: "NEW ARRIVALS", to: "/" },
      { name: "HOMECOMING", to: "/" },
      { name: "WEDDING", to: "/" },
      { name: "LOGIN / REGISTER", to: "/" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cc-mobile-header" }, _attrs))} data-v-8cb0cab1><div class="mobile-topbar text-center py-2 px-1 text-[11px] text-white tracking-widest font-normal uppercase" style="${ssrRenderStyle({ "background": "#111", "font-family": "'Jost', sans-serif" })}" data-v-8cb0cab1> FREE STANDARD SHIPPING ON U.S. ORDERS OVER $200 </div><div class="header-main flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100 shadow-sm relative z-30" data-v-8cb0cab1><button class="burger-btn" data-v-8cb0cab1><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-8cb0cab1><line x1="3" y1="12" x2="21" y2="12" data-v-8cb0cab1></line><line x1="3" y1="6" x2="21" y2="6" data-v-8cb0cab1></line><line x1="3" y1="18" x2="21" y2="18" data-v-8cb0cab1></line></svg></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mobile-logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="CCollection" style="${ssrRenderStyle({ "height": "55px", "mix-blend-mode": "multiply", "object-fit": "contain" })}" data-v-8cb0cab1${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "CCollection",
                style: { "height": "55px", "mix-blend-mode": "multiply", "object-fit": "contain" }
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex gap-4 items-center right-actions" data-v-8cb0cab1>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-8cb0cab1${_scopeId}><circle cx="11" cy="11" r="8" data-v-8cb0cab1${_scopeId}></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-8cb0cab1${_scopeId}></line></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("circle", {
                  cx: "11",
                  cy: "11",
                  r: "8"
                }),
                createVNode("line", {
                  x1: "21",
                  y1: "21",
                  x2: "16.65",
                  y2: "16.65"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-8cb0cab1${_scopeId}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" data-v-8cb0cab1${_scopeId}></path><line x1="3" y1="6" x2="21" y2="6" data-v-8cb0cab1${_scopeId}></line><path d="M16 10a4 4 0 0 1-8 0" data-v-8cb0cab1${_scopeId}></path></svg><span class="absolute -top-1 -right-2 bg-[#d4929f] text-white text-[9px] font-bold h-4 min-w-[16px] px-[2px] rounded-full flex items-center justify-center" data-v-8cb0cab1${_scopeId}>0</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("path", { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
                createVNode("line", {
                  x1: "3",
                  y1: "6",
                  x2: "21",
                  y2: "6"
                }),
                createVNode("path", { d: "M16 10a4 4 0 0 1-8 0" })
              ])),
              createVNode("span", { class: "absolute -top-1 -right-2 bg-[#d4929f] text-white text-[9px] font-bold h-4 min-w-[16px] px-[2px] rounded-full flex items-center justify-center" }, "0")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (isDrawerOpen.value) {
        _push(`<div class="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" data-v-8cb0cab1></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([isDrawerOpen.value ? "translate-x-0" : "-translate-x-full", "mobile-drawer fixed top-0 left-0 h-full bg-white z-50 w-[85%] max-w-sm flex flex-col transition-transform duration-300 transform"])}" data-v-8cb0cab1><div class="drawer-header flex items-center justify-between p-4 border-b border-gray-100 bg-[#fbfaf8]" data-v-8cb0cab1><img${ssrRenderAttr("src", _imports_0)} alt="CCollection" style="${ssrRenderStyle({ "height": "45px", "mix-blend-mode": "multiply" })}" data-v-8cb0cab1><button class="text-gray-500 hover:text-black" data-v-8cb0cab1><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-8cb0cab1><line x1="18" y1="6" x2="6" y2="18" data-v-8cb0cab1></line><line x1="6" y1="6" x2="18" y2="18" data-v-8cb0cab1></line></svg></button></div><div class="drawer-body flex-1 overflow-y-auto p-6 font-jost" style="${ssrRenderStyle({ "font-family": "'Jost', sans-serif" })}" data-v-8cb0cab1><div class="mb-4" data-v-8cb0cab1><h3 class="text-xs font-semibold text-gray-400 mb-4 tracking-widest uppercase" style="${ssrRenderStyle({ "font-family": "'Cinzel', serif" })}" data-v-8cb0cab1>All Collections</h3><!--[-->`);
      ssrRenderList(collections, (col) => {
        _push(`<div class="mb-6" data-v-8cb0cab1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "block font-medium text-[15px] mb-3 text-[#d4929f] uppercase tracking-wide"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(col.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(col.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="pl-4 flex flex-col gap-3 border-l-2 border-pink-50" data-v-8cb0cab1><!--[-->`);
        ssrRenderList(col.subcategories, (sub) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: sub,
            to: "/",
            class: "text-[14px] text-gray-600 block hover:text-[#d4929f]"
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
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div><div class="divider h-px bg-gray-100 my-6" data-v-8cb0cab1></div><div data-v-8cb0cab1><h3 class="text-xs font-semibold text-gray-400 mb-4 tracking-widest uppercase" style="${ssrRenderStyle({ "font-family": "'Cinzel', serif" })}" data-v-8cb0cab1>Navigate</h3><!--[-->`);
      ssrRenderList(mainLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.name,
          to: link.to,
          class: "block font-medium text-[14px] mb-4 uppercase text-[#111] hover:text-[#d4929f] tracking-wide"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="drawer-footer p-4 border-t border-gray-100 bg-gray-50 flex justify-center gap-6" data-v-8cb0cab1><a href="#" class="text-gray-500 hover:text-[#d4929f]" data-v-8cb0cab1><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" data-v-8cb0cab1><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" data-v-8cb0cab1></path></svg></a><a href="#" class="text-gray-500 hover:text-[#d4929f]" data-v-8cb0cab1><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" data-v-8cb0cab1><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" data-v-8cb0cab1></path></svg></a></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MobileHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8cb0cab1"]]);

export { __nuxt_component_1 as _, _imports_0 as a };
//# sourceMappingURL=MobileHeader-1jqlfrZB.mjs.map
