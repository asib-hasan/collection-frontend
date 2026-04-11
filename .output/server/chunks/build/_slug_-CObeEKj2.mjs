import { a as useRoute, l as useNuxtApp, k as useAPI, j as __nuxt_component_1, f as _sfc_main$8, n as navigateTo } from './server.mjs';
import { withAsyncContext, resolveComponent, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
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

const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { $api } = useNuxtApp();
    const {
      data: page,
      pending,
      error
    } = ([__temp, __restore] = withAsyncContext(() => useAPI(`/frontend/v1/get-custom-page/${route.params.slug}`)), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLayout = resolveComponent("AppLayout");
      const _component_Icon = __nuxt_component_1;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_AppLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section${_scopeId}><div class="container mx-auto flex p-2 lg:p-10"${_scopeId}>`);
            if (unref(pending)) {
              _push2(`<div class="text-center w-full"${_scopeId}>Loading...</div>`);
            } else if (unref(error)) {
              _push2(`<div class="text-center text-red-500 w-full"${_scopeId}><div class="flex items-center justify-center bg-gray-50 p-4"${_scopeId}><div class="text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:alert-circle-outline",
                class: "text-6xl text-red-500 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h1 class="text-3xl font-bold mb-4"${_scopeId}>Page Not Found</h1><p class="text-gray-600 mb-8 max-w-md"${_scopeId}> The page you are looking for does not exist. </p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                color: "primary",
                size: "xl",
                onClick: () => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/", { replace: true })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Go Back Home `);
                  } else {
                    return [
                      createTextVNode(" Go Back Home ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<div class="container mx-auto p-5 bg-white shadow-lg editor_data"${_scopeId}>${unref(page)?.content ?? ""}</div>`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", null, [
                createVNode("div", { class: "container mx-auto flex p-2 lg:p-10" }, [
                  unref(pending) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center w-full"
                  }, "Loading...")) : unref(error) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center text-red-500 w-full"
                  }, [
                    createVNode("div", { class: "flex items-center justify-center bg-gray-50 p-4" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode(_component_Icon, {
                          name: "mdi:alert-circle-outline",
                          class: "text-6xl text-red-500 mb-4"
                        }),
                        createVNode("h1", { class: "text-3xl font-bold mb-4" }, "Page Not Found"),
                        createVNode("p", { class: "text-gray-600 mb-8 max-w-md" }, " The page you are looking for does not exist. "),
                        createVNode(_component_UButton, {
                          color: "primary",
                          size: "xl",
                          onClick: () => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/", { replace: true })
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Go Back Home ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "container mx-auto p-5 bg-white shadow-lg editor_data",
                    innerHTML: unref(page)?.content
                  }, null, 8, ["innerHTML"]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CObeEKj2.mjs.map
