<template>
  <strong>Añadir nuevo video</strong>
  <div class="input-group mb-8">
    <input type="text" class="form-control" placeholder="Añadir" v-model="video">
    <button class="btn btn-primary" type="button" id="add" @click="createVideo()">Añadir</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoStore } from "../stores/videos"

const videoStore = useVideoStore()
const video = ref("")


const createVideo = () => {
  videoStore.newVideo(video.value)
  video.value = ""
}


</script>

<style scoped>
.btn {
  padding: 0px 50px 0px 50px;
}
</style>