<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
// const title = 'Jagu Template'
// const description = 'A Nuxt starter template used by Jagu'
// const ogImage = 'jagu-template-og-image.png'
//
// useSEOHead({
//   title,
//   description,
//   ogImage
// })

const {data: res} = await useFetch(window.origin + '/helloworld?/jagu')

console.log(res)

</script>
