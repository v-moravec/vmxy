export default defineEventHandler(async (event) => {
  const res = await $fetch(endpoint('jagu'), {
    method: 'GET',
    parseResponse: txt => txt
  }).catch(() => {
    return null
  })

  if(res) {
    return res
  }

  return false
})

function endpoint ( key: string) {
  return `https://kv.vmxy.cz/${key}`
}
