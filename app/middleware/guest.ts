export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore()
    if (auth.getToken && auth.getStatus) {
        return navigateTo('/dashboard')
    }
})