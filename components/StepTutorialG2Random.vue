<template>
  <section class="text-center mt-15 px-3">
    <p class="text-body-1">Sie werden nun nochmals eine Videoreihe für ca. 3 Minuten sehen. Diesmal wird aber nicht nur
      der Algorithmus entscheiden, welche Videos gezeigt werden, sondern es werden zufällige Videos beigemischt. Auch
      hier können Sie nicht swipen (Videos weiterwischen).
    </p>
    <v-btn color="secondary" rounded width="300px" height="40px" @click="$emit('next')">Verstanden</v-btn>
  </section>
</template>


<style scoped>
section {
  max-width: 600px;
  margin: auto;
}
</style>
