<template>
  <section class="text-center mt-15 px-3">
    <p class="text-body-1">Sie werden nun nochmals eine Videoreihe für ca. 3 Minuten sehen. Diesmal wird aber nicht nur der Algorithmus entscheiden, welche Videos gezeigt werden, sondern es werden zufällige Videos beigemischt. Am Ende erhalten Sie wieder eine Frage dazu.
    </p>
    <v-img max-height="400px" max-width="100vw" contain src="like_tutorial-min.jpg"></v-img>
    <v-btn color="secondary"  rounded width="300px" height="50px" @click="$emit('next')">Verstanden</v-btn>
  </section>
</template>



<style scoped>
section {
  max-width: 600px;
  margin: auto;
}
</style>
