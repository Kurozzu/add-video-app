<template>
  <div class="row mt-5 mb-3">
    <div class="col-md-6 offset-md-3 mt-5">
      <CreateVideoComponent/>
    </div>
  </div>
  <div class="row mt-5 mb-3">
    <div class="col-md-6 offset-md-3">
      <VideoListComponent/>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoListComponent from "@/components/VideoListComponent.vue"
import CreateVideoComponent from "@/components/CreateVideoComponent.vue"
</script>