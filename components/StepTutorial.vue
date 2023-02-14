<template>
  <section class="text-center mt-15 px-3">
    <h1 class="text-h4 text-sm-h3 mb-10">Der Algorithmus lernt...</h1>
    <p class="text-body-1">Der Algorithmus weiß nun schon einiges zu Ihrer Person, Ihre Präferenzen für Videos kennt er
      aber noch nicht. Im Folgenden werden beliebige Videos gezeigt. Wenn Ihnen ein Video besonders gefällt oder nicht
      gefällt, können Sie dieses entsprechend markieren.
      Sie können auch zwischen den Videos vor und zurück gehen.
    </p>
    <v-img max-height="400px" max-width="100vw" class="px-2" contain src="like_tutorial-min.jpg"></v-img>
    <v-btn color="secondary" rounded width="300px" height="40px" @click="$emit('next')">Verstanden</v-btn>
  </section>
</template>


<style scoped>
section {
  max-width: 600px;
  margin: auto;
}
</style>
