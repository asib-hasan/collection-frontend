import { a as useRoute, u as useHead, _ as __nuxt_component_0$1 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_6, a as _imports_7, b as _imports_8, c as _imports_9, d as _imports_10, e as _imports_11, f as _imports_12, g as _imports_13 } from './virtual_public-NZNn13Xd.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
  setup(__props) {
    const route = useRoute();
    useHead({ title: `Product ${route.params.slug} | CCollection` });
    const images = [
      "/images/image12.webp",
      "/images/image13.webp",
      "/images/image14.webp",
      "/images/image15.webp"
    ];
    const mainImage = ref(images[0]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-page" }, _attrs))} data-v-dc562c21><div class="breadcrumb" data-v-dc562c21>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="sep" data-v-dc562c21>/</span>`);
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
      _push(`<span class="sep" data-v-dc562c21>/</span><span class="current" data-v-dc562c21>${ssrInterpolate(unref(route).params.slug)}</span></div><div class="product-split" data-v-dc562c21><div class="product-gallery" data-v-dc562c21><div class="thumbnails" data-v-dc562c21><!--[-->`);
      ssrRenderList(images, (img, idx) => {
        _push(`<div class="${ssrRenderClass([{ active: mainImage.value === img }, "thumb-item"])}" data-v-dc562c21><img${ssrRenderAttr("src", img)} alt="Thumbnail" data-v-dc562c21></div>`);
      });
      _push(`<!--]--></div><div class="main-image-viewer" data-v-dc562c21><img${ssrRenderAttr("src", mainImage.value)} alt="Main Gown View" class="fade-img" data-v-dc562c21></div></div><div class="product-info-wrapper" data-v-dc562c21><div class="product-info-sticky" data-v-dc562c21><span class="brand" data-v-dc562c21>Elizabeth K</span><h1 class="product-title" data-v-dc562c21>Off-Shoulder Dangling Bead Strap Cascading Ruffle Gown</h1><div class="product-price" data-v-dc562c21>$450.00</div><div class="product-meta-extra" data-v-dc562c21><p data-v-dc562c21><span data-v-dc562c21>SKU:</span> EW2026-${ssrInterpolate(unref(route).params.slug)}</p><p data-v-dc562c21><span data-v-dc562c21>Availability:</span> <strong style="${ssrRenderStyle({ "color": "#27ae60" })}" data-v-dc562c21>In Stock</strong> - Ships in 24 hrs</p></div><div class="divider" data-v-dc562c21></div><div class="attr-group" data-v-dc562c21><div class="attr-header" data-v-dc562c21><strong data-v-dc562c21>Color:</strong><span data-v-dc562c21>Champagne</span></div><div class="colors" data-v-dc562c21><button class="color-btn active" style="${ssrRenderStyle({ "background": "#f5dbe0" })}" aria-label="Blush Pink" data-v-dc562c21></button><button class="color-btn" style="${ssrRenderStyle({ "background": "#111" })}" aria-label="Black" data-v-dc562c21></button><button class="color-btn" style="${ssrRenderStyle({ "background": "#521727" })}" aria-label="Burgundy" data-v-dc562c21></button></div></div><div class="attr-group" data-v-dc562c21><div class="attr-header" data-v-dc562c21><strong data-v-dc562c21>Size:</strong><button class="size-guide" data-v-dc562c21>Size Guide</button></div><div class="size-grid" data-v-dc562c21><button class="size-btn" data-v-dc562c21>XXS</button><button class="size-btn" data-v-dc562c21>XS</button><button class="size-btn active" data-v-dc562c21>S</button><button class="size-btn" data-v-dc562c21>M</button><button class="size-btn disabled" data-v-dc562c21>L</button><button class="size-btn" data-v-dc562c21>XL</button></div></div><button class="btn-add" data-v-dc562c21>ADD TO BAG - $450.00</button><div class="delivery-info" data-v-dc562c21><p data-v-dc562c21>Free standard shipping on orders over $200</p><p data-v-dc562c21>Estimated Delivery: <strong data-v-dc562c21>3-5 Business Days</strong></p></div><div class="product-accordion" data-v-dc562c21><div class="accordion-item" data-v-dc562c21><div class="accordion-head" data-v-dc562c21><h3 data-v-dc562c21>DESCRIPTION</h3></div><div class="accordion-body" data-v-dc562c21><p data-v-dc562c21>Elevate your evening with this stunning off-shoulder gown. Featuring intricate dangling bead straps, a structured corset-style bodice, and cascading waist ruffles that blend into an elegant sweep train.</p><ul class="product-stats" data-v-dc562c21><li data-v-dc562c21><strong data-v-dc562c21>Style:</strong> ${ssrInterpolate(unref(route).params.slug)}</li><li data-v-dc562c21><strong data-v-dc562c21>Material:</strong> Premium Satin, Beaded Mesh</li><li data-v-dc562c21><strong data-v-dc562c21>Neckline:</strong> Sweetheart, Off-Shoulder</li><li data-v-dc562c21><strong data-v-dc562c21>Care:</strong> Dry Clean Only</li></ul></div></div></div></div></div></div><section class="related-products" data-v-dc562c21><div class="section-heading" data-v-dc562c21><h2 data-v-dc562c21>YOU MIGHT ALSO LIKE</h2><div class="heading-line" data-v-dc562c21></div></div><div class="product-grid" data-v-dc562c21>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/Products/GL3674",
        class: "product-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="product-img" data-v-dc562c21${_scopeId}><img${ssrRenderAttr("src", _imports_6)} alt="Gown" class="img-front" data-v-dc562c21${_scopeId}><img${ssrRenderAttr("src", _imports_7)} alt="Gown Hover" class="img-hover" data-v-dc562c21${_scopeId}><div class="quick-view" data-v-dc562c21${_scopeId}>VIEW DETAILS</div></div><div class="product-meta" data-v-dc562c21${_scopeId}><h4 class="name" data-v-dc562c21${_scopeId}>Ruffled Tulle Ball Gown</h4><span class="price" data-v-dc562c21${_scopeId}>$520.00</span></div>`);
          } else {
            return [
              createVNode("div", { class: "product-img" }, [
                createVNode("img", {
                  src: _imports_6,
                  alt: "Gown",
                  class: "img-front"
                }),
                createVNode("img", {
                  src: _imports_7,
                  alt: "Gown Hover",
                  class: "img-hover"
                }),
                createVNode("div", { class: "quick-view" }, "VIEW DETAILS")
              ]),
              createVNode("div", { class: "product-meta" }, [
                createVNode("h4", { class: "name" }, "Ruffled Tulle Ball Gown"),
                createVNode("span", { class: "price" }, "$520.00")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/Products/GL3675",
        class: "product-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="product-img" data-v-dc562c21${_scopeId}><img${ssrRenderAttr("src", _imports_8)} alt="Gown" class="img-front" data-v-dc562c21${_scopeId}><img${ssrRenderAttr("src", _imports_9)} alt="Gown Hover" class="img-hover" data-v-dc562c21${_scopeId}><div class="quick-view" data-v-dc562c21${_scopeId}>VIEW DETAILS</div></div><div class="product-meta" data-v-dc562c21${_scopeId}><h4 class="name" data-v-dc562c21${_scopeId}>Sequin Sweetheart Dress</h4><span class="price" data-v-dc562c21${_scopeId}>$390.00</span></div>`);
          } else {
            return [
              createVNode("div", { class: "product-img" }, [
                createVNode("img", {
                  src: _imports_8,
                  alt: "Gown",
                  class: "img-front"
                }),
                createVNode("img", {
                  src: _imports_9,
                  alt: "Gown Hover",
                  class: "img-hover"
                }),
                createVNode("div", { class: "quick-view" }, "VIEW DETAILS")
              ]),
              createVNode("div", { class: "product-meta" }, [
                createVNode("h4", { class: "name" }, "Sequin Sweetheart Dress"),
                createVNode("span", { class: "price" }, "$390.00")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/Products/GL3676",
        class: "product-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="product-img" data-v-dc562c21${_scopeId}><img${ssrRenderAttr("src", _imports_10)} alt="Gown" class="img-front" data-v-dc562c21${_scopeId}><img${ssrRenderAttr("src", _imports_11)} alt="Gown Hover" class="img-hover" data-v-dc562c21${_scopeId}><div class="quick-view" data-v-dc562c21${_scopeId}>VIEW DETAILS</div></div><div class="product-meta" data-v-dc562c21${_scopeId}><h4 class="name" data-v-dc562c21${_scopeId}>Long Sleeve Velvet Elegance</h4><span class="price" data-v-dc562c21${_scopeId}>$310.00</span></div>`);
          } else {
            return [
              createVNode("div", { class: "product-img" }, [
                createVNode("img", {
                  src: _imports_10,
                  alt: "Gown",
                  class: "img-front"
                }),
                createVNode("img", {
                  src: _imports_11,
                  alt: "Gown Hover",
                  class: "img-hover"
                }),
                createVNode("div", { class: "quick-view" }, "VIEW DETAILS")
              ]),
              createVNode("div", { class: "product-meta" }, [
                createVNode("h4", { class: "name" }, "Long Sleeve Velvet Elegance"),
                createVNode("span", { class: "price" }, "$310.00")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/Products/GL3677",
        class: "product-card hidden-mobile"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="product-img" data-v-dc562c21${_scopeId}><img${ssrRenderAttr("src", _imports_12)} alt="Gown" class="img-front" data-v-dc562c21${_scopeId}><img${ssrRenderAttr("src", _imports_13)} alt="Gown Hover" class="img-hover" data-v-dc562c21${_scopeId}><div class="quick-view" data-v-dc562c21${_scopeId}>VIEW DETAILS</div></div><div class="product-meta" data-v-dc562c21${_scopeId}><h4 class="name" data-v-dc562c21${_scopeId}>Floral Applique A-Line</h4><span class="price" data-v-dc562c21${_scopeId}>$480.00</span></div>`);
          } else {
            return [
              createVNode("div", { class: "product-img" }, [
                createVNode("img", {
                  src: _imports_12,
                  alt: "Gown",
                  class: "img-front"
                }),
                createVNode("img", {
                  src: _imports_13,
                  alt: "Gown Hover",
                  class: "img-hover"
                }),
                createVNode("div", { class: "quick-view" }, "VIEW DETAILS")
              ]),
              createVNode("div", { class: "product-meta" }, [
                createVNode("h4", { class: "name" }, "Floral Applique A-Line"),
                createVNode("span", { class: "price" }, "$480.00")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Products/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dc562c21"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-BUkXy_md.mjs.map
