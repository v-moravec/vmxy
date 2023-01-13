export async function onRequestGet(context) {
  const { request, env } = context

  const url = new URL(request.url)

  if(url.pathname === '/helloworld') {
    const redirects = {
      '/jagu': 'https://www.jagu.cz',
      '/nuxt': 'https://nuxt.com'
    }

    await Promise.all(Object.keys(redirects).map(async path => {
      await env.VMXY_REDIRECTS.put(path, redirects[path])
    }))
    console.log(new Response('Data Saved Successfully!'))
  }

  console.log(url.searchParams.keys())
  for (let key of url.searchParams.keys()) {
    const redirect = await env.VMXY_REDIRECTS.get(key)
    if (redirect) {
      return new Response(redirect)
    }
  }

  return new Response(null)
}
