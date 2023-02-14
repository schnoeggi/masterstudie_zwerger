<template>

  <section class="text-center mt-15 px-3">
    <h1 class="text-h4 text-sm-h3 mb-10">Wählen Sie Kategorien aus.</h1>
    <p class="text-body-1">
      Damit Ihr persönlicher Algorithmus noch besser und genauer wird geben Sie nun bitte
      mindestens drei Video-Kategorien an, die Ihnen gefallen.</p>
    <v-row no-gutters>
      <v-col class="my-2 px-4" cols="4" :key="name" v-for="(value,name) in categories">
        <div @click="value.selected = !value.selected" :class="{active: value.selected}"
             class="category-button elevation-4 d-flex flex-column justify-center align-center">
          <v-icon class="pa-3">{{ value.icon }}</v-icon>
          <p class="text-body-2 text-sm-body-1  text-wrap">{{ value.title }}</p>

        </div>

      </v-col>

    </v-row>
    <div class="px-4">
      <v-btn class="mt-3" :disabled="selected.length<3" color="secondary" rounded width="100%" height="40px"
             @click="next()">Weiter
      </v-btn>
    </div>

  </section>
</template>

<script>
import categories from "../assets/categories.json"
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Categories",
  data() {
    return {
      categories: categories,
    }
  },
  mounted() {
  },
  computed: {
    selected(){
    return  Object.entries(this.categories).filter(([key,value]) => value.selected).map(([key,value]) => key);}
  },
  methods: {
    ...mapActions(['incrementCategory', 'addToData']),
    next() {
      this.selected.forEach(category => this.incrementCategory({
        category,
        value: 2
      }))
      this.addToData({selectedCategories: this.selected})
      this.$emit('next');
    }
  }
}
</script>

<style scoped lang="scss">
.category-button {
  width: 100%;
  height: 105px;
  cursor: pointer;
  word-break: break-word;
  padding: 5px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  transition: all 100ms ease-in-out;

  > * {
    transition: all 100ms ease-in-out;

  }
  @media (hover: hover) {
    &:hover {
      background: #FF5B25;

      > * {
        transform: scale(1.1);
      }
    }
  }

  @media (hover: none) {
    &:hover {
    }
  }


}

.category-button.active {
  background: #FF5B25;

  > * {
  }
}


</style>
