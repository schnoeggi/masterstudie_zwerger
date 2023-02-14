<template>
  <section class="text-center mt-15 px-3">
    <h1 class="text-h4 text-sm-h3 mb-10">Herzlich Willkommen zu meiner TikTok-Studie.</h1>
    <p class="text-body-1">Mit dieser Studie möchte ich untersuchen wie sich der Algorithmus auf das Erleben von TikTok
      Videos auswirkt.</p>
    <p class="text-body-1">Die Studie dauert ca. 13 Minuten und dient ausschließlich wissenschaftlichen Zwecken.</p>
    <p class="text-body-1">Bitte vergewissern Sie sich, dass Sie eine gute Internetverbindung haben.</p>
    <p class="text-body-1">Alle gesammelten Daten sind anonym, werden vertraulich behandelt und dienen allein der
      Verarbeitung für diese Studie. Mit dem Klick auf “Weiter” stimmen Sie zu, dass Ihre Daten gespeichert und
      verarbeitet werden dürfen.</p>
    <v-btn color="secondary" rounded width="300px" height="40px" @click="$emit('next')">Weiter</v-btn>
  </section>
</template>

<script>
export default {
  name: "Start"
}
</script>

<style scoped>
section {
  max-width: 600px;
  margin: auto;
}
</style>
