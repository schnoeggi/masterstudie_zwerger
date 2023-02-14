<template>
  <section class="text-center  px-3">
    <v-img max-height="200px" max-width="100vw" contain src="heart.jpg"></v-img>
    <h1 class="text-h4 text-sm-h3 my-3">Danke für die Teilnahme</h1>
    <p class="text-body-1">Kennen Sie jemanden der diese Studie auch ausfüllen könnte? Dann unterstützen Sie mich und
      senden Sie sie an Ihre Freund:innen weiter. Einfach hier unten den Link kopieren und versenden! Tausend Dank!</p>
    <div class="d-flex">
      <v-text-field class="url-text" color="secondary" readonly outlined :value="url">

      </v-text-field>
      <v-btn v-if="webShareApiSupported" class="copy-btn" height="56px" color="secondary" @click="share">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <v-btn v-else class="copy-btn" height="56px" color="secondary" @click="copy">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
    </div>
    <v-snackbar
      content-class="text-center"
      v-model="snackbar"
      :timeout="timeout"
      color="secondary darken-3"
    >
      URL kopiert.
    </v-snackbar>

  </section>
</template>

<script>
export default {
  name: "Start",
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      url: "https://schnoeggi.github.io/masterstudie/"
    }
  },
  methods: {
    copy() {
      navigator?.clipboard.writeText(this.url);
      this.snackbar = true;
    },
    share() {
      navigator?.share({
        title: 'Masterstudie',
        text: '',
        url: this.url
      })
    }
  },
  computed: {
    webShareApiSupported() {
      return typeof (navigator) != "undefined" && navigator?.share
    }
  }
}
</script>

<style scoped>
section {
  max-width: 600px;
  margin: auto;
}
</style>

<style>
.url-text .v-input__control {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.copy-btn.v-btn {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
