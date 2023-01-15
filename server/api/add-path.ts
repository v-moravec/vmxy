const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if(!body.key || !body.value) {
    return false
  }

  const value = body.value

  const res = await $fetch(endpoint(body.key, config.cloudflareAccountId, config.cloudflareVMXYRedirects), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${config.cloudflareKVApiToken}`
    },
    parseResponse: txt => txt,
    body: value
  }).catch(() => {
    return false
  })

  return !!res;
})

function endpoint ( key: string, accountID: string, namespaceID: string) {
  return `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`
}
