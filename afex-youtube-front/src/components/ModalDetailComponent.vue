<template>
  <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="item != ''">
          <div class="container-fluid">
            <div class="row">
              <div class="col-4 mb-5">
                <div class="img-wrap">
                  <router-link to="/play" @click="closeModal()" class="play"><font-awesome-icon icon="fa-solid fa-play"/></router-link>
                  <img :src="item?.thumbnails.high.url" class="img-thumbnail" >
                </div>
              </div>
              <div class="col-8">
                <div class="row"><div class="mb-3"><strong>{{ item.title }}</strong></div> </div>
                <div class="row"><span :class="[item?.description.length > 288 ? details : '']">{{ item?.description }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted  } from 'vue'
import { useVideoStore } from "../stores/videos"
import * as bootstrap from "bootstrap"

const videoStore = useVideoStore()
let item: any = ref([])

onMounted(() => {
  const myModalEl = document.getElementById('detailModal')
  myModalEl?.addEventListener('show.bs.modal', event => {
    item.value = videoStore.getSelectedItem[0]
  })
})


const details = 'details'
const closeModal = () => {
  const myModalEl = document.getElementById('detailModal')
  const modal = bootstrap.Modal.getInstance(myModalEl!)
  modal?.hide();
}
</script>

<style scoped>
.modal-header {
  border-bottom: none;
}
.details {
  height: 133px;
  overflow-y: scroll;
}
.img-wrap {
  position: relative;
  display: inline-block;
  font-size: 0;
}
.img-wrap .play {
  position: absolute;
  top: 35%;
  right: 43%;
  z-index: 100;
  background-color: #ff0000a6;
  padding: 12px 13px 12px 16px;
  color: #ffff;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  text-align: center;
  font-size: 22px;
  line-height: 10px;
  border-radius: 50%;
}
</style>