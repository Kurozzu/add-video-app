<template>
  <div class="row">
    <div class="col-md-5 mb-2">
      <router-link type="button" to="/" class="btn btn-outline-primary"><font-awesome-icon icon="fa-solid fa-arrow-rotate-left" /> volver</router-link>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="embed-responsive">
        <iframe width="1230" height="655" :src="srcItem" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useVideoStore } from "../stores/videos"
import { useRouter } from 'vue-router'


const router = useRouter()
const videoStore = useVideoStore()
const item = videoStore.getSelectedItem[0]
const srcItem = ref("")

onMounted(() => {
  console.log(item)
  if (item == null) {
    console.log("here 1")
    router.push('/')
  } else {
    console.log("here 2")
    srcItem.value = item.embed
  }
})

// const getEmbed = (_key: string) => {
//   let video = videos[0].filter(v => v.id == _id)[0]
//   return video.embed + "?autoplay=1&mute=1"
// }
</script>