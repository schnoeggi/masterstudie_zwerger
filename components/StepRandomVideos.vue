<template>
  <v-carousel v-model="swiper" height="100vh"  hide-delimiters relative :continuous="false">
    <v-carousel-item
      v-for="(video, i) in videos"
      :key="video.id"
    >
      <div style="height:100%;" class="d-flex justify-center align-center"
      >
        <div style="height:100%;" class="d-flex justify-center align-center">
          <video
            poster="video_loading.gif"
            disablePictureInPicture
            :id="`random-video-${i}`"
            @ended="swiper++"
            playsinline
            :src="`video_src/${video.id}.mp4`"
            autoplay="true">

          </video>

        </div>
      </div>
    </v-carousel-item>
    <div class="like-buttons d-flex justify-center">
      <div style="width:200px;" class="d-flex justify-space-between">
        <v-fab-transition>
          <v-btn @click="dislike" v-if="!liked"   fab color="error" class="like-button">
            <v-icon>mdi-thumb-down</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-fab-transition>
          <v-btn @click="like" v-if="!disliked" fab color="primary" class="like-button">
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
        </v-fab-transition>
      </div>
    </div>
  </v-carousel>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "StepRandomVideos",
  data() {
    return {
      swiper: 0,
      videos: [],
      timestamp: undefined,
      liked: false,
      disliked: false,
      timeUp:false,
    }
  },
  async mounted() {
    this.videos = this.getRandomVideos(16);
    this.watched(this.videos[0]?.id)
    this.timestamp = new Date().getTime();
    await new Promise(resolve => setTimeout(resolve, 60000));
    this.timeUp = true;


  },
  computed: {
    ...mapGetters(['getRandomVideos']),
    categories() {
      return this.videos[this.swiper].categories;
    },
    tags() {
      return this.videos[this.swiper].tags;
    }
  },
  methods: {
    ...mapActions(['incrementTag', 'incrementCategory','watched']),
    incrementValue(value = 1) {
      this.categories?.forEach(c => this.incrementCategory({category: c, value}));
      this.tags?.forEach(t => this.incrementTag({tag: t, value,}));
    },
    calculateTimeWatched(id) {
      const stopTime = new Date().getTime();
      const timeWatched = (stopTime - this.timestamp) / (1000);
      const vid = document.getElementById(`random-video-${id}`);
      if (timeWatched < 1) return;
      const relativeTime = timeWatched / vid?.duration || 0;
      this.incrementValue(relativeTime < 0.3 ? -0.5 : relativeTime);

    },
    like(event) {
      event.currentTarget.classList.add('disappear');
      this.incrementValue();
      this.liked=true

    },
    dislike(event) {
      event.currentTarget.classList.add('disappear');
      this.incrementValue(-1);
      this.disliked = true;
    },

  },
  watch:{
    swiper(ne,old) {
      this.watched(this.videos[ne]?.id)
      this.calculateTimeWatched(old);
      if(ne < old)
        this.incrementValue(1);
      this.timestamp = new Date().getTime();

      const oldVid = document.getElementById(`random-video-${old}`);
      oldVid.pause();

      const newVid = document.getElementById(`random-video-${ne}`);
      newVid?.play();
      this.liked =false;
      this.disliked =false;
      document.querySelectorAll(".like-button").forEach(x => x.classList.remove("disappear"));
      if(this.timeUp || this.swiper > 10 ) this.$emit('next');

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
  bottom: 5vh;
  left: 0;

  right: 0;
  padding: 20px;
  z-index: 999;
  transition:all ease-in-out 200ms;
}


.disappear{
  transform: scale(5);
  opacity: 0;
}
</style>

