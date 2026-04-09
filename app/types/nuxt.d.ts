import type { Toast } from '@nuxt/ui/dist/runtime/types'

declare module '#app' {
  interface NuxtApp {
    $toast: Toast
  }
}

export {}

