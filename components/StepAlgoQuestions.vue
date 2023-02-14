<template>
  <section class="mt-15 px-3 mb-5 text-center" style="position:relative">
    <p class="text-h6 mb-0">Fast geschafft!</p>
    <p class="text-body-1">Hier kommen die letzten Fragen. </p>
    <p class="text-body-1">
      Bewerten Sie bitte inwiefern folgende Aussagen auf einer Skala von 1 bis 5 auf Sie persönlich zutreffen.
    </p>
    <div class="ma-auto mb-5 stickli background pt-5">
      <p class="text-center ma-0 pa-0 sticky">1 = überhaupt nicht zufrieden </p>
      <p class="text-center ma-0 pa-0"> 2 = eher nicht zufrieden </p>
      <p class="text-center ma-0 pa-0"> 3 = teilweise zufrieden </p>
      <p class="text-center ma-0 p-0"> 4 = eher zufrieden </p>
      <p class="text-center p-0"> 5 = sehr zufrieden </p>
      <v-divider class="mb-5"></v-divider>
    </div>

    <v-form
      ref="form"
      v-model="valid"
    >
      <v-row no-gutters class="text-body-1">
        <v-col cols="12" v-for="(question,index) in questions" :key="question.question">
          <p class="text-body-2  pb-0 mb-0">{{ index }}. {{ question.question }}</p>
          <v-radio-group v-model="question.selected" row :rules="requiredRule"
                         class="ma-0 mt-4 pt-0 ma-auto text-center">
            <v-radio
              class="d-flex flex-column ma-0 pa-0"
              v-for="n in question.answers"
              :key="n"
              :label="n"
              :value="n"
            ></v-radio>
          </v-radio-group>
          <v-divider class="mb-5"></v-divider>

        </v-col>
      </v-row>
    </v-form>
    <p class="text-body-1 error--text">{{ errorText }}</p>
    <v-btn color="secondary" :disabled="!valid" rounded width="300px" height="40px" @click="clicked">Weiter</v-btn>
  </section>
</template>

<script>
import {mapActions} from "vuex";
import questions from "../assets/algo_questions.json";
import {computed} from "vue";

export default {
  name: "StepAlgorithm",
  data() {
    return {
      questions: questions,
      questionsLabels: ['trifft gar nicht auf mich zu', 'trifft kaum auf mich zu', ' trifft etwas auf mich zu', 'trifft stark auf mich zu'],
      valid: false,
      requiredRule: [
        v => !!v || 'Bitte auswählen',
      ],
    }
  },

  methods: {
    ...mapActions(['addToData']),
    clicked() {
      if (this.$refs.form.validate()) {
        this.addToData(Object.values(this.questions).map(q => ({[q.question]: q.selected})))
        this.$emit('next');
      }
    }
  },
  computed: {
    errorText() {
      const id = Object.values(this.questions)?.map((x, index) => ({...x, id: index + 1})).find(x => !x.selected)?.id
      return id ? `Sie müssen zuerst Aussage ${id} bewerten` : undefined;
    }
  }
}
</script>

<style scoped>
section {
  max-width: 600px;
  margin: auto;
}

.stickli {
  position: sticky;
  top: 0;
  position: -webkit-sticky; /* Safari */
  z-index: 500;;
}
</style>
<style>
.v-application--is-ltr .v-input--selection-controls__input {
  margin-right: 0 !important;
}
</style>
