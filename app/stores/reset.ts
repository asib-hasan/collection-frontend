import { defineStore, getActivePinia } from 'pinia'

export const useResetStore = defineStore('reset', {
    actions: {
        resetStore() {
            const activepinia = getActivePinia();
            if (activepinia) {
                Object.entries(activepinia.state.value).forEach(([storeName, state]) => {
                    const storeDefinition = defineStore(storeName, state);
                    const store = storeDefinition(activepinia);
                    store.$reset();
                });
            }
            return navigateTo('/login')
        },
    },
})