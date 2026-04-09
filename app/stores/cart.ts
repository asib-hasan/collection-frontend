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
  color?: string;
  category?: string;
  image?: string;
  image_url?: string;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as Product[],
  }),

  actions: {
    initCart() {
      if (import.meta.client) {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          try {
            const parsedCart = JSON.parse(storedCart);
            this.cart = parsedCart.map((item: Product) => ({
              ...item,
              quantity: Number(item.quantity) || 1,
              price: Number(item.price) || 0,
              stock: Number(item.stock) || 0,
            }));
          } catch {
            this.cart = [];
          }
        }
      }
    },

    saveCart() {
      if (import.meta.client) {
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },

    getProductIdentifier(product: Product): string {
      return product.sku
        ? `${product.sku}-${product.variant ?? ""}`
        : String(product.id);
    },

    addToCart(product: Product) {
      const productIdentifier = this.getProductIdentifier(product);

      const existingItem = this.cart.find(
        (item) => this.getProductIdentifier(item) === productIdentifier,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        this.saveCart();
        useToast().add({
          title: "Cart Updated",
          description: `${product.name} quantity increased`,
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
      } else {
        this.cart.push({ ...product, quantity: 1 });
        this.saveCart();
        useToast().add({
          title: "Added to Cart",
          description: `${product.name} added to cart!`,
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

    removeFromCart(item: Product) {
      const productIdentifier = this.getProductIdentifier(item);
      const index = this.cart.findIndex(
        (i) => this.getProductIdentifier(i) === productIdentifier,
      );
      if (index > -1) {
        this.cart.splice(index, 1);
        this.saveCart();
        useToast().add({
          title: "Removed from Cart",
          description: item.name,
          color: "error",
          icon: "i-heroicons-trash",
        });
      }
    },

    updateQuantity(item: Product, quantity: number) {
      const productIdentifier = this.getProductIdentifier(item);
      const existingItem = this.cart.find(
        (i) => this.getProductIdentifier(i) === productIdentifier,
      );
      if (existingItem) {
        if (quantity < 1) {
          this.removeFromCart(item);
        } else {
          existingItem.quantity = quantity;
          this.saveCart();
        }
      }
    },

    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
      useToast().add({
        title: "Cart Cleared",
        color: "error",
        icon: "i-heroicons-x-circle",
      });
    },
  },

  getters: {
    cartCount: (state) =>
      state.cart.reduce((acc, item) => acc + (item.quantity || 0), 0),

    cartTotal: (state) =>
      state.cart.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
        0,
      ),

    getCartTotalPrice: (state) =>
      state.cart.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
        0,
      ),

    getCartItems: (state) => state.cart,

    isInCart: (state) => {
      return (product: Product) => {
        const store = useCartStore();
        const productIdentifier = store.getProductIdentifier(product);
        return state.cart.some(
          (item) => store.getProductIdentifier(item) === productIdentifier,
        );
      };
    },
  },
});
