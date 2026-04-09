import { defineStore } from "pinia";

interface State {
  email: string | null;
}

export const useEmailStore = defineStore("email", {
  state: (): State => ({
    email: null,
  }),
  actions: {
    setEmail(email: string) {
      this.email = email;
    },
  },
});
