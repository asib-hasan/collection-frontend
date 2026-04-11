import { o as useAuthStore, g as useCartStore, h as useWishlistStore, p as useState, k as useAPI, _ as __nuxt_component_0$1$1, j as __nuxt_component_1$1, q as __nuxt_component_2$1, l as useNuxtApp, i as useToast } from './server.mjs';
import { useSSRContext, defineComponent, computed, ref, withAsyncContext, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as __nuxt_component_1$2, a as _imports_0 } from './MobileHeader-1jqlfrZB.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NavBar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const settings = useState("config");
    const isLoggedIn = computed(() => authStore.getStatus);
    const cartCount = computed(() => cartStore.cartCount);
    const wishlistCount = computed(() => wishlistStore.wishlistCount);
    const isSearchOpen = ref(false);
    const searchQuery = ref("");
    const toggleSearch = () => {
      isSearchOpen.value = !isSearchOpen.value;
      if (!isSearchOpen.value) searchQuery.value = "";
    };
    const { data: productsData, pending: searchPending } = ([__temp, __restore] = withAsyncContext(() => useAPI(() => `/frontend/v1/product${searchQuery.value ? "?search=" + encodeURIComponent(searchQuery.value) : ""}`, { lazy: true })), __temp = await __temp, __restore(), __temp);
    const { data: categoriesData } = ([__temp, __restore] = withAsyncContext(() => useAPI("/frontend/v1/category")), __temp = await __temp, __restore(), __temp);
    const { data: menuBanners } = ([__temp, __restore] = withAsyncContext(() => useAPI("/frontend/v1/get-menu-Banner")), __temp = await __temp, __restore(), __temp);
    const banner = computed(() => menuBanners.value?.[0] || null);
    const searchResultsList = computed(() => {
      if (!productsData.value) return [];
      return Array.isArray(productsData.value) ? productsData.value : productsData.value?.data || [];
    });
    const navCategories = computed(() => {
      if (!categoriesData.value) return [];
      return Array.isArray(categoriesData.value) ? categoriesData.value : categoriesData.value?.data || [];
    });
    ref([]);
    const navLinks = [
      { to: "/", label: "Home", icon: "mdi:home-outline" },
      { to: "/products", label: "Products", icon: "mdi:shopping-outline", hasMegaMenu: true },
      { to: "/blog", label: "Blog", icon: "mdi:newspaper-variant-outline" },
      { to: "/about", label: "About", icon: "mdi:information-outline" },
      { to: "/contact", label: "Contact", icon: "mdi:headset" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1$1;
      const _component_Icon = __nuxt_component_1$1;
      const _component_ClientOnly = __nuxt_component_2$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "navbar-wrapper hidden lg:block relative" }, _attrs))} data-v-744a4585><div class="bg-white shadow-[0_2px_12px_rgba(19,161,253,0.08)] relative z-[60]" data-v-744a4585><div class="container mx-auto px-4" data-v-744a4585><div class="flex items-center justify-between h-20 gap-8" data-v-744a4585>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex-shrink-0 flex items-center transition-transform duration-200 hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(settings)?.logo_dark)} alt="Loomino" class="h-14 w-auto object-contain rounded-lg" data-v-744a4585${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: unref(settings)?.logo_dark,
                alt: "Loomino",
                class: "h-14 w-auto object-contain rounded-lg"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex-1 flex items-center justify-center gap-1" data-v-744a4585><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(`<div class="relative group" data-v-744a4585>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.to,
          class: ["flex items-center px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 rounded-full relative hover:bg-primary/5 hover:text-secondary [&.nav-link-active]:bg-primary/10 [&.nav-link-active]:text-primary group/link", { "nav-link-active": _ctx.$route.path == link.to || _ctx.$route.path.startsWith(link.to) && link.to !== "/" }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: link.icon,
                class: "text-lg mr-1.5"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(link.label)} `);
              if (link.hasMegaMenu) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "mdi:chevron-down",
                  class: "text-lg ml-0.5 transition-transform duration-300 group-hover:rotate-180"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-250 rounded-full group-hover/link:w-[40%] group-[.nav-link-active]/link:w-[40%]" data-v-744a4585${_scopeId}></span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: link.icon,
                  class: "text-lg mr-1.5"
                }, null, 8, ["name"]),
                createTextVNode(" " + toDisplayString(link.label) + " ", 1),
                link.hasMegaMenu ? (openBlock(), createBlock(_component_Icon, {
                  key: 0,
                  name: "mdi:chevron-down",
                  class: "text-lg ml-0.5 transition-transform duration-300 group-hover:rotate-180"
                })) : createCommentVNode("", true),
                createVNode("span", { class: "absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-250 rounded-full group-hover/link:w-[40%] group-[.nav-link-active]/link:w-[40%]" })
              ];
            }
          }),
          _: 2
        }, _parent));
        if (link.hasMegaMenu) {
          _push(`<div class="absolute top-full left-1/2 -translate-x-1/3 pt-5 w-[950px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto" data-v-744a4585><div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-8 grid grid-cols-12 gap-8 relative overflow-hidden transform origin-top translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" data-v-744a4585><div class="col-span-5" data-v-744a4585><h3 class="flex items-center gap-2 text-sm font-bold text-gray-900 mb-6" data-v-744a4585>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:shape-outline",
            class: "text-primary text-xl"
          }, null, _parent));
          _push(` Categories </h3><ul class="grid grid-cols-2 gap-x-4 gap-y-2" data-v-744a4585><!--[-->`);
          ssrRenderList(unref(navCategories).slice(0, 10), (cat) => {
            _push(`<li data-v-744a4585>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/products?category=${encodeURIComponent(cat.name)}`,
              class: "group/link flex items-center justify-between px-3 py-1 rounded-xl text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-300"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center gap-3" data-v-744a4585${_scopeId}><div class="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-400 group-hover/link:bg-white group-hover/link:text-primary group-hover/link:shadow-sm transition-all duration-300 transform group-hover/link:scale-105" data-v-744a4585${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: cat.icon || "mdi:tag-outline",
                    class: "text-[17px]"
                  }, null, _parent2, _scopeId));
                  _push2(`</div><span class="text-sm font-semibold" data-v-744a4585${_scopeId}>${ssrInterpolate(cat.name)}</span></div>`);
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: "mdi:arrow-right",
                    class: "text-sm opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300"
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-400 group-hover/link:bg-white group-hover/link:text-primary group-hover/link:shadow-sm transition-all duration-300 transform group-hover/link:scale-105" }, [
                        createVNode(_component_Icon, {
                          name: cat.icon || "mdi:tag-outline",
                          class: "text-[17px]"
                        }, null, 8, ["name"])
                      ]),
                      createVNode("span", { class: "text-sm font-semibold" }, toDisplayString(cat.name), 1)
                    ]),
                    createVNode(_component_Icon, {
                      name: "mdi:arrow-right",
                      class: "text-sm opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul></div>`);
          if (unref(banner)) {
            _push(`<div class="col-span-7 relative rounded-2xl overflow-hidden group/promo shadow-lg h-[320px]" data-v-744a4585><img${ssrRenderAttr("src", unref(banner).banner_image_url || "/images/hero2.png")} alt="Promo" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover/promo:scale-110" data-v-744a4585><div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" data-v-744a4585></div><div class="absolute inset-0 p-8 flex flex-col justify-center" data-v-744a4585><div class="transform translate-y-4 group-hover/promo:translate-y-0 transition-transform duration-500 ease-out" data-v-744a4585><div class="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 w-max" data-v-744a4585><span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" data-v-744a4585></span> New Season </div><h4 class="text-white font-extrabold text-3xl mb-2 drop-shadow-md leading-tight" data-v-744a4585>${ssrInterpolate(unref(banner).title)}</h4><p class="text-white/80 text-sm mb-6 max-w-[90%] leading-relaxed font-medium" data-v-744a4585>${ssrInterpolate(unref(banner).subtitle)}</p>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/products",
              class: "inline-flex items-center gap-1.5 bg-primary text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors duration-300 w-max shadow-lg"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Shop Now `);
                  _push2(ssrRenderComponent(_component_Icon, {
                    name: "mdi:arrow-right",
                    class: "text-lg"
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createTextVNode(" Shop Now "),
                    createVNode(_component_Icon, {
                      name: "mdi:arrow-right",
                      class: "text-lg"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></nav><div class="flex items-center gap-3" data-v-744a4585><button class="flex items-center justify-center w-11 h-11 rounded-full bg-white text-gray-700 border border-gray-200 cursor-pointer transition-all duration-200 hover:text-primary hover:border-primary hover:bg-primary/5 hover:-translate-y-[1px] hover:shadow-lg relative" title="Search" data-v-744a4585>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(isSearchOpen) ? "mdi:close" : "mdi:magnify",
        class: "text-2xl"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/wishlist",
        class: "flex items-center justify-center w-11 h-11 rounded-full bg-white text-gray-700 border border-gray-200 cursor-pointer transition-all duration-200 hover:text-primary hover:border-primary hover:bg-primary/5 hover:-translate-y-[1px] hover:shadow-lg relative",
        title: "Wishlist"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:heart-outline",
              class: "text-2xl"
            }, null, _parent2, _scopeId));
            if (unref(wishlistCount) > 0) {
              _push2(`<span class="absolute -top-1 -right-1 bg-red-500 text-white text-[0.65rem] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 border-2 border-white leading-none shadow-sm" data-v-744a4585${_scopeId}>${ssrInterpolate(unref(wishlistCount) > 9 ? "9+" : unref(wishlistCount))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_Icon, {
                name: "mdi:heart-outline",
                class: "text-2xl"
              }),
              unref(wishlistCount) > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute -top-1 -right-1 bg-red-500 text-white text-[0.65rem] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 border-2 border-white leading-none shadow-sm"
              }, toDisplayString(unref(wishlistCount) > 9 ? "9+" : unref(wishlistCount)), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cart",
        class: "flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-black rounded-full font-bold transition-all duration-300 relative shadow-md hover:-translate-y-[2px] hover:shadow-xl hover:opacity-95",
        title: "Cart"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "mdi:cart-outline",
              class: "text-2xl"
            }, null, _parent2, _scopeId));
            if (unref(cartCount) > 0) {
              _push2(`<span class="absolute -top-1 -right-1 bg-red-500 text-white text-[0.65rem] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 border-2 border-white leading-none shadow-sm" data-v-744a4585${_scopeId}>${ssrInterpolate(unref(cartCount) > 9 ? "9+" : unref(cartCount))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_Icon, {
                name: "mdi:cart-outline",
                class: "text-2xl"
              }),
              unref(cartCount) > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute -top-1 -right-1 bg-red-500 text-white text-[0.65rem] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 border-2 border-white leading-none shadow-sm"
              }, toDisplayString(unref(cartCount) > 9 ? "9+" : unref(cartCount)), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(isLoggedIn)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: "flex items-center gap-2 px-5 py-2.5 border-2 border-gray-100 rounded-full text-gray-700 font-bold transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/5",
          title: "My Account"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:account-circle-outline",
                class: "text-2xl"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm" data-v-744a4585${_scopeId}>${ssrInterpolate(unref(authStore)?.user?.name?.split(" ").slice(0, 2).join(" "))}</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "mdi:account-circle-outline",
                  class: "text-2xl"
                }),
                createVNode("span", { class: "text-sm" }, toDisplayString(unref(authStore)?.user?.name?.split(" ").slice(0, 2).join(" ")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "flex items-center gap-2 px-5 py-2.5 border-2 border-primary/20 rounded-full text-gray-800 font-bold transition-all duration-200 hover:bg-primary hover:border-primary hover:shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "mdi:login",
                class: "text-xl"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm" data-v-744a4585${_scopeId}>Login</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "mdi:login",
                  class: "text-xl"
                }),
                createVNode("span", { class: "text-sm" }, "Login")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></div></div>`);
      if (unref(isSearchOpen)) {
        _push(`<div class="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-black/10 shadow-xl z-50" data-v-744a4585><div class="container mx-auto px-4 py-6" data-v-744a4585><div class="container mx-auto" data-v-744a4585><div class="relative group" data-v-744a4585>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mdi:magnify",
          class: "absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 group-focus-within:text-primary transition-colors"
        }, null, _parent));
        _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="What are you looking for today?" class="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl py-4 pl-16 pr-32 text-lg text-gray-800 outline-none transition-all shadow-inner" data-v-744a4585><button class="absolute right-3 top-1/2 -translate-y-1/2 bg-primary px-6 py-2.5 rounded-xl font-bold text-black hover:opacity-90 transition-opacity" data-v-744a4585> Search </button></div>`);
        if (unref(searchQuery) && !unref(searchPending) && unref(searchResultsList).length) {
          _push(`<div class="mt-8 border-t border-gray-100 pt-6" data-v-744a4585><div class="flex items-center justify-between mb-6" data-v-744a4585><h3 class="text-sm font-bold text-gray-900 flex items-center gap-2" data-v-744a4585>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:lightning-bolt",
            class: "text-primary text-lg"
          }, null, _parent));
          _push(` Instant Results </h3><button class="text-xs font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-1" data-v-744a4585> View All `);
          _push(ssrRenderComponent(_component_Icon, { name: "mdi:arrow-right" }, null, _parent));
          _push(`</button></div><div class="grid grid-cols-2 md:grid-cols-5 gap-4" data-v-744a4585><!--[-->`);
          ssrRenderList(unref(searchResultsList).slice(0, 5), (product) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: product.id,
              to: `/product/${product.slug}`,
              class: "group flex flex-col gap-3 p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all duration-300",
              onClick: toggleSearch
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 relative" data-v-744a4585${_scopeId}><img${ssrRenderAttr("src", product?.cover_image_url || "/images/hero1.webp")} alt="Product" class="w-[400px] h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-v-744a4585${_scopeId}></div><div class="flex flex-col flex-1" data-v-744a4585${_scopeId}><h4 class="text-xs font-bold text-gray-800 line-clamp-2 leading-relaxed group-hover:text-primary transition-colors" data-v-744a4585${_scopeId}>${ssrInterpolate(product.title)}</h4><div class="flex items-center gap-2 mt-auto pt-2" data-v-744a4585${_scopeId}><span class="text-sm font-black text-black" data-v-744a4585${_scopeId}>৳${ssrInterpolate(product.discount_price || product.price)}</span>`);
                  if (product.discount_price && product.discount_price !== product.price) {
                    _push2(`<span class="text-[10px] text-gray-400 line-through font-semibold" data-v-744a4585${_scopeId}>৳${ssrInterpolate(product.price)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 relative" }, [
                      createVNode("img", {
                        src: product?.cover_image_url || "/images/hero1.webp",
                        alt: "Product",
                        class: "w-[400px] h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "flex flex-col flex-1" }, [
                      createVNode("h4", { class: "text-xs font-bold text-gray-800 line-clamp-2 leading-relaxed group-hover:text-primary transition-colors" }, toDisplayString(product.title), 1),
                      createVNode("div", { class: "flex items-center gap-2 mt-auto pt-2" }, [
                        createVNode("span", { class: "text-sm font-black text-black" }, "৳" + toDisplayString(product.discount_price || product.price), 1),
                        product.discount_price && product.discount_price !== product.price ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-[10px] text-gray-400 line-through font-semibold"
                        }, "৳" + toDisplayString(product.price), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else if (unref(searchQuery) && !unref(searchPending) && unref(searchResultsList).length == 0) {
          _push(`<div class="mt-8 border-t border-gray-100 pt-10 pb-4 text-center" data-v-744a4585>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:text-box-search-outline",
            class: "text-4xl text-gray-300 mb-3"
          }, null, _parent));
          _push(`<p class="text-sm font-medium text-gray-500" data-v-744a4585>No products found for &quot;<span class="text-black font-bold" data-v-744a4585>${ssrInterpolate(unref(searchQuery))}</span>&quot;</p></div>`);
        } else if (unref(searchPending) && unref(searchQuery)) {
          _push(`<div class="mt-8 border-t border-gray-100 pt-10 pb-4 text-center" data-v-744a4585>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "mdi:loading",
            class: "text-3xl text-primary animate-spin mb-3"
          }, null, _parent));
          _push(`<p class="text-sm font-medium text-gray-500" data-v-744a4585>Searching...</p></div>`);
        } else {
          _push(`<div class="mt-4" data-v-744a4585>`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
          _push(`</div>`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-744a4585"]]), { __name: "NavBar" });
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NavBar = __nuxt_component_0$1;
  const _component_MobileHeader = __nuxt_component_1$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "header-container" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_NavBar, { class: "hidden lg:block" }, null, _parent));
  _push(ssrRenderComponent(_component_MobileHeader, { class: "lg:hidden" }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "Header" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const settings = useState("config");
    const { $api } = useNuxtApp();
    useToast();
    const socialLinks = computed(() => {
      const links = [];
      if (settings.value?.facebook_link) links.push({ name: "Facebook", icon: "line-md:facebook", url: settings.value.facebook_link });
      if (settings.value?.instagram_link) links.push({ name: "Instagram", icon: "line-md:instagram", url: settings.value.instagram_link });
      if (settings.value?.twitter_link) links.push({ name: "Twitter", icon: "line-md:twitter-x", url: settings.value.twitter_link });
      if (settings.value?.youtube_link) links.push({ name: "YouTube", icon: "line-md:youtube", url: settings.value.youtube_link });
      if (links.length === 0) {
        return [
          { name: "Facebook", icon: "line-md:facebook", url: "#" },
          { name: "Instagram", icon: "line-md:instagram", url: "#" },
          { name: "Twitter", icon: "line-md:twitter-x", url: "#" },
          { name: "YouTube", icon: "line-md:youtube", url: "#" }
        ];
      }
      return links;
    });
    const form = ref({
      email: ""
    });
    const loading = ref(false);
    const payments = [
      { label: "Visa", icon: "mdi:credit-card-outline" },
      { label: "Mastercard", icon: "mdi:credit-card-chip-outline" },
      { label: "COD", icon: "mdi:cash-fast" },
      { label: "Bank", icon: "mdi:bank-outline" }
    ];
    const trusts = [
      { label: "Secure Checkout", icon: "mdi:shield-check-outline" },
      { label: "Fast Delivery", icon: "mdi:truck-fast-outline" },
      { label: "Easy Returns", icon: "mdi:refresh" }
    ];
    const legalLinks = computed(() => [
      { label: "Privacy Policy", to: settings.value?.privacyPolicy_link || "/privacy" },
      { label: "Terms of Service", to: settings.value?.termsandcondition_link || "/terms" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1$1;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-primary/15 text-slate-800 transition-colors duration-300" }, _attrs))} data-v-763026f9><div class="border-b border-black/5" data-v-763026f9><div class="container mx-auto px-4 py-8 md:py-16" data-v-763026f9><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12" data-v-763026f9><div class="space-y-6" data-v-763026f9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-block transition-transform hover:scale-105 duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="Loomino" class="h-14 w-auto object-contain rounded-xl shadow-sm" data-v-763026f9${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "Loomino",
                class: "h-14 w-auto object-contain rounded-xl shadow-sm"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-slate-600 leading-relaxed text-sm md:text-base max-w-xs" data-v-763026f9> Your premium destination for fashion, lifestyle &amp; trending products. Shop smart, live stylish with Loomino. </p><div class="flex items-center gap-3" data-v-763026f9><!--[-->`);
      ssrRenderList(unref(socialLinks), (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} target="_blank" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 border border-black/5 hover:bg-primary hover:text-black hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-sm"${ssrRenderAttr("title", social.name)} data-v-763026f9>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: social.icon,
          class: "text-xl"
        }, null, _parent));
        _push(`</a>`);
      });
      _push(`<!--]--></div></div><!--[-->`);
      ssrRenderList(unref(settings)?.footer_columns, (column) => {
        _push(`<div class="space-y-6" data-v-763026f9><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 border-l-4 border-primary pl-3" data-v-763026f9>${ssrInterpolate(column.title)}</h3><ul class="space-y-3" data-v-763026f9><!--[-->`);
        ssrRenderList(column.pages, (link) => {
          _push(`<li data-v-763026f9>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/${link.slug}`,
            class: "text-slate-600 hover:text-primary hover:translate-x-1 flex items-center group transition-all duration-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "mdi:chevron-right",
                  class: "text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-sm font-medium" data-v-763026f9${_scopeId}>${ssrInterpolate(link.title)}</span>`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "mdi:chevron-right",
                    class: "text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                  }),
                  createVNode("span", { class: "text-sm font-medium" }, toDisplayString(link.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--><div class="space-y-6" data-v-763026f9><h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 border-l-4 border-primary pl-3" data-v-763026f9> Stay Connected </h3><div class="space-y-4" data-v-763026f9><div class="flex items-center gap-3 text-slate-600" data-v-763026f9><div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm border border-black/5" data-v-763026f9>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:map-marker-outline",
        class: "text-lg"
      }, null, _parent));
      _push(`</div><span class="text-sm font-medium" data-v-763026f9>${ssrInterpolate(unref(settings)?.address)}</span></div><div class="flex items-center gap-3 text-slate-600" data-v-763026f9><div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm border border-black/5" data-v-763026f9>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:phone-outline",
        class: "text-lg"
      }, null, _parent));
      _push(`</div><a href="tel:+8801234567890" class="text-sm font-medium hover:text-primary transition-colors" data-v-763026f9>${ssrInterpolate(unref(settings)?.hotline_number)}</a></div></div><div class="p-5 bg-white/50 backdrop-blur-sm rounded-2xl border border-black/5 shadow-inner" data-v-763026f9><h4 class="text-sm font-bold text-slate-800 mb-2" data-v-763026f9>Newsletter</h4><p class="text-xs text-slate-500 mb-4" data-v-763026f9> Get exclusive deals and updates. </p><div class="flex gap-2" data-v-763026f9><input type="email" placeholder="Email address"${ssrRenderAttr("value", unref(form).email)} class="flex-1 bg-white border border-black/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-primary transition-colors shadow-sm" data-v-763026f9><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="bg-primary hover:opacity-90 text-black px-3 rounded-xl transition-all shadow-md active:scale-95" data-v-763026f9>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:send",
        class: "text-lg"
      }, null, _parent));
      _push(`</button></div></div></div></div></div></div><div class="bg-white/30 backdrop-blur-sm border-b border-black/5" data-v-763026f9><div class="container mx-auto px-4 py-6" data-v-763026f9><div class="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6" data-v-763026f9><div class="flex items-center gap-2 sm:gap-4 flex-wrap justify-center" data-v-763026f9><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest" data-v-763026f9>We Accept</span><!--[-->`);
      ssrRenderList(payments, (payment) => {
        _push(`<div class="px-3 py-1.5 bg-white rounded-lg border border-black/5 shadow-sm flex items-center gap-2 hover:border-primary transition-colors cursor-default" data-v-763026f9>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: payment.icon,
          class: "text-lg text-slate-600"
        }, null, _parent));
        _push(`<span class="text-[10px] font-bold text-slate-500 uppercase" data-v-763026f9>${ssrInterpolate(payment.label)}</span></div>`);
      });
      _push(`<!--]--></div><div class="flex items-center gap-3 sm:gap-6 flex-wrap justify-center" data-v-763026f9><!--[-->`);
      ssrRenderList(trusts, (trust) => {
        _push(`<div class="flex items-center gap-2 text-slate-500" data-v-763026f9>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: trust.icon,
          class: "text-lg text-primary"
        }, null, _parent));
        _push(`<span class="text-[10px] font-bold tracking-wide uppercase" data-v-763026f9>${ssrInterpolate(trust.label)}</span></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="container mx-auto px-4 py-6" data-v-763026f9><div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-slate-500" data-v-763026f9><p data-v-763026f9> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} <span class="text-slate-800 font-bold" data-v-763026f9>Loomino</span>. All rights reserved. </p><div class="flex items-center gap-6" data-v-763026f9><!--[-->`);
      ssrRenderList(unref(legalLinks), (legal) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: legal.to,
          to: legal.to,
          class: "hover:text-primary transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(legal.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(legal.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><p data-v-763026f9> Developed by <a href="https://creativetechpark.com/" target="_blank" class="text-slate-800 font-bold" data-v-763026f9>Creative Tech Park</a>. </p></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-763026f9"]]), { __name: "Footer" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Header = __nuxt_component_0;
  const _component_Footer = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full relative" }, _attrs))}><header>`);
  _push(ssrRenderComponent(_component_Header, null, null, _parent));
  _push(`</header><main class="pt-16 lg:pt-0">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main><footer>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`</footer></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/guest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const guest = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { guest as default };
//# sourceMappingURL=guest-DWRuIPWw.mjs.map
