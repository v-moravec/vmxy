export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if(!body.key || !body.value) {
    return false
  }

  const value = body.value

  // const res = await $fetch(endpoint(body.key), {
  //   method: 'POST',
  //   parseResponse: txt => txt,
  //   body: JSON.stringify({
  //     value: value
  //   })
  // }).catch(() => {
  //   return false
  // })

  // return !!res;
  return 'Hello world'
})

function endpoint ( key: string) {
  return `https://kv.vmxy.cz/${key}`
}
