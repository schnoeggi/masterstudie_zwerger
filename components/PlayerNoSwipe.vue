<template>
  <v-carousel v-model="swiper" height="100vh" hide-delimiters relative>
    <v-carousel-item
      v-for="(video, i) in videos"
      :key="video.id"
    >
      <div style="height:100%;" class="d-flex justify-center align-center"
      >
        <div>
          <video
            id="myVideo"
            loop
            playsinline
            :src="`video_src/${video.id}.mp4`"
            autoplay="true">

          </video>

        </div>
      </div>
    </v-carousel-item>
    <div class="like-buttons d-flex justify-center">
      <div style="width:200px;" class="d-flex justify-lg-space-between">
        <v-btn @click="dislike" fab color="error" class="like-button">
          <v-icon>mdi-thumb-down</v-icon>
        </v-btn>
        <v-btn @click="like" fab color="primary" class="like-button">
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
      </div>
    </div>
  </v-carousel>
</template>

<script>
export default {
  name: "PlayerNoSwipe",
  props: ["videos"],
  data() {
    return {
      swiper: 0,
    }
  },
  methods: {
    like() {
      this.next();
    },
    dislike() {
      this.next();
    },
    next(){
      if(this.swiper +1 < this.videos.length)
        this.swiper++;
      else
        this.$emit('next');

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

.like-buttons {
  position: absolute;
  bottom: 0;
  left: 0;

  right: 0;
  padding: 20px;
  z-index: 999;
}

</style>
