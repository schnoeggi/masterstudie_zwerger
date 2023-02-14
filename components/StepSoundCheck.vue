<template>
  <section class="mt-15 px-3 mb-5 text-center" style="position:relative">
    <div v-if="!wrong">
    <p class="text-h6 ">Sound Check</p>
    <p class="text-body-1">
      Um an dieser Umfrage teilzunehmen müssen Sie das Audio einschalten. Bitte klicken sie auf den Knopf mit dem Lautsprecher, um den Testsatz zu hören.
    </p>
    <p>
      <v-btn :outlined="playing" @click="play" fab color="secondary" x-large><v-icon>mdi-volume-high</v-icon></v-btn>
    </p>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-row no-gutters class="text-body-1 ">
        <v-col cols="12" v-for="(question,index) in questions" :key="question.question" class="d-flex justify-center">
          <div class="text-left">
            <p class="text-body-1  pb-0 mb-0">{{ index }}. {{ question.question }}</p>
            <v-radio-group v-model="question.selected" :rules="requiredRule">
              <v-radio
                v-for="n in question.answers"
                :key="n"
                :label="n"
                :value="n"
              ></v-radio>
            </v-radio-group>
            <v-divider class="mb-5"></v-divider>
          </div>

        </v-col>
      </v-row>
    </v-form>
    <p class="text-body-1 error--text">{{ errorText }}</p>
    <v-btn color="secondary" :disabled="!valid" rounded width="300px" height="40px" @click="clicked">Weiter</v-btn>
    </div>
    <div v-else>
      <p class="text-body-1 ">
       Die Antwort war leider falsch. Um an dieser Umfrage teilzunehmen ist es notwendig, dass Sie das Audio eingeschaltet haben.      </p>

      <v-btn color="secondary" rounded width="300px" height="40px" @click="wrong=false">Verstanden</v-btn>
    </div>

  </section>
</template>

<script>
import {mapActions} from "vuex";
import questions from "../assets/soundcheck.json";

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
      audio:undefined,
      playing:false,
      wrong:false,
    }
  },
  mounted(){
    this.audio = new Audio("soundcheck.mp3");
    const that = this;
    this.audio.addEventListener("ended", function()
    {
      that.playing= false;
    });
  },
  methods: {
    ...mapActions(['addToData']),
    clicked() {
      if (this.$refs.form.validate()) {
        if(this.questions[1].selected === "Max klaut Äpfel aus Leonis Garten.")
          this.$emit('next');
        else
          this.wrong = true;
      }
    },
    play(){
      this.audio.play();
      this.playing = true;
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
