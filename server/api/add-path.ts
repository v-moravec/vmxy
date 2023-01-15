export default defineEventHandler(async (event) => {
  const key = getHeader(event, 'key')
  const value = getHeader(event, 'value')

  console.log(key, value)

  if(!key || !value) {
    return false
  }

  const res = await $fetch(endpoint(key), {
    method: 'POST',
    parseResponse: txt => txt,
    body: JSON.stringify({
      value
    })
  }).catch((e) => {
    console.error(e)
    return false
  })

  return !!res;
})

function endpoint ( key: string) {
  return `https://kv.vmxy.cz/${key}`
}
