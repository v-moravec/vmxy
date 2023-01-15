const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const res = await $fetch(endpoint(event.context.params.path, config.cloudflareAccountId, config.cloudflareVMXYRedirects), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${config.cloudflareKVApiToken}`
    },
    parseResponse: txt => txt
  }).catch(() => {
    return null
  })

  if(res) {
    return res
  }

  return false
})

function endpoint ( key: string, accountID: string, namespaceID: string) {
  return `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`
}
