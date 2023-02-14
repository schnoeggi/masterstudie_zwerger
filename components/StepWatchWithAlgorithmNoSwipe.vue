<template>
  <section>
    <player-no-swipe :videos="videos"></player-no-swipe>
  </section>
</template>

<script>
import videos from "../assets/videos.json"

export default {
  name: "StepWatchWithAlgorithmNoSwipe",
  data() {
    return {
      videos: videos
    }
  }
}
</script>

<style scoped>

</style>
