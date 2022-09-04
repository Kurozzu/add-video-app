<template>
  <div class="row">
    <div class="col-4 mb-3" v-for="item in videos[0]">
      <div class="img-wrap">
        <span class="close" @click="removeVideo(item?.id)">&times;</span>
        <img :src="item?.thumbnails.high.url" class="img-thumbnail" @click="openVideo(item.id)">
        <span class="time">{{ item.duration }}</span>
      </div>
    </div>
  </div>
  <ModalDetailComponent />
</template>

<script setup lang="ts">
import { onMounted, reactive  } from 'vue'
import { useVideoStore } from "../stores/videos"
import ModalDetailComponent from "./ModalDetailComponent.vue"
import * as bootstrap from "bootstrap"

const videoStore = useVideoStore()
const videos = reactive(videoStore.getListVideos)

onMounted(() => {
  videoStore.getAllVideos()
})

const openVideo = async (_id: string) => {
  videoStore.setSelectedItem(videos[0].filter((v: any) => v.id == _id)[0])

  const myModalEl = document.getElementById('detailModal')
  const modal = bootstrap.Modal.getOrCreateInstance(myModalEl!)
  modal.show()
}

const removeVideo = (_id: string) => {
  videoStore.deleteVideo(_id)
}

</script>

<style scoped>
.img-wrap {
  position: relative;
  display: inline-block;
  font-size: 0;
  cursor: pointer;
}
.img-wrap .close {
  position: absolute;
  top: 20px;
  right: 16px;
  z-index: 100;
  background-color: #2b2a2acc;
  padding: 5px 4px 10px 4px;
  color: #ffff;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  text-align: center;
  font-size: 22px;
  line-height: 10px;
}
.img-wrap .time {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 100;
  background-color: #2b2a2acc;
  padding: 5px 4px 5px 4px;
  color: #ffff;
  opacity: 1;
  text-align: center;
  font-size: 15px;
  line-height: 10px;
}
.img-thumbnail {
  height: 180px !important;
}
</style>