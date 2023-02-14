<template>
  <section class="text-center mt-15 px-3">
    <p class="text-body-1">Sie werden nun eine Videoreihe für ca. 3 Minuten zu sehen bekommen. Falls, Sie ein Video nicht interessiert,
      können Sie einfach weiterswipen.
    </p>
    <v-img max-height="400px" max-width="100vw" contain src="swipe_tutorial-min.jpg"></v-img>
    <v-btn color="secondary"  rounded width="300px" height="40px" @click="$emit('next')">Verstanden</v-btn>
  </section>
</template>



<style scoped>
section {
  max-width: 600px;
  margin: auto;
}
</style>
