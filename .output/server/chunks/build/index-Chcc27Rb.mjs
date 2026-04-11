import { u as useHead, a as useRoute, k as useAPI, j as __nuxt_component_1$1, g as useCartStore, h as useWishlistStore, i as useToast, _ as __nuxt_component_0$1, b as useLocale, c as useAppConfig, d as useComponentUI, e as usePortal, t as tv, f as _sfc_main$8 } from './server.mjs';
import { defineComponent, ref, computed, watch, withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, createTextVNode, useSlots, toRef, toHandlers, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, DialogRoot, DialogContent, VisuallyHidden, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogPortal, DialogOverlay } from 'reka-ui';
import { reactivePick, createReusableTemplate } from '@vueuse/core';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'pinia';
import 'vue-router';
import '@vue/shared';
import '@iconify/vue';
import 'tailwindcss/colors';
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

function pointerDownOutside(e, options = {}) {
  const originalEvent = e.detail.originalEvent;
  const target = originalEvent.target;
  if (!target?.isConnected) {
    e.preventDefault();
    return;
  }
  if (options.scrollable) {
    if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
      e.preventDefault();
    }
  }
}
const theme = {
  "slots": {
    "overlay": "fixed inset-0",
    "content": "bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-(--ui-header-height)",
    "wrapper": "",
    "body": "flex-1 p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
        "content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default"
      }
    },
    "overlay": {
      "true": {
        "overlay": "bg-elevated/75"
      }
    },
    "scrollable": {
      "true": {
        "overlay": "overflow-y-auto",
        "content": "relative"
      },
      "false": {
        "content": "fixed",
        "body": "overflow-y-auto"
      }
    }
  },
  "compoundVariants": [
    {
      "scrollable": true,
      "fullscreen": false,
      "class": {
        "overlay": "grid place-items-center p-4 sm:py-8"
      }
    },
    {
      "scrollable": false,
      "fullscreen": false,
      "class": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden"
      }
    }
  ]
};
const _sfc_main$2 = {
  __name: "UModal",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    scrollable: { type: Boolean, required: false },
    transition: { type: Boolean, required: false, default: true },
    fullscreen: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("modal", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => props.content);
    const contentEvents = computed(() => {
      if (!props.dismissible) {
        const events = ["interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside: (e) => pointerDownOutside(e, { scrollable: props.scrollable })
      };
    });
    const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.modal || {} })({
      transition: props.transition,
      fullscreen: props.fullscreen,
      overlay: props.overlay,
      scrollable: props.scrollable
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DefineContentTemplate), null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DialogContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                          _push4(ssrRenderComponent(unref(VisuallyHidden), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.title || !!slots.title) {
                                  _push5(ssrRenderComponent(unref(DialogTitle), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (__props.description || !!slots.description) {
                                  _push5(ssrRenderComponent(unref(DialogDescription), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "content", { close }, () => {
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(uiProp)?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "header", { close }, () => {
                              _push4(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId3}>`);
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent(unref(DialogTitle), {
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent(unref(DialogDescription), {
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                              if (props.close || !!slots.close) {
                                _push4(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        if (props.close) {
                                          _push5(ssrRenderComponent(_sfc_main$8, mergeProps({
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          props.close ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.body) {
                            _push4(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(uiProp)?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "footer", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                            default: withCtx(() => [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "content", { close }, () => [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: unref(uiProp)?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", { close }, () => [
                                createVNode("div", {
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                                }, [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: unref(uiProp)?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: unref(uiProp)?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "actions"),
                                props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      props.close ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
                                        key: 0,
                                        icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": unref(t)("modal.close")
                                      }, typeof props.close === "object" ? props.close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: unref(uiProp)?.close })
                                      }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            !!slots.body ? (openBlock(), createBlock("div", {
                              key: 1,
                              "data-slot": "body",
                              class: ui.value.body({ class: unref(uiProp)?.body })
                            }, [
                              renderSlot(_ctx.$slots, "body", { close })
                            ], 2)) : createCommentVNode("", true),
                            !!slots.footer ? (openBlock(), createBlock("div", {
                              key: 2,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: unref(uiProp)?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer", { close })
                            ], 2)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DialogContent), mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true),
                            __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "content", { close }, () => [
                          !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: unref(uiProp)?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", { close }, () => [
                              createVNode("div", {
                                "data-slot": "wrapper",
                                class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                              }, [
                                __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                  key: 0,
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true),
                                __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                  key: 1,
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true)
                              ], 2),
                              renderSlot(_ctx.$slots, "actions"),
                              props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                    props.close ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
                                      key: 0,
                                      icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                      color: "neutral",
                                      variant: "ghost",
                                      "aria-label": unref(t)("modal.close")
                                    }, typeof props.close === "object" ? props.close : {}, {
                                      "data-slot": "close",
                                      class: ui.value.close({ class: unref(uiProp)?.close })
                                    }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          !!slots.body ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: unref(uiProp)?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body", { close })
                          ], 2)) : createCommentVNode("", true),
                          !!slots.footer ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: unref(uiProp)?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", { close })
                          ], 2)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DialogTrigger), {
                "as-child": "",
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.scrollable) {
                    _push3(ssrRenderComponent(unref(DialogOverlay), {
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ReuseContentTemplate))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    if (__props.overlay) {
                      _push3(ssrRenderComponent(unref(DialogOverlay), {
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ReuseContentTemplate))
                      ]),
                      _: 1
                    }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                        key: 0,
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                      }, null, 8, ["class"])) : createCommentVNode("", true),
                      createVNode(unref(ReuseContentTemplate))
                    ], 64))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DefineContentTemplate), null, {
                default: withCtx(() => [
                  createVNode(unref(DialogContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx(() => [
                      !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                        default: withCtx(() => [
                          __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "title", {}, () => [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "description", {}, () => [
                                createTextVNode(toDisplayString(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true)
                        ]),
                        _: 3
                      })) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "content", { close }, () => [
                        !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: unref(uiProp)?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", { close }, () => [
                            createVNode("div", {
                              "data-slot": "wrapper",
                              class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                            }, [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                key: 0,
                                "data-slot": "title",
                                class: ui.value.title({ class: unref(uiProp)?.title })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                key: 1,
                                "data-slot": "description",
                                class: ui.value.description({ class: unref(uiProp)?.description })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true)
                            ], 2),
                            renderSlot(_ctx.$slots, "actions"),
                            props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                  props.close ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
                                    key: 0,
                                    icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": unref(t)("modal.close")
                                  }, typeof props.close === "object" ? props.close : {}, {
                                    "data-slot": "close",
                                    class: ui.value.close({ class: unref(uiProp)?.close })
                                  }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        !!slots.body ? (openBlock(), createBlock("div", {
                          key: 1,
                          "data-slot": "body",
                          class: ui.value.body({ class: unref(uiProp)?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", { close })
                        ], 2)) : createCommentVNode("", true),
                        !!slots.footer ? (openBlock(), createBlock("div", {
                          key: 2,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: unref(uiProp)?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", { close })
                        ], 2)) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                ]),
                _: 2
              }, 1024),
              !!slots.default ? (openBlock(), createBlock(unref(DialogTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : createCommentVNode("", true),
              createVNode(unref(DialogPortal), unref(portalProps), {
                default: withCtx(() => [
                  __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ReuseContentTemplate))
                    ]),
                    _: 1
                  }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(ReuseContentTemplate))
                  ], 64))
                ]),
                _: 1
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Modal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    useToast();
    const isHovered = ref(false);
    const isSelectionModalOpen = ref(false);
    const initialVariation = props.product?.base_variations?.[0];
    const initialPrice = initialVariation?.prices?.[0];
    const selectedColor = ref(initialVariation?.color?.name || null);
    const selectedSize = ref(initialPrice?.size?.name || null);
    const currentVariation = computed(
      () => props.product?.base_variations?.find((v) => v.color?.name === selectedColor.value) || initialVariation
    );
    const currentPriceObj = computed(
      () => currentVariation.value?.prices?.find((p) => p.size?.name === selectedSize.value) || currentVariation.value?.prices?.[0]
    );
    const discountPercentage = computed(() => {
      if (!props.product.price || !props.product.discount_price) return 0;
      if (props.product.discount_price >= props.product.price) return 0;
      return Math.round((props.product.price - props.product.discount_price) / props.product.price * 100);
    });
    const cartItem = computed(() => ({
      id: props.product.id,
      name: props.product.title,
      price: parseFloat(currentPriceObj.value?.price || props.product.discount_price),
      original_price: parseFloat(currentPriceObj.value?.unit_price || props.product.price),
      quantity: 1,
      stock: currentPriceObj.value?.stock ?? props.product.stock ?? 0,
      sku: currentPriceObj.value?.sku || props.product.sku,
      variant: [selectedColor.value, selectedSize.value].filter(Boolean).join(" / "),
      size: selectedSize.value,
      color: selectedColor.value,
      category: props.product.category,
      image: currentVariation.value?.variations_images?.[0]?.varietion_image_url || props.product.cover_image_url,
      image_url: currentVariation.value?.variations_images?.[0]?.varietion_image_url || props.product.cover_image_url
    }));
    const wishlistItem = computed(() => ({
      id: props.product.id,
      name: props.product.title,
      price: props.product.discount_price,
      quantity: 1,
      stock: props.product.stock ?? 0,
      sku: props.product.sku,
      category: props.product.category,
      image: props.product.cover_image_url,
      image_url: props.product.cover_image_url
    }));
    const isInCart = computed(() => cartStore.isInCart(cartItem.value));
    const isInWishlist = computed(() => wishlistStore.isInWishlist(wishlistItem.value));
    const handleAddToCart = () => {
      cartStore.addToCart(cartItem.value);
      isSelectionModalOpen.value = false;
    };
    const averageRating = computed(() => {
      const reviews = props.product?.reviews;
      if (!reviews || reviews.length === 0) return 0;
      const sum = reviews.reduce((acc, r) => acc + parseFloat(r.rating || 0), 0);
      return sum / reviews.length;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UModal = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative bg-white border border-gray-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full flex flex-col h-full" }, _attrs))}><div class="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 flex flex-col gap-1 sm:gap-2">`);
      if (__props.product.status == 1) {
        _push(`<span class="bg-primary text-black text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm"> New </span>`);
      } else {
        _push(`<!---->`);
      }
      if (discountPercentage.value > 0) {
        _push(`<span class="bg-red-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm"> -${ssrInterpolate(discountPercentage.value)}% </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 flex flex-col gap-1 sm:gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"><button class="${ssrRenderClass([isInWishlist.value ? "text-red-500" : "text-gray-700 hover:text-red-500 hover:bg-gray-50", "w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"])}"${ssrRenderAttr("title", isInWishlist.value ? "Remove from Wishlist" : "Add to Wishlist")}>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: isInWishlist.value ? "mdi:heart" : "mdi:heart-outline",
        class: "text-base sm:text-xl"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/Products/${__props.product.slug}`,
        class: "w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-primary hover:bg-gray-50 shadow-md transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:eye-outline",
              class: "text-base sm:text-xl"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: "mdi:eye-outline",
                class: "text-base sm:text-xl"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 cursor-pointer">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/Products/${__props.product.slug}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.product.cover_image_url)}${ssrRenderAttr("alt", __props.product.title)} class="${ssrRenderClass([{ "opacity-0": isHovered.value && __props.product.hover_image_url }, "absolute inset-0 w-full h-full object-cover transition-opacity duration-500"])}"${_scopeId}>`);
            if (__props.product.hover_image_url) {
              _push2(`<img${ssrRenderAttr("src", __props.product.hover_image_url)}${ssrRenderAttr("alt", __props.product.title)} class="${ssrRenderClass([{ "opacity-100": isHovered.value }, "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"])}"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("img", {
                src: __props.product.cover_image_url,
                alt: __props.product.title,
                class: ["absolute inset-0 w-full h-full object-cover transition-opacity duration-500", { "opacity-0": isHovered.value && __props.product.hover_image_url }]
              }, null, 10, ["src", "alt"]),
              __props.product.hover_image_url ? (openBlock(), createBlock("img", {
                key: 0,
                src: __props.product.hover_image_url,
                alt: __props.product.title,
                class: ["absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0", { "opacity-100": isHovered.value }]
              }, null, 10, ["src", "alt"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="absolute bottom-0 inset-x-0 p-2 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent"><button class="${ssrRenderClass([{ "bg-green-500 text-white": isInCart.value && !(__props.product.base_variations && __props.product.base_variations.length > 0) }, "w-full bg-white text-black font-bold py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-primary hover:text-black transition-colors shadow-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"])}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: isInCart.value ? "mdi:check-circle" : "mdi:cart-outline",
        class: "text-base sm:text-xl"
      }, null, _parent));
      _push(`<span class="hidden xs:inline sm:inline">${ssrInterpolate(isInCart.value && !(__props.product.base_variations && __props.product.base_variations.length > 0) ? "Added" : "Add to Cart")}</span><span class="xs:hidden sm:hidden">${ssrInterpolate(isInCart.value && !(__props.product.base_variations && __props.product.base_variations.length > 0) ? "Added" : "Add")}</span></button></div></div><div class="p-2 sm:p-3 md:p-5 flex flex-col flex-grow bg-white z-20"><div class="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2"><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(ssrRenderComponent(_component_Icon, {
          key: i,
          name: "mdi:star",
          class: ["text-xs sm:text-sm", i <= Math.round(averageRating.value) ? "text-yellow-400" : "text-gray-200"]
        }, null, _parent));
      });
      _push(`<!--]--><span class="text-[10px] sm:text-xs text-gray-400 ml-0.5 sm:ml-1">(${ssrInterpolate(__props.product?.reviews?.length || 0)})</span></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/Products/${__props.product.slug}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-bold text-gray-900 text-sm sm:text-base md:text-lg leading-tight mb-1 cursor-pointer hover:text-primary transition-colors line-clamp-2"${_scopeId}>${ssrInterpolate(__props.product.title)}</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-bold text-gray-900 text-sm sm:text-base md:text-lg leading-tight mb-1 cursor-pointer hover:text-primary transition-colors line-clamp-2" }, toDisplayString(__props.product.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 line-clamp-1">${ssrInterpolate(__props.product.category?.name)}</p><div class="mt-auto flex flex-col gap-2 sm:gap-3"><div class="flex items-center gap-1 sm:gap-2 flex-wrap"><span class="text-base sm:text-lg md:text-xl font-black text-gray-900">৳${ssrInterpolate(__props.product.discount_price)}</span>`);
      if (discountPercentage.value > 0) {
        _push(`<span class="text-xs sm:text-sm text-gray-400 line-through">৳${ssrInterpolate(__props.product.price)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        open: isSelectionModalOpen.value,
        "onUpdate:open": ($event) => isSelectionModalOpen.value = $event,
        title: "Select Options",
        description: "Choose your preferred color and size for this product."
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 sm:p-4"${_scopeId}><div class="flex gap-3 sm:gap-4 mb-4 sm:mb-6"${_scopeId}><img${ssrRenderAttr("src", currentVariation.value?.variations_images?.[0]?.varietion_image_url || __props.product.cover_image_url)} class="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl border border-gray-100 flex-shrink-0"${_scopeId}><div class="min-w-0"${_scopeId}><h3 class="font-bold text-gray-900 text-base sm:text-lg line-clamp-2 mb-1"${_scopeId}>${ssrInterpolate(__props.product.title)}</h3><div class="text-lg sm:text-xl font-black text-primary"${_scopeId}> ৳${ssrInterpolate(currentPriceObj.value?.price || __props.product.discount_price)}</div>`);
            if (currentPriceObj.value?.unit_price > currentPriceObj.value?.price) {
              _push2(`<div class="text-xs sm:text-sm text-gray-400 line-through"${_scopeId}> ৳${ssrInterpolate(currentPriceObj.value?.unit_price)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.product.base_variations && __props.product.base_variations.length) {
              _push2(`<div class="mb-5"${_scopeId}><h4 class="text-sm font-bold text-gray-700 uppercase mb-3"${_scopeId}> Select Color: </h4><div class="flex gap-3 flex-wrap"${_scopeId}><!--[-->`);
              ssrRenderList(__props.product.base_variations, (variation) => {
                _push2(`<button class="group flex flex-col items-center gap-1 focus:outline-none"${_scopeId}><span class="${ssrRenderClass([[
                  ["White", "Beige"].includes(variation.color.name) ? "border-gray-200" : "border-transparent",
                  selectedColor.value == variation.color.name ? "ring-2 ring-primary ring-offset-2 scale-110 shadow-lg" : "hover:scale-110 shadow-sm"
                ], "w-8 h-8 rounded-full border-2 transition-all duration-200"])}" style="${ssrRenderStyle({ backgroundColor: variation.color.hex_code })}"${_scopeId}></span><span class="${ssrRenderClass([{
                  "text-black !font-bold": selectedColor.value == variation.color.name
                }, "text-[10px] font-semibold text-gray-500 group-hover:text-black transition-colors"])}"${_scopeId}>${ssrInterpolate(variation.color.name)}</span></button>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (currentVariation.value?.prices && currentVariation.value.prices.length) {
              _push2(`<div class="mb-8"${_scopeId}><h4 class="text-sm font-bold text-gray-700 uppercase mb-3"${_scopeId}> Select Size: </h4><div class="flex gap-2 flex-wrap"${_scopeId}><!--[-->`);
              ssrRenderList(currentVariation.value.prices, (priceObj) => {
                _push2(`<button class="${ssrRenderClass([
                  selectedSize.value == priceObj.size.name ? "border-primary bg-primary text-black" : "border-gray-200 text-gray-600 hover:border-black hover:text-black hover:bg-gray-50",
                  "h-10 px-4 rounded-lg border-2 text-sm font-bold uppercase transition-all duration-200"
                ])}"${_scopeId}>${ssrInterpolate(priceObj.size.name)}</button>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="${ssrRenderClass([isInCart.value ? "border-green-500 bg-green-500 text-white hover:bg-green-600" : "border-black bg-black text-white hover:bg-primary hover:border-primary hover:text-black", "w-full font-bold py-3 sm:py-4 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide text-sm sm:text-base border-2"])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: isInCart.value ? "mdi:check-circle" : "mdi:cart",
              class: "text-lg sm:text-xl"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(isInCart.value ? "Added to Cart ✓" : "Confirm Add To Cart")}</button></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 sm:p-4" }, [
                createVNode("div", { class: "flex gap-3 sm:gap-4 mb-4 sm:mb-6" }, [
                  createVNode("img", {
                    src: currentVariation.value?.variations_images?.[0]?.varietion_image_url || __props.product.cover_image_url,
                    class: "w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl border border-gray-100 flex-shrink-0"
                  }, null, 8, ["src"]),
                  createVNode("div", { class: "min-w-0" }, [
                    createVNode("h3", { class: "font-bold text-gray-900 text-base sm:text-lg line-clamp-2 mb-1" }, toDisplayString(__props.product.title), 1),
                    createVNode("div", { class: "text-lg sm:text-xl font-black text-primary" }, " ৳" + toDisplayString(currentPriceObj.value?.price || __props.product.discount_price), 1),
                    currentPriceObj.value?.unit_price > currentPriceObj.value?.price ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-xs sm:text-sm text-gray-400 line-through"
                    }, " ৳" + toDisplayString(currentPriceObj.value?.unit_price), 1)) : createCommentVNode("", true)
                  ])
                ]),
                __props.product.base_variations && __props.product.base_variations.length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-5"
                }, [
                  createVNode("h4", { class: "text-sm font-bold text-gray-700 uppercase mb-3" }, " Select Color: "),
                  createVNode("div", { class: "flex gap-3 flex-wrap" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.product.base_variations, (variation) => {
                      return openBlock(), createBlock("button", {
                        key: variation.id,
                        onClick: ($event) => {
                          selectedColor.value = variation.color.name;
                          selectedSize.value = variation.prices?.[0]?.size?.name;
                        },
                        class: "group flex flex-col items-center gap-1 focus:outline-none"
                      }, [
                        createVNode("span", {
                          class: ["w-8 h-8 rounded-full border-2 transition-all duration-200", [
                            ["White", "Beige"].includes(variation.color.name) ? "border-gray-200" : "border-transparent",
                            selectedColor.value == variation.color.name ? "ring-2 ring-primary ring-offset-2 scale-110 shadow-lg" : "hover:scale-110 shadow-sm"
                          ]],
                          style: { backgroundColor: variation.color.hex_code }
                        }, null, 6),
                        createVNode("span", {
                          class: ["text-[10px] font-semibold text-gray-500 group-hover:text-black transition-colors", {
                            "text-black !font-bold": selectedColor.value == variation.color.name
                          }]
                        }, toDisplayString(variation.color.name), 3)
                      ], 8, ["onClick"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                currentVariation.value?.prices && currentVariation.value.prices.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mb-8"
                }, [
                  createVNode("h4", { class: "text-sm font-bold text-gray-700 uppercase mb-3" }, " Select Size: "),
                  createVNode("div", { class: "flex gap-2 flex-wrap" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(currentVariation.value.prices, (priceObj) => {
                      return openBlock(), createBlock("button", {
                        key: priceObj.id,
                        onClick: ($event) => selectedSize.value = priceObj.size.name,
                        class: [
                          "h-10 px-4 rounded-lg border-2 text-sm font-bold uppercase transition-all duration-200",
                          selectedSize.value == priceObj.size.name ? "border-primary bg-primary text-black" : "border-gray-200 text-gray-600 hover:border-black hover:text-black hover:bg-gray-50"
                        ]
                      }, toDisplayString(priceObj.size.name), 11, ["onClick"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                createVNode("button", {
                  onClick: handleAddToCart,
                  class: ["w-full font-bold py-3 sm:py-4 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide text-sm sm:text-base border-2", isInCart.value ? "border-green-500 bg-green-500 text-white hover:bg-green-600" : "border-black bg-black text-white hover:bg-primary hover:border-primary hover:text-black"]
                }, [
                  createVNode(_component_Icon, {
                    name: isInCart.value ? "mdi:check-circle" : "mdi:cart",
                    class: "text-lg sm:text-xl"
                  }, null, 8, ["name"]),
                  createTextVNode(" " + toDisplayString(isInCart.value ? "Added to Cart ✓" : "Confirm Add To Cart"), 1)
                ], 2)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "ProductCard" });
const _imports_0 = publicAssetsURL("/images/image.webp");
const itemsPerPage = 12;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({ title: "Products | Loomino" });
    const route = useRoute();
    const selectedCategory = ref(route.query.category || "All");
    const selectedSizes = ref([]);
    const selectedColors = ref([]);
    const maxPrice = ref(5e3);
    const searchQueryStr = computed(() => route.query.search || "");
    watch(() => route.query.category, (newCat) => {
      selectedCategory.value = newCat || "All";
    });
    const { data: categoriesData } = ([__temp, __restore] = withAsyncContext(() => useAPI("/frontend/v1/category")), __temp = await __temp, __restore(), __temp);
    const { data: productsData } = ([__temp, __restore] = withAsyncContext(() => useAPI(() => `/frontend/v1/product${searchQueryStr.value ? "?search=" + encodeURIComponent(searchQueryStr.value) : ""}`)), __temp = await __temp, __restore(), __temp);
    const { data: colorsData } = ([__temp, __restore] = withAsyncContext(() => useAPI("/frontend/v1/get-colors")), __temp = await __temp, __restore(), __temp);
    const { data: sizesData } = ([__temp, __restore] = withAsyncContext(() => useAPI("/frontend/v1/get-sizes")), __temp = await __temp, __restore(), __temp);
    const categoryList = computed(() => {
      const list = Array.isArray(categoriesData.value) ? categoriesData.value : categoriesData.value?.data || [];
      return [{ id: "all", name: "All", icon: "mdi:view-grid-outline" }, ...list];
    });
    const productList = computed(() => Array.isArray(productsData.value) ? productsData.value : productsData.value?.data || []);
    const colorList = computed(() => Array.isArray(colorsData.value) ? colorsData.value : colorsData.value?.data || []);
    const sizeList = computed(() => Array.isArray(sizesData.value) ? sizesData.value : sizesData.value?.data || []);
    const sortOption = ref("featured");
    const currentPage = ref(1);
    watch([selectedCategory, selectedSizes, selectedColors, maxPrice, sortOption], () => {
      currentPage.value = 1;
    }, { deep: true });
    const filteredProducts = computed(() => {
      let result = [...productList.value];
      if (selectedCategory.value !== "All") {
        result = result.filter((p) => (p.category?.name || p.category) === selectedCategory.value);
      }
      result = result.filter((p) => parseFloat(p.discount_price || p.price) <= maxPrice.value);
      if (selectedSizes.value.length > 0) {
        result = result.filter((p) => {
          return p.base_variations?.some(
            (v) => v.prices?.some((pr) => selectedSizes.value.includes(pr.size?.name || pr.size))
          );
        });
      }
      if (selectedColors.value.length > 0) {
        result = result.filter((p) => {
          return p.base_variations?.some((v) => selectedColors.value.includes(v.color?.name || v.color));
        });
      }
      if (sortOption.value === "price-low") {
        result.sort((a, b) => parseFloat(a.discount_price || a.price) - parseFloat(b.discount_price || b.price));
      } else if (sortOption.value === "price-high") {
        result.sort((a, b) => parseFloat(b.discount_price || b.price) - parseFloat(a.discount_price || a.price));
      } else if (sortOption.value === "newest") {
        result.sort((a, b) => a.status === b.status ? 0 : a.status === 1 ? -1 : 1);
      }
      return result;
    });
    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));
    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredProducts.value.slice(start, end);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_ProductCard = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white min-h-screen" }, _attrs))} data-v-4c4e3a39><div class="relative py-12 md:py-20 lg:py-28 border-b border-gray-100 overflow-hidden" data-v-4c4e3a39><img${ssrRenderAttr("src", _imports_0)} alt="Collections Banner" class="absolute inset-0 w-full h-full object-cover z-0" data-v-4c4e3a39><div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" data-v-4c4e3a39></div><div class="container mx-auto px-4 relative z-20 text-center md:text-left" data-v-4c4e3a39><h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight uppercase mb-4 drop-shadow-sm" data-v-4c4e3a39> Collections </h1><div class="w-24 h-1.5 bg-primary rounded-full mb-6 relative overflow-hidden md:mx-0 mx-auto shadow-md" data-v-4c4e3a39><div class="absolute inset-0 bg-white/50 animate-pulse" data-v-4c4e3a39></div></div><p class="text-gray-700 max-w-xl text-sm md:text-base lg:text-lg font-medium drop-shadow-sm bg-white/30 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/40" data-v-4c4e3a39> Discover our full collection of premium clothing and accessories filtered to your exact preferences. </p></div></div><div class="container mx-auto px-4 py-6 md:py-12" data-v-4c4e3a39><div class="flex flex-col lg:flex-row gap-6 md:gap-10" data-v-4c4e3a39><aside class="w-full lg:w-1/5 flex-shrink-0 space-y-8" data-v-4c4e3a39><div class="flex items-center justify-between pb-4 border-b border-gray-200" data-v-4c4e3a39><h2 class="text-lg font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2" data-v-4c4e3a39>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:filter-variant",
        class: "text-xl"
      }, null, _parent));
      _push(` Filters </h2><button class="text-sm font-semibold text-gray-500 hover:text-primary transition-colors" data-v-4c4e3a39> Clear All </button></div><div data-v-4c4e3a39><h3 class="font-bold text-gray-900 mb-4 px-1" data-v-4c4e3a39>Category</h3><ul class="space-y-2" data-v-4c4e3a39><!--[-->`);
      ssrRenderList(unref(categoryList), (cat) => {
        _push(`<li data-v-4c4e3a39><button class="${ssrRenderClass([unref(selectedCategory) == cat.name ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-black", "w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex justify-between items-center group"])}" data-v-4c4e3a39><span class="flex items-center gap-3" data-v-4c4e3a39>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: cat.icon || "mdi:tag-outline",
          class: "text-lg opacity-80"
        }, null, _parent));
        _push(` ${ssrInterpolate(cat.name)}</span>`);
        if (unref(selectedCategory) == cat.name) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:check",
            class: "text-primary"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</button></li>`);
      });
      _push(`<!--]--></ul></div><div data-v-4c4e3a39><h3 class="font-bold text-gray-900 mb-4 px-1" data-v-4c4e3a39>Price Range: up to ৳${ssrInterpolate(unref(maxPrice))}</h3><div class="px-2" data-v-4c4e3a39><input type="range"${ssrRenderAttr("value", unref(maxPrice))} min="0" max="5000" step="50" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" data-v-4c4e3a39><div class="flex justify-between text-xs text-gray-500 mt-2 font-medium" data-v-4c4e3a39><span data-v-4c4e3a39>৳0</span><span data-v-4c4e3a39>৳5000</span></div></div></div><div data-v-4c4e3a39><h3 class="font-bold text-gray-900 mb-4 px-1" data-v-4c4e3a39>Size</h3><div class="flex flex-wrap gap-2 px-1" data-v-4c4e3a39><!--[-->`);
      ssrRenderList(unref(sizeList), (size) => {
        _push(`<button class="${ssrRenderClass([unref(selectedSizes).includes(size.name) ? "border-primary bg-primary text-black shadow-md" : "border-gray-200 text-gray-600 hover:border-black hover:text-black hover:bg-gray-50", "min-w-[40px] h-10 px-3 rounded-lg border text-sm font-bold uppercase transition-all duration-200"])}" data-v-4c4e3a39>${ssrInterpolate(size.name)}</button>`);
      });
      _push(`<!--]--></div></div><div data-v-4c4e3a39><h3 class="font-bold text-gray-900 mb-4 px-1" data-v-4c4e3a39>Color</h3><div class="flex flex-wrap gap-3 px-1" data-v-4c4e3a39><!--[-->`);
      ssrRenderList(unref(colorList), (color) => {
        _push(`<button class="${ssrRenderClass([[
          ["White", "Beige"].includes(color.name) ? "border border-gray-300" : "border border-transparent",
          unref(selectedColors).includes(color.name) ? "ring-2 ring-primary ring-offset-2 scale-110 shadow-md" : "hover:scale-110 shadow-sm"
        ], "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"])}" style="${ssrRenderStyle({ backgroundColor: color.hex_code })}"${ssrRenderAttr("title", color.name)} data-v-4c4e3a39>`);
        if (unref(selectedColors).includes(color.name)) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:check",
            class: ["text-sm shadow-sm", ["White", "Yellow", "Beige"].includes(color.name) ? "text-black" : "text-white"]
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div></aside><main class="w-full lg:w-4/5" data-v-4c4e3a39><div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-gray-50 py-3 px-5 rounded-2xl border border-gray-100" data-v-4c4e3a39><p class="text-sm font-bold text-gray-700" data-v-4c4e3a39> Showing <span class="text-primary" data-v-4c4e3a39>${ssrInterpolate(unref(paginatedProducts).length)}</span> of <span class="text-black" data-v-4c4e3a39>${ssrInterpolate(unref(filteredProducts).length)}</span> Results </p><div class="flex items-center gap-3" data-v-4c4e3a39><span class="text-sm font-semibold text-gray-500" data-v-4c4e3a39>Sort by:</span><div class="relative" data-v-4c4e3a39><select class="appearance-none bg-white border border-gray-200 text-gray-800 text-sm font-semibold rounded-lg pl-4 pr-10 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer shadow-sm transition-all" data-v-4c4e3a39><option value="featured" data-v-4c4e3a39${ssrIncludeBooleanAttr(Array.isArray(unref(sortOption)) ? ssrLooseContain(unref(sortOption), "featured") : ssrLooseEqual(unref(sortOption), "featured")) ? " selected" : ""}>Featured / Recommended</option><option value="newest" data-v-4c4e3a39${ssrIncludeBooleanAttr(Array.isArray(unref(sortOption)) ? ssrLooseContain(unref(sortOption), "newest") : ssrLooseEqual(unref(sortOption), "newest")) ? " selected" : ""}>Newest Arrivals</option><option value="price-low" data-v-4c4e3a39${ssrIncludeBooleanAttr(Array.isArray(unref(sortOption)) ? ssrLooseContain(unref(sortOption), "price-low") : ssrLooseEqual(unref(sortOption), "price-low")) ? " selected" : ""}>Price: Low to High</option><option value="price-high" data-v-4c4e3a39${ssrIncludeBooleanAttr(Array.isArray(unref(sortOption)) ? ssrLooseContain(unref(sortOption), "price-high") : ssrLooseEqual(unref(sortOption), "price-high")) ? " selected" : ""}>Price: High to Low</option></select>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:chevron-down",
        class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
      }, null, _parent));
      _push(`</div></div></div>`);
      if (unref(paginatedProducts).length > 0) {
        _push(`<div class="flex flex-col gap-12" data-v-4c4e3a39><div class="grid grid-cols-2 xl:grid-cols-3 gap-6 relative" data-v-4c4e3a39><!--[-->`);
        ssrRenderList(unref(paginatedProducts), (product) => {
          _push(`<div class="h-full group" data-v-4c4e3a39>`);
          _push(ssrRenderComponent(_component_ProductCard, { product }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
        if (unref(totalPages) > 1) {
          _push(`<div class="flex items-center justify-center gap-2 mt-4 pb-12 block w-full z-10" data-v-4c4e3a39><button${ssrIncludeBooleanAttr(unref(currentPage) == 1) ? " disabled" : ""} class="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-200 text-gray-600 transition-all hover:border-black hover:text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" data-v-4c4e3a39>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:chevron-left",
            class: "text-xl"
          }, null, _parent));
          _push(`</button><!--[-->`);
          ssrRenderList(unref(totalPages), (page) => {
            _push(`<button class="${ssrRenderClass([unref(currentPage) == page ? "bg-primary text-black shadow-md border-2 border-primary" : "border-2 border-transparent text-gray-600 hover:bg-gray-100", "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300"])}" data-v-4c4e3a39>${ssrInterpolate(page)}</button>`);
          });
          _push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) == unref(totalPages)) ? " disabled" : ""} class="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-200 text-gray-600 transition-all hover:border-black hover:text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" data-v-4c4e3a39>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:chevron-right",
            class: "text-xl"
          }, null, _parent));
          _push(`</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300" data-v-4c4e3a39>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:emoticon-sad-outline",
          class: "text-6xl text-gray-300 mb-4"
        }, null, _parent));
        _push(`<h3 class="text-2xl font-bold text-gray-800 mb-2" data-v-4c4e3a39>No products found</h3><p class="text-gray-500 max-w-md mx-auto mb-6" data-v-4c4e3a39>We couldn&#39;t find any products matching your current filters. Try removing some filters or adjusting your price range.</p><button class="px-8 py-3 bg-primary text-black font-bold uppercase tracking-wider rounded-xl hover:bg-black hover:text-white transition-all shadow-md" data-v-4c4e3a39> Clear All Filters </button></div>`);
      }
      _push(`</main></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c4e3a39"]]);

export { index as default };
//# sourceMappingURL=index-Chcc27Rb.mjs.map
