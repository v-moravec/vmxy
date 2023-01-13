<template>
  <div />
</template>

<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug

try {
  const {data: res} = await useFetch(window.origin + '/helloworld?/' + slug)

  if(res.value) {
    navigateTo(res.value, {external: true})
  } else {
    navigateTo('/')
  }
} catch (e) {

}

</script>

<style lang="scss" scoped>

</style>
