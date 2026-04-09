import type { UseFetchOptions } from "nuxt/app"

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useFetch(url, {
    dedupe: 'defer',
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}