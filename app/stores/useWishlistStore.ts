// stores/wishlist.ts
import { defineStore } from "pinia";

interface Product {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  sku?: string;
  variant?: string;
  size?: string;
  category?: string;
  image?: string;
  image_url?: string;
}

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: [] as Product[],
  }),

  actions: {
    initWishlist() {
      if (import.meta.client) {
        const storedWishlist = localStorage.getItem("wishlist");
        if (storedWishlist) {
          try {
            const parsedWishlist = JSON.parse(storedWishlist);
            this.wishlist = parsedWishlist.map((item: Product) => ({
              ...item,
              quantity: Number(item.quantity) || 1,
              price: Number(item.price) || 0,
              stock: Number(item.stock) || 0,
            }));
          } catch {
            this.wishlist = [];
          }
        }
      }
    },

    saveWishlist() {
      if (import.meta.client) {
        localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
      }
    },

    getProductIdentifier(product: Product): string {
      return product.sku
        ? `${product.sku}-${product.variant ?? ""}`
        : String(product.id);
    },

    addToWishlist(product: Product) {
      const productIdentifier = this.getProductIdentifier(product);
      const exists = this.wishlist.some(item =>
        this.getProductIdentifier(item) === productIdentifier
      );

      if (!exists) {
        this.wishlist.push({ ...product });
        this.saveWishlist();
        useToast().add({
          title: "Added to Wishlist",
          description: product.name,
          color: "primary",
          icon: "i-heroicons-heart",
          actions: [
            {
              label: "View Wishlist",
              color: "primary",
              variant: "outline",
              onClick: () => { navigateTo("/wishlist"); },
            },
          ],
        });
      } else {
        useToast().add({
          title: "Already in Wishlist",
          description: product.name,
          color: "info",
          icon: "i-heroicons-information-circle",
        });
      }
    },

    removeFromWishlist(item: Product) {
      const productIdentifier = this.getProductIdentifier(item);
      const index = this.wishlist.findIndex(w =>
        this.getProductIdentifier(w) === productIdentifier
      );
      if (index > -1) {
        const removed = this.wishlist[index]!;
        this.wishlist.splice(index, 1);
        this.saveWishlist();
        useToast().add({
          title: "Removed from Wishlist",
          description: removed.name,
          color: "warning",
          icon: "i-heroicons-trash",
        });
      }
    },

    moveToCart(item: Product, cartStore: any) {
      const productIdentifier = this.getProductIdentifier(item);
      const index = this.wishlist.findIndex(w =>
        this.getProductIdentifier(w) === productIdentifier
      );
      if (index > -1) {
        const moved = this.wishlist[index]!;
        this.wishlist.splice(index, 1);
        this.saveWishlist();
        cartStore.addToCart(moved);
        useToast().add({
          title: "Moved to Cart",
          description: `${moved.name} was moved from your wishlist`,
          color: "primary",
          icon: "i-heroicons-check-circle",
          actions: [
            {
              label: "Go to Cart",
              color: "primary",
              variant: "outline",
              onClick: () => { navigateTo("/cart"); },
            },
          ],
        });
      }
    },

    toggleWishlist(product: Product) {
      const productIdentifier = this.getProductIdentifier(product);
      const exists = this.wishlist.some(item =>
        this.getProductIdentifier(item) === productIdentifier
      );
      if (exists) {
        this.removeFromWishlist(product);
      } else {
        this.addToWishlist(product);
      }
    },

    clearWishlist() {
      this.wishlist = [];
      localStorage.removeItem("wishlist");
      useToast().add({
        title: "Wishlist Cleared",
        color: "error",
        icon: "i-heroicons-x-circle",
      });
    },
  },

  getters: {
    wishlistCount: (state) => state.wishlist.length,

    isInWishlist: (state) => {
      return (product: Product) => {
        const store = useWishlistStore();
        const productIdentifier = store.getProductIdentifier(product);
        return state.wishlist.some(item =>
          store.getProductIdentifier(item) === productIdentifier
        );
      };
    },

    getWishlistItems: (state) => state.wishlist,
  },
});