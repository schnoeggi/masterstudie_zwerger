<template>
  <v-app dark :style="{background: $vuetify.theme.themes[theme].background}">

    <v-main class="ma-0 pa-0">
      <v-container class="ma-auto pa-0">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {

    }
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>
