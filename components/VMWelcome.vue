<template>
  <div class="container mx-auto flex flex-col justify-center min-h-screen">
    <div class="flex flex-col sm:flex-row gap-5 lg:gap-32 items-center justify-center">
      <div>
        <h1 class="mb-2">
          VMXY
        </h1>
        <h2 class="mb-0">
          Shorten any link
        </h2>
      </div>
      <div class="w-32 lg:w-64">
        <svg id="Vrstva_7" class="w-full" data-name="Vrstva 7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 94.58 55.52">
          <defs>
            <linearGradient id="linear-gradient" x1="0" y1="29.65" x2="94.58" y2="29.65" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#85c2ff" />
              <stop offset=".03" stop-color="#72bdff" />
              <stop offset=".09" stop-color="#58b6ff" />
              <stop offset=".15" stop-color="#45b1ff" />
              <stop offset=".21" stop-color="#39aeff" />
              <stop offset=".28" stop-color="#36aeff" />
              <stop offset=".67" stop-color="#358cf0" />
              <stop offset=".89" stop-color="#3174e8" />
              <stop offset="1" stop-color="#2d5be3" />
            </linearGradient>
            <linearGradient id="Nepojmenovaný_přechod_10" data-name="Nepojmenovaný přechod 10" x1="27.89" y1="17.4" x2="79" y2="35.36" gradientUnits="userSpaceOnUse">
              <stop offset=".13" stop-color="#dad900" />
              <stop offset="1" stop-color="#05d12d" />
            </linearGradient>
            <mask id="Mask">
              <polyline class="mask" points="0 62.65 27.02 6.83 47.29 48.69 67.55 6.83 94.58 62.65" style="fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 13.82px;" />
            </mask>
          </defs>
          <g mask="url(#Mask)">
            <path d="m20.89,9.89l6.2,12.81-14,28.93c-1.66,3.43-5.78,4.86-9.2,3.2-3.42-1.66-4.86-5.78-3.2-9.2L20.89,3.89s.03-.07.05-.1c-.94,1.85-1.02,4.09-.05,6.1Zm73,35.74L73.69,3.89s-.04-.08-.06-.11c.94,1.85,1.03,4.1.06,6.11l-6.2,12.81,14,28.93c1.19,2.46,3.64,3.89,6.2,3.89,1.01,0,2.03-.22,2.99-.69,3.43-1.66,4.86-5.78,3.2-9.2Z" style="fill: url(#linear-gradient);" />
            <path d="m47.29,55.52c-2.64,0-5.05-1.51-6.2-3.89L20.89,9.89c-1.66-3.42-.22-7.54,3.2-9.2,3.43-1.66,7.54-.22,9.2,3.2l14,28.93L61.29,3.89c1.66-3.42,5.78-4.86,9.2-3.2,3.42,1.66,4.86,5.78,3.2,9.2l-20.2,41.75c-1.15,2.38-3.56,3.89-6.2,3.89Z" style="fill: url(#Nepojmenovaný_přechod_10);" />
          </g>
        </svg>
      </div>
    </div>
    <div class="my-10 lg:my-16 border-[1px] border-black p-4 rounded-3xl w-full sm:w-3/4 lg:w-1/2 mx-auto text-xl">
      <div v-if="added" class="flex flex-col items-center gap-3">
        <p class="text-2xl font-medium">
          Created ✅
        </p>
        <NuxtLink external :to="`${config.public.url}/${path}`">
          {{ `${config.public.url}/${path}` }}
        </NuxtLink>
        <div class="w-full bg-black rounded-full text-white text-center py-2 px-4 cursor-pointer select-none" @click="resetForm(); added = false">
          Back home
        </div>
      </div>
      <div v-else class="flex flex-col gap-3">
        <div class="flex flex-col">
          <input v-model="url" placeholder="https://google.com" class="bg-transparent border-[1px] border-black rounded-full outline-black w-full py-2 px-4" type="url" @input="checkUrl()">
          <p v-if="errorUrl" class="ml-4 mt-1 text-red-600">
            Enter valid link
          </p>
        </div>
        <div>
          <div class="flex flex-col md:flex-row items-center gap-3 md:gap-2">
            <div class="focus-within:outline outline-1 outline-black flex items-center border-[1px] border-black rounded-full py-2 px-4 w-full">
              <div class="flex">
                <p>
                  vmxy.cz/
                </p>
                <input v-model="path" placeholder="your-path" class="bg-transparent outline-none w-full" type="text" @input="checkingPath = true; useDebounce(checkPath, 300)">
              </div>
              <div v-if="path" class="flex justify-center w-16">
                <span v-if="checkingPath" class="loader" />
                <span v-else-if="validPath">✅</span>
                <span v-else>❌</span>
              </div>
            </div>
            <div class="bg-black rounded-full text-white text-center py-2 px-4 w-full md:w-fit cursor-pointer select-none" @click="generatePath();">
              Random
            </div>
          </div>
          <p v-if="errorPath" class="ml-4 mt-1 text-red-600">
            Enter valid path
          </p>
        </div>
        <div class="w-full bg-black rounded-full text-white text-center py-2 px-4 cursor-pointer select-none flex items-center justify-center" @click="addPath()">
          <div v-if="addingPath" class="flex min-h-[28px] items-center">
            <span class="loader-white" />
          </div>
          <span v-else>Create</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid'

const url = ref('')
const validUrl = ref(true)
const validPath = ref(true)
const path = ref('')
const checkingPath = ref(false)
const addingPath = ref(false)
const added = ref(false)
const errorPath = ref(false)
const errorUrl = ref(false)
const config = useRuntimeConfig()

async function checkPath () {
  if(!path.value.length) {
    validPath.value = false
    return
  }

  const { data } = await useFetch(`/api/check-path/${path.value}`)

  if(data.value) {
    validPath.value = false
    console.log('This path is already in use! ❌')
  } else {
    validPath.value = true
    errorPath.value = false
    console.log('This path is available! ✅')
  }
  checkingPath.value = false
}

function checkUrl () {
  const res = url.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (res !== null) {
    validUrl.value = true
    errorUrl.value = false
  } else {
    validUrl.value = false
  }
}

async function addPath () {
  checkUrl()
  checkPath()

  if(!validUrl.value) {
    errorUrl.value = true
  }
  if(!validPath.value) {
    errorPath.value = true
  }
  if(!validPath.value || !validUrl.value) {
    return
  }

  addingPath.value = true

  // const body = JSON.stringify({
  //   key: path.value,
  //   value: url.value
  // })

  const { data } = await useFetch(`/api/add-path`, {
    headers: {
      key: path.value,
      value: url.value
    }
  })

  if(data.value) {
    // TODO
    added.value = true
    console.log('Data added! ✅')
  } else {
    // TODO
    console.log('An error occured! ❌')
  }
  addingPath.value = false
}

function resetForm () {
  url.value = ''
  validUrl.value = true
  path.value = ''
  validPath.value = true
}

function generatePath() {
  path.value = nanoid(10)
  checkingPath.value = true
  checkPath()
}
</script>

<style lang="scss" scoped>
.mask {
  stroke-dasharray: 220;
  stroke-dashoffset: 220;
  animation: mask ease-in-out 5s infinite;
}

@keyframes mask {
  0% {
    stroke-dashoffset: 220;
  }
  45% {
    stroke-dashoffset: 0;
  }
  55% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -220;
  }
}

.loader {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  box-shadow: 16px 0 #fff, -16px 0 #fff;
  position: relative;
  animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
  0% {
    background-color: #0009;
    box-shadow: 16px 0 #0009, -16px 0 #000;
  }
  50% {
    background-color: #000;
    box-shadow: 16px 0 #0009, -16px 0 #0009;
  }
  100% {
    background-color: #0009;
    box-shadow: 16px 0 #000, -16px 0 #0009;
  }
}

.loader-white {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 24px 0 #fff, -24px 0 #fff;
  position: relative;
  animation: flash-white 0.5s ease-out infinite alternate;
}

@keyframes flash-white {
  0% {
    background-color: #FFF2;
    box-shadow: 24px 0 #FFF2, -24px 0 #FFF;
  }
  50% {
    background-color: #FFF;
    box-shadow: 24px 0 #FFF2, -24px 0 #FFF2;
  }
  100% {
    background-color: #FFF2;
    box-shadow: 24px 0 #FFF, -24px 0 #FFF2;
  }
}

</style>
