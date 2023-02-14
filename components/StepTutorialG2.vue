<template>
  <section class="text-center mt-15 px-3">
    <p class="text-body-1">
      Sie werden nun eine Videoreihe für ca. 3 Minuten zu sehen bekommen.
      Hier können Sie nicht swipen (Videos weiterwischen).
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
