import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive } from 'vue'

const url = "https://cf5k95jml7.execute-api.us-west-2.amazonaws.com/videos"


export const useVideoStore = defineStore({
  id: 'video',
  state: () => ({
    listVideos: reactive(new Array()),
    selectedItem: new Array()
  }),
  getters: {
    getListVideos: (state: any) => state.listVideos,
    getSelectedItem: (state: any) => state.selectedItem
  },
  actions: {
    async getAllVideos()  {
      if (this.listVideos.length == 0) {
        await axios.get(url)
          .then(res => {
            this.listVideos.push(res.data.videos)
          })
          .catch(err => console.log(err))
      }
    },
    async newVideo(video: string) {
      const data = JSON.stringify({ "url": video })
      const headers = { 'content-type': 'application/json', 'access-control-allow-origin': '*' }
      await axios.post(url, data, { headers })
        .then(res => (this.listVideos.length == 0) ? this.listVideos.unshift(res.data) : this.listVideos[0].unshift(res.data))
        .catch(err => console.log(err))
    },
    async deleteVideo(_id: string) {
      this.listVideos[0] = this.listVideos[0].filter((video: any) => video.id != _id)
      await axios.delete(url+`/${_id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    setSelectedItem(video: any) {
      this.selectedItem.length = 0
      this.selectedItem.push(video)
    }
  }
})