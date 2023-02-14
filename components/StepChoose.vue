<template>
  <section class="text-center mt-15 px-3">
    <h1 class="text-h4 text-sm-h3 mb-10">Der Algorithmus ist bereit</h1>
    <p class="text-body-1">
      Der Algorithmus hat nun auf Grundlage Ihrer vorherigen Angaben genauestens berechnet was Ihnen gefällt und sucht
      passende Videos für Sie heraus. Würden Sie lieber nur diese Videos sehen, oder zusätzlich auch noch andere
      zufällige Videos?

    </p>
    <p class="text-body-1 mt-5">Bitte geben Sie anhand der Schieberegler an, was Sie lieber möchten in Bezug auf
      folgende Aussagen.

    </p>
    <v-row no-gutters>
      <v-col cols="6" class="text-body-1  pr-1"><span class="blue--text ">A</span> = Videos, die nur vom Algorithmus ausgewählt wurden</v-col>
      <v-col cols="6" class="text-body-1  pl-1"><span class="green--text">B</span> = Videos, die vom Algorithmus ausgewählt wurden kombiniert mit zufälligen Videos.</v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>

    <v-row no-gutters class="text-body-1">
      <v-col cols="12" v-for="(question,index) in questions" :key="question.question">
        <p class="text-body-2  pb-0 mb-0">{{ index }}. {{ question.question }}</p>
        <v-slider
          @start="disabled = false"
          v-model="question.selected"
          step="1"
          tick-size="4"
          ticks="always"
          :max="6"
          track-fill-color="rgba(255, 255, 255, 0.2)"
          :color="color(question.selected)">
          <template v-slot:prepend >
            <span class="blue--text">A</span>
          </template>
          <template v-slot:append>
            <span class="green--text">B</span>
          </template>
        </v-slider>
        <v-divider class="mb-5"></v-divider>

      </v-col>
    </v-row>
    <v-row no no-gutters>
      <v-col cols="12">

      </v-col>
      <v-col cols="12" class="pr-sm-1">
        <v-btn color="secondary" :disabled="disabled" rounded width="300px" height="40px" @click="next()">Weiter</v-btn>

      </v-col>
    </v-row>

  </section>
</template>

<script>
import {mapActions} from "vuex";
import questions from "../assets/algo_zufall.json"

export default {
  name: "StepChoose",
  data() {
    return {
      value: 3,
      disabled: true,
      questions: questions,
    }
  },
  methods: {
    ...mapActions(['addToData']),
    next() {
      this.addToData(Object.values(this.questions).map(q => ({[`Before: ${q.question}`]: q.selected})))
      this.$emit('next');
    },
    color(value){
      const colors = {
        0: 'blue',
        1: 'blue lighten-1',
        2: 'blue lighten-2',
        3: 'secondary lighten-2',
        4: 'green lighten-2',
        5: 'green lighten-1',
        6: 'green',
      }
      return colors[value];
    }
  },
}
</script>

<style scoped>
section {
  max-width: 600px;
  margin: auto;
}
</style>
