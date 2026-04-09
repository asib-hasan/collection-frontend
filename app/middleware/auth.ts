export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuthStore()
    if (!auth.getToken || !auth.getStatus) {
      return navigateTo('/auth/login')
    }
  })