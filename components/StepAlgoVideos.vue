<template>
  <v-carousel v-model="swiper" height="100vh" :touchless="!swipeable" :show-arrows="swipeable"   hide-delimiters relative >
    <v-carousel-item v-for="(video, i) in videos" :key="video.id">
      <div style="height:100%;" class="d-flex justify-center align-center">
        <div style="height:100%;" class="d-flex justify-center align-center">
          <video poster="video_loading.gif" :id="`random-video-${i}`" playsinline disablePictureInPicture :src="`video_src/${video.id}.mp4`"
            @ended="swiper++" autoplay="true">
          </video>

        </div>
      </div>
    </v-carousel-item>

  </v-carousel>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Swiper } from "../helper/Swipe.js"

export default {
  name: "StepAlgoVideos",
  props: ["swipeable", "random"],
  data() {
    return {
      swiper: 0,
      videos: [],
      swipeListener: undefined,
      timeUp: false,
    }
  },
  async mounted() {

    const fallBackFunction = this.next;
    const getScores = (video) => video.tags.reduce((d, b) => d + (this.getLikesStats.tags[b] || 0), 0) + video.categories.reduce((d, b) => d + (this.getLikesStats.categories[b] || 0), 0);


    this.videos = this.random ?
      this.getRandomMix() : [...this.getUnwatchedVideos].sort((a, b) => getScores(b) - getScores(a)).filter((x, index) => index % 2 === 0)
    console.log(this.videos);

    this.watched(this.videos[0]?.id)

    this.swipeListener = this.swipeable ? new Swiper(fallBackFunction) : undefined;

    await new Promise(resolve => setTimeout(resolve, 90000));
    this.timeUp = true;


  },
  destroyed() {
    this.swipeListener?.close();
  },
  computed: {
    ...mapGetters(['getRandomVideos', 'getUnwatchedVideos', 'getLikesStats']),

  }
  ,
  methods: {
    ...mapActions(['watched']),
    getRandomMix() {
      const getScores = (video) => video.tags.reduce((d, b) => d + (this.getLikesStats.tags[b] || 0), 0) + video.categories.reduce((d, b) => d + (this.getLikesStats.categories[b] || 0), 0);
      let algorithmList = [...this.getUnwatchedVideos].sort((a, b) => getScores(a) - getScores(b))
      let randomList = this.getRandomVideos();
      let newList = [];
      let counter = []
      while (algorithmList.length > 0 || randomList.length > 0) {
        if (Math.random() > 0.6)
          {newList.push(algorithmList.pop()); counter.push('algo')}
        else
          {newList.push(randomList.pop()); counter.push('random')}
      }
      return [...new Set(newList)].filter(Boolean);
    },
    getScores(video) {
      return video.tags.reduce((d, b) => d + (this.getLikesStats.tags[b] || 0), 0) + video.categories.reduce((d, b) => d + (this.getLikesStats.categories[b] || 0), 0);

    },
    next() {


    }
  },
  watch:{
    swiper(ne,old){
      const vid = document.getElementById(`random-video-${old}`);
      vid?.pause();
      const newVid = document.getElementById(`random-video-${ne}`);
      newVid?.play();
      this.watched(this.videos[this.swiper]?.id)
      if (this.timeUp) this.$emit('next');

    }
  }
}
</script>

<style scoped>
video {
  max-height: 100%;
  max-width: 100%;
  position: relative;
}

.next-btn {
  position: absolute;
  bottom: 0;
  top: 0;
  right:0;
  transform: translateY(calc(50vh - 28px));
  right: 10px;

}
</style>
