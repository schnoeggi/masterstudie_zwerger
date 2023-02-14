<template>
  <v-stepper v-model="getStep" height="100%" width="100%" min-height="100vh" elevation="0"
             class="d-flex justify-center align-center">
    <v-btn v-show="$route.query.mode === 'skippable' && getStep !== 7" absolute style="top:50px" left fab
           @click="incrementStep">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-stepper-items>
      <v-stepper-content step="1" class="pb-5">
        <step-start @next="incrementStep"></step-start>
      </v-stepper-content>

      <v-stepper-content step="2" class="pb-5">
        <step-algorithm @next="incrementStep"></step-algorithm>
      </v-stepper-content>

      <v-stepper-content step="3" class="pb-5">
        <step-sound-check @next="incrementStep"></step-sound-check>
      </v-stepper-content>

      <v-stepper-content step="4" class="pb-5">
        <step-tutorial @next="incrementStep"></step-tutorial>
      </v-stepper-content>

      <v-stepper-content step="5">
        <step-random-videos v-if="getStep === 5" @next="incrementStep"></step-random-videos>
      </v-stepper-content>

      <v-stepper-content step="6" class="pb-5">
        <step-categories @next="incrementStep"></step-categories>
      </v-stepper-content>

      <v-stepper-content step="7">
        <step-loading-screen @next="incrementStep" class="d-flex align-center justify-center"
                             style="height: 100vh"></step-loading-screen>
      </v-stepper-content>

      <v-stepper-content step="8" class="pb-5">
        <step-choose @next="incrementStep"></step-choose>
      </v-stepper-content>

      <v-stepper-content step="9" class="pb-5 ">
        <step-tutorial-g1 v-if="group1" @next="incrementStep"></step-tutorial-g1>
        <step-tutorial-g2 v-else @next="incrementStep"></step-tutorial-g2>
      </v-stepper-content>

      <v-stepper-content step="10">
        <step-algo-videos v-if="getStep === 10" :swipeable="group1" @next="incrementStep"></step-algo-videos>
      </v-stepper-content>

      <v-stepper-content step="11">
        <step-video-question version="1" @next="incrementStep"></step-video-question>
      </v-stepper-content>

      <v-stepper-content step="12" class="pb-5 ">
        <step-tutorial-g1-random v-if="group1" @next="incrementStep"></step-tutorial-g1-random>
        <step-tutorial-g2-random v-else @next="incrementStep"></step-tutorial-g2-random>
      </v-stepper-content>

      <v-stepper-content step="13">
        <step-algo-videos :random="true" v-if="getStep === 13" :swipeable="group1"
                          @next="incrementStep"></step-algo-videos>
      </v-stepper-content>

      <v-stepper-content step="14">
        <step-video-question version="2" @next="incrementStep"></step-video-question>
      </v-stepper-content>

      <v-stepper-content step="15" class="pb-5">
        <step-choose-after @next="incrementStep"></step-choose-after>
      </v-stepper-content>

      <v-stepper-content step="16">
        <step-aiss @next="incrementStep"></step-aiss>
      </v-stepper-content>
      <v-stepper-content step="17">
        <step-system-justification @next="incrementStep"></step-system-justification>
      </v-stepper-content>
      <v-stepper-content step="18">
        <step-algo-questions @next="incrementStep"></step-algo-questions>
      </v-stepper-content>
      <v-stepper-content step="19">
        <step-end></step-end>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import {computed} from "vue";
import {mapGetters, mapActions} from 'vuex'
import {getStorage, ref, uploadString} from "firebase/storage";
import {v4 as uuidv4} from 'uuid';

export default {
  name: 'IndexPage',
  data() {
    return {
      myuuid: undefined,
      group1: undefined,
      startTime: 0,
    }
  },
  mounted() {
    this.myuuid = uuidv4();

    this.group1 = Math.random() < 0.5;
  },
  watch: {
    async getStep() {
      scroll(0, 0)
      if (this.getStep >= 14)
        this.sendData();
      if (this.getStep === 7) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        this.incrementStep();
      }
      if (this.getStep === 2) {
        this.startTime = new Date().getTime();
      }


    }
  },
  computed: {
    ...mapGetters(["getStep", "getLikesStats", "getData"]),
  },
  methods: {
    ...mapActions(["incrementStep"]),
    sendData() {
      const time = new Date().getTime() - this.startTime;
      const storage = getStorage();
      const storageRef = ref(storage, `${this.myuuid}.json`);
      const likeStats = this.getLikesStats;
      const group = this.group1 ? 1 : 2;
      const additionalData = [{step: this.getStep}, {time}, {likeStats},{group}];
      uploadString(storageRef, JSON.stringify([...this.getData, ...additionalData])).then((snapshot) => {
      });
    }
  }
}
</script>
<style>
.v-input--radio-group__input {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}

.v-stepper, .v-stepper__items, .v-stepper__wrapper {
  overflow: unset !important;
}
</style>
