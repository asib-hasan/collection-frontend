import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
function createRemoteCollection(fetchEndpoint) {
  let _cache
  return async () => {
    if (_cache)
      return _cache
    const res = await fetch(fetchEndpoint).then(r => r.json())
    _cache = res
    return res
  }
}

export const collections = {
  'mdi': () => require('@iconify-json/mdi/icons.json'),
  'lucide': () => require('@iconify-json/lucide/icons.json'),
  'line-md': () => require('@iconify-json/line-md/icons.json'),
  'game-icons': () => require('@iconify-json/game-icons/icons.json'),
}