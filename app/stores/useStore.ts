// stores/store.ts
import { defineStore } from 'pinia'

interface StoreState {
  email: string | null
}

export const useStore = defineStore('store', {
  state: (): StoreState => ({
    email: null
  }),
  actions: {
    setEmail(email: string | null) {
      this.email = email
    }
  }
})