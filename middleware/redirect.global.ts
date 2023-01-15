export default defineNuxtRouteMiddleware(async (to) => {
  if(process.client) return

  const slug = to.path.split('/').pop()

  if(!slug || to.path.includes('/api')) return

  if(slug) {
    const res = await $fetch(endpoint(slug), {
      method: 'GET',
      parseResponse: txt => txt
    }).catch(() => {
      return false
    })

    if (res) {
      return navigateTo(res, {external: true, redirectCode: 301})
    } else {
      return navigateTo('/')
    }
  }
})

function endpoint ( key: string) {
  return `https://kv.vmxy.cz/${key}`
}
