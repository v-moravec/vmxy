export async function onRequestGet(context) {
  const { request, env } = context

  const url = new URL(request.url)

  if(url.pathname === '/helloworld') {
    const redirects = {
      '/jagu': 'https://www.jagu.cz'
    }

    await Promise.all(Object.keys(redirects).map(async path => {
      await env.VMXY_REDIRECTS.put(path, redirects[path])
    }))
    console.log(new Response('Data Saved Successfully!'))

    for (let key of url.searchParams.keys()) {
      const redirect = await env.VMXY_REDIRECTS.get(key)
      if (redirect) {
        return new Response(redirect)
      }
    }
  }
}
