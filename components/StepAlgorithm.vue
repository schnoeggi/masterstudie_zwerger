<template>
  <section class="text-center mt-15 px-3">
    <h1 class="text-h4 text-sm-h3 mb-10">Info Algorithmus</h1>
    <p class="text-body-1">
      Algorithmen haben zum Ziel jeder Person das passendste Video zu zeigen. Damit Sie dies machen können, sammeln Sie
      im Vorfeld viele Daten, wie z.B. auch demografische Daten. Auch in dieser Studie soll ein Algorithmus für Sie
      erstellt werden. Daher folgen nun ein paar Fragen zu Ihrer Person.
    </p>
    <v-divider class="mb-5"></v-divider>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-row no-gutters>
        <v-col cols="12" v-for="question in questions" :key="question.question">
          <p class="text-body-1  pb-0 mb-0" >{{ question.question }}</p>
          <v-radio-group v-model="question.selected" row :rules="requiredRule" class="ma-0 mt-4 pt-0 ma-auto text-center">
            <v-radio
              class="d-flex flex-column ma-0 pa-0 text-body-2 mx-1"
              v-for="n in question.answers"
              :key="n"
              :label="n"
              :value="n"
            ></v-radio>
          </v-radio-group>
          <v-divider  class="mb-5"></v-divider>

        </v-col>
      </v-row>
    </v-form>
    <v-btn color="secondary" :disabled="!valid" rounded width="300px" height="40px" @click="clicked">Weiter</v-btn>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import questions from "../assets/demograficquestions.json";

export default {
  name: "StepAlgorithm",
  data() {
    return {
      questions: questions,
      valid: false,
      requiredRule: [
        v => !!v || 'Bitte auswählen',
      ],
    }
  },
  methods: {
    ...mapActions(['addToData']),
    clicked() {
      if (this.questions[1].selected === '<18')
        this.$router.push('/unauthorized');
      else if (this.$refs.form.validate())
      {
        this.addToData(Object.values(this.questions).map(q => ({[q.question]:q.selected})))
        this.$emit('next');
      }
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
