export default defineNuxtRouteMiddleware(async (to) => {
  if(process.client) return

  const config = useRuntimeConfig()

  const slug = to.path.split('/').pop()

  console.log(to.path, to.path.includes('/api'))

  if(!slug || to.path.includes('/api')) return

  if(slug) {
    const res = await $fetch(endpoint(slug, config.cloudflareAccountId, config.cloudflareVMXYRedirects), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.cloudflareKVApiToken}`
      },
      parseResponse: txt => txt
    }).catch(() => {
      return null
    })

    console.log('Result:', res)

    if (res) {
      return navigateTo(res, {external: true, redirectCode: 301})
    } else {
      return navigateTo('/')
    }
  }
})

function endpoint ( key: string, accountID: string, namespaceID: string) {
  return `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`
}
